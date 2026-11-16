# 04 — In-player settings and variant switching

## Navigation and UI anatomy

All five variants expose a familiar **Settings** trigger (gear icon + accessible label). The trigger stays in a stable location relative to the rest of the essential controls. Open a single settings surface in the player, styled to suit the current variant without becoming a five-screen settings app.

```text
Video player
 └─ Settings (popover/dialog; whichever matches implemented interaction)
     ├─ Playback speed [only if supported]
     ├─ Captions / Audio / Quality [only where supported]
     └─ Appearance
          └─ Skin
               ○ Voyage           — trunk leather and zipper
               ○ Bridle           — saddlery and buckle
               ○ Horlogerie       — jeweler's watchmaking
               ○ Folio            — fine leather stationery
               ● Grand Tourer     — cockpit and rotary dial
```

Select a card with thumbnail + name + a single-line descriptor + selected indicator. Names must be readable without a picture. Do not mix the playback settings and full-page gallery. No account or purchase required.

## Switching behavior contract

1. Open Settings by click/tap or keyboard. Trigger is keyboard reachable and maintains a visible focus style.
2. Enter Appearance → Skin. Present five options in a vertical list or two-column grid depending on player width. Scroll **inside** settings if necessary without obscuring the entire page.
3. On click/Enter/Space or native-radio selection, apply the new variant **immediately**, without confirmation. The selection changes the frame, textures, layout details, and the key bespoke controls.
4. Preserve player instance, source, playback status, `currentTime`, duration, volume/mute, playback rate, captions and fullscreen. Variant changes MUST NOT call play/pause/seek explicitly or detach the video/media element.
5. Retain or gracefully restore focus to an active appearance option in the re-themed menu. If the menu must close, restore focus to the Settings trigger. The preferred behavior is **menu stays open** so another variant can be compared; provide a clear Back/Close control.
6. Update visible selected state and a polite status announcement, e.g. “Horlogerie appearance selected.”
7. Persist selection in local storage with try/catch, and fall back to Voyage if data is missing, invalid, or storage blocked.
8. If multiple players are present, variant choice may be shared as a user preference, but switching one should not unexpectedly detach/recreate another player. Establish consistent app-level policy before coding; demo may use one player.

## No accidental remounts

Do not use `key={variantId}` on the Video.js Player, its `Container`, or the underlying `<video>` element. Prefer a stable tree with a theme attribute on its root and variant-specific presentational elements/controls that do not cause playback element replacement. Avoid `src`/`poster` changes on appearance-only switch.

## Responsive menus

- Large player: right-anchored menu above the control deck, approximately 280–360 CSS px wide.
- Medium: narrower panel and one-column choices.
- Small embed: bottom sheet **inside player viewport** or compact accessible menu, covering only as much as necessary; scrolling within it must work; controls must not fall outside fullscreen boundary.
- Keyboard: Tab sequence logical, Escape closes submenu/menu, Enter/Space selects. If using a true menu pattern, implement its keyboard semantics correctly; simpler native radio inputs within a dialog are preferred for five choices.

## State machine

```text
closed -> settings/root -> settings/appearance -> closed
                           | choose variant
                           V
                       new skin applied
                           | menu remains open; active choice selected
```

Avoid nested popovers that can remain orphaned after the skin changes. Use one settings state manager. Clicking outside/closing should work and should never pause the video unless the platform default behavior explicitly dictates it.

## Persistence contract

- Key: `ecrin.skin.v1`
- Allowed values: `voyage`, `bridle`, `horlogerie`, `folio`, `grand-tourer`
- Unknown values: ignore and use `voyage`
- Storage errors: do not throw, do not block viewing
- Optional URL query parameter for demo: `?skin=folio`, sanitized; query takes precedence over saved preference for that page load, but does not need to overwrite saved preference without user selection

## Subtle material reveal

Switching should be a tasteful 120–240 ms fade of surrounding chrome or a restrained crossfade of decorative assets. **The video image is not part of the crossfade.** Avoid a full screen “opening trunk” animation for each change; elegance lies in stable continuity.

## P0 checklist

- [ ] All five accessible from within the player
- [ ] Switch while video playing, without interruption
- [ ] Switch in fullscreen, without leaving fullscreen
- [ ] No layout jump in player dimensions when applying variant
- [ ] Settings still usable after every switch
- [ ] Selected state announced and visually unmistakable
- [ ] Persistence / fallbacks work
