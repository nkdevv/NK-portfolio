#!/usr/bin/env python3
"""
Generate the raster social-share card and the iOS touch icon.

Why this exists: the design source for both assets is SVG, but neither consumer
accepts SVG. No social platform (X, Facebook, LinkedIn, Slack, WhatsApp,
iMessage) renders an SVG og:image — they silently show no preview image at all.
iOS likewise ignores an SVG apple-touch-icon. So the SVGs stay as the editable
source of truth and this script rasterises them.

It redraws the artwork rather than shelling out to a converter, because the
converters available here mangle it: ImageMagick's internal renderer drops the
gradients and collapses the negative letter-spacing in the headline into
unreadable glyph pileups.

Run:  npm run images
Deps: pillow, numpy  (see requirements.txt)
"""

from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

PUBLIC = Path(__file__).resolve().parent.parent / "public"

# Must track the palette in src/styles/index.css.
BG = (8, 9, 11)
INK = (237, 238, 240)
SOFT = (134, 139, 149)
FAINT = (92, 98, 108)
ACCENT = (91, 131, 255)
VIOLET = (167, 139, 250)

FONT_DIR = Path("/usr/share/fonts/truetype/noto")
FONT_MEDIUM = FONT_DIR / "NotoSans-Medium.ttf"
FONT_REGULAR = FONT_DIR / "NotoSans-Regular.ttf"

SS = 2  # supersample factor, downsampled with LANCZOS at the end


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    if not path.exists():
        sys.exit(f"Missing font: {path}\nInstall fonts-noto-core, or edit FONT_DIR.")
    return ImageFont.truetype(str(path), size * SS)


def draw_tracked(draw, xy, text, fnt, fill, tracking=0.0):
    """Pillow has no letter-spacing, so place each glyph by hand.

    `tracking` is in unscaled px and may be negative, which is what the display
    headline uses.
    """
    x, y = xy[0] * SS, xy[1] * SS
    step = tracking * SS
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill, anchor="ls")
        x += draw.textlength(ch, font=fnt) + step


def tracked_width(draw, text, fnt, tracking=0.0) -> float:
    total = sum(draw.textlength(c, font=fnt) for c in text)
    return (total + tracking * SS * max(len(text) - 1, 0)) / SS


def radial_glow(size, center, radii, rgb, peak_alpha):
    """Elliptical radial gradient, matching the SVG's objectBoundingBox radial.

    Built with numpy because a per-pixel Python loop over ~3M supersampled
    pixels is unreasonably slow, and stacking translucent ellipses composites
    incorrectly (alpha accumulates instead of ramping).
    """
    w, h = size
    cx, cy = center
    rx, ry = radii
    ys, xs = np.mgrid[0:h, 0:w]
    d = np.sqrt(((xs - cx) / rx) ** 2 + ((ys - cy) / ry) ** 2)
    alpha = np.clip(1.0 - d, 0.0, 1.0) * peak_alpha
    layer = np.zeros((h, w, 4), dtype=np.uint8)
    layer[..., 0], layer[..., 1], layer[..., 2] = rgb
    layer[..., 3] = (alpha * 255).astype(np.uint8)
    return Image.fromarray(layer, "RGBA")


def linear_gradient(size, start_rgb, end_rgb, diagonal=False):
    w, h = size
    if diagonal:
        gx = np.linspace(0, 1, w)[None, :]
        gy = np.linspace(0, 1, h)[:, None]
        t = np.clip((gx + gy) / 2, 0, 1)
    else:
        t = np.repeat(np.linspace(0, 1, w)[None, :], h, axis=0)
    out = np.zeros((h, w, 3), dtype=np.uint8)
    for i in range(3):
        out[..., i] = (start_rgb[i] + (end_rgb[i] - start_rgb[i]) * t).astype(np.uint8)
    return Image.fromarray(out, "RGB")


