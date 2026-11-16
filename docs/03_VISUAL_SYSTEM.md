# 03 — Shared visual system

Five aesthetic worlds, one house standard. Variants should share geometry rules, text semantics, accessible states and information architecture, while expressing their own materials and hero controls.

## Foundation tokens

- Spatial rhythm: 4 px base, 8 px normal increment; larger 12/16/24/32 px step-ups.
- Touch: interactive hit area typically **44×44 px**, including when decorative control art is smaller.
- Type: calm humanist or grotesk sans for functionality; display serif only for small brand name or non-critical variant titles.
- Times: tabular numerals, e.g. `02:18 / 07:26`. Never use ornamental display fonts for timestamps.
- Video field: default crisp rectangle with discreet 8–18 px interior rounding if required; do not crop content or distort aspect ratio for the sake of a curved-screen illusion.
- Chrome: thin framing is preferred; desktop control deck proportional to player; compact mode uses 1–2 efficient rows.
- Texture: close-up nuance (grain, tooling, stitching) rather than high-contrast pattern covering controls.
- Focus: clear, visible focus ring independent from leather/brass textures.
- Motion: short 120–240 ms transitions for panels; state changes faster than decorative movement; reduced-motion disables nonessential transitions.
- Material fidelity: subtle contact shadows, consistent lighting direction, sharply defined silhouette, realistic hardware but not photorealistic clutter.

## Suggested shared semantic tokens

```css
.ecrin {
  --ecrin-ink: #f1eee7;
  --ecrin-focus: #7dd3fc;
  --ecrin-tap-min: 44px;
  --ecrin-radius: 12px;
  --ecrin-chrome-size: 68px;
  --ecrin-motion: 180ms;
  color: var(--ecrin-ink);
}
.ecrin:focus-within { /* Do not remove individual :focus-visible rings. */ }
@media (prefers-reduced-motion: reduce) {
  .ecrin { --ecrin-motion: 0ms; }
}
```

This is a conceptual token contract, not a finalized package API. Engineers should preserve/forward the public Video.js skin CSS properties such as `--media-accent-color` where relevant.

## Material palettes (direction, not exact sampling)

| Variant | Base | Metal | Accent | Surface finish |
|---|---|---|---|---|
| Voyage | Espresso `#38231E` | Aged brass `#C8A36B` | Cognac `#995C34` | Fine leather, seam and corner caps |
| Bridle | Saddle `#79452A` | Satin gold `#D0AA70` | Ivory `#F1E8DA` | Leather edge paint, reins, buckles |
| Horlogerie | Bordeaux `#4F172C` | Champagne `#CBB28A` | Ruby `#9E3150` | Brushed metal, engraved rail, enamel |
| Folio | Walnut `#69422F` | Warm brass `#BFA17A` | Linen `#E9DFCE` | Minimal smooth leather and felt |
| Grand Tourer | Onyx `#181716` | Dark nickel `#8F8578` | Amber `#EA9C50` | Leather grip, veneer, illuminated gauge |

## Component appearance rules

Each variant must specify: frame profile, play/pause housing, seek track + thumb, time display treatment, volume control, mute indication, captions/fullscreen icon treatments, settings trigger, expanded settings surface, responsive compact form, and error/loading styling. Avoid letting any variant be nothing more than a hue or texture swap.

## Contrast and semantic invariants

- Never allow material texture to reduce the contrast of functional labels.
- Do not rely on a glossy change, metallic glint or stitching alone to convey playing/paused/muted/selected/disabled states.
- Reserve a solid dark or light surface under essential icons when content behind the control is unpredictable.
- Keep icon meanings consistent across variants; a clasp may **contain** a play triangle, but should not replace it entirely.
- Screen reader labels must describe actions and states, not materials: e.g. “Volume, 60 percent”, not “Pull zipper”.

## Brand treatment

Small `ÉCRIN` logo/name and a restrained variant label may be included on the case, but the video itself should not be watermarked. Do not use existing fashion brands' typography, house monograms, or logos. Mockup references contain obsolete KITBASH stamps—remove them in production.
