import { useNavigate } from 'react-router-dom'
import { assetUrl } from '@/lib/paths'

type Props = {
  /** If set, navigates here instead of history back */
  to?: string
  className?: string
}

export function DragonBackButton({ to, className = '' }: Props) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => (to ? navigate(to) : navigate(-1))}
      className={[
        'font-pixel fixed bottom-4 left-4 z-50 flex items-end gap-2 rounded-full border-0 bg-transparent p-0 text-white',
        'cursor-pointer transition hover:opacity-90',
        className,
      ].join(' ')}
      aria-label="Go back"
    >
      <img src={assetUrl.backSpaceIcon} alt="" className="h-14 w-auto drop-shadow-lg sm:h-16" />
      <span
        className="mb-1 rounded-full border border-white/50 bg-[var(--sphere-glass-chip)] px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur-md"
        style={{ fontFamily: "'Retro Pixel', monospace" }}
      >
        back
      </span>
    </button>
  )
}
