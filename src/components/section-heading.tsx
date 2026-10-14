export function SectionHeading({
  id,
  index,
  label,
  title,
  lede,
}: {
  id: string
  index: string
  label: string
  title: string
  lede?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs tracking-[0.18em] text-copper uppercase">
        {index}
        <span className="px-2 text-muted-foreground">/</span>
        {label}
      </p>
      <h2
        id={id}
        className="mt-3 font-heading text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl"
      >
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  )
}
