import { AvatarBubble, type FaceId } from '@/components/ui/AvatarBubble'
import { DragonBackButton } from '@/components/ui/DragonBackButton'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { GlassPill } from '@/components/ui/GlassPill'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { CHARACTER_NAMES } from '@/lib/characterNames'
import { businessImageUrl } from '@/lib/paths'

const venues = [
  { name: 'Cloud Nine Café', cat: 'Café', cover: businessImageUrl.cafe },
  { name: 'Starlight Cinema', cat: 'Cinema', cover: businessImageUrl.cinema },
  { name: 'Garden Bites', cat: 'Restaurant', cover: businessImageUrl.restaurant },
  { name: 'Bliss Park', cat: 'Park', cover: businessImageUrl.park },
  { name: 'Retro Arcade', cat: 'Cinema', cover: businessImageUrl.arcade },
]

const exploreTags = ['Beach', 'Music', 'Games', 'Food', 'Art', 'Hiking'] as const
const exploreTints = ['#7eb8ff', '#ff9ec8', '#c9a8ff', '#7dffb0', '#ffb87e', '#7eb8ff'] as const
const exploreFaces: FaceId[] = [2, 1, 3, 4, 5, 1]

const people: { name: string; face: FaceId; tint: string; tag: string }[] = exploreFaces.map((face, i) => ({
  name: CHARACTER_NAMES[i],
  face,
  tint: exploreTints[i],
  tag: exploreTags[i],
}))

export function ExplorePage() {
  return (
    <div className="page-enter mx-auto max-w-4xl space-y-12 px-4 pb-36 pt-10">
      <section>
        <SplitHeading text="Local Spots" as="h1" className="mb-6 text-3xl sm:text-4xl" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {venues.map((v) => (
            <GlassPanel key={v.name} className="w-[260px] shrink-0">
              <div className="mb-3 h-28 overflow-hidden rounded-xl ring-1 ring-white/40" role="presentation">
                <img src={v.cover} alt="" className="h-full w-full object-cover" />
              </div>
              <h3
                className="mb-2 text-left text-lg font-bold text-white"
                style={{ fontFamily: "'Agrandir', sans-serif" }}
              >
                {v.name}
              </h3>
              <GlassPill className="mb-2 text-[9px]">{v.cat}</GlassPill>
              <p
                className="mb-3 text-left text-sm text-white/90"
                style={{ fontFamily: "'Agrandir', sans-serif" }}
              >
                A cozy third space to plan your next sidequest.
              </p>
              <GlassPill className="w-full text-[9px]">Plan a Sidequest Here</GlassPill>
            </GlassPanel>
          ))}
        </div>
      </section>

      <section>
        <SplitHeading text="People You Might Know" as="h1" className="mb-6 text-3xl sm:text-4xl" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {people.map((p) => (
            <GlassPanel key={p.name}>
              <div className="flex gap-4">
                <AvatarBubble bodyTint={p.tint} face={p.face} size="sm" />
                <div className="min-w-0 flex-1 text-left">
                  <SplitHeading text={p.name} as="h2" className="mb-1 text-xl" />
                  <p
                    className="mb-2 text-sm text-white/90"
                    style={{ fontFamily: "'Agrandir', sans-serif" }}
                  >
                    Into the same silly energy — say hi IRL.
                  </p>
                  <GlassPill className="mb-2 text-[9px]">{p.tag}</GlassPill>
                  <GlassPill className="text-[9px]">Add Friend</GlassPill>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>

      <DragonBackButton to="/social" />
    </div>
  )
}
