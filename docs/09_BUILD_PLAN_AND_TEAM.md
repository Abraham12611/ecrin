# 09 — Build plan, parallel work and ownership

## Delivery strategy

The only safe way to work in parallel is to **freeze the shared component and switching contracts first**, then develop variants independently against that contract. Five developers making five independent player pages would create integration risk and violate the product concept.

## Phase 0 — Definition and foundation (blocker)

**Lead engineer + design lead**

- Confirm name ÉCRIN and five IDs. Choose one React/HTML Video.js v10 integration path.
- Bootstrap with official Video.js v10 skin creation workflow and video preset / Scaffold; verify exact imports against installed version.
- Define stable media component hierarchy; write control/appearance TypeScript contracts and CSS tokens.
- Establish source assets and a demo video, with caption track if available.
- Agree standard player dimensions, responsiveness, focus semantics and reference screenshot set.
- Create issue/PR template and freeze cross-team APIs.

**Gate:** one functional neutral ÉCRIN player with required native semantics and an empty Appearance menu.

## Phase 1 — Shared skin engine and settings (parallel with first visual exploration)

**Player engineer**: actual Video.js controls; stable player instance; time, volume, caption and fullscreen behavior, loading/error states.

**Settings engineer**: five choice radio cards, menu navigation, selected/focus states, local persistence, no-remount switching; avoid changing video source.

**Design systems engineer**: tokens, base shell geometry, typography, buttons, focus, compact layout, icon sizes, asset conventions.

**QA/automation engineer**: automated basic playback test, preservation assertions, keyboard path, responsive screenshot framework.

**Gate:** cycle through all five temporary minimal variants without playback interruption and with proper keyboard focus and storage fallback.

## Phase 2 — Five art-directed implementations (parallel)

| Workstream | Owner | Main deliverable | Dependencies |
|---|---|---|---|
| Voyage | Variant engineer + designer A | Clasp, strap seek, functional zipper volume, frame | shared volume/seek contracts |
| Bridle | Variant engineer + designer B | Buckle seek, leather pull volume, frame | shared seek/control contracts |
| Horlogerie | Variant engineer + designer C | Crown volume, precision rail, metal frame | shared volume/control contracts |
| Folio | Variant engineer + designer D | Fold-out settings visual, minimal leather, stitched rail | settings slots/overlay contract |
| Grand Tourer | Variant engineer + designer E | illuminated rail, rotary volume, cockpit frame | shared controls and theme tokens |

Engineers implement each variant behind a public `SkinId` (not their own `<Player>`), with tests and desktop/mobile screenshots. Designers must not treat initial AI images as exact production specs. Variant PRs should touch only own module CSS/assets/components plus approved shared token changes.

**Gate:** each variant runs independently on the stable demo player, with one unmistakable material silhouette, clear control semantics and compact layout.

## Phase 3 — Integration and quality

**Coordinator/lead** merges and integrates PRs; engineers must not self-merge without explicit policy. Shared-menu state/focus and no-remount regression testing. Cross-variant video state tests (all 20 directed pair switches). Performance/image optimization. Caption, fullscreen, keyboard, reduced-motion and mobile checks. Resolve all P0 defects before polish features.

**Gate:** all five look distinct, and all five function. Passing visual QA in one skin is not enough.

## Phase 4 — Demo, packaging, owner acceptance

- Ship public HTTPS URL, accessible without login.
- Provide short transition video showing real media stays continuous through all five variations.
- Document setup, tests, source licenses, known limitations and version pins.
- Give **manual UI acceptance test steps to the user** (project owner). Owner completes manual assessment and returns feedback. Engineers own fixes from feedback.
- If relevant to challenge submission, verify rules and complete entry data.

## Optional multi-engineer assignment model

With 8 engineers: 1 core player, 1 settings/state, 1 shared styling, 4 variant engineers (Voyage+Folio combined, Bridle, Horlogerie, Grand Tourer), 1 QA/CI. With 12 engineers: 1 tech lead, 2 core/platform, 5 variants, 1 assets optimizer, 1 QA, 1 visual integration, 1 demo/deploy. Use as many contributors as useful; extra workers should not introduce duplicate ownership.

## Critical path and priority

1. Video.js real player ✅
2. Stable variant switcher ✅
3. Five visually distinct states ✅
4. All essential controls function across skins ✅
5. Mobile and keyboard/accessibility ✅
6. Refined material effects ✅
7. Optional decorative animations/colorways ❌ until essentials pass

## Issue slicing examples

- `CORE-01`: Scaffold baseline, source playback and stable media node.
- `CORE-02`: Shared semantic control row, error/status/captions.
- `SWITCH-01`: Appearance submenu and five previews.
- `SWITCH-02`: Persistence and video-state invariants.
- `DESIGN-01`: Theme token and asset standards.
- `SKIN-01`..`SKIN-05`: One per variant, acceptance criteria from respective brief.
- `QA-01`: Keyboard/contrast/responsive tests.
- `QA-02`: Switching-state and no-remount regression.
- `SHIP-01`: Public deploy/demo/README.

**PR rule:** a variant PR cannot update global media state management or change existing variants unilaterally; shared changes go through lead review. All manual UI testing is directed to the user.
