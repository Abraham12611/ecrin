# ÉCRIN — The Art of Playback
### Luxury-inspired Video.js v10 skin collection | Creative + engineering handoff | 15 November 2026

> **Decision:** Build **ONE** Video.js v10 skin system with **FIVE** selectable design variants, available from **Settings → Appearance → Skin**. Do not build five independent media players. Do not call this project KITBASH.

**Name:** ÉCRIN (ASCII slug: `ecrin`). In French, *écrin* refers to a protective case for something precious. This is a working creative name, **not a cleared trademark**. Replace with another original name if clearance fails. **Tagline:** *The art of playback.*

**The brief in one sentence:** Treat a video player as an exquisitely designed object whose physical controls borrow from heritage craftsmanship, watchmaking, saddlery, bookbinding, and grand touring—without compromising modern playback behavior.

## Required five variants

| Variant (ID) | Inspiration | Signature control | Reference |
|---|---|---|---|
| **Voyage** (`voyage`) | Travel trunk and fine luggage | Zipper volume + clasp play | [Image](../references/01_voyage_trunk_mockup.png) |
| **Bridle** (`bridle`) | Saddlery/equestrian craftsmanship | Buckle seek + leather-pull volume | [Image](../references/02_bridle_equestrian_mockup.png) |
| **Horlogerie** (`horlogerie`) | Watchmaker and jeweler precision | Crown volume + calibrated time rail | [Image](../references/03_horlogerie_watchmaker_mockup.png) |
| **Folio** (`folio`) | Leather folio and fine stationery | Stitched-ribbon timeline + fold-out settings | [Image](../references/04_folio_mockup.png) |
| **Grand Tourer** (`grand-tourer`) | Refined touring-car cockpit | Illuminated seek rail + tactile volume dial | [Image](../references/05_grand_tourer_mockup.png) |

**Important:** The five reference images are *concept art*, not production-ready assets, exact layout measurements, or functional evidence. They include an **obsolete KITBASH label** from exploratory work. All visible branding in the delivered product must be **ÉCRIN**, not KITBASH. Do not copy recognizable Louis Vuitton or Hermès trademarks, logos, monograms, or protected print patterns. This is an independent luxury craft interpretation.

## Document map — read in order

1. [Creative vision / design principles](01_CREATIVE_VISION.md)
2. [Product and behavioral requirements](02_PRODUCT_REQUIREMENTS.md)
3. [Shared visual system](03_VISUAL_SYSTEM.md)
4. [Settings and switching flows](04_SETTINGS_AND_VARIANT_SWITCHING.md)
5. [Reusable components](05_COMPONENT_CATALOG.md)
6. [Architecture, persistence, code contracts](06_TECHNICAL_ARCHITECTURE.md)
7. [AI and production asset workflow](07_ASSET_PRODUCTION.md)
8. [Responsive, accessibility and performance rules](08_ACCESSIBILITY_RESPONSIVE.md)
9. [Phases, parallel ownership, delivery](09_BUILD_PLAN_AND_TEAM.md)
10. [QA / test cases / definition of done](10_QA_ACCEPTANCE.md)
11. [Demo and source links](11_DEMO_AND_REFERENCES.md)
12. Individual design briefs: [Voyage](../variants/01_VOYAGE.md), [Bridle](../variants/02_BRIDLE.md), [Horlogerie](../variants/03_HORLOGERIE.md), [Folio](../variants/04_FOLIO.md), [Grand Tourer](../variants/05_GRAND_TOURER.md).

## Scope and primary experience

Open the page → see a functional, gorgeous video in the default **Voyage** skin → press the familiar Settings control → select **Appearance / Skin** → browse five labeled cards with miniature previews → select a variant → visual shell and controls change immediately without recreating the media element, restarting video, resetting volume, leaving fullscreen, or dropping caption preferences. The chosen variant persists on refresh where storage is allowed.

The player is the product. An editorial showcase page may provide context, but **never substitute a static mockup for a functioning Video.js v10 player**. Every variant must have complete essential controls and mobile behavior. On narrow players, preserve interaction semantics and simplify the material treatment.

## Firm design decisions

- **One player, five visual presentations.** The active media source is stable while skins change.
- **Single settings entry point.** Inside the player: Playback/Audio/Captions as supported, plus **Appearance → Skin**. No large builder interface.
- **One distinctive interaction per variant**, with restrained supporting details—not five flamboyant gimmicks simultaneously.
- **Visual extravagance is optional; accessibility is not.** The semantic control remains an actual button or slider.
- **No account, database or commerce required.** Store an optional preferred variant locally.
- **Manual UI acceptance tests are assigned to the project owner/user.** Engineers provide reproducible instructions and evidence; they do not treat their own manual UI checks as owner signoff.

## Delivery artifacts expected from engineers

- Git repository with reusable `EcrinSkin` implementation and clean README.
- Live public page with Video.js v10 playback and five selectable, implemented variants.
- Assets with licenses, prompts/provenance and optimized exports.
- Short demo showing switching without losing media state.
- Automated tests, accessibility test evidence and a user-run manual acceptance checklist.
- Optional separate screenshots for each variant in desktop and compact states.

**Status of this package:** design + implementation specification only. It does not claim any variant has been built, verified or deployed.
