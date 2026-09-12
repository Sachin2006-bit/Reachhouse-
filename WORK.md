# Work Showcase — Asset Guide

## Where to drop files

| Asset | Path | Notes |
|---|---|---|
| Poster stills | Upload to Cloudinary, update `poster()` call in `components/work/reels.ts` | Extract frame at 0s via `so_0` param |
| Preview clips | Upload to Cloudinary, update `preview()` call | See encoding spec below |
| Full reels | Upload to Cloudinary, update `src()` call | H.264 MP4 |

## Encoding specs

### Preview clip (card hover autoplay)
- Container: MP4
- Codec: H.264 (vc_h264), no audio (ac_none)
- Resolution: 540px wide, proportional height (c_limit)
- Duration: ~3 s trimmed from the best moment
- Target size: ≤ 400 KB per clip
- Cloudinary transform: `f_mp4,q_auto:good,w_540,c_limit,ac_none,vc_h264`

### Full reel (lightbox player)
- Container: MP4
- Codec: H.264
- Resolution: 1080 × 1920 (9:16)
- Audio: AAC stereo, 192 kbps
- Cloudinary transform: `f_mp4,q_auto`

### Poster image
- Extracted automatically via Cloudinary: `so_0,f_jpg,q_auto,w_600`
- Use the same Cloudinary public ID as the video

## Adding a new reel

1. Upload to Cloudinary — copy the public ID (e.g. `v1234567890/my_reel_id`)
2. Open `components/work/reels.ts`
3. Add a new entry to the `reels` array following the existing pattern
4. Remove the `// TODO: swap in real reels` comment once all placeholders are replaced
