import type { ReactNode } from 'react'
import { assetUrl } from '@/lib/paths'

type Props = {
  children: ReactNode
  /** Slightly bluer sky (Upcoming Hangouts) */
  variant?: 'default' | 'skyHeavy'
  /** Lighter lower area for Recent feed section */
  lowerWash?: 'none' | 'light'
}

export function Background({ children, variant = 'default', lowerWash = 'none' }: Props) {
  return (
    <div className="relative min-h-svh w-full overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background:
            variant === 'skyHeavy'
              ? 'linear-gradient(180deg, #6bb8e8 0%, #9fd4f5 35%, #c8e2f8 60%, #dbeef9 85%, #c5e8c8 100%)'
              : 'linear-gradient(180deg, #7ec8f0 0%, #b8daf8 28%, #e8d8f0 55%, #c8e6c9 88%, #a8d4a0 100%)',
        }}
      />
      {variant === 'default' && (
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 120% 60% at 20% 25%, rgba(255, 230, 245, 0.85) 0%, transparent 55%), radial-gradient(ellipse 100% 50% at 75% 20%, rgba(255, 248, 252, 0.75) 0%, transparent 50%)',
          }}
        />
      )}
      {lowerWash === 'light' && (
        <div
          className="pointer-events-none fixed inset-x-0 bottom-0 top-1/3 -z-[9] bg-gradient-to-b from-transparent via-white/35 to-white/55"
          aria-hidden
        />
      )}
      <img
        src={assetUrl.grassOverlay}
        alt=""
        className="pointer-events-none fixed bottom-0 left-0 right-0 -z-[8] w-full max-h-[42vh] object-cover object-bottom select-none"
      />
      <div className="relative z-10 min-h-svh w-full">{children}</div>
    </div>
  )
}
