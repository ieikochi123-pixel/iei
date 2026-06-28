require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const bookingSupabase = createClient(
    process.env.BOOKING_SUPABASE_URL,
    process.env.BOOKING_SUPABASE_KEY
);

module.exports = bookingSupabase;