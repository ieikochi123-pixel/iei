import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        window.scrollTo({ top: el.offsetTop - 84, behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [hash, pathname])

  return null
}
