type Props = {
  name: string
  className?: string
}

export function UsernamePill({ name, className = '' }: Props) {
  const first = name.slice(0, 1)
  const rest = name.slice(1)
  return (
    <span
      className={[
        'inline-flex items-baseline gap-0 rounded-full border border-white/45 bg-white/20 px-3 py-1',
        'text-sm text-white backdrop-blur-md',
        className,
      ].join(' ')}
    >
      <span className="text-base leading-none" style={{ fontFamily: "'Sloop', serif" }}>
        {first}
      </span>
      <span className="font-medium" style={{ fontFamily: "'Agrandir', sans-serif" }}>
        {rest}
      </span>
    </span>
  )
}
