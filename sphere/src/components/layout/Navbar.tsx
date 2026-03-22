import { NavLink } from 'react-router-dom'
import { assetUrl } from '@/lib/paths'

const tabs = [
  { to: '/social', label: 'Home' },
  { to: '/innersphere', label: 'Innersphere' },
  { to: '/explore', label: 'Explore' },
  { to: '/blog', label: 'Blog' },
  { to: '/profile', label: 'Profile' },
] as const

export function Navbar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/35 bg-[var(--sphere-glass-nav)] px-2 py-2 backdrop-blur-xl"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-4xl items-center justify-around gap-1">
        {tabs.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/profile'}
            className={({ isActive }) =>
              [
                'flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl px-1 py-2 text-[9px] uppercase tracking-wide transition',
                'sm:text-[10px]',
                isActive
                  ? 'bg-[var(--sphere-glass-nav-active)] text-white shadow-[0_0_16px_rgba(255,255,255,0.2)]'
                  : 'text-white/85 hover:bg-[var(--sphere-glass-nav-hover)] hover:text-white',
              ].join(' ')
            }
            style={{ fontFamily: "'Retro Pixel', monospace" }}
          >
            <img src={assetUrl.arrow} alt="" className="mb-0.5 h-3 w-3 opacity-70" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
