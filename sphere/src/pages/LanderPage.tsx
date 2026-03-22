import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { SplitHeading } from '@/components/ui/SplitHeading'

export function LanderPage() {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => navigate('/outersphere')}
      className="flex min-h-svh w-full cursor-pointer flex-col items-center justify-center border-0 bg-transparent p-8 text-center"
      aria-label="Continue to Outersphere"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6"
      >
        <SplitHeading
          text="Sphere"
          as="h1"
          rowAlign="center"
          className="text-6xl sm:text-8xl md:text-9xl"
          firstClassName="leading-none text-[min(13.5rem,42vw)] sm:text-[min(24rem,48vw)] md:text-[min(30rem,52vw)]"
          restClassName="pl-1 sm:pl-2"
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="max-w-md text-lg font-bold tracking-[0.2em] text-white sm:text-xl"
          style={{
            fontFamily: "'Agrandir', sans-serif",
            textShadow: 'var(--sphere-glow-heading)',
          }}
        >
          YOUR INNER CIRCLE
        </motion.p>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="font-pixel text-[10px] uppercase tracking-widest text-white/70"
          style={{ fontFamily: "'Retro Pixel', monospace" }}
        >
          Tap anywhere to continue
        </motion.span>
      </motion.div>
    </button>
  )
}
