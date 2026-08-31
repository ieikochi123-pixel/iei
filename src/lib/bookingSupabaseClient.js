import { createClient } from '@supabase/supabase-js'

// Separate database dedicated to venue bookings (matches the original
// two-Supabase-project setup: content DB + booking DB)
const url = import.meta.env.VITE_BOOKING_SUPABASE_URL
const key = import.meta.env.VITE_BOOKING_SUPABASE_ANON_KEY

if (!url || !key) {
  console.warn(
    '[bookingSupabaseClient] Missing VITE_BOOKING_SUPABASE_URL / VITE_BOOKING_SUPABASE_ANON_KEY. ' +
    'Copy .env.example to .env and fill in your Supabase project credentials.'
  )
}

export const bookingSupabase = createClient(url ?? '', key ?? '')
