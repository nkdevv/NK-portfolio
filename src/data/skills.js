/**
 * Three orbits map the stack onto how it is actually used:
 * interface (what the user touches), intelligence (what makes it smart),
 * infrastructure (what it runs on).
 */
export const orbits = [
  { id: 'interface', label: 'Interface', accent: 'var(--accent)' },
  { id: 'intelligence', label: 'Intelligence', accent: 'var(--violet)' },
  { id: 'infrastructure', label: 'Infrastructure', accent: 'var(--cyan)' },
]

export const stackGroups = [
  {
    id: 'frontend',
    orbit: 'interface',
    name: 'Frontend',
    items: [
      { name: 'React.js', desc: 'Component-driven UI library — the core of every application I ship.' },
      { name: 'Next.js', desc: 'React framework adding routing, rendering strategies and build-time optimisation.' },
      { name: 'TypeScript', desc: 'Static types across components, props and API contracts to catch errors before runtime.' },
      { name: 'JavaScript ES6+', desc: 'Modern language features — modules, async/await, destructuring, iterators.' },
      { name: 'HTML5', desc: 'Semantic document structure that carries accessibility information by default.' },
      { name: 'CSS3', desc: 'Modern layout and styling — grid, flexbox, custom properties, container-aware design.' },
    ],
  },
  {
    id: 'ai',
    orbit: 'intelligence',
    name: 'AI / GenAI',
    items: [
      { name: 'RAG', desc: 'Retrieval-augmented generation — fetch relevant context, then generate grounded answers.' },
      { name: 'AI Chatbots', desc: 'Conversational interfaces with streaming, state handling and graceful failure modes.' },
      { name: 'LLM Integration', desc: 'Connecting foundation models to product surfaces through backend services.' },
      { name: 'Prompt Engineering', desc: 'Structuring instructions and context so model output is consistent and scoped.' },
      { name: 'n8n Automation', desc: 'Workflow automation platform for chaining services and removing manual steps.' },
      { name: 'Claude Code', desc: 'AI coding agent used to accelerate POC development in the terminal.' },
      { name: 'Claude Cowork', desc: "Anthropic's collaborative agent workspace." },
    ],
  },
  {
    id: 'cloud',
    orbit: 'infrastructure',
    name: 'Cloud — AWS',
    items: [
      { name: 'Bedrock', desc: 'Managed access to foundation models without operating inference infrastructure.' },
      { name: 'Lambda', desc: 'Serverless functions — orchestrates retrieval and model invocation per request.' },
      { name: 'API Gateway', desc: 'Managed HTTPS entry point handling routing, throttling and auth for backend services.' },
      { name: 'S3', desc: 'Object storage for static assets and application artefacts.' },
      { name: 'EC2', desc: 'Virtual compute instances for workloads that need a persistent server.' },
      { name: 'CloudFront', desc: 'CDN that serves assets from edge locations close to the user.' },
      { name: 'IAM', desc: 'Identity and access management — scoped permissions between services.' },
    ],
  },
  {
    id: 'state',
    orbit: 'interface',
    name: 'State Management',
    items: [
      { name: 'Redux Toolkit', desc: 'Predictable global state with reduced boilerplate for larger applications.' },
      { name: 'Context API', desc: "React's built-in dependency injection for state that does not need a store." },
    ],
  },
  {
    id: 'ui',
    orbit: 'interface',
    name: 'UI Systems',
    items: [
      { name: 'Material UI', desc: 'Component library implementing Material Design with a themeable system.' },
      { name: 'Bootstrap 5', desc: 'Utility and component framework for rapid, consistent layout work.' },
    ],
  },
  {
    id: 'api',
    orbit: 'infrastructure',
    name: 'API / Data',
    items: [
      { name: 'REST APIs', desc: 'Designing and consuming HTTP interfaces with clear resource and error semantics.' },
      { name: 'Axios', desc: 'HTTP client with interceptors for auth, retries and centralised error handling.' },
    ],
  },
  {
    id: 'testing',
    orbit: 'infrastructure',
    name: 'Testing',
    items: [
      { name: 'Jest', desc: 'JavaScript testing framework for unit and integration suites.' },
      { name: 'Unit Testing', desc: 'Isolating functions and components to verify behaviour at the smallest level.' },
      { name: 'Integration Testing', desc: 'Verifying that modules and API boundaries work correctly together.' },
    ],
  },
  {
    id: 'tools',
    orbit: 'infrastructure',
    name: 'Tooling',
    items: [
      { name: 'Webpack', desc: 'Module bundler — code splitting, asset pipelines and build configuration.' },
      { name: 'Babel', desc: 'JavaScript compiler that transforms modern syntax for target environments.' },
      { name: 'Postman', desc: 'API client for exercising and documenting endpoints during integration.' },
      { name: 'Git', desc: 'Distributed version control — branching, review and history hygiene.' },
      { name: 'GitHub', desc: 'Hosted repositories, pull request review and collaboration.' },
      { name: 'GitLab', desc: 'Repository hosting and CI pipelines.' },
    ],
  },
]

