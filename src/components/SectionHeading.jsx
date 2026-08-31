export default function SectionHeading({ eyebrow, title, dark = true }) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && <span className="titleblock mb-3">{eyebrow}</span>}
      <h2
        className={`font-[var(--font-display)] text-3xl md:text-4xl font-semibold mt-3 ${
          dark ? 'text-white' : 'text-[var(--color-ink)]'
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 h-[2px] w-16 bg-[var(--color-brass)]" />
    </div>
  )
}
