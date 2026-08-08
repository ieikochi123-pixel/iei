import { TOTAL_ROOMS } from '../data/facilities'

export function rangesOverlap(startA, endA, startB, endB) {
  return new Date(startA) < new Date(endB) && new Date(startB) < new Date(endA)
}

export function nightsInRange(start, end) {
  const nights = []
  const cursor = new Date(start)
  const endDate = new Date(end)
  while (cursor < endDate) {
    nights.push(cursor.toISOString().split('T')[0])
    cursor.setDate(cursor.getDate() + 1)
  }
  return nights
}

/**
 * Given the active (non-cancelled/rejected) bookings for a facility, work out
 * whether the requested booking can be accommodated under the 6-room cap.
 * Mirrors backend/routes/bookings.js so the same rules apply now that writes
 * happen directly from the browser.
 */
export function checkAvailability(existingBookings, booking) {
  if (booking.booking_date) {
    const sameDateCount = existingBookings.filter((b) => b.booking_date === booking.booking_date).length
    if (sameDateCount >= TOTAL_ROOMS) {
      return { ok: false, message: 'All rooms are fully booked for this date. IEI Kochi will contact you soon.' }
    }
    return { ok: true }
  }

  if (booking.start_date && booking.end_date) {
    if (new Date(booking.start_date) >= new Date(booking.end_date)) {
      return { ok: false, message: 'Check-out date must be after the check-in date.' }
    }

    const overlapping = existingBookings.filter((b) => {
      if (b.start_date && b.end_date) {
        return rangesOverlap(booking.start_date, booking.end_date, b.start_date, b.end_date)
      }
      if (b.booking_date) {
        return b.booking_date >= booking.start_date && b.booking_date < booking.end_date
      }
      return false
    })

    const requestedNights = nightsInRange(booking.start_date, booking.end_date)
    const fullNights = requestedNights.filter((night) => {
      const count = overlapping.filter((b) => {
        if (b.start_date && b.end_date) return night >= b.start_date && night < b.end_date
        if (b.booking_date) return b.booking_date === night
        return false
      }).length
      return count >= TOTAL_ROOMS
    })

    if (fullNights.length > 0) {
      return {
        ok: false,
        message: `All rooms are fully booked on: ${fullNights.join(', ')}. IEI Kochi will contact you soon.`,
      }
    }
    return { ok: true }
  }

  return { ok: true }
}

export function generateBookingRef() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `IEI-${stamp}-${rand}`
}
