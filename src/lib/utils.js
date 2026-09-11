export function cn(...parts) {
  return parts.flat(Infinity).filter(Boolean).join(' ')
}

/** Polar helper used by the constellation and radial diagrams. */
export function polar(cx, cy, radius, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
}
