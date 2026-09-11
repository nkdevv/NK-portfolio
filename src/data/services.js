/**
 * Freelance service catalogue.
 *
 * Where a service maps onto work that has actually shipped, the `proof` field
 * points at the real engagement behind the offer — nothing is claimed that
 * cannot be evidenced from the live projects or the CV. Services without a
 * public reference yet simply omit `proof` rather than inventing one; the
 * detail page renders around the gap.
 */

export const services = [
  {
    id: 'ai-integration',
    slug: 'ai-integration',
    index: '01',
    name: 'AI & RAG Integration',
    tagline: 'Make your product answer questions about itself',
    summary:
      'Retrieval-augmented chat and LLM features wired into an existing product — grounded in your own content, not generic model output.',
    body: 'Most teams have the content and the model but nothing joining them. I build the layer in between: retrieval that finds the right passages, a prompt that keeps the model scoped, and a frontend that handles streaming, latency and failure as first-class states rather than afterthoughts.',
    deliverables: [
      'RAG pipeline — content retrieval and context injection',
      'Chat interface with streaming responses and error boundaries',
      'AWS Bedrock, API Gateway and Lambda request path',
      'Prompt design tuned for consistent, in-scope output',
      'Graceful degradation when the model or retrieval fails',
      'Handover documentation for the request lifecycle',
    ],
    process: [
      { step: 'Scope', body: 'Work out what the assistant must answer and what content grounds it.' },
      { step: 'Retrieval', body: 'Build the pipeline that fetches relevant passages for a query.' },
      { step: 'Integration', body: 'Wire retrieval and inference through a serverless request path.' },
      { step: 'Interface', body: 'Ship a chat surface with streaming, state and failure handled.' },
    ],
    stack: ['React', 'AWS Bedrock', 'AWS Lambda', 'API Gateway', 'RAG', 'Prompt Engineering'],
    pricing: {
      hourlyInr: '₹2,000 – ₹3,500',
      hourlyUsd: '$45 – $70',
      project: '₹1.5L – ₹4L',
      projectNote: 'Assistant integrated into an existing product',
    },
    proof: {
      label: 'Built for the C2C learning platform',
      body: 'A production e-learning platform where learners can ask questions of their course library and get answers grounded in the actual material.',
    },
  },
  {
    id: 'web-development',
    slug: 'web-development',
    index: '02',
    name: 'React & Next.js Development',
    tagline: 'Product interfaces and marketing sites that hold up',
    summary:
      'Full frontend builds in React or Next.js — from a marketing site that has to load fast to a product surface that has to keep its shape as features accumulate.',
    body: 'A frontend is easy to start and expensive to get wrong. I build with the second year in mind: component and state boundaries drawn so features can land without the architecture fighting back, and an interface that stays fast on the devices your users actually have.',
    deliverables: [
      'Component architecture and state design',
      'Responsive layouts across mobile, tablet and desktop',
      'API integration with sensible loading and error states',
      'Accessibility — semantic markup, keyboard paths, contrast',
      'SEO fundamentals: metadata, sitemap, crawlable routes',
      'Production build and deployment setup',
    ],
    process: [
      { step: 'Structure', body: 'Agree the routes, the data shape and the component boundaries.' },
      { step: 'Build', body: 'Implement the interface against real content, not lorem ipsum.' },
      { step: 'Harden', body: 'Responsive, accessibility and performance passes before sign-off.' },
      { step: 'Ship', body: 'Deploy, hand over the repo and document how to run it.' },
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'Redux Toolkit', 'REST APIs'],
    pricing: {
      hourlyInr: '₹1,500 – ₹3,000',
      hourlyUsd: '$30 – $55',
      project: '₹80K – ₹6L',
      projectNote: 'Marketing site from ₹80K; product application from ₹2.5L',
    },
    proof: {
      label: 'Live: NativeWriter and GSV Drones',
      body: 'An AI writing assistant for Indian languages, and the product site for a UAV research organisation — both publicly online.',
      to: '/#proof',
    },
  },
  {
    id: 'performance',
    slug: 'performance',
    index: '03',
    name: 'Performance Optimization',
    tagline: 'Find what is slow, then fix it',
    summary:
      'An audit of an existing React application followed by the re-architecture work that actually moves load time and memory usage.',
    body: 'Load time is the first thing a user experiences and the last thing most teams budget for. This is a measurement-first engagement: profile the application, identify the paths that genuinely cost time, and fix those rather than sprinkling memoization across the tree and hoping.',
    deliverables: [
      'Profiling report with the measured bottlenecks',
      'Render optimization — hooks discipline and targeted memoization',
      'Bundle analysis, code splitting and lazy loading',
      'Memory work: retained references and long-lived subscriptions',
      'Before and after numbers on the metrics that matter',
      'A written summary your team can act on after handover',
    ],
    process: [
      { step: 'Measure', body: 'Profile the running application and record the baseline.' },
      { step: 'Diagnose', body: 'Separate the expensive paths from the merely suspicious ones.' },
      { step: 'Fix', body: 'Re-architect the parts that profiling proved were costing time.' },
      { step: 'Verify', body: 'Re-measure against the baseline and report the delta.' },
    ],
    stack: ['React', 'React Profiler', 'Webpack', 'Vite', 'Lighthouse'],
    pricing: {
      hourlyInr: '₹1,500 – ₹3,000',
      hourlyUsd: '$40 – $70',
      project: '₹40K – ₹3L',
      projectNote: 'Audit and report from ₹40K; audit plus re-architecture from ₹1.5L',
    },
    proof: {
      label: '35% and 30% faster, in two roles',
      body: 'Page load times improved by around 35% on the C2C platform and around 30% on a collaborative learning platform, both through frontend re-architecture.',
    },
  },
  {
    id: 'automation',
    slug: 'automation',
    index: '04',
    name: 'Workflow Automation',
    tagline: 'Stop paying people to do the same thing every week',
    summary:
      'n8n workflows and small internal tools that take the repetitive steps out of a delivery process and hand them to something that does not get bored.',
    body: 'Manual steps are a recurring tax — they cost the same amount every cycle, forever. The work here is unglamorous and high-return: map what your team repeats by hand, then move the repeatable parts to automation and give the time back to actual product work.',
    deliverables: [
      'Process mapping — what is repeated, and how often',
      'n8n workflows connecting the services you already use',
      'Internal tools for the steps a workflow cannot cover',
      'Notification and error handling so silent failures surface',
      'Documentation so the team can extend it without me',
    ],
    process: [
      { step: 'Map', body: 'Write down the manual process exactly as it runs today.' },
      { step: 'Target', body: 'Pick the steps where automation pays back fastest.' },
      { step: 'Automate', body: 'Build the workflows and the tooling around them.' },
      { step: 'Handover', body: 'Document it so the team owns it after I leave.' },
    ],
    stack: ['n8n', 'React', 'TypeScript', 'REST APIs', 'Claude Code'],
    pricing: {
      hourlyInr: '₹1,200 – ₹2,500',
      hourlyUsd: '$35 – $70',
      project: '₹25K – ₹1.3L',
      projectNote: 'Single workflow from ₹25K; multi-step with integrations from ₹70K',
      retainer: '₹15K – ₹45K / month',
    },
    proof: {
      label: '80% of a manual workload removed',
      body: 'Automation applications cut repetitive manual work by roughly 80%, alongside an internal tool that centralised 20+ demos and prototypes.',
    },
  },
  {
    id: 'seo',
    slug: 'seo',
    index: '05',
    name: 'Technical SEO',
    tagline: 'Make the site legible to crawlers, not just to people',
    summary:
      'Technical and on-page SEO for React and Next.js sites — metadata, structured data, sitemaps, crawlability and Core Web Vitals, implemented rather than just reported.',
    body: 'Most SEO quotes are for content and link-building. This is the other half: the part that lives in the codebase. A React app can render beautifully and still be close to invisible to a crawler — client-only routes, missing metadata, no structured data, and Core Web Vitals scores that quietly suppress ranking. I audit that layer and then fix it, because an audit you have to hand to another developer is only half a deliverable.',
    deliverables: [
      'Technical audit — crawlability, indexing, rendering and redirects',
      'Metadata and canonical URLs across every route',
      'Structured data (Schema.org) for the content types that support it',
      'XML sitemap and robots.txt wired to the real route table',
      'Core Web Vitals: LCP, CLS and INP measured and improved',
      'Search Console and analytics set up, with a baseline recorded',
    ],
    process: [
      { step: 'Crawl', body: 'Audit how a crawler actually sees the site, not how it looks in a browser.' },
      { step: 'Prioritise', body: 'Rank the findings by likely impact rather than by severity label.' },
      { step: 'Implement', body: 'Fix it in the codebase — metadata, schema, routing, Vitals.' },
      { step: 'Baseline', body: 'Record before-and-after numbers so the next change has something to beat.' },
    ],
    stack: ['Next.js', 'React', 'Core Web Vitals', 'Schema.org', 'Lighthouse', 'Search Console'],
    pricing: {
      hourlyInr: '₹1,500 – ₹3,000',
      hourlyUsd: '$30 – $60',
      project: '₹15K – ₹60K',
      projectNote: 'Audit and report from ₹15K; audit plus implementation from ₹35K',
      retainer: '₹15K – ₹40K / month',
    },
  },
  {
    id: 'domain-hosting',
    slug: 'domain-hosting',
    index: '06',
    name: 'Domain & Hosting Setup',
    tagline: 'Get the site online, on your own name and your own accounts',
    summary:
      'Domain registration, DNS, hosting, SSL, business email and deployment — set up under your accounts, so nothing important is registered in someone else’s name.',
    body: 'This is the unglamorous layer that decides whether a good site is actually reachable. I register the domain, point DNS at the right place, provision hosting, get certificates issued and renewing, set up mail on your domain and wire the deployment. Everything goes into accounts you own and control. Registrar and hosting fees are passed through at cost — I bill for the setup work, not a margin on your renewals.',
    deliverables: [
      'Domain registration and transfer, under your own account',
      'DNS records: apex, www, mail and verification',
      'Hosting provisioned — AWS, Vercel, Netlify or shared, whichever fits',
      'HTTPS with auto-renewing certificates',
      'Business email on your domain',
      'Deployment pipeline so a push goes live without manual steps',
      'A written record of every account, record and renewal date',
    ],
    process: [
      { step: 'Choose', body: 'Pick the domain and the hosting that match the traffic and the budget.' },
      { step: 'Register', body: 'Buy under your account, with costs passed through at what they cost.' },
      { step: 'Configure', body: 'DNS, certificates, email and the deployment path.' },
      { step: 'Document', body: 'Hand over the credentials, the records and the renewal calendar.' },
    ],
    stack: ['AWS S3', 'AWS CloudFront', 'Vercel', 'Netlify', 'DNS', 'SSL/TLS'],
    pricing: {
      hourlyInr: '₹1,200 – ₹2,500',
      hourlyUsd: '$25 – $50',
      project: '₹8K – ₹25K',
      projectNote: 'Setup fee only — domain, hosting and mail billed to you at cost',
      retainer: '₹2K – ₹6K / month',
    },
  },
]

