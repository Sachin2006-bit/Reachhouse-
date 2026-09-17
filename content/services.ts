export interface ServiceCard {
  number: string
  icon: 'Users' | 'TrendingUp' | 'Sparkles' | 'Calendar' | 'Clapperboard' | 'Video'
  title: string
  summary: string
  points: string[]
  youGet: string
  note?: string
}

export const services: ServiceCard[] = [
  {
    number: '01',
    icon: 'Users',
    title: 'Influencer Marketing',
    summary: 'The right creators for your brand, matched on audience, not just follower count.',
    points: [
      'Shortlist from our 500+ creator network across Hyderabad, Andhra Pradesh and India',
      'Mix nano, micro and macro creators to fit your goal and budget, including premium creators at rates brands rarely get going direct',
      'We handle outreach, negotiation, briefs, approvals and posting schedules',
    ],
    youGet: 'Creator shortlist · Managed collaborations · Campaign report',
  },
  {
    number: '02',
    icon: 'TrendingUp',
    title: 'Performance Marketing',
    summary: 'Paid campaigns built to bring leads and sales, not just views.',
    points: [
      'Meta (Instagram & Facebook) ad setup, targeting and budget management',
      'Test multiple creatives and audiences, then scale what converts',
      'Track leads, cost per lead and conversions, and optimise every week',
    ],
    youGet: 'Ad campaigns · Lead tracking · Monthly performance report',
    note: 'Ad spend billed separately, as per your budget.',
  },
  {
    number: '03',
    icon: 'Sparkles',
    title: 'Branding & Brand Strategy',
    summary: 'A clear identity and message, so people remember you and choose you.',
    points: [
      'Audit your website, social pages and competitors',
      'Define positioning, brand pillars, tone of voice and visual direction',
      'Build a content strategy that keeps every post on-brand',
    ],
    youGet: 'Brand strategy · Content pillars · Visual guidelines',
  },
  {
    number: '04',
    icon: 'Calendar',
    title: 'Social Media Management',
    summary: 'Your pages run consistently, so your brand never goes quiet.',
    points: [
      'Instagram managed end-to-end, plus Facebook, YouTube or LinkedIn as you choose',
      'Monthly content calendar, captions, hashtags and scheduled posting',
      'Bio, highlights and grid optimised for a profile that converts',
    ],
    youGet: 'Content calendar · Managed posting · Monthly insights',
  },
  {
    number: '05',
    icon: 'Clapperboard',
    title: 'Creative Ad & Reel Production',
    summary: 'Scroll-stopping reels and ad creatives, scripted, shot and edited in-house.',
    points: [
      'Professional scripting with hook-first content strategy',
      'Influencer on camera, single or multi-location shoots',
      'Cinematic edits with captions, music and colour grading',
    ],
    youGet: 'Ready-to-post reels · Ad-ready cuts · 2 free revisions · 7–10 working day turnaround',
  },
  {
    number: '06',
    icon: 'Video',
    title: 'Creator Discovery & UGC',
    summary: 'Authentic creator-made content your ads and pages can use again and again.',
    points: [
      'Find creators by niche, city, audience size and budget',
      'UGC videos, testimonials and product demos that feel native to the feed',
      'Content usage terms agreed upfront, so you can run it as ads',
    ],
    youGet: 'UGC video library · Creator matches for future campaigns',
  },
]

export const serviceTags = [
  'Campaign analytics',
  'Media buying',
  'Brand films',
  'Paid social',
  'Content production',
]
