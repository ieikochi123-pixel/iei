import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EventsSection({ events, loading }) {
  return (
    <section id="events" className="content-section py-20 px-5 md:px-8 bg-[var(--color-navy-deep)]/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="What's On" title="Events" />

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Flagship convention spotlight card */}
          <div className="relative overflow-hidden rounded-2xl p-8 flex flex-col justify-center bg-gradient-to-br from-[var(--color-safety)]/20 via-[var(--color-navy-soft)] to-[var(--color-navy-deep)] border border-[var(--color-safety)]/40 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[var(--color-safety)]/20 blur-2xl" />
            <div className="absolute inset-0 blueprint-grid opacity-20" />

            <span className="relative inline-flex items-center gap-1.5 self-start text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-safety)] bg-[var(--color-safety)]/10 border border-[var(--color-safety)]/40 rounded-full px-3 py-1">
              Flagship Event
            </span>

            <h3 className="relative font-[family-name:var(--font-display)] text-2xl md:text-3xl text-white mt-5 leading-tight">
              39th National Convention
            </h3>
            <p className="relative text-white/70 mt-2">AI &amp; IoT for Social Inclusion</p>

            <Link
              to="/convention"
              className="relative group inline-flex items-center gap-2 mt-6 self-start bg-[var(--color-safety)] text-white font-semibold px-5 py-2.5 rounded-sm hover:brightness-110 transition focus-ring"
            >
              Enter Convention Portal
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Upcoming events list */}
          <div className="grid gap-4 content-start">
            {loading && (
              <p className="text-white/50 font-mono text-sm">Loading events&hellip;</p>
            )}
            {!loading && (!events || events.length === 0) && (
              <p className="text-white/50 font-mono text-sm">No upcoming events posted right now.</p>
            )}
            {!loading &&
              events?.map((e) => (
                <div
                  key={e.id}
                  className="group flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[var(--color-cyan)]/50 hover:bg-white/[0.08] transition-all"
                >
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/30 flex items-center justify-center text-[var(--color-cyan)]">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold group-hover:text-[var(--color-cyan)] transition-colors">
                      {e.title}
                    </h3>
                    {e.venue && (
                      <p className="flex items-center gap-1.5 text-white/60 text-sm mt-1.5">
                        <PinIcon className="w-3.5 h-3.5 shrink-0" />
                        {e.venue}
                      </p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}