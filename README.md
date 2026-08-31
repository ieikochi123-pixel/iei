# IE(I) Kochi Local Centre — React rebuild

A full React rebuild of the IE(I) Kochi Local Centre site: home page, the 39th
National Convention portal, venue booking, and an admin dashboard — talking
**directly to Supabase** from the browser (no Node/Express backend required).

## Stack

- React 19 + React Router (Vite)
- Tailwind CSS v4
- `@supabase/supabase-js` (two clients: content DB + booking DB)
- Supabase Auth for the admin login (replaces the old hardcoded
  `admin` / `1234` check — see "Security note" below)

## 1. Configure environment variables

```
cp .env.example .env
```

Fill in your Supabase project URL and **anon/public** key (never the service
role key — that must never ship to the browser):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_BOOKING_SUPABASE_URL=...
VITE_BOOKING_SUPABASE_ANON_KEY=...
```

If bookings and content live in the same Supabase project, you can point both
pairs of variables at the same project — the two clients still work fine.

## 2. Database schema (unchanged from the original)

**Content project**, tables: `notices`, `events`, `committee`, `gallery` —
same columns the old Express API expected (`title`/`file_url`,
`title`/`venue`, `name`/`designation`/`photo_url`, `image_url`).

**Booking project**, table `bookings` with columns: `id`, `booking_ref`,
`facility`, `name`, `email`, `phone`, `membership_id`, `booking_date`,
`start_date`, `end_date`, `duration`, `status`.

## 3. Row Level Security (RLS) — required

Because the app now talks to Supabase directly instead of through a trusted
backend, RLS policies decide what the anon key is allowed to do. Suggested
policies (run in the Supabase SQL editor for each project):

```sql
-- Content DB: anyone can read, only authenticated admins can write
alter table notices enable row level security;
alter table events enable row level security;
alter table committee enable row level security;
alter table gallery enable row level security;

create policy "public read" on notices for select using (true);
create policy "public read" on events for select using (true);
create policy "public read" on committee for select using (true);
create policy "public read" on gallery for select using (true);

create policy "admin write" on notices for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write" on events for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write" on committee for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write" on gallery for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Booking DB: anyone can create a booking and read availability;
-- only authenticated admins can approve/reject/delete
alter table bookings enable row level security;

create policy "public read" on bookings for select using (true);
create policy "public insert" on bookings for insert with check (true);
create policy "admin update" on bookings for update
  using (auth.role() = 'authenticated');
create policy "admin delete" on bookings for delete
  using (auth.role() = 'authenticated');
```

> If your two "projects" are actually the same Supabase project, the booking
> auth check uses the *same* Supabase Auth users as the content DB — which is
> what you want, since admins log in once for everything.

## 4. Create an admin user

The admin dashboard now uses real Supabase Auth instead of a hardcoded
password. In your Supabase dashboard: **Authentication → Users → Add user**,
create an email/password login for each admin. They can then sign in at
`/admin-login`.

## 5. Run it

```
npm install
npm run dev
```

Build for deployment (Vercel, Netlify, Cloudflare Pages — any static host
works since there's no backend to run):

```
npm run build
```

## What changed vs. the original site

- **Architecture**: dropped the Express server; React talks to Supabase
  directly via the JS client, secured with RLS instead of a trusted backend.
- **Admin login**: hardcoded `admin`/`1234` replaced with real Supabase Auth.
- **Design**: redesigned with a "technical drafting" visual language (deep
  blueprint navy, brass/cyan accents, Fraunces + IBM Plex type) instead of the
  original palette, per your request to modernize while keeping the same
  content and features.
- **Booking logic**: the 6-rooms-per-date availability/overlap rules from
  `backend/routes/bookings.js` are ported as-is into `src/lib/bookingLogic.js`
  and run client-side before the insert.
- **Not carried over in this pass**: the admin dashboard's visual month
  calendar and the email notification on new bookings (both backend-
  dependent). Happy to add a Supabase Edge Function for email notifications
  and a calendar widget as a follow-up if useful.
