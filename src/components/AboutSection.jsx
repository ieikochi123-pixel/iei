import SectionHeading from './SectionHeading'
import { milestones, highlights, localCentreActivities } from '../data/aboutContent'

export default function AboutSection() {
  return (
    <section id="about" className="content-section py-20 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Who We Are" title="About IE(I) Kochi Local Centre" />

        <div className="bg-white/5 border border-white/10 rounded-md p-6 md:p-10 space-y-10">
          <div>
            <p className="text-white/80 leading-relaxed">
              The Kochi Local Centre is the <strong className="text-white">second-largest centre in India</strong> with
              13,032 members. We represent 13 engineering disciplines spanning Ernakulam, Idukki
              and Lakshadweep.
            </p>
            <ul className="mt-4 space-y-2">
              {localCentreActivities.map((item) => (
                <li key={item} className="flex gap-2 text-white/70 text-sm">
                  <span className="text-[var(--color-brass)]">&#9670;</span> {item}
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
              {highlights.map((h) => (
                <div key={h.label} className="border border-[var(--color-cyan)]/25 rounded-md p-4">
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

            <h4 className="font-mono text-xs tracking-widest text-[var(--color-brass)] uppercase mt-8 mb-3">
              Historical Milestones
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {milestones.map((m) => (
                    <tr key={m.date + m.event} className="border-b border-white/10">
                      <td className="py-2.5 pr-4 font-mono text-[var(--color-cyan)] whitespace-nowrap align-top">
                        {m.date}
                      </td>
                      <td className="py-2.5 text-white/70">{m.event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
