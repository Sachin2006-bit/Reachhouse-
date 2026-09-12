// TODO: swap in real reels — see WORK.md for asset specs and Cloudinary encoding

export type Reel = {
  id: string
  title: string       // what the reel is
  client: string      // brand name shown below card
  poster: string      // static frame used before video loads
  preview: string     // short muted loop for card preview (≤400KB)
  src: string         // full reel played in lightbox
  durationSec: number
  tags: string[]
}

const V = 'https://res.cloudinary.com/drf5dacrb/video/upload'

const poster  = (id: string) => `${V}/so_0,f_jpg,q_auto,w_600/${id}`
const preview = (id: string) => `${V}/f_mp4,q_auto:good,w_540,c_limit,ac_none,vc_h264/${id}`
const full    = (id: string) => `${V}/f_mp4,q_auto/${id}`

export const reels: Reel[] = [
  {
    id: 'gv-interiors',
    client: 'GV Interiors',
    title: 'Interior showcase',
    poster:  poster('v1780742629/0606_becg5v'),
    preview: preview('v1780742629/0606_becg5v'),
    src:     full('v1780742629/0606_becg5v'),
    durationSec: 28,
    tags: ['Interior', 'Brand'],
  },
  {
    id: 'be-you-perfumes-1',
    client: 'Be You Perfumes',
    title: 'Product launch',
    poster:  poster('v1780743847/IMG_0159_bgvfvc'),
    preview: preview('v1780743847/IMG_0159_bgvfvc'),
    src:     full('v1780743847/IMG_0159_bgvfvc'),
    durationSec: 32,
    tags: ['Beauty', 'Influencer'],
  },
  {
    id: 'butta-bomma',
    client: 'Butta Bomma Academy',
    title: 'Makeup tutorial',
    poster:  poster('v1780743796/0606_4_ioxttd'),
    preview: preview('v1780743796/0606_4_ioxttd'),
    src:     full('v1780743796/0606_4_ioxttd'),
    durationSec: 24,
    tags: ['Beauty', 'Education', 'Influencer'],
  },
  {
    id: 'pernati-culture',
    client: 'Pernati Culture',
    title: 'Brand story',
    poster:  poster('v1780743565/0606_2_z3a4hq'),
    preview: preview('v1780743565/0606_2_z3a4hq'),
    src:     full('v1780743565/0606_2_z3a4hq'),
    durationSec: 19,
    tags: ['Lifestyle', 'Brand'],
  },
  {
    id: 'maharsh-edutech',
    client: 'Maharsh Edutech',
    title: 'Course explainer',
    poster:  poster('v1780744346/SRM-1_3_ay013k'),
    preview: preview('v1780744346/SRM-1_3_ay013k'),
    src:     full('v1780744346/SRM-1_3_ay013k'),
    durationSec: 30,
    tags: ['Education', 'Brand'],
  },
  {
    id: 'reachhouse',
    client: 'ReachHouse',
    title: 'Brand film',
    poster:  poster('v1780744523/SnapInsta.to_AQOBgukk4pVhGadm70Gk9CKlGV7RNqWlykiYS9kG0ibbeiaWpG2KUsxocpDRwb8FGGqvR6TZgm3XEpmG0j4ZX47YGIkj9vzFS2zvtpI_ss87vq'),
    preview: preview('v1780744523/SnapInsta.to_AQOBgukk4pVhGadm70Gk9CKlGV7RNqWlykiYS9kG0ibbeiaWpG2KUsxocpDRwb8FGGqvR6TZgm3XEpmG0j4ZX47YGIkj9vzFS2zvtpI_ss87vq'),
    src:     full('v1780744523/SnapInsta.to_AQOBgukk4pVhGadm70Gk9CKlGV7RNqWlykiYS9kG0ibbeiaWpG2KUsxocpDRwb8FGGqvR6TZgm3XEpmG0j4ZX47YGIkj9vzFS2zvtpI_ss87vq'),
    durationSec: 26,
    tags: ['Agency', 'Brand Film'],
  },
  {
    id: 'starex-university',
    client: 'Starex University',
    title: 'Course promo',
    poster:  poster('v1780744659/Reel-_13_mywojj'),
    preview: preview('v1780744659/Reel-_13_mywojj'),
    src:     full('v1780744659/Reel-_13_mywojj'),
    durationSec: 22,
    tags: ['Education', 'Brand'],
  },
  {
    id: 'be-you-perfumes-2',
    client: 'Be You Perfumes',
    title: 'Cinematic reel',
    poster:  poster('v1780744833/Reel-_18_2_eepksb'),
    preview: preview('v1780744833/Reel-_18_2_eepksb'),
    src:     full('v1780744833/Reel-_18_2_eepksb'),
    durationSec: 41,
    tags: ['Beauty', 'Cinematic', 'Influencer'],
  },
]
