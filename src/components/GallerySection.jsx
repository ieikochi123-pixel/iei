import SectionHeading from './SectionHeading'

export default function GallerySection({ gallery, loading }) {
  return (
    <section id="gallery" className="content-section py-20 px-5 md:px-8 bg-[var(--color-navy-deep)]/40">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Moments" title="Gallery" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {loading && <p className="text-white/50 font-mono text-sm col-span-full">Loading gallery\u2026</p>}
          {!loading && (!gallery || gallery.length === 0) && (
            <p className="text-white/50 font-mono text-sm col-span-full">Gallery photos coming soon.</p>
          )}
          {!loading &&
            gallery?.map((img) => (
              <div key={img.id} className="overflow-hidden rounded-md border border-white/10 group">
                <img
                  src={img.image_url}
                  alt="IEI Kochi activity"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => (e.currentTarget.src = '/logo.png')}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
