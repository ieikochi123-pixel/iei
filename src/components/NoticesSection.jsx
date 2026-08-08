import SectionHeading from './SectionHeading'

function isImage(url) {
  return !!url && /\.(jpe?g|png|gif|webp)$/i.test(url)
}

export default function NoticesSection({ notices, loading }) {
  return (
    <section id="notices" className="content-section py-20 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Bulletin" title="Notices" />
        <div className="border-l-4 border-[var(--color-brass)] bg-white/5 rounded-r-md max-h-64 overflow-y-auto p-5">
          {loading && <p className="text-white/50 font-mono text-sm">Loading latest notices\u2026</p>}
          {!loading && (!notices || notices.length === 0) && (
            <p className="text-white/50 font-mono text-sm">No current notices.</p>
          )}
          {!loading &&
            notices?.map((n) => (
              <div key={n.id} className="mb-4 pb-3 border-b border-white/10 last:border-0 last:mb-0 last:pb-0">
                <p className="text-white/90">&#9657; {n.title}</p>
                {isImage(n.file_url) ? (
                  <img
                    src={n.file_url}
                    alt={n.title}
                    className="mt-2 max-w-full rounded"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                ) : n.file_url ? (
                  <a
                    href={n.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--color-brass-light)] text-sm hover:underline"
                  >
                    View details
                  </a>
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
