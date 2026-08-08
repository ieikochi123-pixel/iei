import SectionHeading from '../components/SectionHeading'
import {
  importantDates,
  tracks,
  aboutCards,
  authorLinks,
} from '../data/conventionContent'
import {
  nationalAdvisoryCommittee,
  organisingCommittee,
  internationalTechnicalCommittee,
  nationalTechnicalCommittee,
} from '../data/conventionCommittees'
import { contact } from '../data/aboutContent'

function PersonCard({ name, role, detail, location }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-md p-4">
      <h3 className="font-semibold text-white text-sm leading-snug">{name}</h3>
      {role && <p className="text-white/60 text-xs mt-1">{role}</p>}
      {detail && <p className="text-white/60 text-xs mt-1">{detail}</p>}
      {location && <p className="text-[var(--color-cyan)] text-xs mt-1">{location}</p>}
    </div>
  )
}

export default function Convention() {
  return (
    <div className="bg-[var(--color-navy)]">
      {/* Hero */}
      <section className="relative py-28 px-5 md:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="relative max-w-3xl mx-auto">
          <span className="titleblock">39th National Convention &middot; CPDB, IEI</span>
          <h1 className="font-[var(--font-display)] text-3xl md:text-5xl text-white mt-6 leading-tight">
            39th National Convention of Computer Engineers
          </h1>
          <p className="font-mono tracking-[0.2em] text-[var(--color-cyan)] uppercase text-sm md:text-base mt-4">
            Organised by IE(I) Kochi Local Centre
          </p>
          <p className="text-white/60 mt-4">Theme: AI & IoT for an Inclusive and Empowered Society</p>
        </div>
      </section>

      {/* About cards */}
      <section id="about" className="py-16 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Overview" title="About the 39th National Convention" />
          <div className="grid md:grid-cols-2 gap-6">
            {aboutCards.map((c) => (
              <div key={c.title} className="border-l-4 border-[var(--color-brass)] bg-white/5 rounded-r-md p-6">
                <h3 className="font-[var(--font-display)] text-lg text-[var(--color-brass-light)]">{c.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mt-3">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Author submission */}
      <section id="submit" className="py-16 px-5 md:px-8 bg-[var(--color-navy-deep)]/40">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading eyebrow="Call for Papers" title="Share Your Research \u2014 Note to Authors" />
          <p className="text-white/70 leading-relaxed">
            Authors are invited to submit original and unpublished research papers aligned with
            the convention's thematic areas, through the Microsoft CMT3 platform. Submissions
            undergo rigorous peer review; selected papers may be presented at the National
            Convention and considered for a SCOPUS-indexed Springer journal, subject to approval.
            Accepted authors remit \u20b95000 after selection.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <a
              href={authorLinks.template}
              target="_blank"
              rel="noreferrer"
              className="bg-[var(--color-brass)] text-[var(--color-navy-deep)] font-semibold px-5 py-2.5 rounded-sm hover:brightness-110 transition"
            >
              &#128196; Download Paper Template
            </a>
            <a
              href={authorLinks.guidelines}
              target="_blank"
              rel="noreferrer"
              className="border border-[var(--color-brass)] text-[var(--color-brass-light)] font-semibold px-5 py-2.5 rounded-sm hover:bg-[var(--color-brass)]/10 transition"
            >
              &#128218; Download Author Guidelines
            </a>
          </div>
        </div>
      </section>

      {/* Important dates */}
      <section id="dates" className="py-16 px-5 md:px-8">
        <div className="max-w-2xl mx-auto">
          <SectionHeading eyebrow="Timeline" title="Important Dates" />
          <table className="w-full text-sm border border-white/10 rounded-md overflow-hidden">
            <thead>
              <tr className="bg-[var(--color-navy-soft)] text-white">
                <th className="text-left py-3 px-4 font-mono text-xs tracking-widest uppercase">Event</th>
                <th className="text-left py-3 px-4 font-mono text-xs tracking-widest uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {importantDates.map((d) => (
                <tr
                  key={d.event}
                  className={`border-t border-white/10 ${d.highlight ? 'bg-[var(--color-brass)]/15' : 'bg-white/5'}`}
                >
                  <td className={`py-3 px-4 ${d.highlight ? 'text-[var(--color-brass-light)] font-semibold' : 'text-white/80'}`}>
                    {d.event}
                  </td>
                  <td className={`py-3 px-4 font-mono ${d.highlight ? 'text-[var(--color-brass-light)] font-semibold' : 'text-white/70'}`}>
                    {d.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* National Advisory Committee */}
      <section className="py-16 px-5 md:px-8 bg-[var(--color-navy-deep)]/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Guidance" title="National Advisory Committee" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nationalAdvisoryCommittee.map((p) => (
              <PersonCard key={p.name} name={p.name} role={p.role} />
            ))}
          </div>
        </div>
      </section>

      {/* Organising Committee */}
      <section id="committee" className="py-16 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Local Team" title="Organising Committee" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {organisingCommittee.map((p, i) => (
              <PersonCard key={p.name + i} name={p.name} role={p.role} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Committee */}
      <section className="py-16 px-5 md:px-8 bg-[var(--color-navy-deep)]/40">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Peer Review" title="Technical Committee" />

          <h3 className="font-mono text-xs tracking-widest text-[var(--color-cyan)] uppercase mb-4">
            International
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {internationalTechnicalCommittee.map((p, i) => (
              <PersonCard key={p.name + i} name={p.name} detail={p.detail} location={p.location} />
            ))}
          </div>

          <h3 className="font-mono text-xs tracking-widest text-[var(--color-cyan)] uppercase mb-4">
            National
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nationalTechnicalCommittee.map((p, i) => (
              <PersonCard key={p.name + i} name={p.name} detail={p.detail} location={p.location} />
            ))}
          </div>
        </div>
      </section>

      {/* Sub-theme tracks */}
      <section id="tracks" className="py-16 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Scope" title="Sub Themes" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tracks.map((t) => (
              <div key={t.title} className="bg-white/5 border border-white/10 rounded-md p-6 text-center">
                <div className="text-4xl mb-3">{t.icon}</div>
                <h3 className="font-[var(--font-display)] text-white">{t.title}</h3>
                <p className="text-white/60 text-sm mt-2">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <div className="max-w-6xl mx-auto px-5 md:px-8 pb-16">
        <div className="border-2 border-[var(--color-brass)]/50 rounded-md overflow-hidden">
          <iframe
            title="Convention venue location"
            src={contact.mapEmbed}
            width="100%"
            height="420"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
