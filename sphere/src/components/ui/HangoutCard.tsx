import { GlassPanel } from '@/components/ui/GlassPanel'
import { UsernamePill } from '@/components/ui/UsernamePill'

export type HangoutCardProps = {
  title: string
  description: string
  coverColor?: string
  coverImage?: string
  usernames: [string, string]
  variant?: 'upcoming' | 'recent'
  date?: string
  className?: string
}

function colorFromTitle(title: string) {
  let h = 0
  for (let i = 0; i < title.length; i++) h = (h * 31 + title.charCodeAt(i)) >>> 0
  const hue = h % 360
  return `hsl(${hue} 55% 58%)`
}

export function HangoutCard({
  title,
  description,
  coverColor,
  coverImage,
  usernames,
  variant = 'upcoming',
  date,
  className = '',
}: HangoutCardProps) {
  const bg = coverColor ?? colorFromTitle(title)
  const isRecent = variant === 'recent'

  const cover = (
    <div
      className={[
        'relative w-full overflow-hidden',
        isRecent ? 'aspect-[16/9] rounded-t-[1.25rem]' : 'aspect-[4/3] rounded-t-2xl',
      ].join(' ')}
      style={
        coverImage
          ? {
              backgroundImage: `url(${coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : { backgroundColor: bg }
      }
    >
      {!coverImage && (
        <div
          className="flex h-full items-center justify-center p-4 text-center text-sm italic text-white/90"
          style={{ fontFamily: "'Agrandir', sans-serif" }}
        >
          COVER PHOTO [if not found, use random hexadecimal colour]
        </div>
      )}
    </div>
  )

  const titleCls = isRecent
    ? 'text-left text-base font-bold italic text-slate-800'
    : 'text-left text-base font-bold italic text-white'
  const dateCls = isRecent
    ? 'text-sm italic text-slate-600'
    : 'text-sm italic text-white/85'
  const descCls = isRecent
    ? 'mb-3 text-left text-sm leading-relaxed text-slate-700'
    : 'mb-3 text-left text-sm leading-relaxed text-white/90'

  const body = (
    <div className={isRecent ? 'px-4 pb-4 pt-3' : 'px-1 pb-1 pt-2 sm:px-2'}>
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className={titleCls} style={{ fontFamily: "'Agrandir', sans-serif" }}>
          {title}
        </h3>
        {date && (
          <span className={dateCls} style={{ fontFamily: "'Agrandir', sans-serif" }}>
            {date}
          </span>
        )}
      </div>
      <p className={descCls} style={{ fontFamily: "'Agrandir', sans-serif" }}>
        {description}
      </p>
      <div className={`flex flex-wrap gap-2 ${isRecent ? '[&_span]:border-slate-300 [&_span]:bg-slate-100/80 [&_span]:text-slate-800' : ''}`}>
        <UsernamePill name={usernames[0]} />
        <UsernamePill name={usernames[1]} />
      </div>
    </div>
  )

  if (isRecent) {
    return (
      <article
        className={[
          'mx-auto w-full max-w-lg rounded-3xl bg-white/90 p-1 shadow-[0_12px_40px_rgba(0,0,0,0.1)]',
          'ring-1 ring-white/70 transition hover:shadow-[0_16px_48px_rgba(0,0,0,0.14)]',
          className,
        ].join(' ')}
      >
        <div className="overflow-hidden rounded-[1.35rem]">
          {cover}
          <div className="bg-white/50 text-slate-800">{body}</div>
        </div>
      </article>
    )
  }

  return (
    <GlassPanel className={['h-full min-w-[220px] max-w-xs shrink-0', className].join(' ')}>
      <div className="-mt-4 -mx-4 sm:-mt-6 sm:-mx-6 mb-2 overflow-hidden rounded-t-2xl">{cover}</div>
      {body}
    </GlassPanel>
  )
}
