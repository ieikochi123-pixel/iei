// Signature visual: a technical-drawing compass tracing a circle, echoing the
// drafting-instrument heritage of an engineers' institution. Renders once on
// hero load via CSS stroke-dashoffset animation (see .compass-draw in index.css).
export default function DraftingCompass({ className = '' }) {
  return (
    <svg
      viewBox="0 0 320 320"
      className={`compass-draw ${className}`}
      fill="none"
      stroke="var(--color-brass-light)"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="160" cy="180" r="90" stroke="var(--color-cyan)" strokeOpacity="0.6" />
      <circle cx="160" cy="180" r="2.5" fill="var(--color-brass-light)" stroke="none" />
      <line x1="160" y1="180" x2="160" y2="40" />
      <line x1="160" y1="40" x2="128" y2="82" />
      <line x1="160" y1="40" x2="192" y2="82" />
      <line x1="160" y1="180" x2="238" y2="228" />
      <line x1="238" y1="228" x2="252" y2="200" />
      <line x1="238" y1="228" x2="212" y2="238" />
      <circle cx="160" cy="180" r="130" strokeOpacity="0.2" strokeDasharray="2 6" />
    </svg>
  )
}
