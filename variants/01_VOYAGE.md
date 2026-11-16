# Variant 01 — VOYAGE / The Travel Trunk

**ID:** `voyage` · **Default skin:** Yes · **Signature interaction:** zipper volume · **Reference:** [Travel trunk concept](../references/01_voyage_trunk_mockup.png)

## One-line identity

A compact heirloom travel case whose polished corner furniture, stitched leather and working zipper transform a rectangular video player into a miniature object of journey and discovery.

## Distinction / silhouette

A thin espresso-leather wrapped perimeter with four protective metal corners, discreet top retaining straps, and a shallow lower band holding the controls. The **video dominates**: aim for a shell that frames rather than smothers content. Travel-case plausibility through craftsmanship—not actual handles, wheels, large decorative locks or monogram patterns. Avoid the outsize upper straps seen in the early art reference if they crowd the footage.

## Materials and palette

Deep espresso leather (`#38231E`), cinnamon thread, antique satin brass (`#C8A36B`), near-black inset control well, muted ivory labels. Grain should be subtle; metal not mirror-bright. Fine double-line seam at frame edges; consistent 2.5D lighting from upper left.

## Layout and components

- **Screen:** level glass with narrow dark gasket inset; no curved video distortion.
- **Play/pause:** brass clasp-inspired *housing* with large conventional triangle/pause icon. The control depresses by a few pixels rather than opening the whole case.
- **Seek:** thin inset leather strap with metal keeper as thumb; played portion marked by an engraved brass line. Even if branded as a strap, maintain a full-length seekable range.
- **Volume:** horizontal **zipper** placed near the right, with visible teeth and an oversized pull tab. Moving pull right increases volume; left reduces it. Speaker/mute icon is separate and clearly labeled. An optional percentage bubble appears while dragging.
- **Time:** small ivory engraved-style numerals, tabular, never burned into leather raster.
- **Settings:** normal gear in a fine brass square. Panel appears as a restrained lining-like insert, not a full-size hinged suitcase.
- **Fullscreen/captions:** polished engraved black-on-brass button faces with readable icons.

## Core states and transitions

- Idle: contrast-rich control deck with no glare.
- Playing: very slight brass highlight on active progress, not an animation loop.
- Paused: clasp becomes recessed and pause icon resolves correctly.
- Muted: zipper may retain last volume position (volume and muted are distinct); mute glyph changes explicitly. Do **not** incorrectly move zipper to zero just because user muted if underlying volume value is remembered.
- Seek hover: timestamp tooltip above keeper; optional small preview thumbnail.
- Settings: light movement of panel as if sliding out of lining (150–180ms) with reduced-motion fallback.
- Error: readable text over opaque panel, no hardware metaphor hiding cause.

## Compact form

At narrow widths, corner treatments become small SVG caps; remove decorative top straps. The zipper collapses to a small button opening an accessible horizontal or vertical volume popover if supported. Seek/thumb and control hit areas remain generously sized. Do not squeeze realistic zipper teeth into a 70 px control that is unusable.

## Must-have deliverables

- Desktop and compact mockups (base, settings, zipper active).
- SVG corner caps, strap seek thumb, clasp button art, zipper teeth/track/pull; optional compressed grain tile.
- Functional volume mapping and exact keyboard focus states.
- Real player video state preservation when switching to/from this variant.

## Design review rejection conditions

Gaudy luggage ornament; fake zipper that cannot be dragged; play button not recognizable; overthick shell; real LV/Hermès motifs; text too small; no accessible volume fallback.
