export default function RoomCard({ facility, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(facility.key)}
      className={`text-left w-full bg-white/5 border rounded-md p-5 transition-colors focus-ring ${
        selected
          ? 'border-[var(--color-brass)] ring-1 ring-[var(--color-brass)]/50 bg-[var(--color-brass)]/5'
          : 'border-white/10 hover:border-[var(--color-cyan)]/50'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-[var(--font-display)] text-lg text-white">{facility.name}</h3>
          <p className="text-white/50 text-xs mt-1">{facility.note}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-lg text-[var(--color-brass-light)] font-semibold">{facility.price}</p>
          <p className="text-white/40 text-[11px] mt-0.5 max-w-[140px]">{facility.unit}</p>
        </div>
      </div>
      {selected && (
        <span className="titleblock mt-4 !text-[var(--color-brass)] !border-[var(--color-brass)]/50">
          Selected
        </span>
      )}
    </button>
  )
}
