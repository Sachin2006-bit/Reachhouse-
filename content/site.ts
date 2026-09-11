export type ReelTier = 'Silver' | 'Gold' | 'Platinum'

export interface Reel {
  id: string
  brand: string
  type: string
  tier: ReelTier
  duration: string
  poster: string
  previewSrc?: string // lightweight MP4 for card hover (540px, no audio)
  videoSrc?: string   // full-quality MP4 for lightbox
  embedUrl?: string   // fallback: iframe (hover-preview disabled for embeds)
  withInfluencer: boolean
}

export interface Stat {
  value: string
  label: string
}

export interface ProcessStep {
  number: string
  icon: string
  title: string
  description: string
}

export interface ServiceTier {
  name: ReelTier
  positioning: string
  includes: string[]
  mostPopular?: boolean
}

export interface Package {
  count: string
  label: string
  description: string
}

export const stats: Stat[] = [
  { value: '1000+', label: 'Reels Delivered' },
  { value: '50+',  label: 'Brands Served' },
  { value: '500+', label: 'Influencers' },
  { value: '2026', label: 'Reel Brochure' },
]

// Cloudinary base helper
const CLD = 'https://res.cloudinary.com/drf5dacrb/video/upload'
const poster  = (id: string) => `${CLD}/so_0,f_jpg,q_auto,w_600/${id}`
const preview = (id: string) => `${CLD}/f_mp4,q_auto:good,w_540,c_limit,ac_none,vc_h264/${id}`
const full    = (id: string) => `${CLD}/f_mp4,q_auto/${id}`

