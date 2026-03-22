import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { musicUrl, type MusicTrackKey } from '@/lib/paths'

const DEFAULT_VOLUME = 0.32

/**
 * Maps route to ambient track (no restart when switching between routes that share the same track).
 * - Closer: lander, explore, title cards
 * - Last Friday Night: social circle, friend profiles, hangouts
 * - House of Memories: blog, own profile
 */
function musicTrackForPath(pathname: string): MusicTrackKey {
  if (pathname === '/' || pathname === '/explore') return 'closer'
  if (pathname === '/outersphere' || pathname === '/innersphere') return 'closer'
  if (pathname === '/social' || /^\/profile\/view\//.test(pathname)) return 'lastFriday'
  if (pathname.startsWith('/blog') || pathname === '/profile') return 'house'
  if (pathname === '/hangouts') return 'lastFriday'
  if (pathname.startsWith('/dev')) return 'closer'
  return 'closer'
}

export function SphereAmbientMusic() {
  const { pathname } = useLocation()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const trackRef = useRef<MusicTrackKey | null>(null)

  // Unlock playback after first user gesture (autoplay policies)
  useEffect(() => {
    const unlock = () => {
      const el = audioRef.current
      if (!el || el.paused === false) return
      el.play().catch(() => {})
    }
    window.addEventListener('pointerdown', unlock, { passive: true })
    window.addEventListener('keydown', unlock, { passive: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  useEffect(() => {
    const key = musicTrackForPath(pathname)
    const el = audioRef.current
    if (!el) return

    if (trackRef.current === key) {
      el.play().catch(() => {})
      return
    }

    trackRef.current = key
    el.pause()
    el.src = musicUrl[key]
    el.volume = DEFAULT_VOLUME
    el.loop = true
    el.load()
    el.play().catch(() => {})
  }, [pathname])

  return (
    <audio
      ref={audioRef}
      className="pointer-events-none fixed left-0 top-0 h-0 w-0 opacity-0"
      aria-hidden
      playsInline
      preload="auto"
    />
  )
}
