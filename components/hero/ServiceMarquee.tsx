const SERVICES = [
  'Influencer marketing',
  'Performance marketing',
  'Brand strategy',
  'Influencer reels',
  'Digital marketing',
  'Creator discovery',
  'UGC content',
  'Paid social',
  'Content production',
  'Campaign analytics',
  'Brand films',
  'Media buying',
]

function TrackItems({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <>
      {SERVICES.map((service, i) => (
        <span key={i} className="hero-service-item" aria-hidden={ariaHidden}>
          {service}
          <span className="hero-service-dot" aria-hidden="true" />
        </span>
      ))}
    </>
  )
}

export function ServiceMarquee() {
  return (
    <div className="hero-marquee-wrap">
      <div className="hero-marquee-track">
        {/* Accessible copy — screen readers see this once */}
        <TrackItems />
        {/* Duplicate for seamless loop — hidden from AT */}
        <TrackItems ariaHidden />
      </div>
    </div>
  )
}
