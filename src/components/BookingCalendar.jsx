import { useEffect, useMemo, useState } from 'react'
import { bookingSupabase } from '../lib/bookingSupabaseClient'
import { TOTAL_ROOMS } from '../data/facilities'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function toISODate(date) {
  return date.toISOString().split('T')[0]
}

export default function BookingCalendar({ facilityDisplayName, value, onChange }) {
  const today = useMemo(() => new Date(), [])
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [dayStatus, setDayStatus] = useState({})
  const [loading, setLoading] = useState(false)

  // Reset the view and clear any selected date whenever the facility changes
  useEffect(() => {
    setViewYear(today.getFullYear())
    setViewMonth(today.getMonth())
    onChange('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilityDisplayName])

  useEffect(() => {
    if (!facilityDisplayName) return
    let cancelled = false

    async function load() {
      setLoading(true)
      const { data, error } = await bookingSupabase
        .from('bookings')
        .select('booking_date, status')
        .eq('facility', facilityDisplayName)
        .not('status', 'in', '("Cancelled","Rejected")')
        .not('booking_date', 'is', null)

      if (!cancelled) {
        if (!error && data) {
          const counts = {}
          const hasPending = {}
          data.forEach((b) => {
            counts[b.booking_date] = (counts[b.booking_date] || 0) + 1
            if (b.status === 'Pending') hasPending[b.booking_date] = true
          })
          const next = {}
          Object.keys(counts).forEach((d) => {
            next[d] = counts[d] >= TOTAL_ROOMS ? 'full' : hasPending[d] ? 'pending' : 'busy'
          })
          setDayStatus(next)
        }
        setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [facilityDisplayName])

  const monthsAhead = (viewYear - today.getFullYear()) * 12 + (viewMonth - today.getMonth())

  function changeMonth(delta) {
    let m = viewMonth + delta
    let y = viewYear
    if (m > 11) {
      m = 0
      y += 1
    } else if (m < 0) {
      m = 11
      y -= 1
    }
    const ahead = (y - today.getFullYear()) * 12 + (m - today.getMonth())
    if (ahead < 0 || ahead > 24) return
    setViewMonth(m)
    setViewYear(y)
  }

  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay()
  const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate()
  const todayISO = toISODate(today)

  const cells = []
  for (let i = 0; i < firstDayIndex; i += 1) cells.push(null)
  for (let d = 1; d <= totalDays; d += 1) cells.push(d)

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={monthsAhead <= 0}
          className="bg-[var(--color-navy)] text-white text-xs font-bold w-7 h-7 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &#10094;
        </button>
        <span className="text-sm font-semibold text-[var(--color-navy)]">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          disabled={monthsAhead >= 24}
          className="bg-[var(--color-navy)] text-white text-xs font-bold w-7 h-7 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &#10095;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 bg-[var(--color-paper)] border border-[var(--color-paper-line)] rounded p-2 text-center">
        {DAY_HEADERS.map((d) => (
          <div key={d} className="text-[10px] font-bold text-[var(--color-ink-soft)] pb-1">
            {d}
          </div>
        ))}

        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />

          const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isPast = iso < todayISO
          const status = dayStatus[iso]
          const isSelected = value === iso
          const disabled = isPast || status === 'full'

          let classes = 'text-xs font-semibold rounded py-1.5 border transition-colors '
          if (isSelected) {
            classes += 'bg-[var(--color-navy)] text-white border-[var(--color-navy)]'
          } else if (isPast) {
            classes += 'bg-[var(--color-paper-line)]/40 text-[var(--color-ink-soft)]/50 border-transparent cursor-not-allowed'
          } else if (status === 'full') {
            classes += 'bg-red-50 text-red-700 border-red-100 cursor-not-allowed'
          } else if (status === 'pending') {
            classes += 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100 cursor-pointer'
          } else {
            classes += 'bg-green-50 text-green-700 border-green-100 hover:bg-green-100 cursor-pointer'
          }

          return (
            <button
              type="button"
              key={iso}
              disabled={disabled}
              onClick={() => onChange(iso)}
              className={classes}
            >
              {day}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-4 mt-2 text-[11px] text-[var(--color-ink-soft)]">
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-green-100 border border-green-300" /> Available
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-100 border border-amber-300" /> Pending
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-100 border border-red-300" /> Full
        </span>
      </div>

      {loading && <p className="text-[11px] text-[var(--color-ink-soft)] mt-1">Checking availability&hellip;</p>}
    </div>
  )
}