def build_og() -> Image.Image:
    W, H = 1200 * SS, 630 * SS
    img = Image.new("RGB", (W, H), BG)

    # 56px grid, white at 5%.
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    line = (255, 255, 255, int(0.05 * 255))
    for x in range(0, W, 56 * SS):
        gd.line([(x, 0), (x, H)], fill=line, width=SS)
    for y in range(0, H, 56 * SS):
        gd.line([(0, y), (W, y)], fill=line, width=SS)
    img = Image.alpha_composite(img.convert("RGBA"), grid)

    img = Image.alpha_composite(
        img, radial_glow((W, H), (600 * SS, 0), (960 * SS, 504 * SS), ACCENT, 0.28)
    )
    img = img.convert("RGB")
    d = ImageDraw.Draw(img)

    f_eyebrow = font(FONT_REGULAR, 20)
    f_head = font(FONT_MEDIUM, 82)
    f_sub = font(FONT_REGULAR, 26)
    f_meta = font(FONT_REGULAR, 19)

    draw_tracked(d, (80, 128), "NIRMAL KUMAR UMAPATHI", f_eyebrow, FAINT, 4)

    # Gradient accent bar (rounded), painted through a mask.
    bar = Image.new("L", (120 * SS, 6 * SS), 0)
    ImageDraw.Draw(bar).rounded_rectangle(
        [0, 0, 120 * SS - 1, 6 * SS - 1], radius=3 * SS, fill=255
    )
    img.paste(linear_gradient((120 * SS, 6 * SS), ACCENT, VIOLET), (80 * SS, 180 * SS), bar)

    draw_tracked(d, (80, 272), "AI features and frontends,", f_head, INK, -3)
    draw_tracked(d, (80, 366), "built to ship.", f_head, INK, -3)
    draw_tracked(
        d,
        (80, 440),
        "Freelance AI frontend engineer — RAG, React & Next.js, performance, automation",
        f_sub,
        SOFT,
    )

    d.rectangle(
        [80 * SS, 500 * SS, 1120 * SS, 500 * SS + max(SS // 2, 1)],
        fill=(28, 30, 35),
    )

    # Lay the footer out by measured width so the labels cannot collide the way
    # they did when they were hardcoded at fixed x positions.
    x = 80.0
    for i, label in enumerate(
        ["~4 YRS EXPERIENCE", "RAG + LLM", "AWS BEDROCK", "CHENNAI, INDIA"]
    ):
        draw_tracked(d, (x, 556), label, f_meta, FAINT, 2)
        x += tracked_width(d, label, f_meta, 2) + 56
        if i == 3:
            break

    return img.resize((1200, 630), Image.LANCZOS)


def build_icon(px: int, full_bleed: bool = False) -> Image.Image:
    """`full_bleed` squares off the artwork for apple-touch-icon.

    iOS applies its own corner mask and composites the icon on an opaque
    background. An icon that brings its own rounding gets it applied twice, and
    its transparent corners come out as black wedges outside the mask.
    """
    S = 8  # heavy supersample: round caps and the rounded rect need it
    size = px * S
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    u = size / 64.0  # favicon.svg is authored on a 64-unit grid
    if full_bleed:
        d.rectangle([0, 0, size, size], fill=BG + (255,))
    else:
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=16 * u, fill=BG + (255,))
        d.rounded_rectangle(
            [0.5 * u, 0.5 * u, size - 0.5 * u, size - 0.5 * u],
            radius=15.5 * u,
            outline=(255, 255, 255, int(0.12 * 255)),
            width=max(int(u), 1),
        )

    # The "N": stroke into a mask, then push the gradient through it.
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    pts = [(19 * u, 45 * u), (19 * u, 19 * u), (45 * u, 45 * u), (45 * u, 19 * u)]
    sw = int(5 * u)
    md.line(pts, fill=255, width=sw, joint="curve")
    for px_, py_ in pts:  # round caps
        md.ellipse([px_ - sw / 2, py_ - sw / 2, px_ + sw / 2, py_ + sw / 2], fill=255)

    grad = linear_gradient((size, size), ACCENT, VIOLET, diagonal=True).convert("RGBA")
    img = Image.composite(grad, img, mask)

    return img.resize((px, px), Image.LANCZOS)


def main() -> None:
    PUBLIC.mkdir(exist_ok=True)

    og = PUBLIC / "og.png"
    build_og().save(og, "PNG", optimize=True)
    print(f"{og.relative_to(PUBLIC.parent)}  {og.stat().st_size // 1024} KB")

    for name, px, full_bleed in [
        ("apple-touch-icon.png", 180, True),
        ("icon-192.png", 192, False),
        ("icon-512.png", 512, False),
    ]:
        out = PUBLIC / name
        build_icon(px, full_bleed).save(out, "PNG", optimize=True)
        print(f"{out.relative_to(PUBLIC.parent)}  {out.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
