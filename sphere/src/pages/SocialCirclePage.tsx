import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { assetUrl } from '@/lib/paths'
import { AvatarBubble, type FaceId } from '@/components/ui/AvatarBubble'
import { DragonBackButton } from '@/components/ui/DragonBackButton'
import { GlassPill } from '@/components/ui/GlassPill'
import { SplitHeading } from '@/components/ui/SplitHeading'

type Friend = {
  id: string
  label: string
  x: string
  y: string
  tint: string
  face: FaceId
  score: number
}

const friends: Friend[] = [
  { id: '1', label: 'friend #1', x: '18%', y: '38%', tint: '#ff9ec8', face: 1, score: 10 },
  { id: '2', label: 'friend #2', x: '42%', y: '32%', tint: '#7eb8ff', face: 2, score: 9 },
  { id: '3', label: 'friend #3', x: '62%', y: '40%', tint: '#c9a8ff', face: 3, score: 8 },
  { id: '4', label: 'friend #4', x: '28%', y: '52%', tint: '#ffb87e', face: 4, score: 7 },
  { id: '5', label: 'friend #5', x: '55%', y: '55%', tint: '#7dffb0', face: 5, score: 6 },
  { id: '6', label: 'friend #6', x: '75%', y: '48%', tint: '#ff9ec8', face: 1, score: 5 },
  { id: '7', label: 'friend #7', x: '12%', y: '58%', tint: '#7eb8ff', face: 2, score: 4 },
  { id: '8', label: 'friend #8', x: '85%', y: '58%', tint: '#c9a8ff', face: 3, score: 3 },
  { id: '9', label: 'friend #9', x: '35%', y: '68%', tint: '#ff9ec8', face: 4, score: 2 },
  { id: '10', label: 'friend #10', x: '68%', y: '68%', tint: '#7eb8ff', face: 5, score: 1 },
  { id: '11', label: 'friend #11', x: '8%', y: '72%', tint: '#7dffb0', face: 1, score: 1 },
  { id: '12', label: 'friend #12', x: '92%', y: '72%', tint: '#ffb87e', face: 2, score: 1 },
]

export function SocialCirclePage() {
  const navigate = useNavigate()
  return (
    <div className="page-enter relative min-h-svh w-full pb-28 pt-6">
      <img
        src={assetUrl.palmTreeLeft}
        alt=""
        className="pointer-events-none fixed left-0 top-[12%] z-[5] w-[min(28vw,200px)] opacity-95"
      />
      <img
        src={assetUrl.palmTreeRight}
        alt=""
        className="pointer-events-none fixed right-0 top-[14%] z-[5] w-[min(28vw,200px)] opacity-95"
      />

      <header className="relative z-10 px-6 pb-4">
        <SplitHeading text="Outersphere" as="h1" className="text-3xl sm:text-4xl" />
        <p
          className="mt-2 max-w-xl text-sm font-medium uppercase tracking-wide text-white/95"
          style={{ fontFamily: "'Agrandir', sans-serif", textShadow: 'var(--sphere-glow-heading)' }}
        >
          YOU&apos;RE GROUNDED BY THE PEOPLE AROUND YOU
        </p>
      </header>

      <div className="absolute right-4 top-6 z-20 flex flex-col items-end gap-2 sm:right-8">
        <GlassPill className="text-[9px] sm:text-[10px]">NUMBER OF FRIENDS [12]</GlassPill>
        <GlassPill className="text-[9px] sm:text-[10px]">DAYS SINCE LAST HANGOUT [3]</GlassPill>
      </div>

      <div className="absolute bottom-24 right-6 z-20 sm:bottom-28 sm:right-10">
        <GlassPill>ADD FRIEND</GlassPill>
      </div>

      <div className="relative mx-auto min-h-[55vh] w-full max-w-6xl px-4">
        {friends.map((f, i) => (
          <motion.div
            key={f.id}
            role="button"
            tabIndex={0}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -4, 0],
            }}
            transition={{
              opacity: { delay: i * 0.04 },
              y: { repeat: Infinity, duration: 2.5 + i * 0.1, ease: 'easeInOut' },
            }}
            whileHover={{ scale: 1.12, filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.9))' }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{ left: f.x, top: f.y }}
            onClick={() => navigate(`/profile/view/${f.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                navigate(`/profile/view/${f.id}`)
              }
            }}
            aria-label={f.label}
          >
            <AvatarBubble bodyTint={f.tint} face={f.face} size="sm" label={f.label} />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ y: { repeat: Infinity, duration: 3.2, ease: 'easeInOut' } }}
          className="absolute bottom-[8%] left-[10%] z-20 sm:left-[14%]"
        >
          <div className="relative">
            <span
              className="pointer-events-none absolute -top-3 left-1/2 z-40 -translate-x-1/2 text-2xl drop-shadow-md"
              aria-hidden
            >
              🌸🌸
            </span>
            <AvatarBubble bodyTint="#7dffb0" face={1} size="lg" label="YOU" />
          </div>
        </motion.div>
      </div>

      <DragonBackButton to="/outersphere" />
    </div>
  )
}