export const reels: Reel[] = [
  {
    id: 'gv-interiors',
    brand: 'GV Interiors',
    type: 'Interior showcase reel',
    tier: 'Gold',
    duration: '0:28',
    poster:     poster('v1780742629/0606_becg5v'),
    previewSrc: preview('v1780742629/0606_becg5v'),
    videoSrc:   full('v1780742629/0606_becg5v'),
    withInfluencer: false,
  },
  {
    id: 'be-you-perfumes-1',
    brand: 'Be You Perfumes',
    type: 'Product launch reel',
    tier: 'Silver',
    duration: '0:32',
    poster:     poster('v1780743847/IMG_0159_bgvfvc'),
    previewSrc: preview('v1780743847/IMG_0159_bgvfvc'),
    videoSrc:   full('v1780743847/IMG_0159_bgvfvc'),
    withInfluencer: true,
  },
  {
    id: 'butta-bomma',
    brand: 'Butta Bomma Makeup Academy',
    type: 'Makeup tutorial reel',
    tier: 'Platinum',
    duration: '0:24',
    poster:     poster('v1780743796/0606_4_ioxttd'),
    previewSrc: preview('v1780743796/0606_4_ioxttd'),
    videoSrc:   full('v1780743796/0606_4_ioxttd'),
    withInfluencer: true,
  },
  {
    id: 'pernati-culture',
    brand: 'Pernati Culture',
    type: 'Brand story reel',
    tier: 'Silver',
    duration: '0:19',
    poster:     poster('v1780743565/0606_2_z3a4hq'),
    previewSrc: preview('v1780743565/0606_2_z3a4hq'),
    videoSrc:   full('v1780743565/0606_2_z3a4hq'),
    withInfluencer: false,
  },
  {
    id: 'maharsh-edutech',
    brand: 'Maharsh Edutech',
    type: 'Explainer reel',
    tier: 'Gold',
    duration: '0:30',
    poster:     poster('v1780744346/SRM-1_3_ay013k'),
    previewSrc: preview('v1780744346/SRM-1_3_ay013k'),
    videoSrc:   full('v1780744346/SRM-1_3_ay013k'),
    withInfluencer: false,
  },
  {
    id: 'reachhouse',
    brand: 'ReachHouse',
    type: 'Brand film',
    tier: 'Platinum',
    duration: '0:26',
    poster:     poster('v1780744523/SnapInsta.to_AQOBgukk4pVhGadm70Gk9CKlGV7RNqWlykiYS9kG0ibbeiaWpG2KUsxocpDRwb8FGGqvR6TZgm3XEpmG0j4ZX47YGIkj9vzFS2zvtpI_ss87vq'),
    previewSrc: preview('v1780744523/SnapInsta.to_AQOBgukk4pVhGadm70Gk9CKlGV7RNqWlykiYS9kG0ibbeiaWpG2KUsxocpDRwb8FGGqvR6TZgm3XEpmG0j4ZX47YGIkj9vzFS2zvtpI_ss87vq'),
    videoSrc:   full('v1780744523/SnapInsta.to_AQOBgukk4pVhGadm70Gk9CKlGV7RNqWlykiYS9kG0ibbeiaWpG2KUsxocpDRwb8FGGqvR6TZgm3XEpmG0j4ZX47YGIkj9vzFS2zvtpI_ss87vq'),
    withInfluencer: false,
  },
  {
    id: 'starex-university',
    brand: 'Starex University',
    type: 'Course promo reel',
    tier: 'Silver',
    duration: '0:22',
    poster:     poster('v1780744659/Reel-_13_mywojj'),
    previewSrc: preview('v1780744659/Reel-_13_mywojj'),
    videoSrc:   full('v1780744659/Reel-_13_mywojj'),
    withInfluencer: false,
  },
  {
    id: 'be-you-perfumes-2',
    brand: 'Be You Perfumes',
    type: 'Cinematic reel',
    tier: 'Gold',
    duration: '0:41',
    poster:     poster('v1780744833/Reel-_18_2_eepksb'),
    previewSrc: preview('v1780744833/Reel-_18_2_eepksb'),
    videoSrc:   full('v1780744833/Reel-_18_2_eepksb'),
    withInfluencer: true,
  },
]

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    icon: 'Search',
    title: 'Brief & discovery',
    description: 'Understanding your brand, goals, and audience.',
  },
  {
    number: '02',
    icon: 'PenLine',
    title: 'Script & strategy',
    description: 'Professional scripting with content-strategy depth.',
  },
  {
    number: '03',
    icon: 'Clapperboard',
    title: 'Shoot day',
    description: 'Influencer on-camera, single or multi-location.',
  },
  {
    number: '04',
    icon: 'Scissors',
    title: 'Edit & post',
    description: 'Cinematic cuts, captions, music, and colour.',
  },
  {
    number: '05',
    icon: 'Send',
    title: 'Deliver & revise',
    description: '2 free revisions, 7–10 working day turnaround.',
  },
]

export const serviceTiers: ServiceTier[] = [
  {
    name: 'Silver',
    positioning: 'Fast, clean, effective',
    includes: [
      'Scripted concept',
      'Single-location shoot',
      'Standard edit',
      '1 revision',
    ],
  },
  {
    name: 'Gold',
    positioning: 'Our most-booked tier',
    mostPopular: true,
    includes: [
      'Everything in Silver',
      'Influencer casting',
      'Multi-setup shoot',
      'Cinematic grade',
      '2 revisions',
    ],
  },
  {
    name: 'Platinum',
    positioning: 'Full creative production',
    includes: [
      'Everything in Gold',
      'Multi-location',
      'Creative direction',
      'Motion graphics',
      'Priority turnaround',
    ],
  },
]

export const packages: Package[] = [
  {
    count: '3',
    label: '3 Reels',
    description: 'Ideal for brands testing influencer content.',
  },
  {
    count: '5',
    label: '5 Reels',
    description: 'Our most popular starting point for growth.',
  },
  {
    count: '10',
    label: '10 Reels',
    description: 'Scale your content across platforms consistently.',
  },
  {
    count: '∞',
    label: 'Custom',
    description: 'Tailored volume and mix for enterprise brands.',
  },
]
