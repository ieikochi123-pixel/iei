import SectionHeading from './SectionHeading'

export default function CommitteeSection({ committee, loading }) {
  return (
    <section
      id="committee"
      className="content-section py-20 px-5 md:px-8 bg-[var(--color-navy-deep)]/40"
    >
      <div className="max-w-6xl mx-auto">

        <SectionHeading
          eyebrow="Leadership"
          title="Organizing Committee"
        />

        {/* =========================
            FIRST 2 MEMBERS
            Chairman + Hon. Secretary
        ========================== */}
        <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">

          {loading && (
            <p className="text-white/50 font-mono text-sm col-span-full">
              Loading committee members…
            </p>
          )}

          {!loading && (!committee || committee.length === 0) && (
            <p className="text-white/50 font-mono text-sm col-span-full">
              Updating committee details…
            </p>
          )}

          {!loading &&
            committee?.slice(0, 2).map((m) => (
              <div
                key={m.id}
                className="bg-white/5 border border-white/10 rounded-md p-5 text-center"
              >
                <img
                  src={m.photo_url || '/logo.png'}
                  alt={m.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[var(--color-cyan)]"
                  onError={(e) => (e.currentTarget.src = '/logo.png')}
                />

                <p className="font-mono text-[11px] tracking-wider uppercase text-[var(--color-cyan)] mt-3">
                  {m.designation}
                </p>

                <h3 className="font-[var(--font-display)] font-semibold text-white mt-1">
                  {m.name}
                </h3>
              </div>
            ))}

        </div>


        {/* =========================
            REMAINING 8 MEMBERS
            4 × 2 GRID
        ========================== */}
        <div className="grid grid-cols-4 gap-4 mt-4">

          {!loading &&
            committee?.slice(2).map((m) => (
              <div
                key={m.id}
                className="bg-white/5 border border-white/10 rounded-md p-5 text-center"
              >
                <img
                  src={m.photo_url || '/logo.png'}
                  alt={m.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[var(--color-cyan)]"
                  onError={(e) => (e.currentTarget.src = '/logo.png')}
                />

                <p className="font-mono text-[11px] tracking-wider uppercase text-[var(--color-cyan)] mt-3">
                  {m.designation}
                </p>

                <h3 className="font-[var(--font-display)] font-semibold text-white mt-1">
                  {m.name}
                </h3>
              </div>
            ))}

        </div>

      </div>
    </section>
  )
}