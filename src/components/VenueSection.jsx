import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import ImageSlider from './ImageSlider'
import { FACILITIES } from '../data/facilities'

export default function VenueSection() {
  return (
    <section id="Venue" className="content-section py-20 px-5 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <SectionHeading eyebrow="Facilities" title="Venue Booking" />
        <p className="text-white/60 max-w-2xl mx-auto mt-4 mb-10">
          IEI Kochi offers a Conference Hall, Aban Hall, Classrooms, and Guest Rooms
          <span className="text-white/40"> (guest rooms for IEI members only)</span>
        </p>

        <div className="grid sm:grid-cols-2 gap-5 text-left">
          {FACILITIES.map((f) => (
            <div
              key={f.key}
              className="bg-white/5 border border-white/10 rounded-md overflow-hidden hover:border-[var(--color-brass)]/50 transition-colors"
            >
              <div className="h-40">
                <ImageSlider images={f.images} alt={f.name} />
              </div>
              <div className="p-4">
                <span
                  className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded mb-2 ${
                    f.membershipRequired
                      ? 'bg-red-700 text-white'
                      : 'bg-[var(--color-cyan)]/15 text-[var(--color-cyan)]'
                  }`}
                >
                  {f.membershipRequired ? 'IEI Members Only' : 'Open for Everyone'}
                </span>
                <h3 className="font-[var(--font-display)] text-white text-base">{f.name}</h3>
                {f.location && <p className="text-white/40 text-xs mt-0.5">{f.location}</p>}
                <p className="font-mono text-[var(--color-brass-light)] text-sm mt-2">{f.price}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/booking"
          className="inline-block mt-10 bg-[var(--color-brass)] text-[var(--color-navy-deep)] font-semibold px-6 py-3 rounded-sm hover:brightness-110 transition"
        >
          Enter Venue Booking Portal
        </Link>
      </div>
    </section>
  )
}