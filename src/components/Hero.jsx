import DraftingCompass from './DraftingCompass'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[var(--color-navy)]"
    >
      <div className="absolute inset-0 blueprint-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/40 via-[var(--color-navy)]/70 to-[var(--color-navy)]" />

      <div className="relative max-w-7xl mx-auto w-full px-5 md:px-8 py-24 grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
        <div>
          <span className="titleblock">Est. 1920 &middot; Royal Charter 1935</span>
          <h1 className="font-[var(--font-display)] text-4xl md:text-6xl leading-[1.05] mt-6 text-white">
            The Institution of
            <br />
            Engineers <span className="text-[var(--color-brass-light)]">(India)</span>
          </h1>
          <p className="font-mono tracking-[0.25em] text-sm md:text-base text-[var(--color-cyan)] mt-4 uppercase">
            Kochi Local Centre
          </p>
          <p className="text-white/70 max-w-xl mt-6 leading-relaxed">
            The second-largest local centre in India, serving 13,000+ members across 13
            engineering disciplines in Ernakulam, Idukki and Lakshadweep.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="/#events"
              className="bg-[var(--color-safety)] text-white font-semibold px-6 py-3 rounded-sm hover:brightness-110 transition focus-ring"
            >
              Explore Events
            </a>
            <a
              href="/#membership"
              className="border border-[var(--color-cyan)] text-[var(--color-cyan)] font-semibold px-6 py-3 rounded-sm hover:bg-[var(--color-cyan)]/10 transition focus-ring"
            >
              Apply for Membership
            </a>
          </div>
        </div>

        <div className="hidden md:flex justify-center">
          <DraftingCompass className="w-72 h-72" />
        </div>
      </div>
    </section>
  )
}
