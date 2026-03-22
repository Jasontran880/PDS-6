import { assetUrl, carouselImageAt } from '@/lib/paths'
import { AvatarBubble } from '@/components/ui/AvatarBubble'
import { DragonBackButton } from '@/components/ui/DragonBackButton'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { GlassPill } from '@/components/ui/GlassPill'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { StarMetric } from '@/components/ui/StarMetric'
import { UsernamePill } from '@/components/ui/UsernamePill'

type Props = {
  isOwnProfile?: boolean
}

export function PersonalProfilePage({ isOwnProfile = false }: Props) {
  const viewingOther = !isOwnProfile
  const headerText = isOwnProfile ? 'You' : 'Username'

  return (
    <div className="page-enter mx-auto flex min-h-svh max-w-6xl flex-col gap-6 px-4 pb-32 pt-8 lg:flex-row lg:items-start lg:justify-center">
      <aside className="flex flex-shrink-0 flex-col items-center gap-4 lg:w-[280px]">
        <div className="group relative">
          <button
            type="button"
            className="absolute -left-2 -top-2 z-30 rounded-full border-0 bg-transparent p-0"
            aria-label="Profile song"
          >
            <img
              src={assetUrl.musicStatus}
              alt=""
              className="cd-spin-hover h-14 w-14 object-contain drop-shadow-lg"
            />
          </button>
          <AvatarBubble
            bodyTint="#ff9ec8"
            face={1}
            size="lg"
            className="mt-4"
          />
          <img
            src={assetUrl.face5}
            alt=""
            className="pointer-events-none absolute bottom-[2%] left-1/2 z-30 w-[32%] max-w-[100px] -translate-x-1/2 object-contain"
          />
        </div>
        {viewingOther && (
          <GlassPill type="button" className="text-[10px]">
            FRIENDSHIP SCORE
          </GlassPill>
        )}
      </aside>

      <GlassPanel large className="min-w-0 flex-1 max-w-2xl">
        <SplitHeading text={headerText} as="h1" className="mb-4 text-3xl sm:text-4xl" />
        <div className="mb-4 flex flex-wrap gap-3">
          <GlassPill>INVITE</GlassPill>
          <GlassPill>STATS</GlassPill>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div
            className="min-h-[120px] flex-1 rounded-2xl border border-white/40 bg-[var(--sphere-glass-chip)] p-4 backdrop-blur-md"
            style={{ fontFamily: "'Agrandir', sans-serif" }}
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-white/90">
              USER DESCRIPTION
            </p>
            <p className="text-sm leading-relaxed text-white/95">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sphere brings back the silly,
              expressive energy of hanging out IRL.
            </p>
          </div>
          <div className="flex flex-row gap-6 lg:flex-col lg:items-center">
            <StarMetric kind="likes" value={128} />
            <StarMetric kind="flops" value="12%" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <img
                src={carouselImageAt(i - 1)}
                alt=""
                className="aspect-video w-full rounded-xl object-cover ring-1 ring-white/50"
              />
              <div className="flex flex-wrap gap-1">
                <UsernamePill name="Jamie" />
                <UsernamePill name="Alex" />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      <DragonBackButton />
    </div>
  )
}
