export const caseStudy = {
  slug: 'c2c',
  index: '01',
  name: 'C2C',
  title: 'AI-Powered Learning Experience',
  company: 'Stringserve Technologies',
  period: '2024 — Present',
  role: 'Frontend architecture · GenAI integration',
  kicker: 'Featured case study',
  summary:
    'A production e-learning platform enhanced with a RAG-based AI chatbot that enables context-aware learner interactions.',
  narrative: [
    {
      label: 'Problem',
      body: 'Learners on the C2C LMS had a growing library of course material but no fast way to ask questions of it. Search returned documents; it did not return answers.',
    },
    {
      label: 'Engineering approach',
      body: 'I designed a React chat interface that treats retrieval as part of the UI contract — streaming states, grounded responses and graceful failure — rather than bolting a chat widget onto an existing page.',
    },
    {
      label: 'Technology',
      body: 'The React client calls API Gateway, which invokes a Lambda function that assembles retrieved course context and queries AWS Bedrock. Retrieved context is what turns a generic model reply into a grounded, course-specific answer.',
    },
    {
      label: 'Impact',
      body: 'Alongside the AI work, the frontend was re-architected for scale — faster page loads, lower memory usage, and internal tooling that compressed the distance between an idea and a working prototype.',
    },
  ],
  architecture: [
    { id: 'react', label: 'React Interface', note: 'Chat UI, streaming states, error boundaries' },
    { id: 'apigw', label: 'API Gateway', note: 'Managed HTTPS entry point and request routing' },
    { id: 'lambda', label: 'AWS Lambda', note: 'Serverless orchestration of the request lifecycle' },
    { id: 'bedrock', label: 'AWS Bedrock', note: 'Managed foundation model inference' },
    { id: 'rag', label: 'RAG', note: 'Course context retrieved and injected into the prompt' },
    { id: 'response', label: 'Context-aware response', note: 'Grounded answer rendered back to the learner' },
  ],
  metrics: [
    { value: '35%', label: 'Faster page loads' },
    { value: '80%', label: 'Manual workload reduced' },
    { value: '5+', label: 'Internal tools & POCs' },
    { value: '20+', label: 'Demos & prototypes centralized' },
  ],
  stack: ['React.js', 'TypeScript', 'AWS Bedrock', 'API Gateway', 'AWS Lambda', 'REST APIs', 'Redux Toolkit'],
}

/** Shipped, publicly reachable products. Descriptions track what each site does today. */
export const liveProjects = [
  {
    id: 'nativewriter',
    index: '01',
    name: 'NativeWriter',
    tagline: 'AI writing assistant for Indian languages',
    href: 'https://nativewriter.in',
    domain: 'nativewriter.in',
    status: 'Live',
    body: 'Most writing tools treat Indian languages as an afterthought — they flag correct Tamil as a spelling error and translate idiom into nonsense. NativeWriter is built the other way round: an AI assistant that corrects grammar and spelling, adjusts tone, translates between Tamil, Hindi and English, and transcribes speech, with the language models chosen for how they handle Indian text rather than how well they score in English.',
    highlights: [
      'Real-time grammar and spelling correction',
      'Tone presets — standard, professional, business, festive',
      'Context-aware translation across Tamil, Hindi and English',
      'Voice-to-text transcription in supported languages',
    ],
    stack: ['Next.js', 'React', 'LLM Integration', 'Speech-to-Text'],
  },
  {
    id: 'gsv-drones',
    index: '02',
    name: 'GSV Drones',
    tagline: 'Product site for a UAV research organisation',
    href: 'https://gsvdrone.com',
    domain: 'gsvdrone.com',
    status: 'Live',
    body: 'A marketing and product site for a drone R&D organisation, covering a fleet that runs from nano and pocket airframes to hybrid VTOL and heavy-lift platforms. The build leans on motion and media — animated section transitions, hardware carousels and specification breakdowns — while keeping the deeper pages, from application areas to careers and enquiries, fast and navigable.',
    highlights: [
      'Fleet catalogue with per-airframe specifications',
      'Application areas — surveying, inspection, agriculture, security',
      'Animated section transitions and hardware carousels',
      'News, careers and enquiry flows',
    ],
    stack: ['React', 'Vite', 'React Router', 'GSAP', 'Tailwind CSS'],
  },
]

