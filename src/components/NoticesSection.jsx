import { useState, useEffect } from 'react';

function isImage(url) {
  if (!url) return false;
  const clean = url.split('?')[0].split('#')[0];
  return /\.(jpe?g|png|gif|webp|avif)$/i.test(clean);
}

function BellIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z" strokeLinejoin="round" />
      <path d="M9.5 18a2.5 2.5 0 0 0 5 0" strokeLinecap="round" />
    </svg>
  );
}

function PaperclipIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path
        d="M8 12.5 14 6.5a3.2 3.2 0 0 1 4.5 4.5l-7 7a5 5 0 0 1-7-7l6.5-6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NoticesSection({ notices, loading }) {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <section id="notices" className="content-section py-20 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <span className="titleblock mb-3">Bulletin</span>
          <div className="flex items-center justify-center gap-3 mt-3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-electric-blue)]">
              Notices
            </h2>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-safety)] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-safety)]" />
            </span>
          </div>
        </div>

        <div className="relative rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-brass)] via-[var(--color-yellow)] to-[var(--color-brass)]" />

          <div className="notice-scroll max-h-72 overflow-y-auto p-3 md:p-4">
            {loading && (
              <p className="text-white/50 font-mono text-sm px-3 py-3">Loading latest notices&hellip;</p>
            )}
            {!loading && (!notices || notices.length === 0) && (
              <p className="text-white/50 font-mono text-sm px-3 py-3">No current notices.</p>
            )}
            {!loading &&
              notices?.map((n) => (
                <div
                  key={n.id}
                  className="group flex items-start gap-4 rounded-xl p-3.5 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="shrink-0 mt-0.5 w-10 h-10 rounded-lg bg-[var(--color-yellow)]/10 border border-[var(--color-yellow)]/30 flex items-center justify-center text-[var(--color-yellow)] group-hover:bg-[var(--color-yellow)]/15 transition-colors">
                    <BellIcon className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-white/90 leading-snug">{n.title}</p>
                    {isImage(n.file_url) ? (
                      <button
                        type="button"
                        onClick={() => setLightbox(n.file_url)}
                        className="mt-2.5 block group/thumb"
                      >
                        <img
                          src={n.file_url}
                          alt={n.title}
                          className="w-20 h-20 object-cover rounded-md border border-white/15 group-hover/thumb:border-[var(--color-yellow)] transition-colors"
                          onError={(e) => (e.currentTarget.parentElement.style.display = 'none')}
                        />
                      </button>
                    ) : n.file_url ? (
                      <a
                        href={n.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-[var(--color-yellow)] text-sm font-medium hover:brightness-110"
                      >
                        <PaperclipIcon className="w-3.5 h-3.5" />
                        Specifics
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => e.key === 'Enter' && setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 cursor-zoom-out"
        >
          <img
            src={lightbox}
            alt="Notice attachment"
            className="max-w-[92vw] max-h-[88vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-5 right-5 text-white/80 hover:text-white text-3xl leading-none focus-ring"
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
}