import { createFileRoute } from '@tanstack/react-router'
import { education, experience, site, skills, social } from '@/data/site'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    seo({
      title: 'About',
      path: '/about/',
      description: 'About James Morton: Lead DevOps Engineer at StoreFeeder and creator of Quackback, based in Nottingham, UK.',
    }),
  component: About,
})

const ext = { target: '_blank', rel: 'noopener' } as const

/** Company logo, or a lettered tile when we don't have one. Decorative: the name is in the text beside it. */
function OrgLogo({ name, src }: { name: string; src?: string }) {
  const box = 'size-8 shrink-0 rounded-md ring-1 ring-rule'
  return src ? (
    <img src={src} alt="" width={32} height={32} loading="lazy" className={`${box} bg-white object-contain`} />
  ) : (
    <span aria-hidden="true" className={`${box} grid place-items-center bg-surface text-[0.8rem] font-semibold text-ink-2`}>
      {name.charAt(0)}
    </span>
  )
}

function About() {
  return (
    <>
      <h1 className="pt-10 text-[1.4rem] font-semibold">About</h1>

      <img
        src={site.avatar}
        alt="James Morton, smiling, in sunglasses in front of a fountain"
        width={400}
        height={400}
        className="mt-6 w-full max-w-[16rem] rounded-md"
      />

      <div className="mt-6 space-y-4 text-ink-2">
        <p>
          I’m James Morton, a DevOps engineer and software developer. I live in Nottingham, and I studied Software
          Engineering at the University of Nottingham, graduating in 2012. Since then I’ve worked at Experian,
          Microlise and, since 2016, StoreFeeder.
        </p>
        <p>
          These days I split my week. I’m Lead DevOps Engineer at{' '}
          <a href="https://www.storefeeder.com" className="a" {...ext}>StoreFeeder</a>, which builds and maintains
          software for Royal Mail, including Click &amp; Drop and Send an item. I’m responsible for our platform
          infrastructure. The rest of my week goes on{' '}
          <a href="https://quackback.io" className="a" {...ext}>Quackback</a>, an open-source customer feedback tool
          I started in December 2025. I wrote most of it, along with the iOS and Android SDKs and the hosted version.
        </p>
        <p>
          I’ve been on GitHub as{' '}
          <a href="https://github.com/mortondev" className="a" {...ext}>mortondev</a> since 2013. My first posts here
          were about C# and Ruby. What I work with now is below.
        </p>
      </div>

      <section className="mt-12" aria-labelledby="skills">
        <h2 id="skills" className="h2">Skills</h2>
        <dl className="mt-3">
          {skills.map((k) => (
            <div key={k.area} className="flex flex-col gap-x-6 gap-y-1.5 py-2.5 sm:flex-row">
              <dt className="shrink-0 sm:w-44">
                <span className="text-ink">{k.area}</span>
                <span className="mt-1.5 flex gap-1.5">
                  {k.icons.map((i) => (
                    <img key={i.name} src={i.src} alt={i.name} title={i.name} width={20} height={20} loading="lazy" className="size-5" />
                  ))}
                </span>
              </dt>
              <dd className="text-[0.95rem] text-ink-2">{k.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12" aria-labelledby="work">
        <h2 id="work" className="h2">Experience</h2>
        <dl className="mt-3">
          {experience.map((r) => (
            <div key={`${r.org}-${r.period}`} className="flex flex-col gap-x-6 gap-y-1 py-2.5 sm:flex-row">
              <dt className="date shrink-0 pt-1.5 whitespace-nowrap sm:w-44">{r.period}</dt>
              <dd className="flex min-w-0 gap-3">
                <OrgLogo name={r.org} src={r.logo} />
                <span className="min-w-0">
                  <span className="text-ink">
                    {r.title},{' '}
                    {r.orgUrl ? <a href={r.orgUrl} className="a" {...ext}>{r.org}</a> : r.org}
                  </span>
                  {r.summary && <span className="block text-[0.95rem] text-ink-2">{r.summary}</span>}
                </span>
              </dd>
            </div>
          ))}
          {education.map((e) => (
            <div key={e.org} className="flex flex-col gap-x-6 gap-y-1 py-2.5 sm:flex-row">
              <dt className="date shrink-0 pt-1.5 whitespace-nowrap sm:w-44">{e.period}</dt>
              <dd className="flex min-w-0 gap-3">
                <OrgLogo name={e.org} src={e.logo} />
                <span className="text-ink">
                  {e.degree},{' '}
                  <a href={e.orgUrl} className="a" {...ext}>{e.org}</a>
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12" aria-labelledby="elsewhere">
        <h2 id="elsewhere" className="h2">Elsewhere</h2>
        <ul className="mt-3 space-y-1.5">
          {social.map((s) => (
            <li key={s.label}>
              {s.label}:{' '}
              <a href={s.href} className="a" rel="me noopener" target="_blank">
                {s.handle}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
