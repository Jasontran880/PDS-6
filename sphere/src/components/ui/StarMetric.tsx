import { assetUrl } from '@/lib/paths'

type Kind = 'likes' | 'flops'

const config: Record<Kind, { src: string; label: string }> = {
  likes: { src: assetUrl.likes, label: 'likes' },
  flops: { src: assetUrl.flops, label: 'flops' },
}

export function StarMetric({ kind, value }: { kind: Kind; value: string | number }) {
  const { src, label } = config[kind]
  return (
    <div className="flex flex-col items-center gap-1 text-white">
      <img src={src} alt="" className="h-10 w-10 object-contain drop-shadow-md" />
      <span className="text-sm font-bold" style={{ fontFamily: "'Agrandir', sans-serif" }}>
        {value}
      </span>
      <span
        className="font-pixel text-[10px] uppercase tracking-wide text-white/90"
        style={{ fontFamily: "'Retro Pixel', monospace" }}
      >
        {label}
      </span>
    </div>
  )
}
