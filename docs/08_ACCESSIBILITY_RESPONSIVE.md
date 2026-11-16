# 08 — Accessibility, responsiveness, performance and graceful degradation

## Governing rule

The luxury metaphor is a **visual presentation of a known action**. It is never a condition of being able to operate the player. Every essential action must be keyboard reachable, labeled, discoverable, and usable without material effects.

## Keyboard and screen reader behavior

- Play/pause: button with appropriate action label and current state; Enter/Space.
- Seek: accessible slider with value/time, arrow key increments and (where supported by chosen primitive) Home/End or appropriate larger jumps. Announce elapsed/total meaningfully, without excessively verbose live updates.
- Volume: accessible volume slider with 0–100 percentage as appropriate, and independent mute toggle. Arrow keys should operate the value. The zipper/buckle/crown visuals must be decorative to assistive tech if a native semantic control handles their action.
- Settings: standard disclosure/dialog/popover semantics; visible open/close state, logical focus order, Escape behavior, focus restoration.
- Skin options: native radio group/fieldset or equivalently conforming radio pattern; selection visible in more than one cue; announce newly selected appearance.
- Fullscreen: available/unsupported state, exit keyboard behavior, readable controls after entry.
- Captions: caption toggle/selection only when tracks exist; caption overlay must not be covered by control chrome.
- Feedback: use Video.js's status announcer and error handling or equivalent; do not remove screen-reader state to achieve clean visuals.

## WCAG targets

Aim for WCAG 2.2 AA on in-player interactive UI. Normal text contrast generally ≥4.5:1; large text and meaningful icons/boundaries generally ≥3:1 where applicable. Do not rely on color alone. Aim for approx. 44×44 CSS px touch targets where layout allows, with compliant spacing alternatives. Ensure focus indicators are visible over leather, metal and video. Work at 200% zoom without clipping essential controls.

## Player sizes and adaptive rules

Use **container queries** or player-width measurements rather than only viewport breakpoints; Video.js may be embedded in a narrow desktop column. Starting targets (adjust based on actual content):

| Player width | Behavior |
|---|---|
| ≥ 900 px | Full materials, slim frame, single main control row, settings popover |
| 600–899 px | Condense decorative trim, may use compact rotary controls |
| 360–599 px | Simplify ornamental hardware, use 1–2 aligned rows, compact settings sheet |
| < 360 px | Essentials first: play, seek, time, mute (as supported), settings, fullscreen; optional controls secondary |

No horizontal overflow; preserve video aspect ratio; do not crop for visual shell. Shell silhouette must shrink without turning the video into a postage stamp. Captions and error messages remain legible.

## Failure and fallback scenarios

| Scenario | Required behavior |
|---|---|
| No CSS textures or image asset fails | Base semantic controls and video remain functional with plain fallback surfaces |
| Reduced motion | No automatic folding/glowing/rotating animation; all states remain readable |
| High-contrast/forced colors | Essential controls and focus survive without ornamental assets |
| Browser volume unsupported | Honest disabled/unavailable treatment; do not fake volume changes |
| Touch-only device | No hover-only settings; zipper/crown have thumb-safe alternatives |
| Slow connection / buffering | Actual buffering indicator, no misleading movement of playhead |
| Video source error | Clear message and recovery where applicable; no blank beautiful frame |
| Captions unavailable | Omit/disable caption control honestly, or show proper unavailable feedback |
| Fullscreen unsupported | Do not show a dead button |
| Storage blocked/private mode | Use default/same-session state, no crash |
| 16:9/4:3/portrait footage | Handle aspect ratios without distorting footage or blocking controls |

## Motion and rendering

- No autoplayed UI sounds.
- No 3D library requirement: SVG/CSS 2.5D should carry the visual quality.
- Material animation must not block pointer events, avoid covering video surface and avoid frequent heavy repaint.
- Prefer compositing transforms/opacity and static overlays. Pre-render smooth curves for watch/crown details.
- Limit shadows, blurs and raster sizes. Avoid expensive animated filters across video.

## Acceptance gate

Every variant must pass keyboard-only, touch, reduced-motion, 200% zoom, bright/dark video, storage-disabled, and 320/375/768/1280 CSS px checks. User performs final manual UI review; engineers provide automated evidence and exact steps.
