export const experience = [
  {
    id: 'stringserve',
    company: 'Stringserve Technologies India Private Limited',
    companyShort: 'Stringserve Technologies',
    role: 'Software Developer',
    period: 'Jan 2024 — Present',
    year: '2024',
    current: true,
    product: 'C2C — E-Learning / Learning Management System',
    thesis:
      'Own the frontend of a production LMS while extending it with generative AI — a RAG chatbot wired to AWS Bedrock, plus the internal tooling that keeps prototyping fast.',
    contributions: [
      'Designed and developed a RAG-based AI chatbot for the C2C E-Learning platform using React.js.',
      'Integrated AWS Bedrock through API Gateway and Lambda.',
      'Architected scalable React frontend applications.',
      'Built 5+ internal tools and POCs, including a POC and Demo Tracking application centralizing 20+ demos and prototypes.',
      'Created automation applications that removed repetitive manual work from delivery workflows.',
      'Mentored 3+ junior developers.',
    ],
    stack: ['React', 'TypeScript', 'JavaScript ES6+', 'AWS Bedrock', 'API Gateway', 'Lambda', 'Claude Code'],
    impact: [
      { value: '35%', label: 'Faster page loads' },
      { value: '80%', label: 'Manual workload reduced' },
      { value: '30%', label: 'Faster AI POC turnaround' },
      { value: '3+', label: 'Developers mentored' },
    ],
  },
  {
    id: 'evolve',
    company: 'Evolve Bizcon Services Private Limited',
    companyShort: 'Evolve Bizcon Services',
    role: 'Trainee Software Developer',
    period: 'Sept 2022 — Dec 2023',
    year: '2022',
    current: false,
    product: 'Real-time collaborative learning platform',
    thesis:
      'Shipped React features and the REST integrations behind live student–instructor interaction, then tuned rendering until the platform felt immediate.',
    contributions: [
      'Built and integrated REST APIs for a real-time collaborative learning platform, enabling live student and instructor interaction.',
      'Developed and deployed 10+ React features.',
      'Collaborated closely with designers and backend developers to shorten the path from design to shipped feature.',
      'Optimized rendering performance using React hooks and memoization.',
    ],
    stack: ['React', 'JavaScript ES6+', 'REST APIs', 'Axios', 'Redux Toolkit', 'Bootstrap 5'],
    impact: [
      { value: '25%', label: 'Course engagement lift' },
      { value: '20%', label: 'UX & engagement lift' },
      { value: '30%', label: 'Faster page loads' },
      { value: '15%', label: 'Development time saved' },
    ],
  },
]
