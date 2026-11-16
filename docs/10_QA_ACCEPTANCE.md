# 10 — QA acceptance matrix and user test protocol

## Definitions

- **Automated engineering checks:** unit/integration/e2e tests written and executed by engineers. This is not the same as manual UI acceptance.
- **Manual UI acceptance:** explicitly assigned to the owner/user. Engineers prepare instructions/screenshots/recordings; the owner performs human interaction tests and signs off.
- **P0 blockers:** player not based on Video.js v10; missing variant; video resets when changing skin; missing play/seek/mute/fullscreen; inaccessible settings; fatal mobile overflow; false impression of functioning control.

## Automated test scenarios

| ID | Setup | Action | Expected |
|---|---|---|---|
| A01 | Voyage loaded, paused | Open Appearance | 5 options, Voyage selected |
| A02 | Video playing at ~45s | Switch Voyage → Horlogerie | same media, currentTime advances naturally, remains playing |
| A03 | Video paused at ~45s | Switch Bridle → Folio | remains paused at same timestamp |
| A04 | Volume=0.65, muted=false | Switch to Grand Tourer | volume=0.65, no unintended mute |
| A05 | Muted=true, volume=0.65 | Switch to Voyage | muted remains true and remembered volume remains 0.65 |
| A06 | Captions track active, playbackRate=1.25 | Switch skin | track/rate persist if available |
| A07 | Fullscreen active | Switch skin | stays fullscreen where supported |
| A08 | Skin selected, page refreshed | Reload | saved skin applied; no crash |
| A09 | Invalid storage `ecrin.skin.v1=bad` | Reload | Voyage fallback |
| A10 | Storage blocked | Load/switch | no crash, can use player |
| A11 | Keyboard only | Open, navigate, select, Escape | focus visible, radio semantics, focus return |
| A12 | Touch | Drag zipper/buckle/crown | actual underlying media value changes |
| A13 | Playhead near end | Switch | no restart or unexpected `ended` transition |
| A14 | Unavailable volume or fullscreen | Render | honest disabled/hidden control |
| A15 | Narrow container 320px | Render & settings | no horizontal scrolling, no lost essential controls |
| A16 | Reduced motion | Switch and open menu | no nonessential animations |
| A17 | Bright and dark footage | controls visible | appropriate contrast and stable focus ring |
| A18 | Video error | trigger error | understandable accessible error state |
| A19 | 5 skins × 4 other skins | switch each ordered pair | player DOM/media stable; no crash |
| A20 | 200% browser zoom | control UI | no clipping or pointer obstruction |

## Variant-specific tests

**Voyage:** zipper accurately maps visual position to volume, keyboard and tap work; mute retains separate state.

**Bridle:** buckle seeks continuously, not only to holes/ticks; thumb drag doesn't get stuck beneath hardware texture.

**Horlogerie:** crown's value follows semantic volume; drag angle clamps; supports keyboard alternative; no sound.

**Folio:** fold-out menu opens/closes/focuses correctly; no content hidden behind fold; reduced-motion path works.

**Grand Tourer:** illuminated seek rail maps to real time and buffered state; dial and mute independent; no animation-based false progress.

## Appearance switch stress test

Repeat: while playing → Voyage → Bridle → Horlogerie → Folio → Grand Tourer → Voyage. At each step inspect actual player `currentTime` without manually resetting it. In a separate test toggle mute, subtitles, fullscreen; repeat. Assert no new media element, no video reload, no lost focus. Do not use fake timed `setTimeout` restoring state after remount as the solution.

## User manual UI acceptance script (perform personally)

1. Open deployed link on desktop; start playback and scrub halfway.
2. Open Settings → Appearance → Skin; choose each of the five variants without pausing video.
3. Check all main controls with mouse; verify each tactile metaphor is clear but not in the way.
4. Repeat at mobile browser width or actual phone. Rotate where applicable, enter/exit fullscreen.
5. Run keyboard-only: Tab, Shift+Tab, Enter, Space, arrows, Escape; observe focus and menu return.
6. Watch over bright/dark footage and verify control readability.
7. Repeat with system “Reduce motion” enabled; check no unwanted animation.
8. Reload after choosing one skin; confirm persistence. Clear preferences and confirm default.
9. Report screenshots and notes to engineers; they fix and return new build for follow-up acceptance.

## Bug report fields

`variant`, `viewport/player width`, `browser/OS`, `media source`, `steps to reproduce`, `expected`, `actual`, `screenshot/recording`, `keyboard/touch mode`, `priority`, `test run date`.

## Definition of done

- [ ] All five complete variants present in Appearance menu and public deployment.
- [ ] The media source/player stays stable across switching.
- [ ] All required controls operate for each variant in supported environments.
- [ ] Automated critical checks green and results shared.
- [ ] No P0 accessibility or responsive failures.
- [ ] Asset sources/permissions documented; no other-house brand copying.
- [ ] User manual acceptance completed and documented.
- [ ] Optional bonus features deferred rather than blocking essentials.
