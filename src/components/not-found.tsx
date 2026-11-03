import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <div className="pt-10">
      <h1 className="text-[1.4rem] font-semibold">Page not found</h1>
      <p className="mt-2 text-ink-2">
        There’s nothing at this address. If you followed a link from somewhere, it may be out of date.
      </p>
      <p className="mt-4">
        <Link to="/" className="a">Go to the homepage</Link>
      </p>
    </div>
  )
}
