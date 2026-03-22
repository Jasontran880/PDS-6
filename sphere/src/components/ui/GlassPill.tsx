import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  active?: boolean
  /** Stronger glow (e.g. CREATE HANGOUT) */
  glow?: boolean
}

export function GlassPill({
  children,
  className = '',
  active,
  glow,
  type = 'button',
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={[
        'font-pixel cursor-pointer rounded-full border border-white/50 px-4 py-2 text-xs tracking-wide text-white uppercase',
        'backdrop-blur-[var(--sphere-blur-md)] transition-transform duration-200',
        active
          ? 'bg-[var(--sphere-glass-pill-active)] shadow-[0_0_20px_rgba(255,255,255,0.22)]'
          : 'bg-[var(--sphere-glass-pill)] hover:bg-[var(--sphere-glass-pill-hover)] hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]',
        glow ? 'shadow-[0_0_24px_rgba(255,255,255,0.28)]' : '',
        'active:scale-[0.98]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  )
}