export const prototypes = [
  {
    id: 'poc-tracking',
    step: '01',
    name: 'POC & Demo Tracking',
    metric: '20+',
    metricLabel: 'demos & prototypes centralized',
    body: 'A single internal application that centralizes 20+ demos and prototypes, so work in flight stays visible instead of scattered across machines and inboxes.',
    tags: ['React', 'Internal tooling'],
  },
  {
    id: 'ai-pocs',
    step: '02',
    name: 'AI-focused POCs',
    metric: '30%',
    metricLabel: 'faster prototyping using Claude Code',
    body: 'Exploratory builds around LLM integration and RAG. Using Claude Code as part of the workflow accelerated AI-focused POC development by roughly 30%.',
    tags: ['Claude Code', 'LLM Integration', 'RAG'],
  },
  {
    id: 'automation',
    step: '03',
    name: 'Automation Applications',
    metric: '80%',
    metricLabel: 'manual workload reduction',
    body: 'Applications that take repetitive, manual steps out of the delivery workflow and hand them to automation instead.',
    tags: ['Automation', 'n8n'],
  },
  {
    id: 'productivity',
    step: '04',
    name: 'Internal Productivity Tools',
    metric: '5+',
    metricLabel: 'internal tools & POCs built',
    body: 'Small, focused tools built for the team — the compounding kind of work that makes every subsequent project cheaper to start.',
    tags: ['React', 'TypeScript'],
  },
]

export const impactMetrics = [
  { value: 35, suffix: '%', label: 'Faster page loads', note: 'Current role' },
  { value: 80, suffix: '%', label: 'Manual workload reduction', note: 'Automation applications' },
  { value: 30, suffix: '%', label: 'Faster AI POC turnaround', note: 'With Claude Code' },
  { value: 5, suffix: '+', label: 'Internal tools & POCs', note: 'Built end to end' },
  { value: 20, suffix: '+', label: 'Demos & prototypes centralized', note: 'POC tracking app' },
  { value: 3, suffix: '+', label: 'Developers mentored', note: 'Junior engineers' },
]

export const aiCapabilities = [
  {
    title: 'RAG-based chatbots',
    body: 'Retrieval-augmented chat where course context is fetched and injected into the prompt, so answers stay grounded in real material.',
  },
  {
    title: 'LLM integration',
    body: 'Wiring foundation models into product surfaces — request shaping, response handling, latency and failure states treated as UI concerns.',
  },
  {
    title: 'Prompt engineering',
    body: 'Structuring instructions and retrieved context so model output is consistent, scoped and useful inside a product.',
  },
  {
    title: 'AWS Bedrock',
    body: 'Managed foundation model inference, called from the backend rather than exposed to the browser.',
  },
  {
    title: 'API Gateway + Lambda',
    body: 'A serverless request path: API Gateway fronts the endpoint, Lambda orchestrates retrieval and model invocation.',
  },
  {
    title: 'Claude Code & n8n',
    body: 'AI-assisted development and workflow automation used to compress build cycles and remove repetitive steps.',
  },
]

export const aiPipeline = [
  { id: 'context', label: 'Knowledge / Context', note: 'Course material and domain content' },
  { id: 'rag', label: 'RAG', note: 'Relevant passages retrieved for the query' },
  { id: 'bedrock', label: 'AWS Bedrock', note: 'Foundation model inference' },
  { id: 'compute', label: 'API Gateway + Lambda', note: 'Serverless orchestration layer' },
  { id: 'react', label: 'React Interface', note: 'Streaming, stateful chat experience' },
  { id: 'learner', label: 'Learner', note: 'A grounded, context-aware answer' },
]

export const performancePractices = [
  {
    title: 'React hooks discipline',
    body: 'Effects and state scoped tightly so re-renders stay proportional to what actually changed.',
  },
  {
    title: 'Memoization where it pays',
    body: 'Applied to the expensive paths that profiling identifies — not sprinkled across the tree by default.',
  },
  {
    title: 'Scalable frontend architecture',
    body: 'Component and state boundaries drawn so the application keeps its shape as features accumulate.',
  },
  {
    title: 'Reduced memory usage',
    body: 'Trimming retained references and long-lived subscriptions that quietly grow over a session.',
  },
]

export const performanceResults = [
  {
    id: 'current',
    context: 'Stringserve Technologies',
    scope: 'C2C LMS · React architecture',
    improvement: 35,
    detail: 'Page load times improved by around 35% after re-architecting the React frontend.',
  },
  {
    id: 'previous',
    context: 'Evolve Bizcon Services',
    scope: 'Collaborative learning platform',
    improvement: 30,
    detail: 'Page load times improved by around 30% through hooks and memoization work.',
  },
]

export const automationFlow = [
  {
    id: 'manual',
    label: 'Manual process',
    body: 'Repetitive steps done by hand, repeated every cycle.',
  },
  {
    id: 'automation',
    label: 'Automation',
    body: 'Internal applications and n8n workflows take over the repeatable parts.',
  },
  {
    id: 'ai',
    label: 'AI assistance',
    body: 'AI-assisted workflows and Claude Code shorten the build loop for POCs.',
  },
  {
    id: 'delivery',
    label: 'Faster delivery',
    body: 'Time moves from maintenance work back to product work.',
  },
]
