import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { assetUrl, carouselImageAt } from '@/lib/paths'
import { getProfilePageData } from '@/lib/mockContent'
import { getSocialFriendById, SOCIAL_CIRCLE_YOU } from '@/lib/socialCircleFriends'
import type { FaceId } from '@/components/ui/AvatarBubble'
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
  const { userId } = useParams<{ userId: string }>()
  const viewingOther = !isOwnProfile

  const profileKey = isOwnProfile ? 'me' : (userId ?? 'unknown')
  const profile = useMemo(() => getProfilePageData(profileKey), [profileKey])

  const visual = useMemo(() => {
    if (isOwnProfile) return SOCIAL_CIRCLE_YOU
    const row = getSocialFriendById(userId)
    return row
      ? { tint: row.tint, face: row.face }
      : { tint: '#ff9ec8', face: 1 as FaceId }
  }, [isOwnProfile, userId])

  const headerNode = isOwnProfile ? (
    <>
      <SplitHeading text="You" as="h1" className="mb-1 text-3xl sm:text-4xl" />
      <p
        className="mb-4 text-sm font-medium text-white/80"
        style={{ fontFamily: "'Agrandir', sans-serif" }}
      >
        {profile.displayName} · {profile.handle}
      </p>
    </>
  ) : (
    <>
      <SplitHeading text={profile.displayName} as="h1" className="mb-1 text-3xl sm:text-4xl" />
      <p
        className="mb-4 text-sm text-white/75"
        style={{ fontFamily: "'Agrandir', sans-serif" }}
      >
        {profile.handle}
      </p>
    </>
  )

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
            bodyTint={visual.tint}
            face={visual.face}
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
        {headerNode}
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
            <p className="text-sm leading-relaxed text-white/95">{profile.description}</p>
          </div>
          <div className="flex flex-row gap-6 lg:flex-col lg:items-center">
            <StarMetric kind="likes" value={profile.likes} />
            <StarMetric kind="flops" value={profile.flopsPct} />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
          {profile.sidequests.map((sq) => (
            <div key={`${profileKey}-${sq.title}-${sq.date}`} className="flex flex-col gap-2">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl ring-1 ring-white/50">
                <img
                  src={carouselImageAt(sq.imageSlot)}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/65 via-black/25 to-transparent px-2.5 pb-5 pt-2 text-left"
                  style={{ fontFamily: "'Agrandir', sans-serif" }}
                >
                  <p className="text-xs font-bold leading-tight text-white drop-shadow-md sm:text-sm">
                    {sq.title}
                  </p>
                  <p className="mt-0.5 text-[10px] font-medium italic text-white/85 drop-shadow sm:text-xs">
                    {sq.date}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <UsernamePill name={sq.attendees[0]} />
                <UsernamePill name={sq.attendees[1]} />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>

      <DragonBackButton />
    </div>
  )
}
