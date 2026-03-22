import type { ReactNode } from 'react'
import { assetUrl } from '@/lib/paths'

type Props = {
  children: ReactNode
  className?: string
  /** Use large outline frame asset */
  large?: boolean
}

export function GlassPanel({ children, className = '', large = false }: Props) {
  const frame = large ? assetUrl.largeOutline : assetUrl.outline
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-[var(--sphere-radius-panel)] opacity-90"
        style={{
          borderStyle: 'solid',
          borderWidth: 'clamp(12px, 2vw, 24px)',
          borderImageSource: `url("${frame}")`,
          borderImageSlice: large ? '80 fill' : '60 fill',
          borderImageWidth: large ? '24px' : '18px',
          borderImageRepeat: 'stretch',
        }}
      />
      <div
        className="relative rounded-[var(--sphere-radius-panel)] px-5 py-6 backdrop-blur-[var(--sphere-blur-lg)] sm:px-8 sm:py-8"
        style={{
          background: 'var(--sphere-glass-bg)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.14), 0 8px 32px rgba(10, 25, 50, 0.35)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
