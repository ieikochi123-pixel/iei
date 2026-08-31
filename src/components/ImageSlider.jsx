import { useState } from 'react'

export default function ImageSlider({ images = [], alt = '' }) {
  const [index, setIndex] = useState(0)

  function move(direction, e) {
    e.stopPropagation()
    setIndex((i) => {
      const next = i + direction
      if (next < 0) return images.length - 1
      if (next >= images.length) return 0
      return next
    })
  }

  if (!images.length) {
    return <div className="w-full h-full bg-[var(--color-navy-soft)]" />
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[var(--color-navy-soft)]">
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`${alt} ${i + 1}`}
            className="w-full h-full object-cover shrink-0"
            loading="lazy"
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => move(-1, e)}
            aria-label="Previous image"
            className="absolute top-1/2 left-2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white text-sm flex items-center justify-center hover:bg-black/70 transition"
          >
            &#10094;
          </button>
          <button
            type="button"
            onClick={(e) => move(1, e)}
            aria-label="Next image"
            className="absolute top-1/2 right-2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white text-sm flex items-center justify-center hover:bg-black/70 transition"
          >
            &#10095;
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-3 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}