/** Nodes rendered in the interactive constellation. */
export const constellation = {
  core: { id: 'core', label: 'Product', desc: 'Interface, intelligence and infrastructure resolved into one shipped experience.' },
  nodes: [
    { id: 'react', label: 'React', orbit: 'interface', angle: 200, radius: 1, desc: 'Component-driven UI library at the centre of the interface layer.' },
    { id: 'ts', label: 'TypeScript', orbit: 'interface', angle: 232, radius: 0.72, desc: 'Types across components and API contracts.' },
    { id: 'next', label: 'Next.js', orbit: 'interface', angle: 168, radius: 0.72, desc: 'React framework for routing and rendering strategy.' },
    { id: 'redux', label: 'Redux Toolkit', orbit: 'interface', angle: 262, radius: 1, desc: 'Predictable global state for larger applications.' },

    { id: 'rag', label: 'RAG', orbit: 'intelligence', angle: 320, radius: 1, desc: 'Retrieve relevant context, then generate a grounded answer.' },
    { id: 'llm', label: 'LLM Integration', orbit: 'intelligence', angle: 350, radius: 0.72, desc: 'Foundation models connected to product surfaces.' },
    { id: 'prompt', label: 'Prompt Engineering', orbit: 'intelligence', angle: 290, radius: 0.72, desc: 'Instructions and context structured for consistent output.' },
    { id: 'claude', label: 'Claude Code', orbit: 'intelligence', angle: 20, radius: 1, desc: 'AI coding agent used to accelerate POC development.' },

    { id: 'bedrock', label: 'AWS Bedrock', orbit: 'infrastructure', angle: 80, radius: 1, desc: 'Managed foundation model inference.' },
    { id: 'lambda', label: 'Lambda', orbit: 'infrastructure', angle: 110, radius: 0.72, desc: 'Serverless compute orchestrating each request.' },
    { id: 'apigw', label: 'API Gateway', orbit: 'infrastructure', angle: 50, radius: 0.72, desc: 'Managed HTTPS entry point for backend services.' },
    { id: 'rest', label: 'REST APIs', orbit: 'infrastructure', angle: 140, radius: 1, desc: 'HTTP interfaces with clear resource and error semantics.' },
  ],
}

export const awsServices = [
  { name: 'S3', desc: 'Object storage' },
  { name: 'EC2', desc: 'Virtual compute' },
  { name: 'Lambda', desc: 'Serverless functions' },
  { name: 'API Gateway', desc: 'Managed API entry point' },
  { name: 'CloudFront', desc: 'Edge content delivery' },
  { name: 'Bedrock', desc: 'Foundation model inference' },
  { name: 'IAM', desc: 'Access management' },
]
