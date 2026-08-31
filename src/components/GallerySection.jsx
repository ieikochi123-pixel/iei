import { useState, useEffect, useCallback } from 'react';
import SectionHeading from './SectionHeading';

export default function GallerySection({ gallery, loading }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
  }, [gallery]);
  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i + 1) % gallery.length));
  }, [gallery]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, close, showPrev, showNext]);

  return (
    <section id="gallery" className="content-section py-20 px-5 md:px-8 bg-[var(--color-navy-deep)]/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Moments" title="Gallery" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {loading && <p className="text-white/50 font-mono text-sm col-span-full">Loading gallery&hellip;</p>}
          {!loading && (!gallery || gallery.length === 0) && (
            <p className="text-white/50 font-mono text-sm col-span-full">Gallery photos coming soon.</p>
          )}
          {!loading &&
            gallery?.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="overflow-hidden rounded-md border border-white/10 group cursor-zoom-in focus-ring"
              >
                <img
                  src={img.image_url}
                  alt="IEI Kochi activity"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => (e.currentTarget.src = '/logo.png')}
                />
              </button>
            ))}
        </div>
      </div>

      {lightboxIndex !== null && gallery?.[lightboxIndex] && (
        <div
          role="button"
          tabIndex={0}
          onClick={close}
          onKeyDown={(e) => e.key === 'Enter' && close()}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 cursor-zoom-out"
        >
          <img
            src={gallery[lightboxIndex].image_url}
            alt="IEI Kochi activity enlarged"
            className="max-w-[92vw] max-h-[88vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 text-white/80 hover:text-white text-3xl leading-none focus-ring"
          >
            &times;
          </button>

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl leading-none focus-ring"
              >
                &#8249;
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photo"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl leading-none focus-ring"
              >
                &#8250;
              </button>
            </>
          )}
        </div>
      )}
    </section>
  );
}