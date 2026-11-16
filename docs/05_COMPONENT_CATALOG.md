# 05 — Component catalog and interaction semantics

The same media actions are expressed through bespoke control shells. **Do not invent five separate playback engines.** Separate control semantics from decorative visual treatments.

## Shared component API proposal

```text
EcrinPlayer
  StableVideoJsPlayer
  EcrinSkin (data-skin="voyage|bridle|horlogerie|folio|grand-tourer")
    MediaScreenShell
    MediaSurface / Video
    CoreTransport
      PlayPauseButton
      TimeReadout
      SeekControl
      VolumeControl + Mute
      CaptionsControl (if supported)
      SettingsButton
      FullscreenButton
    AppearanceMenu
    Status / Buffering / Error / ScreenReaderAnnouncements
```

## Control acceptance matrix

| Control | Shared semantics | Variant visuals | Important edge cases |
|---|---|---|---|
| Play / pause | Native/built-in button equivalent, state label | clasp, medallion, pusher, embossed tile, illuminated switch | paused, playing, ended, error |
| Seek | continuous timeline, accurate drag and keyboard seek | leather keeper, buckle, jewel thumb, stitched rail, lit track | unknown duration, long duration, touch |
| Time | actual elapsed/duration | engraved plaque, stitched tab, watch dial, minimalist inset, digital gauge | tabular numerals; unknown duration |
| Volume | actual volume where supported + separate mute | zipper, leather pull, crown, compact slider, machined rotary | volume disabled on some mobile platforms |
| Mute | clear on/off action | visually distinct icon or interruption | keyboard state and aria label |
| Settings | opens same canonical menu | luggage tray, tack-card, precision panel, folio flap, console drawer | Escape, focus return, scrolling |
| Captions | built-in state when available | small engraved CC chip | track availability, subtitles don't conflict with bars |
| Fullscreen | actual browser fullscreen where supported | expand corners in appropriate hardware | platform unavailable state |
| Loading/error | honest status and accessible message | discreet motif | no decorative animation masking an error |

## Mechanical interaction specifications

### Voyage zipper volume

- A **linear range input/control** from 0 to 100%. Dragging the zipper pull exposes more teeth as volume rises; reducing closes them. The visual metaphor is a one-dimensional control; use either left-to-right or bottom-to-top consistently.
- Support click-to-position, touch drag, ArrowUp/ArrowRight to increase, ArrowDown/ArrowLeft to decrease; Home/End and proper focus ring. Use tested native slider / Video.js volume slider semantics where possible.
- Show a persistent volume/mute icon and numerical percent on focus or drag. Do not interpret the decorative zipper as the only source of truth.
- No actual zipper sound by default. Use 2D/CSS/SVG layers and an optimized transparent asset; never require physics simulation.
- On constrained devices where application volume cannot be adjusted, show supported mute control/fallback and do not display a fake responsive zipper.

### Bridle buckle seek

- A continuous time-slider shaped like a narrow bridle strap, buckle as visual thumb.
- The track stays a fully semantic seeker, not a series of discrete notches. Chapters may have tiny studs but must never interfere with drag.
- Tooltip shows real timestamp; real focus-visible ring surrounds an appropriately sized interaction handle.

### Horlogerie crown volume

- Decorative circular crown responds to drag/wheel or keyboard, but a conventional slider semantics/control is essential. Consider click/drag around crown with angle mapping clamped 0–100%; make interaction forgiving, not precision watchmaking.
- The crown is a volume control, **not** a playback-speed control; consistent accessible label “Volume”.
- Prefer visible numeric volume on interaction; muted state explicit.

### Folio stitched-ribbon seek

- Crisp linear progress rail with stitched texture drawn at low contrast. A polished keeper or rivet serves as thumb; interactive hit area larger than its visible footprint.
- Settings opens as a hinged card/flap only as a modest visual transition, still a real popover/dialog with a reliable close button.

### Grand Tourer illuminated controls

- Play/pause uses a prominent rotary-style or round transport switch with clear triangle/pause icon.
- Seek is a luminous horizontal rail with metal thumb; do not make light intensity the only representation of progress.
- Volume is a knurled dial with segmented arc and clear mute state.

## Component boundaries

- **Presentation:** SVG paths, 2.5D light/shadow, texture, CSS transforms, decorative layering.
- **Interaction:** semantic control, state, focus, hit testing, keyboard/pointer events.
- **Video.js:** playback store, actual media currentTime/volume, captions, fullscreen, error/status.

The visual layer may be swapped while the interaction/control remains linked to the same Video.js state. The most reliable implementation often styles the built-in Video.js component and mounts a decorative icon or knob inside it, rather than inventing a parallel control.

## Do-not-do list

- Fake volume controls that do not change media state; zipper as a pure image.
- Range inputs built from non-semantic divs with no keyboard access.
- Permanent logos or decorative flaps over the actual media image.
- Settings buried behind an unlabeled physical latch with no gear affordance.
- Automatic playback when changing the visual skin.
