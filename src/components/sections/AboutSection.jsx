import { profile } from '@/data/profile'
import { basePath } from '@/data/site'
import Reveal from '@/components/ui/Reveal'

const paragraphs = [
  'I build the interface layer of AI products — the part where a model stops being an API response and becomes something a person can actually use. Most of that work happens in React and TypeScript, where the interesting problems are less about calling the model and more about latency, state, failure and trust.',
  'On the C2C learning platform I designed a RAG-based chatbot and wired it to AWS Bedrock through API Gateway and Lambda, so learners get answers grounded in real course material rather than generic model output. Around it, I re-architected the frontend for scale — faster page loads, lower memory usage, cleaner boundaries as features accumulated.',
  'The other half of the job is removing friction. Internal tools, POC tracking and automation applications took repetitive manual work out of the delivery workflow, and AI-assisted development shortened the distance between an idea and a running prototype. I also mentor junior developers, which is the most reliable way I know to make good practice outlast a single project.',
]

const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'Experience', value: profile.experience },
  { label: 'Focus', value: 'React · TypeScript · GenAI · AWS' },
  { label: 'Currently', value: 'Software Developer, Stringserve Technologies' },
]

export default function AboutSection() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-20">
      <div>
        {paragraphs.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <p className="mt-6 text-[1.0625rem] leading-[1.75] text-soft first:mt-0 sm:text-[1.125rem]">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>

      <div>
        <Reveal className="mb-8 overflow-hidden rounded-2xl border border-line bg-elevated">
          <img
            src={basePath('/profile.jpeg')}
            alt={`${profile.name}, ${profile.title}`}
            width="852"
            height="1280"
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
        </Reveal>

        <Reveal className="overflow-hidden rounded-2xl border border-line">
          <dl className="bg-elevated">
            {facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`px-5 py-4 sm:px-6 ${i > 0 ? 'border-t border-line' : ''}`}
              >
                <dt className="label">{fact.label}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-snug text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <p className="label">Education</p>
          <div className="mt-4 rounded-2xl border border-line bg-elevated px-5 py-5 sm:px-6">
            <p className="text-[0.9375rem] font-medium leading-snug tracking-[-0.015em]">
              {profile.education.degree}
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
              {profile.education.institution}
            </p>
            <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.11em] text-faint">
              {profile.education.period} · {profile.education.score}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16} className="mt-8">
          <p className="label">How I work</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {profile.professionalSkills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-line px-2.5 py-1 text-[0.75rem] text-muted"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  )
}
