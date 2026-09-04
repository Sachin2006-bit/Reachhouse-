interface SectionHeadingProps {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  centered?: boolean
}

export function SectionHeading({ eyebrow, title, subtitle, centered }: SectionHeadingProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <div className={`flex items-center gap-4 mb-6 ${centered ? 'justify-center' : ''}`}>
        {centered && <span className="block h-px w-8 bg-[var(--rh-blue)]" />}
        <span
          className="text-[11px] uppercase tracking-[0.22em] text-[var(--rh-blue)] font-inter font-medium"
        >
          {eyebrow}
        </span>
        <span className="block h-px w-8 bg-[var(--rh-blue)]" />
        {!centered && <span className="block h-px flex-1 bg-[var(--rh-border)]" />}
      </div>
      <h2 className="font-outfit font-extrabold text-[var(--rh-white)] text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.95]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[var(--rh-muted)] font-inter text-lg max-w-2xl" style={centered ? { margin: '1rem auto 0' } : {}}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
