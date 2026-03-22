import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { assetUrl } from '@/lib/paths'
import { SplitHeading } from '@/components/ui/SplitHeading'

type Props = {
  title: string
  nextTo: string
  /** Place the bubble + title block in the vertical center of the viewport */
  centered?: boolean
}

export function SphereTitleCard({ title, nextTo, centered = false }: Props) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => navigate(nextTo)}
      className={[
        'page-enter flex min-h-svh w-full cursor-pointer flex-col items-center border-0 bg-transparent px-6',
        centered ? 'justify-center py-10' : 'justify-end pb-[min(22vh,12rem)] pt-24',
      ].join(' ')}
      aria-label={`Continue to ${nextTo}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="relative flex w-full max-w-xl flex-col items-center"
      >
        <div className="relative mb-4 w-[min(72vw,420px)] max-w-full">
          <img
            src={assetUrl.sphere}
            alt=""
            className="relative z-10 w-full object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          />
          <div
            className="pointer-events-none absolute inset-0 z-[15] rounded-[50%]"
            style={{
              mixBlendMode: 'soft-light',
              background:
                'radial-gradient(circle at 50% 45%, rgba(255,200,255,0.25) 0%, transparent 55%)',
            }}
          />
          <div
            className={
              centered
                ? 'absolute inset-0 z-30 flex items-center justify-center px-2'
                : 'absolute inset-x-0 top-[28%] z-30 flex justify-center px-2'
            }
          >
            <SplitHeading
              text={title}
              as="h1"
              className="text-4xl sm:text-5xl md:text-6xl"
              firstClassName="text-5xl sm:text-6xl md:text-7xl"
            />
          </div>
        </div>
      </motion.div>
      <p
        className={['font-pixel text-[10px] uppercase tracking-widest text-white/60', centered ? 'mt-4' : 'mt-6'].join(
          ' ',
        )}
        style={{ fontFamily: "'Retro Pixel', monospace" }}
      >
        Tap bubble to continue
      </p>
    </button>
  )
}
