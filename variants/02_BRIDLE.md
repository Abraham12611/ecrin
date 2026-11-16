# Variant 02 — BRIDLE / The Saddlery Edition

**ID:** `bridle` · **Signature interaction:** buckle-as-playhead · **Reference:** [Equestrian concept](../references/02_bridle_equestrian_mockup.png)

## One-line identity

A saddle-maker's sense of tensile strength and grace: warm edge-painted leather, controlled stitchwork, polished buckles and a timeline conceived as a refined bridle strap.

## Distinction / silhouette

Soft corners, two small upper leather retention loops, tiny ring/buckle hardware details, and a stitched lower control band. The silhouette is lighter and flatter than Voyage. Keep the video square and cinematic; remove gratuitous equestrian imagery from the frame. The *screen content* can be anything—do not tie skin behavior to footage of horses.

## Materials and palette

Saddle brown (`#79452A`), slightly darker leather strap (`#4B281D`), satin pale brass (`#D0AA70`), parchment typography, restrained cognac stitching. Hardware should look strong, lightly worn and useful; no shiny luxury clichés.

## Controls

- **Play/pause:** low-profile circular embossed medallion with a conventional symbol in the middle; press state slightly recessed.
- **Seek:** slim continuous bridle strap spanning the control deck. A **working buckle** serves as the scrubber thumb. Ticks can resemble strap holes, but they are decorative; users must be able to seek to *every* point.
- **Volume:** a compact leather pull-tab on a short linear channel (distinct from Voyage's zipper), plus a separate mute icon. Label appears on keyboard focus and during interaction.
- **Time:** calm, lightly engraved sans numerals; larger than decorative stitching.
- **Settings:** a small punched-leather ticket card or tack-room wallet interface; still an accessible menu with a clear Appearance path.
- **Captions/fullscreen:** crisp icons framed by leather edge paint, not tiny gold ornamental marks.

## Signature behavior

The buckle glides on the strap as video plays; movement is exactly proportional to playback time. On interaction, slight shadow movement evokes genuine leather tension, but seek thumb must not lag behind the actual selected timestamp. Scrubbing thumb follows pointer directly, regardless of decorative easing.

On pause, the medallion subtly settles. Opening settings resembles lifting a small leather index tab; no elaborate fold animation required.

## States

Track must support played/unplayed/buffered distinction without relying on color alone. On hover/focus show visible timestamp and optional chapter name. Distinguish mute from volume=0. On unseekable content use an appropriate disabled treatment and do not fake timeline progress.

## Compact form

Upper retention loops disappear; strap seek becomes a simple leather-colored track with a high-contrast buckle-shaped thumb and large invisible hit area. Volume pull-tab may become a popover slider; critical time readout stays.

## Must-have deliverables

- Desktop + compact + hover/focus + scrub-in-progress views.
- Strap segments, buckle thumb (all states), medallion and short volume pull-tab as production-grade assets.
- Proven continuous seek and keyboard access. When `duration` unavailable the control handles it gracefully.

## Rejection conditions

A buckle seeking only between notches; control dominated by decorative horse imagery; equestrian motifs copied from a famous house; excessive grain; weak icon contrast; tab focus obscured by edge texture.
