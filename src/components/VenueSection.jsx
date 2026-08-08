import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'

export default function VenueSection() {
  return (
    <section id="Venue" className="content-section py-20 px-5 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <SectionHeading eyebrow="Facilities" title="Venue Booking" />
        <div className="border-2 border-[var(--color-safety)] rounded-md p-8 bg-white/5">
          <h3 className="font-[var(--font-display)] text-xl text-white leading-relaxed">
            IEI Kochi offers a Conference Hall, Aban Hall, Classrooms, and Guest Rooms
            <span className="text-white/50 text-base"> (guest rooms for IEI members only)</span>
          </h3>
          <Link
            to="/booking"
            className="inline-block mt-6 bg-[var(--color-safety)] text-white font-semibold px-6 py-3 rounded-sm hover:brightness-110 transition"
          >
            Enter Venue Booking Portal
          </Link>
        </div>
      </div>
    </section>
  )
}
