type Props = {
  text: string
  className?: string
  firstClassName?: string
  restClassName?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

function cx(...parts: (string | undefined)[]) {
  return parts.filter(Boolean).join(' ')
}

export function SplitHeading({
  text,
  className,
  firstClassName,
  restClassName,
  as: Tag = 'h2',
}: Props) {
  const first = text.slice(0, 1)
  const rest = text.slice(1)
  return (
    <Tag
      className={cx(
        'inline-flex flex-wrap items-baseline gap-0 text-white [text-shadow:var(--sphere-glow-heading)]',
        className,
      )}
    >
      <span className={cx('leading-none', firstClassName)} style={{ fontFamily: "'Sloop', serif" }}>
        {first}
      </span>
      <span
        className={cx('font-bold tracking-wide', restClassName)}
        style={{ fontFamily: "'Agrandir', sans-serif" }}
      >
        {rest}
      </span>
    </Tag>
  )
}
