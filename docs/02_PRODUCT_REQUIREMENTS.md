# 02 — Product requirements / scope

## Goal and success criteria

Deliver one fully working **Video.js v10** video player supporting **exactly five required variants** selectable from within settings. A user can switch appearance at any moment during playback; the controls remain recognizable and functional, and the new choice persists on refresh when browser storage is available.

## Mandatory user stories

- As a viewer, I can play/pause, seek, read current and total time, mute/unmute, adjust volume where browser permits, and enter/exit fullscreen.
- As a viewer, I open Settings → Appearance → Skin and choose Voyage, Bridle, Horlogerie, Folio, or Grand Tourer.
- As a viewer, I can recognize the active skin from a selected state and accessible text; a thumbnail is supplemental.
- As a viewer, switching skins does not restart or reload media; currentTime, paused state, current source, mute/volume, captions, playback rate and fullscreen are retained to the extent supported by the environment.
- As a keyboard user, I can reach the Settings trigger, choose a variant with standard button/radio interactions, close via Escape, and return focus predictably.
- As a mobile viewer, I can reach the same Appearance selector and essential controls; skeuomorphic gestures have accessible native or equivalent slider alternatives.
- As a user with reduced motion enabled, I can use every variant without decorative movement.
- As a returning viewer, the last selection is restored without flicker or a brief display of the wrong skin where feasible.

## P0: essential release

1. One Video.js v10 player wired to a real hosted media source.
2. Five visually distinct and finished skins.
3. One working variant selector nested in Settings; active selection accessible and visible.
4. State-preserving, instantaneous variant switching.
5. Responsive player and player menu in desktop/mobile embed sizes.
6. Real play/pause, seek, time, mute/volume (when supported), fullscreen, error/loading states.
7. Accessible keyboard, focus, labels, contrast and reduced motion.
8. Best-effort local preference persistence and safe fallback.
9. Automated smoke/e2e checks and owner-run manual acceptance steps.
10. A public URL requiring no sign-in.

## P1: valuable polish (only after P0)

- Caption and playback-rate options integrated where actual media/features support them.
- Small preview thumbnail per variant in Appearance.
- Subtle variant transitions that do not animate the video, reset focus, or flash.
- 1–2 colorways for selected skins, if they do not delay all five.
- Seek tooltip, buffered rail distinction, and graceful unavailable-state handling.

## Explicitly out of scope

- Full modular builder, drag-and-drop controls, marketplace, profile accounts, remote preset synchronization, merch shop, shopping cart, complex 3D engine, complex video effects, individually personalized monograms, force-enabling unsupported browser media features.
- Deceptive claims about original brand affiliations.

## Navigation and states

- Base: video, unobtrusive shell, essential controls, Settings button.
- Settings open: playback options + **Appearance** subpage.
- Appearance open: five cards, active indicator, descriptions; selection applies immediately.
- Focus state, buffering, paused, playing, ended, error, fullscreen, narrow embed.

## Non-functional goals (targets, not guarantees)

- Skin changes do not cause `src` changes, `load()` calls, or media element remounts.
- No new network request for video solely because the skin changed.
- No sideways scrolling at 320 CSS px usable player width.
- Menu and controls respond to pointer and keyboard; no hover-only discovery.
- Aim for 44×44 CSS px comfortable touch targets where possible; meet WCAG target-size and spacing requirements.
- Keep decorative assets modest and compressed; no full-frame raster player backgrounds with embedded text.

## Acceptance invariants

Switch from each variant to each other variant during active playback and paused states (5×4 directed switches, at least smoke-covered). At every transition: same video, no reset to `0`, no unexpected pause/play, focus restored to an appropriate in-player control, and no broken surface. On browser environments where volume is externally controlled, the UI must not fake changing hardware volume.
