import { assetUrl } from '@/lib/paths'

export type FaceId = 1 | 2 | 3 | 4 | 5 | 'none'

type Size = 'sm' | 'md' | 'lg'

const sizeMap: Record<Size, { wrap: string; facePad: string; faceSize: string }> = {
  sm: { wrap: 'w-16 h-16', facePad: 'pt-[5%]', faceSize: 'w-[88%] max-h-[52%]' },
  md: { wrap: 'w-28 h-28 sm:w-32 sm:h-32', facePad: 'pt-[6%]', faceSize: 'w-[82%] max-h-[48%]' },
  lg: { wrap: 'w-40 h-40 sm:w-48 sm:h-48', facePad: 'pt-[7%]', faceSize: 'w-[76%] max-h-[44%]' },
}

const faceSrc: Record<Exclude<FaceId, 'none'>, string> = {
  1: assetUrl.face1,
  2: assetUrl.face2,
  3: assetUrl.face3,
  4: assetUrl.face4,
  5: assetUrl.face5,
}

type Props = {
  bodyTint?: string
  face?: FaceId
  size?: Size
  label?: string
  className?: string
  /** Extra overlay (e.g. flower crown) — image URL */
  crownSrc?: string
}

export function AvatarBubble({
  bodyTint = 'transparent',
  face = 'none',
  size = 'md',
  label,
  className = '',
  crownSrc,
}: Props) {
  const s = sizeMap[size]
  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <div className={`relative contain-layout ${s.wrap}`}>
        <img
          src={assetUrl.sphere}
          alt=""
          className="absolute inset-0 z-20 h-full w-full object-contain pointer-events-none drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
        />
        <div className="absolute inset-[12%] z-10 flex items-center justify-center overflow-hidden rounded-full">
          <img
            src={assetUrl.avatar}
            alt=""
            className="h-[118%] w-[118%] max-w-none object-contain"
            style={{
              filter: bodyTint !== 'transparent' ? `drop-shadow(0 0 0 ${bodyTint})` : undefined,
            }}
          />
          {bodyTint !== 'transparent' && (
            <div
              className="pointer-events-none absolute inset-0 mix-blend-color rounded-full"
              style={{ backgroundColor: bodyTint, opacity: 0.45 }}
              aria-hidden
            />
          )}
        </div>
        {face !== 'none' && (
          <div
            className={`pointer-events-none absolute inset-0 z-30 flex items-start justify-center ${s.facePad}`}
            aria-hidden
          >
            <img
              src={faceSrc[face]}
              alt=""
              className={`pointer-events-none h-auto max-w-none object-contain object-top ${s.faceSize}`}
            />
          </div>
        )}
        {crownSrc && (
          <img
            src={crownSrc}
            alt=""
            className="pointer-events-none absolute -top-2 left-1/2 z-40 w-[55%] -translate-x-1/2 object-contain opacity-90"
          />
        )}
      </div>
      {label && (
        <span
          className="font-pixel text-[9px] uppercase tracking-wider text-white drop-shadow-md"
          style={{ fontFamily: "'Retro Pixel', monospace" }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