export function getService(slug) {
  return services.find((service) => service.slug === slug)
}

export const engagementProcess = [
  {
    step: '01',
    label: 'Enquiry',
    body: 'You describe the problem and the constraint — deadline, budget, existing codebase. I tell you honestly whether I am the right person for it.',
  },
  {
    step: '02',
    label: 'Scope & quote',
    body: 'A written scope with deliverables, a timeline and a fixed price. No work starts before both of us agree what done looks like.',
  },
  {
    step: '03',
    label: 'Build',
    body: 'Regular check-ins against the scope, with working code to look at rather than status reports.',
  },
  {
    step: '04',
    label: 'Handover',
    body: 'The repository, the documentation and a walkthrough. You own everything at the end of it.',
  },
]

/**
 * Indicative ranges benchmarked against 2025–26 freelance market data for an
 * India-based mid-level engineer (Upwork, Index.dev, Aalpha, GoodFirms and
 * India-specific rate guides). International clients sit at the upper end —
 * that 2–3x domestic multiplier is the most consistently reported figure.
 * Every real engagement is quoted on scope, not off this table.
 *
 * SEO is deliberately priced as project work rather than the monthly retainer
 * the Indian market defaults to: those retainers bundle content and link
 * building, which is not what is on offer here. The domain and hosting setup
 * fee is the least well-evidenced number in the table — nobody publishes it
 * standalone, so it is derived from hours at the rates above, with registrar
 * and hosting costs passed through rather than marked up.
 */
export const pricingMeta = {
  title: 'Transparent ranges, quoted on scope',
  body: 'These are the bands most engagements land in, benchmarked against current market rates. The lower end reflects Indian domestic clients, the upper end international ones. You get a fixed written quote before any work starts.',
  currencies: [
    { id: 'inr', label: 'INR', note: 'India' },
    { id: 'usd', label: 'USD', note: 'International' },
  ],
  footnote:
    'Ranges are indicative. Final pricing depends on scope, timeline and the state of the existing codebase.',
}

export const workingPrinciples = [
  {
    title: 'Measured, not asserted',
    body: 'Performance and impact claims come with before-and-after numbers, or they do not get made.',
  },
  {
    title: 'Your code, your repository',
    body: 'Everything is handed over with documentation. No lock-in and no dependency on me being available.',
  },
  {
    title: 'Scope agreed in writing',
    body: 'A fixed scope and a fixed price before the work starts, so neither side is guessing.',
  },
  {
    title: 'Direct communication',
    body: 'You talk to the person writing the code. Nothing is relayed through an account manager.',
  },
]
