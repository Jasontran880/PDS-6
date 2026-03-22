import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { assetUrl } from '@/lib/paths'
import { SplitHeading } from '@/components/ui/SplitHeading'

type Props = {
  title: string
  nextTo: string
}

export function SphereTitleCard({ title, nextTo }: Props) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => navigate(nextTo)}
      className="page-enter flex min-h-svh w-full cursor-pointer flex-col items-center justify-end border-0 bg-transparent px-6 pb-[min(22vh,12rem)] pt-24"
      aria-label={`Continue to ${nextTo}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="relative flex w-full max-w-xl flex-col items-center"
      >
        <img
          src={assetUrl.sphere}
          alt=""
          className="relative z-10 w-[min(72vw,420px)] max-w-full object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
        />
        <div
          className="pointer-events-none absolute inset-0 top-[18%] z-20 flex items-start justify-center"
          style={{
            mixBlendMode: 'soft-light',
            background:
              'radial-gradient(circle at 50% 40%, rgba(255,200,255,0.25) 0%, transparent 55%)',
          }}
        />
        <div className="absolute inset-x-0 top-[28%] z-30 flex justify-center">
          <SplitHeading
            text={title}
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl"
            firstClassName="text-5xl sm:text-6xl md:text-7xl"
          />
        </div>
      </motion.div>
      <p
        className="mt-6 font-pixel text-[10px] uppercase tracking-widest text-white/60"
        style={{ fontFamily: "'Retro Pixel', monospace" }}
      >
        Tap bubble to continue
      </p>
    </button>
  )
}
