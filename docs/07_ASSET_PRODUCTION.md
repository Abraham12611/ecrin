# 07 — Art pipeline: AI-generated references to production assets

## Principle

AI image generation is for **material exploration and source imagery**, not a substitute for functioning components. The five reference screenshots are **concept boards**. Do not crop out a play button from a flattened mockup and pretend it is a responsive component. Production UI is built in SVG/CSS/HTML/React with transparent raster assets only for decorative surface detail.

## Required asset breakdown for every variant

1. **Shell structure:** left/right/top/bottom frame pieces, corner caps, decorative seams.
2. **Play/pause:** consistent states and optical alignment; shape may vary.
3. **Seek:** track, thumb, progress fill, buffered segment, hover/focus treatment.
4. **Volume:** one tactile control, mute icon, numerical feedback; may require a simpler compact alternative.
5. **Settings:** trigger, panel backing, selected option tile; menu content always real text/controls.
6. **Utility:** captions, fullscreen, buffering/error indicator, focus ring.
7. **Five thumbnail previews:** consistent 16:9 crops of each completed player; do not bake critical labels into thumbnails.

## Formats

| Asset | Preferred format | Why |
|---|---|---|
| Simple icons, dial ticks, zipper teeth, corner outlines, buckle geometry | SVG | crisp scaling, animation, recoloring |
| Leather grain, wood veneer, brushed metal, realistic stitching detail | transparent PNG/WebP/AVIF (as appropriate) | natural realistic materials |
| Repeating subtle textures | tiny tileable WebP/PNG or procedural CSS | small bundles |
| Framing panel with corners | SVG pieces or nine-slice assets | no distorted borders on resize |
| Live playhead, progress fill, labels, focus rings | DOM/CSS/SVG driven by actual state | fully responsive and accessible |
| Mockup screenshots | PNG/WebP **references only** | design direction, not shipping UI |

JPEG is acceptable for video posters or editorial photos, not for controls needing transparency or clean edges. Generated SVG from image AI may be a vector *illustration*, not semantically correct or minimal source; designers/engineers must inspect and simplify paths.

## Example AI prompts (for art extraction, not flat mockups)

### Voyage shell

> Isolated front-facing luxury travel-case corner protector for a modern digital video player; custom unbranded aged brass hardware, rich espresso leather edge with delicate contrast stitching; realistic 2.5D industrial product-render material study; clean orthographic view, neutral light, transparent background, **no text, no logos, no controls, no scene**.

### Voyage volume zipper

> A modular horizontal brass zipper mechanism with leather pull tab, separate view of rail, teeth, and pull; tiny polished hardware, elegant restrained craftsmanship, straight-on orthographic interface asset, transparent background, **no branding, no words**.

### Bridle buckle

> Precision miniature saddle-strap buckle component, warm brushed brass, edge-painted cognac leather with stitch detail, centered front view, component isolated on transparent background, no lettering, no horse imagery, suitable as a 2.5D UI seek thumb.

### Horlogerie crown

> Ultra-refined watchmaker volume crown, champagne brushed gold, knurled sidewall, minimal bordeaux enamel inset with micro engraved marks, orthographic front view, studio lighting, transparent background, no brand marks or text.

### Folio fold-out panel

> Fine brown leather folio flap and suede lining, understated gold corner hardware, near-flat front-facing surface isolated, optimized for a modular settings popover background, no lettering, no buttons, transparent background.

### Grand Tourer dial

> Minimal grand touring cockpit volume knob, tactile dark nickel radial knurl, warm amber illumination ring, leather surround edge, precise studio product render, front view, transparent background, no automaker logo, no labels.

## Production process

1. Visual designer defines silhouette, scale, states, and component measurements in Figma (or equivalent) **before** generating surface materials.
2. Generate multiple reference views per component; select one coherent lighting/material family for each variant.
3. Reconstruct structural geometry as real code/SVG; crop decorative material pieces only when scalable.
4. Export @1x/@2x where needed; compress; inspect image seams and color profile. Keep alpha straight and avoid shadow boxes that clip.
5. Build semantic control; bind to Video.js state; skin with assets.
6. Test at 320, 375, 768 and 1280 CSS px, retina and normal screens, zoom 200%, light and dark footage.
7. Profile memory and image loads; remove unnecessary textures, duplicate exports, baked text and unreadable engraved labels.
8. Archive prompt, source image, editor modifications, license/usage notes, final export file and owning variant.

## Guardrails and provenance

Avoid generating recognizable luxury monograms, house iconography, protected print patterns, celebrity endorsements or false affiliation claims. Do not replicate existing handbag photograph details one-for-one. Use words such as *unbranded heritage leatherwork*, *precision watchmaking*, *fine saddlery* rather than naming a fashion house in prompts.

## Handoff per visual asset

`asset-id`, source/reference, target px dimensions, expected transform/scaling, light direction, supported states, alpha channel, compression, owner, license/provenance, and screenshot showing it within the UI. Design team should approve each asset integrated into a real player viewport; standalone beautiful product art is insufficient.
