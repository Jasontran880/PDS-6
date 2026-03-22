import { useNavigate } from 'react-router-dom'
import { assetUrl } from '@/lib/paths'
import { SOCIAL_CIRCLE_FRIENDS, SOCIAL_CIRCLE_YOU } from '@/lib/socialCircleFriends'
import { SocialCircleLobby } from '@/components/social/SocialCircleLobby'
import { DragonBackButton } from '@/components/ui/DragonBackButton'
import { GlassPill } from '@/components/ui/GlassPill'
import { SplitHeading } from '@/components/ui/SplitHeading'

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
        <SplitHeading text="Innersphere" as="h1" className="text-3xl sm:text-4xl" />
        <p
          className="mt-2 max-w-xl text-sm font-medium uppercase tracking-wide text-white/95"
          style={{ fontFamily: "'Agrandir', sans-serif", textShadow: 'var(--sphere-glow-heading)' }}
        >
          YOU&apos;RE GROUNDED BY THE PEOPLE AROUND YOU
        </p>
      </header>

      <div className="absolute right-4 top-6 z-20 flex flex-col items-end gap-2 sm:right-8">
        <GlassPill className="text-[9px] sm:text-[10px]">NUMBER OF FRIENDS [20]</GlassPill>
        <GlassPill className="text-[9px] sm:text-[10px]">DAYS SINCE LAST HANGOUT [3]</GlassPill>
      </div>

      <div className="absolute bottom-24 right-6 z-20 sm:bottom-28 sm:right-10">
        <GlassPill>ADD FRIEND</GlassPill>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
        <SocialCircleLobby
          className="h-[min(52vh,520px)]"
          friends={SOCIAL_CIRCLE_FRIENDS}
          you={SOCIAL_CIRCLE_YOU}
          onPick={(target) => {
            if (target.kind === 'you') navigate('/profile')
            else navigate(`/profile/view/${target.id}`)
          }}
        />
      </div>

      <DragonBackButton to="/outersphere" />
    </div>
  )
}
