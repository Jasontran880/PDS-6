import { AvatarBubble } from '@/components/ui/AvatarBubble'
import { DragonBackButton } from '@/components/ui/DragonBackButton'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { GlassPill } from '@/components/ui/GlassPill'
import { HangoutCard } from '@/components/ui/HangoutCard'
import { carouselImageAt } from '@/lib/paths'
import { SplitHeading } from '@/components/ui/SplitHeading'
import { StarMetric } from '@/components/ui/StarMetric'
import { UsernamePill } from '@/components/ui/UsernamePill'

export function ComponentDemoPage() {
  return (
    <div className="page-enter mx-auto max-w-4xl space-y-10 px-4 pb-36 pt-10">
      <SplitHeading text="Component Lab" as="h1" className="text-3xl" />
      <GlassPanel>
        <p className="mb-4 text-white" style={{ fontFamily: "'Agrandir', sans-serif" }}>
          GlassPanel + pills + metrics + avatars + hangout card (upcoming).
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          <GlassPill>INVITE</GlassPill>
          <GlassPill active>STATS</GlassPill>
        </div>
        <div className="mb-6 flex gap-8">
          <StarMetric kind="likes" value={42} />
          <StarMetric kind="flops" value={7} />
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          <UsernamePill name="Jamie" />
          <UsernamePill name="Alex" />
        </div>
        <div className="flex flex-wrap items-end gap-8">
          <AvatarBubble size="sm" face={1} bodyTint="#ff9ec8" label="sm" />
          <AvatarBubble size="md" face={2} bodyTint="#7eb8ff" label="md" />
          <AvatarBubble size="lg" face={3} bodyTint="#7dffb0" label="lg" />
        </div>
      </GlassPanel>
      <div className="max-w-xs">
        <HangoutCard
          variant="upcoming"
          title="Demo hangout"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          usernames={['River', 'Sky']}
          coverImage={carouselImageAt(0)}
        />
      </div>
      <DragonBackButton to="/social" />
    </div>
  )
}
