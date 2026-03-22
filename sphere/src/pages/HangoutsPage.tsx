import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { assetUrl, carouselImageAt } from '@/lib/paths'
import { DragonBackButton } from '@/components/ui/DragonBackButton'
import { GlassPill } from '@/components/ui/GlassPill'
import { HangoutCard } from '@/components/ui/HangoutCard'
import { SplitHeading } from '@/components/ui/SplitHeading'

const categories = [
  'ALL',
  'MINECRAFT',
  'COACHELLA',
  'BEACH',
  'LA',
  'ROBLOX',
  'FORTNITE',
  'MOVIES',
  'MUSICALLY',
] as const

const upcomingMock = [
  {
    title: 'Beach bonfire',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.',
    usernames: ['Skyler', 'River'] as [string, string],
  },
  {
    title: 'Coachella prep',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.',
    usernames: ['Morgan', 'Casey'] as [string, string],
  },
  {
    title: 'Minecraft build night',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor.',
    usernames: ['Jordan', 'Taylor'] as [string, string],
  },
  {
    title: 'LA food crawl',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat.',
    usernames: ['Riley', 'Quinn'] as [string, string],
  },
  {
    title: 'Movie marathon',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem.',
    usernames: ['Avery', 'Parker'] as [string, string],
  },
]

const recentMock = [
  { title: 'Sunset hike', date: 'Mar 12, 2026', usernames: ['Jamie', 'Sam'] as [string, string] },
  { title: 'Arcade night', date: 'Mar 8, 2026', usernames: ['Alex', 'Rio'] as [string, string] },
  { title: 'Thrift haul', date: 'Mar 1, 2026', usernames: ['Blake', 'Noa'] as [string, string] },
  { title: 'Park picnic', date: 'Feb 24, 2026', usernames: ['Eden', 'Lou'] as [string, string] },
  { title: 'Karaoke', date: 'Feb 18, 2026', usernames: ['Kim', 'Pat'] as [string, string] },
  { title: 'Museum day', date: 'Feb 10, 2026', usernames: ['Jules', 'Max'] as [string, string] },
]

function RecentCardLazy(props: (typeof recentMock)[0] & { description: string; coverImage: string }) {
  const ref = useRef(null)
  const visible = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}}>
      <HangoutCard
        variant="recent"
        title={props.title}
        date={props.date}
        description={props.description}
        usernames={props.usernames}
        coverImage={props.coverImage}
      />
    </motion.div>
  )
}

export function HangoutsPage() {
  const [cat, setCat] = useState<string>('ALL')
  const recentDescriptions = useMemo(
    () =>
      recentMock.map((r) => ({
        ...r,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pariatur excepteur sint occaecat cupidatat non proident.',
      })),
    [],
  )

  return (
    <div className="relative min-h-svh w-full">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[45%] bg-gradient-to-b from-sky-400/35 to-transparent"
        aria-hidden
      />
      <div className="page-enter relative z-10 px-4 pb-36 pt-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <SplitHeading text="Upcoming Hangouts" as="h1" className="text-2xl sm:text-4xl" />
          <GlassPill glow className="shrink-0">
            CREATE HANGOUT
          </GlassPill>
        </div>

        <div className="mb-6 -mx-2 overflow-x-auto pb-2">
          <div className="flex min-w-min gap-2 px-2">
            {categories.map((c) => (
              <GlassPill key={c} active={cat === c} onClick={() => setCat(c)}>
                {c}
              </GlassPill>
            ))}
          </div>
        </div>

        <div className="mb-4 flex gap-4 overflow-x-auto pb-4">
          {upcomingMock.map((h, i) => (
            <HangoutCard key={h.title} variant="upcoming" {...h} coverImage={carouselImageAt(i)} />
          ))}
        </div>

        <img src={assetUrl.divider} alt="" className="mx-auto mb-10 max-w-full opacity-80" />

        <section className="relative rounded-t-[2rem] bg-gradient-to-b from-[var(--sphere-glass-section-t)] to-[var(--sphere-glass-section-b)] px-2 py-10 pb-24 backdrop-blur-md">
          <h2 className="sr-only">Recent Hangouts</h2>
          <div className="mx-auto flex max-w-lg flex-col gap-8">
            {recentDescriptions.map((r, i) => (
              <RecentCardLazy key={r.title} {...r} coverImage={carouselImageAt(i + upcomingMock.length)} />
            ))}
          </div>
        </section>
      </div>
      <DragonBackButton to="/innersphere" />
    </div>
  )
}
