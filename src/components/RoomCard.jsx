import ImageSlider from './ImageSlider'

export default function RoomCard({ facility, selected, onSelect }) {
  return (
    <div
      className={`flex flex-col sm:flex-row bg-white border rounded-md overflow-hidden shadow-sm transition-colors ${
        selected
          ? 'border-[var(--color-brass)] ring-1 ring-[var(--color-brass)]/50'
          : 'border-[var(--color-paper-line)]'
      }`}
    >
      <div className="w-full sm:w-56 h-44 sm:h-auto shrink-0">
        <ImageSlider images={facility.images} alt={facility.name} />
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <span
            className={`inline-block text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-2 ${
              facility.membershipRequired ? 'bg-red-700 text-white' : 'bg-[var(--color-navy)] text-white'
            }`}
          >
            {facility.membershipRequired ? 'IEI Members Only' : 'Open for Everyone'}
          </span>
          <h3 className="font-[var(--font-display)] text-lg text-[var(--color-ink)]">{facility.name}</h3>
          {facility.location && (
            <p className="text-[var(--color-ink-soft)] text-xs mt-1">{facility.location}</p>
          )}
        </div>

        <div className="flex items-end justify-between gap-3 mt-4 pt-3 border-t border-dashed border-[var(--color-paper-line)]">
          <div>
            <p className="font-mono text-lg text-[var(--color-brass)] font-semibold">{facility.price}</p>
            <p className="text-[var(--color-ink-soft)] text-[11px] mt-0.5 max-w-[180px]">{facility.unit}</p>
          </div>
          <button
            type="button"
            onClick={() => onSelect(facility.key)}
            className={`shrink-0 text-xs font-bold uppercase px-4 py-2 rounded-sm transition ${
              selected
                ? 'bg-[var(--color-brass)]/10 text-[var(--color-brass)] border border-[var(--color-brass)]'
                : 'bg-[var(--color-brass)] text-[var(--color-navy-deep)] hover:brightness-110'
            }`}
          >
            {selected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  )
}