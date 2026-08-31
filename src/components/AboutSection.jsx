import SectionHeading from './SectionHeading'
import { milestones, highlights, localCentreActivities } from '../data/aboutContent'

const STATS = [
  { value: '13,032', label: 'Members' },
  { value: '13', label: 'Disciplines' },
  { value: '124', label: 'Centres Nationwide' },
  { value: '1920', label: 'Founded' },
]

export default function AboutSection() {
  return (
    <section id="about" className="content-section py-20 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Who We Are" title="About IE(I) Kochi Local Centre" />

        {/* Stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-10">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="text-center bg-white/5 border border-white/10 rounded-md py-5 px-3 hover:border-[var(--color-brass)]/40 hover:bg-white/[0.08] transition-colors"
            >
              <p className="font-mono text-2xl md:text-3xl font-bold text-[var(--color-brass-light)]">{s.value}</p>
              <p className="text-white/50 text-[10px] uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-md p-6 md:p-10 space-y-12">
          <div>
            <p className="text-white/80 leading-relaxed text-lg">
              The Kochi Local Centre is the <strong className="text-white">second-largest centre in India</strong> with
              13,032 members. We represent 13 engineering disciplines spanning Ernakulam, Idukki
              and Lakshadweep.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {localCentreActivities.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 items-start text-white/70 text-sm bg-white/5 rounded-md p-3 border border-white/5"
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[var(--color-brass)]/15 text-[var(--color-brass)] flex items-center justify-center text-[10px] font-bold">
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-white/10" />

          <div>
            <h3 className="font-[var(--font-display)] text-2xl text-white">
              The Institution of Engineers (India) [IEI]
            </h3>
            <p className="text-white/70 leading-relaxed mt-4">
              IEI is the largest multi-disciplinary professional body of engineers, established in
              1920 with headquarters in Kolkata and incorporated under Royal Charter on 9th
              September 1935 by His Majesty King George V. The Charter tasked the Institution with
              promoting the advancement of engineering among its members. After Independence, the
              Institution became a "Body Corporate" protected under Article 372 of the Constitution
              of India, administered by a National Council headed by the President.
            </p>
            <p className="text-white/70 leading-relaxed mt-4">
              For over a century IEI has served the engineering fraternity through 124 centres
              across India, 6 overseas chapters, 7 fora, and the Engineering Staff College of
              India (ESCI), Hyderabad &mdash; spanning 15 engineering disciplines with a corporate
              membership of over two lakh.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className="border border-[var(--color-cyan)]/25 rounded-md p-5 hover:border-[var(--color-cyan)]/60 hover:-translate-y-0.5 transition-all"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--color-cyan)]/40 text-[var(--color-cyan)] font-mono text-xs font-bold mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-mono text-xs tracking-widest text-[var(--color-cyan)] uppercase">
                    {h.label}
                  </p>
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">{h.body}</p>
                </div>
              ))}
            </div>

            <p className="text-white/70 leading-relaxed mt-6">
              IEI also conducts Sections A & B Examinations (AMIE), recognised as equivalent to an
              engineering degree by the Government of India and UPSC, and maintains a panel of
              Arbitrators for works and supply-contract disputes.
            </p>
          </div>

          <hr className="border-white/10" />

          <div>
            <h3 className="font-[var(--font-display)] text-2xl text-white">History and Genesis</h3>
            <p className="text-white/70 leading-relaxed mt-4">
              After the First World War, industrialisation in India brought a need to uphold
              quality in engineering products and operations. The Government of India formed an
              Indian Industrial Commission under Sir Thomas Holland, which recommended a
              professional engineering body. The "Indian Society of Engineers" formed on 3rd
              January 1919 in Calcutta, and on 16th July 1919 in Shimla was renamed{' '}
              <strong className="text-white">The Institution of Engineers (India)</strong>.
            </p>

            <h4 className="font-mono text-xs tracking-widest text-[var(--color-brass)] uppercase mt-10 mb-6">
              Historical Milestones
            </h4>

            <div className="relative pl-6 border-l-2 border-[var(--color-brass)]/25 space-y-7">
              {milestones.map((m) => (
                <div key={m.date + m.event} className="relative">
                  <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[var(--color-brass)] ring-4 ring-[var(--color-navy-deep)]" />
                  <p className="font-mono text-xs text-[var(--color-cyan)] uppercase tracking-wide">{m.date}</p>
                  <p className="text-white/70 text-sm mt-1 leading-relaxed">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}