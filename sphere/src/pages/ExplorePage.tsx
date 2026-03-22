import { AvatarBubble, type FaceId } from '@/components/ui/AvatarBubble'
import { DragonBackButton } from '@/components/ui/DragonBackButton'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { GlassPill } from '@/components/ui/GlassPill'
import { SplitHeading } from '@/components/ui/SplitHeading'

const venues = [
  { name: 'Cloud Nine Café', cat: 'Café', hue: 'from-amber-200 to-orange-300' },
  { name: 'Starlight Cinema', cat: 'Cinema', hue: 'from-indigo-300 to-purple-400' },
  { name: 'Garden Bites', cat: 'Restaurant', hue: 'from-emerald-200 to-teal-300' },
  { name: 'Bliss Park', cat: 'Park', hue: 'from-lime-200 to-green-400' },
  { name: 'Retro Arcade', cat: 'Cinema', hue: 'from-pink-300 to-rose-400' },
]

const people: { name: string; face: FaceId; tint: string; tag: string }[] = [
  { name: 'River', face: 2, tint: '#7eb8ff', tag: 'Beach' },
  { name: 'Skyler', face: 1, tint: '#ff9ec8', tag: 'Music' },
  { name: 'Morgan', face: 3, tint: '#c9a8ff', tag: 'Games' },
  { name: 'Casey', face: 4, tint: '#7dffb0', tag: 'Food' },
  { name: 'Jordan', face: 5, tint: '#ffb87e', tag: 'Art' },
  { name: 'Taylor', face: 1, tint: '#7eb8ff', tag: 'Hiking' },
]

export function ExplorePage() {
  return (
    <div className="page-enter mx-auto max-w-4xl space-y-12 px-4 pb-36 pt-10">
      <section>
        <SplitHeading text="Local Spots" as="h1" className="mb-6 text-3xl sm:text-4xl" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {venues.map((v) => (
            <GlassPanel key={v.name} className="w-[260px] shrink-0">
              <div
                className={`mb-3 h-28 rounded-xl bg-gradient-to-br ${v.hue} ring-1 ring-white/40`}
                role="presentation"
              />
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
