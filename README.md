# ÉCRIN · The art of playback

Five craft-inspired skins for **Video.js v10**, in one player. Open **Settings → Appearance** and switch between **Voyage**, **Bridle**, **Horlogerie**, **Folio** and **Grand Tourer** while the video plays.

Entry for the Contra *Video.js Skins Design Challenge*. Licensed under Apache-2.0.

| Skin | Inspiration | Signature controls |
|---|---|---|
| Voyage (default) | Travel trunk | Brass clasp play, **zipper volume**, strap seek with brass keeper |
| Bridle | Saddlery | **Buckle playhead** on a stitched strap, leather pull-tab volume |
| Horlogerie | Watchmaking | **Crown volume dial**, ruler-style time rail, ruby jewel thumb |
| Folio | Leather stationery | **Fold-out settings**, stitched ribbon seek, plain slider |
| Grand Tourer | Touring-car cockpit | **Backlit amber rail**, knurled **volume knob**, push-switch play |

## How it works

- One `VideoPlayer` (Video.js v10 `@videojs/react`) with a Mux-hosted video (`MuxVideo`). The skin is a single stable React tree. `data-ecrin-skin` on the `Container` swaps tokens, textures and signature controls with CSS. The skin id is never a React `key`, so the media element is never remounted.
- Playback, seek, time, mute, volume, captions, fullscreen, hotkeys, status announcements and the error dialog are the built-in Video.js components (`PlayButton`, `TimeSlider`, `VolumeSlider`, `MuteButton`, `FullscreenButton`, `CaptionsButton`, `Time`, `Hotkey`, `StatusAnnouncer`, `ErrorDialog`). The art is mounted inside them.
- The Horlogerie crown and Grand Tourer knob are `role="slider"` controls bound to the same Video.js volume state. They support arrow keys, Home/End, the mouse wheel and relative drag, and never spin endlessly.
- Settings is one disclosure panel: root → Playback speed | Appearance → Skin. Skin options are native radios. The menu stays open after a switch, announces "*Horlogerie appearance selected.*", and Escape returns focus to the Settings button.
- The choice persists in `localStorage` (`ecrin.skin.v1`) and falls back to Voyage on bad data or blocked storage. `?skin=folio` overrides it for one page load.
- Layout uses container queries on the player, not the viewport. It holds at 320 px with no horizontal overflow.

## Visual assets

Hardware that is hard to draw in code (brass corner caps, clasp, zipper pull, bridle buckle, watch crown, knurled knob) and the material textures (espresso, saddle and walnut leather, onyx leather, champagne metal, bordeaux enamel, walnut veneer) were generated with **GPT Image 2.6 (Sunburst)** through fal, then trimmed and converted to WebP by `scripts/process-assets.mjs`. Everything functional (controls, layout, stitching, tracks, rails, dial arcs, icons) is SVG and CSS. See [ATTRIBUTION.md](ATTRIBUTION.md).

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
npm run build && npm run preview
npm test             # unit tests (registry, persistence)
npm run test:e2e     # needs Google Chrome (H.264) and `npm run preview` on :4173
```

The e2e suite checks all 20 directed skin switches keep the same `<video>` node, source, play state and mute state, plus keyboard use, focus return, persistence, volume and seek sliders, reduced motion, accessible names, and no horizontal overflow at 320/375/768 px.

## Project documents

The original creative and engineering brief is in [docs/](docs/00_BRIEF.md) and [variants/](variants/).

## Known limits

- The demo clip is a Mux animated demo asset. Swap `DEMO_PLAYBACK_ID` in `src/player/EcrinPlayer.tsx` for any Mux playback ID.
- The demo stream has no caption track, so the Captions button stays hidden (Video.js hides it when no tracks exist).
- Below a 420 px player width the volume slider and dials are hidden to fit the essentials; mute stays.
- ÉCRIN is a working name and has not been trademark-cleared. No house marks or monograms are used.
