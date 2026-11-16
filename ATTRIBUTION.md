# Attribution and provenance

## Code
Apache License 2.0 (see `LICENSE`). Built on [Video.js v10](https://videojs.org) (`@videojs/react`, Apache-2.0 / MIT per package), React, Vite, hls.js.

## Generated imagery (`public/assets/*.webp`, `public/assets/og.jpg` source art)
Generated for this project with OpenAI GPT Image 2.6 (Sunburst) via fal.ai, from original text prompts (no reference images, no brand names). Prompts forbade text, logos and monograms. Raw outputs were trimmed, resized and compressed with `sharp` (`scripts/process-assets.mjs`).

| File | Subject |
|---|---|
| `voyage-corner`, `voyage-clasp`, `voyage-zipper-pull` | Brass luggage corner cap, latch clasp, zipper pull (transparent PNG source) |
| `bridle-buckle` | Satin pale-gold bridle strap buckle |
| `horlogerie-crown` | Milled champagne watch crown with ruby cabochon |
| `gt-knob` | Knurled dark-nickel rotary knob with amber notch |
| `leather-espresso`, `leather-saddle`, `leather-walnut`, `leather-onyx` | Leather textures |
| `metal-champagne`, `enamel-bordeaux`, `veneer-walnut` | Metal, enamel and veneer textures |

## Media
Demo video is a Mux demo asset streamed from `stream.mux.com` (playback ID in `src/player/EcrinPlayer.tsx`). It is not redistributed in this repository.

## Reference mockups
`references/*.png` are concept art from the original brief. They contain an obsolete "KITBASH" label, are not shipped in the built app, and must not be used in public-facing ÉCRIN material.

## Brand note
No third-party luxury marks, monograms, or protected patterns are used. ÉCRIN is a working name and has not been trademark-cleared.
