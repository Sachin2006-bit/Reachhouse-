'use client'
type FilterKey = 'all' | 'influencer' | 'brand' | 'Silver' | 'Gold' | 'Platinum'

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all',        label: 'All' },
  { key: 'influencer', label: 'With influencer' },
  { key: 'brand',      label: 'Brand-led' },
  { key: 'Silver',     label: 'Silver' },
  { key: 'Gold',       label: 'Gold' },
  { key: 'Platinum',   label: 'Platinum' },
]

interface FilterPillsProps {
  active: FilterKey
  onChange: (key: FilterKey) => void
}

export type { FilterKey }

export function FilterPills({ active, onChange }: FilterPillsProps) {
  return (
    <div role="group" aria-label="Filter reels" className="flex flex-wrap gap-2">
      {filters.map(f => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          aria-pressed={active === f.key}
          className={`px-4 py-2 rounded-full text-sm font-inter border transition-all duration-200 ${
            active === f.key
              ? 'bg-[var(--rh-blue)] text-white border-[var(--rh-blue)]'
              : 'bg-transparent text-[var(--rh-muted)] border-[var(--rh-border)] hover:border-[var(--rh-blue)] hover:text-white'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
