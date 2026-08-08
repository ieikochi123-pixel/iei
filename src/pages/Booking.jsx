import { useState } from 'react'
import { bookingSupabase } from '../lib/bookingSupabaseClient'
import { FACILITIES, TOTAL_ROOMS } from '../data/facilities'
import { checkAvailability, generateBookingRef } from '../lib/bookingLogic'
import SectionHeading from '../components/SectionHeading'
import RoomCard from '../components/RoomCard'

const initialForm = {
  name: '',
  membershipId: '',
  phone: '',
  email: '',
  duration: '4',
  bookingDate: '',
  startDate: '',
  endDate: '',
}

export default function Booking() {
  const [selectedKey, setSelectedKey] = useState('guest')
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ state: 'idle', message: '' }) // idle | checking | submitting | success | error
  const [result, setResult] = useState(null)

  const facility = FACILITIES.find((f) => f.key === selectedKey)

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function selectFacility(key) {
    setSelectedKey(key)
    setStatus({ state: 'idle', message: '' })
    setResult(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ state: 'checking', message: 'Checking availability\u2026' })
    setResult(null)

    const booking = {
      booking_ref: generateBookingRef(),
      facility: facility.displayName,
      name: form.name,
      email: form.email,
      phone: form.phone,
      membership_id: facility.membershipRequired ? form.membershipId : null,
      booking_date: facility.dateMode === 'single' ? form.bookingDate : null,
      start_date: facility.dateMode === 'range' ? form.startDate : null,
      end_date: facility.dateMode === 'range' ? form.endDate : null,
      duration: facility.key === 'conf' ? form.duration : null,
      status: 'Pending',
    }

    if (facility.dateMode === 'single' && !booking.booking_date) {
      setStatus({ state: 'error', message: 'Please choose a date.' })
      return
    }
    if (facility.dateMode === 'range' && (!booking.start_date || !booking.end_date)) {
      setStatus({ state: 'error', message: 'Please choose check-in and check-out dates.' })
      return
    }

    try {
      const { data: existingBookings, error: fetchError } = await bookingSupabase
        .from('bookings')
        .select('id, status, booking_date, start_date, end_date')
        .eq('facility', booking.facility)
        .not('status', 'in', '("Cancelled","Rejected")')

      if (fetchError) throw fetchError

      const availability = checkAvailability(existingBookings ?? [], booking)
      if (!availability.ok) {
        setStatus({ state: 'error', message: availability.message })
        return
      }

      setStatus({ state: 'submitting', message: 'Saving your reservation\u2026' })

      const { data, error } = await bookingSupabase.from('bookings').insert([booking]).select()
      if (error) throw error

      setResult(data?.[0] ?? booking)
      setStatus({ state: 'success', message: 'Reservation request saved successfully.' })
      setForm(initialForm)
    } catch (err) {
      console.error('Booking error:', err)
      setStatus({ state: 'error', message: err.message || 'Something went wrong. Please try again.' })
    }
  }

  const isBusy = status.state === 'checking' || status.state === 'submitting'

  return (
    <div className="bg-[var(--color-paper)] text-[var(--color-ink)] min-h-screen py-16 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Facilities" title="Venue Rates & Booking" dark={false} />

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          {/* Facility listing */}
          <div className="grid sm:grid-cols-2 gap-5">
            {FACILITIES.map((f) => (
              <RoomCard key={f.key} facility={f} selected={f.key === selectedKey} onSelect={selectFacility} />
            ))}
          </div>

          {/* Reservation form */}
          <div className="bg-white rounded-md border border-[var(--color-paper-line)] p-6 shadow-sm lg:sticky lg:top-24">
            <h3 className="font-[var(--font-display)] text-xl text-[var(--color-ink)]">Reservation Setup</h3>
            <p className="text-[var(--color-ink-soft)] text-sm mt-1">
              Booking: <strong>{facility.displayName}</strong> &middot; up to {TOTAL_ROOMS} rooms/slots per date
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full border border-[var(--color-paper-line)] rounded px-3 py-2 focus-ring"
                />
              </div>

              {facility.membershipRequired && (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
                    Membership ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. AM-123456"
                    value={form.membershipId}
                    onChange={(e) => updateField('membershipId', e.target.value)}
                    className="w-full border border-[var(--color-paper-line)] rounded px-3 py-2 focus-ring"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
                    Phone
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full border border-[var(--color-paper-line)] rounded px-3 py-2 focus-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full border border-[var(--color-paper-line)] rounded px-3 py-2 focus-ring"
                  />
                </div>
              </div>

              {facility.key === 'conf' && (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
                    Conference Booking Duration
                  </label>
                  <select
                    value={form.duration}
                    onChange={(e) => updateField('duration', e.target.value)}
                    className="w-full border border-[var(--color-paper-line)] rounded px-3 py-2 focus-ring"
                  >
                    {facility.durationOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {facility.dateMode === 'single' && (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
                    Booking Date
                  </label>
                  <input
                    required
                    type="date"
                    value={form.bookingDate}
                    onChange={(e) => updateField('bookingDate', e.target.value)}
                    className="w-full border border-[var(--color-paper-line)] rounded px-3 py-2 focus-ring"
                  />
                </div>
              )}

              {facility.dateMode === 'range' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
                      Check-in
                    </label>
                    <input
                      required
                      type="date"
                      value={form.startDate}
                      onChange={(e) => updateField('startDate', e.target.value)}
                      className="w-full border border-[var(--color-paper-line)] rounded px-3 py-2 focus-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wide text-[var(--color-ink-soft)] mb-1">
                      Check-out
                    </label>
                    <input
                      required
                      type="date"
                      value={form.endDate}
                      onChange={(e) => updateField('endDate', e.target.value)}
                      className="w-full border border-[var(--color-paper-line)] rounded px-3 py-2 focus-ring"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isBusy}
                className="w-full bg-[var(--color-navy)] text-white font-semibold py-3 rounded-sm hover:bg-[var(--color-navy-soft)] transition disabled:opacity-60"
              >
                {isBusy ? status.message : 'Submit Reservation Request'}
              </button>

              {status.state === 'error' && (
                <p className="text-red-600 text-sm">{status.message}</p>
              )}
              {status.state === 'success' && result && (
                <div className="bg-green-50 border border-green-200 text-green-800 text-sm rounded p-3">
                  <p className="font-semibold">Reservation request processed successfully!</p>
                  <p className="mt-1">Facility: {result.facility}</p>
                  <p>Reference: {result.booking_ref}</p>
                  <p className="mt-1 text-xs text-green-700">
                    IEI Kochi will contact you to confirm this booking.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
