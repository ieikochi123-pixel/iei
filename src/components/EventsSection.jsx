import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'

export default function EventsSection({ events, loading }) {
  return (
    <section id="events" className="content-section py-20 px-5 md:px-8 bg-[var(--color-navy-deep)]/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="What's On" title="Events" />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-[var(--color-safety)] rounded-md p-6 text-center bg-white/5 flex flex-col justify-center">
            <h3 className="font-[var(--font-display)] text-xl text-white">
              39th National Convention
            </h3>
            <p className="text-white/60 mt-2">AI & IoT for Social Inclusion</p>
            <Link
              to="/convention"
              className="inline-block mt-4 mx-auto bg-[var(--color-safety)] text-white font-semibold px-5 py-2 rounded-sm hover:brightness-110 transition"
            >
              Enter Convention Portal
            </Link>
          </div>

          <div className="grid gap-4 content-start">
            {loading && <p className="text-white/50 font-mono text-sm">Loading events\u2026</p>}
            {!loading && (!events || events.length === 0) && (
              <p className="text-white/50 font-mono text-sm">No upcoming events posted right now.</p>
            )}
            {!loading &&
              events?.map((e) => (
                <div key={e.id} className="bg-white/5 border border-white/10 rounded-md p-5">
                  <h3 className="text-[var(--color-cyan)] font-semibold">{e.title}</h3>
                  {e.venue && <p className="text-white/60 text-sm mt-1">{e.venue}</p>}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
