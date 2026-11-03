import type { MonthCount } from '@/lib/github'

const label = (m: string) =>
  new Date(`${m}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' })

/** Monthly commit counts as plain bars on a zero baseline. The busiest month is labelled. */
export function CommitChart({ data }: { data: MonthCount[] }) {
  if (data.length === 0) return null
  const max = Math.max(...data.map((d) => d.count))
  const total = data.reduce((n, d) => n + d.count, 0)
  const first = data[0]!.month
  const W = 100 / data.length

  return (
    <figure className="my-6">
      <svg
        viewBox="0 0 100 34"
        preserveAspectRatio="none"
        className="block h-24 w-full"
        role="img"
        aria-label={data.map((d) => `${label(d.month)} ${d.month.slice(0, 4)}: ${d.count}`).join(', ')}
      >
        {data.map((d, i) => {
          const h = (d.count / max) * 32
          return (
            <rect
              key={d.month}
              x={i * W + W * 0.12}
              y={34 - h}
              width={W * 0.76}
              height={h}
              fill={d.count === max ? 'var(--bar-hi)' : 'var(--bar)'}
            />
          )
        })}
      </svg>
      <div className="mt-1.5 grid font-mono text-[0.7rem] text-ink-3" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }} aria-hidden="true">
        {data.map((d) => (
          <span key={d.month} className="text-center">
            {label(d.month).charAt(0)}
          </span>
        ))}
      </div>
      <figcaption className="mt-3 text-[0.9rem] text-ink-3">
        My commits to Quackback’s main branch each month since {label(first)} {first.slice(0, 4)}:{' '}
        {total.toLocaleString('en-GB')} in total. The busiest month was{' '}
        {(() => {
          const peak = data.find((d) => d.count === max)!
          return `${label(peak.month)} ${peak.month.slice(0, 4)}, with ${peak.count}`
        })()}
        .
      </figcaption>
    </figure>
  )
}
