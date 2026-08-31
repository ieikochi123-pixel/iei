import { useEffect, useState } from 'react'
import { bookingSupabase } from '../lib/bookingSupabaseClient'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../lib/AuthContext'

const STATUS_STYLES = {
  Pending: 'bg-amber-100 text-amber-800',
  Approved: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
  Cancelled: 'bg-gray-200 text-gray-700',
}

const CONTENT_TABLES = {
  notices: [
    { name: 'title', label: 'Title' },
    { name: 'file_url', label: 'File / Image URL' },
  ],
  events: [
    { name: 'title', label: 'Title' },
    { name: 'venue', label: 'Venue' },
  ],
  committee: [
    { name: 'name', label: 'Name' },
    { name: 'designation', label: 'Designation' },
    { name: 'photo_url', label: 'Photo URL' },
  ],
  gallery: [
    { name: 'image_url', label: 'Image URL' },
  ],
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-md border-t-4 border-[var(--color-brass)] shadow-sm p-5">
      <h3 className="text-xs font-mono uppercase tracking-wide text-[var(--color-ink-soft)]">{label}</h3>
      <p className="text-3xl font-bold text-[var(--color-navy)] mt-2">{value}</p>
    </div>
  )
}

function ContentForm({ table, fields, onAdded }) {
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.name, ''])))
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setMsg('')
    const { error } = await supabase.from(table).insert([values])
    setBusy(false)
    if (error) {
      setMsg(error.message)
      return
    }
    setMsg('Added.')
    setValues(Object.fromEntries(fields.map((f) => [f.name, ''])))
    onAdded?.()
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-md border border-[var(--color-paper-line)] p-5 space-y-3">
      <h4 className="font-mono text-xs uppercase tracking-wide text-[var(--color-ink-soft)]">{table}</h4>
      {fields.map((f) => (
        <input
          key={f.name}
          required
          placeholder={f.label}
          value={values[f.name]}
          onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
          className="w-full border border-[var(--color-paper-line)] rounded px-3 py-2 text-sm focus-ring"
        />
      ))}
      <button
        type="submit"
        disabled={busy}
        className="w-full bg-[var(--color-navy)] text-white text-sm font-semibold py-2 rounded hover:bg-[var(--color-navy-soft)] transition disabled:opacity-60"
      >
        {busy ? 'Adding\u2026' : `Add to ${table}`}
      </button>
      {msg && <p className="text-xs text-[var(--color-ink-soft)]">{msg}</p>}
    </form>
  )
}

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadBookings() {
    setLoading(true)
    const { data, error } = await bookingSupabase
      .from('bookings')
      .select('*')
      .order('id', { ascending: false })
    if (error) setError(error.message)
    else setBookings(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    loadBookings()
  }, [])

  async function updateStatus(id, status) {
    const { error } = await bookingSupabase.from('bookings').update({ status }).eq('id', id)
    if (error) return setError(error.message)
    loadBookings()
  }

  async function deleteBooking(id) {
    if (!window.confirm('Delete this booking permanently?')) return
    const { error } = await bookingSupabase.from('bookings').delete().eq('id', id)
    if (error) return setError(error.message)
    loadBookings()
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'Pending').length,
    approved: bookings.filter((b) => b.status === 'Approved').length,
    rejected: bookings.filter((b) => b.status === 'Rejected').length,
  }

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] py-10 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h1 className="font-[var(--font-display)] text-2xl md:text-3xl text-[var(--color-navy)]">
              IEI Booking Administration Dashboard
            </h1>
            <div className="mx-auto mt-3 h-1 w-16 bg-[var(--color-brass)]" />
          </div>
          <button
            onClick={signOut}
            className="text-sm font-semibold text-[var(--color-navy)] border border-[var(--color-navy)] px-4 py-2 rounded hover:bg-[var(--color-navy)] hover:text-white transition"
          >
            Sign Out
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={loadBookings}
            className="bg-[var(--color-brass)] text-[var(--color-navy)] font-semibold text-sm px-4 py-2 rounded hover:brightness-95 transition"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          <StatCard label="Total Bookings" value={stats.total} />
          <StatCard label="Pending" value={stats.pending} />
          <StatCard label="Approved" value={stats.approved} />
          <StatCard label="Rejected" value={stats.rejected} />
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="bg-white rounded-md shadow-sm border-t-4 border-[var(--color-brass)] p-5 overflow-x-auto mb-12">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-[var(--color-navy)] text-white">
                {['Ref', 'Facility', 'Name', 'Contact', 'Dates', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left py-3 px-3 font-mono text-xs uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-[var(--color-ink-soft)]">
                    Loading bookings\u2026
                  </td>
                </tr>
              )}
              {!loading && bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-[var(--color-ink-soft)]">
                    No bookings yet.
                  </td>
                </tr>
              )}
              {!loading &&
                bookings.map((b) => (
                  <tr key={b.id} className="border-b border-[var(--color-paper-line)] hover:bg-[var(--color-paper)]">
                    <td className="py-3 px-3 font-mono text-xs">{b.booking_ref}</td>
                    <td className="py-3 px-3">{b.facility}</td>
                    <td className="py-3 px-3">
                      {b.name}
                      {b.membership_id && (
                        <div className="text-xs text-[var(--color-ink-soft)]">{b.membership_id}</div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-xs">
                      {b.phone}
                      <div className="text-[var(--color-ink-soft)]">{b.email}</div>
                    </td>
                    <td className="py-3 px-3 text-xs whitespace-nowrap">
                      {b.booking_date || `${b.start_date} \u2192 ${b.end_date}`}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[b.status] ?? 'bg-gray-100 text-gray-700'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap space-x-1">
                      <button
                        onClick={() => updateStatus(b.id, 'Approved')}
                        className="bg-green-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, 'Rejected')}
                        className="bg-red-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => deleteBooking(b.id)}
                        className="bg-gray-600 text-white text-xs font-semibold px-2.5 py-1.5 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-[var(--font-display)] text-2xl text-[var(--color-navy)] text-center mb-6">
          Manage Site Content
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(CONTENT_TABLES).map(([table, fields]) => (
            <ContentForm key={table} table={table} fields={fields} />
          ))}
        </div>
      </div>
    </div>
  )
}
