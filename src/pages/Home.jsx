import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Hero from '../components/Hero'
import NoticesSection from '../components/NoticesSection'
import EventsSection from '../components/EventsSection'
import AboutSection from '../components/AboutSection'
import CommitteeSection from '../components/CommitteeSection'
import VenueSection from '../components/VenueSection'
import GallerySection from '../components/GallerySection'
import ContactSection from '../components/ContactSection'

export default function Home() {
  const [content, setContent] = useState({ notices: [], events: [], committee: [], gallery: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchHomeContent() {
      try {
        const [notices, events, committee, gallery] = await Promise.all([
          supabase.from('notices').select('*'),
          supabase.from('events').select('*'),
          supabase.from('committee').select('*'),
          supabase.from('gallery').select('*'),
        ])

        const firstError =
          notices.error || events.error || committee.error || gallery.error
        if (firstError) throw firstError

        if (!cancelled) {
          setContent({
            notices: notices.data ?? [],
            events: events.data ?? [],
            committee: committee.data ?? [],
            gallery: gallery.data ?? [],
          })
        }
      } catch (err) {
        console.error('Home content fetch error:', err)
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchHomeContent()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <Hero />
      <NoticesSection notices={content.notices} loading={loading} />
      <EventsSection events={content.events} loading={loading} />
      <AboutSection />
      <CommitteeSection committee={content.committee} loading={loading} />
      <VenueSection />
      <GallerySection gallery={content.gallery} loading={loading} />
      <ContactSection />
      {error && (
        <p className="text-center text-red-300 font-mono text-xs pb-8">
          Couldn't reach the database: {error}
        </p>
      )}
    </>
  )
}
