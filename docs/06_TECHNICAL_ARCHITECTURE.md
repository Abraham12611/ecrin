# 06 — Technical architecture and reference contracts

## Architecture decision record

**Decision:** One stable Video.js v10 player instance + one custom ÉCRIN skin layer + five typed visual variants. The **outer skin/asset presentation changes**, the **underlying video stays mounted**. Do not fork separate player stacks per variant. Choose React/TypeScript for the demo shell and typed state if team prefers it, but the skin itself must use actual Video.js v10 components/APIs—not native `<video>` with mock controls pretending to be Video.js.

Official guides: [Build your own skin](https://videojs.org/docs/framework/react/guides/build-your-own-skin), [HTML skin guide](https://videojs.org/docs/framework/html/guides/build-your-own-skin), [React custom component](https://videojs.org/docs/framework/react/guides/build-your-own-component), [HTML custom component](https://videojs.org/docs/framework/html/guides/build-your-own-component). Verify exact versions/imports from the installed package before coding: Video.js v10 is evolving.

## Suggested file structure

```text
src/
  app/                 # demo page and media source selection
  player/
    EcrinPlayer.tsx    # stable <Player>/<Container>/media composition
    EcrinSkin.tsx      # presentational surface; variant context
    settings/
      AppearanceMenu.tsx
      SettingsMenu.tsx
    controls/
      PlayPause.tsx
      Seek.tsx
      Time.tsx
      Volume.tsx
      Fullscreen.tsx
      Captions.tsx
    variants/
      registry.ts
      voyage.tsx
      bridle.tsx
      horlogerie.tsx
      folio.tsx
      grandTourer.tsx
    style/
      tokens.css
      base.css
      voyage.css
      bridle.css
      horlogerie.css
      folio.css
      grand-tourer.css
  assets/
    voyage/ bridle/ horlogerie/ folio/ grand-tourer/
  tests/
    skin-switch.test.ts
    playback-invariants.test.ts
    keyboard-access.test.ts
    responsive.spec.ts
```

## Shared typed configuration

The following is valid **TypeScript application-level code** (not a promise of exact Video.js imports):

```ts
export const SKIN_IDS = [
  'voyage', 'bridle', 'horlogerie', 'folio', 'grand-tourer',
] as const;
export type SkinId = typeof SKIN_IDS[number];
export type SkinDefinition = {
  id: SkinId;
  label: string;
  description: string;
  className: string;
  preview: string;
};
export const SKINS: Record<SkinId, SkinDefinition> = {
  voyage: { id: 'voyage', label: 'Voyage', description: 'Travel-case craft and zipper volume', className: 'ecrin--voyage', preview: '/skins/voyage.webp' },
  bridle: { id: 'bridle', label: 'Bridle', description: 'Saddlery and buckle seeking', className: 'ecrin--bridle', preview: '/skins/bridle.webp' },
  horlogerie: { id: 'horlogerie', label: 'Horlogerie', description: 'Precision watchmaking', className: 'ecrin--horlogerie', preview: '/skins/horlogerie.webp' },
  folio: { id: 'folio', label: 'Folio', description: 'Smooth leather and stitched detail', className: 'ecrin--folio', preview: '/skins/folio.webp' },
  'grand-tourer': { id: 'grand-tourer', label: 'Grand Tourer', description: 'Touring cockpit and illuminated rail', className: 'ecrin--grand-tourer', preview: '/skins/grand-tourer.webp' },
};
export function isSkinId(s: unknown): s is SkinId {
  return typeof s === 'string' && SKIN_IDS.some(id => id === s);
}
const STORAGE_KEY = 'ecrin.skin.v1';
export function loadSkin(): SkinId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return isSkinId(raw) ? raw : 'voyage';
  } catch { return 'voyage'; }
}
export function saveSkin(s: SkinId): void {
  try { localStorage.setItem(STORAGE_KEY, s); } catch { /* viewing still works */ }
}
```

## React wiring principle (illustrative, not a drop-in integration)

```tsx
function EcrinExperience() {
  const [skin, setSkin] = useState<SkinId>(() => loadSkin());
  const selectSkin = (next: SkinId) => {
    setSkin(next); // ONLY changes skin presentation, never media source.
    saveSkin(next);
  };
  return (
    <PlayerShellProvider skin={skin} onSelectSkin={selectSkin}>
      <StableVideoJsPlayer>
        <EcrinSkin skin={skin} />
      </StableVideoJsPlayer>
    </PlayerShellProvider>
  );
}
```

`PlayerShellProvider`/`StableVideoJsPlayer` are *project placeholders* for engineers to implement with current Video.js React APIs. They are **not** real documented Video.js exports. Preserve stable identity of `<Player>` / `<Container>` / media; never use the skin ID as their React `key`. If a specific variant must change control layout, local child controls can render differently, but the media instance and Video.js store must remain fixed.

## Official API mapping

Use built-in Video.js v10 play/pause, time slider, volume slider/mute, fullscreen, time display, captions and menus where possible. For truly custom physical behavior, bind to the same feature state/actions. The current Video.js custom-component guide documents: `play()/pause()`, `seek()`, `setVolume()/setMuted()`, `requestFullscreen()/exitFullscreen()`; React's preset-typed `usePlayer` is illustrated on that guide. Confirm media state availability for browser/device and handle unsupported controls gracefully.

## Theme switching and asset loading

- Attribute/class on skin root: `data-ecrin-skin="voyage"`; CSS variables and layered imagery respond.
- Avoid five duplicated Video.js event subsystems.
- Preload current preview and on-demand next variant visual assets; use fixed intrinsic frame dimensions to avoid layout shifts.
- For large textures, use CSS border-image or nine-slice strategies, SVG overlays, or `object-fit` for nonstretched sections.
- Avoid expensive blur/filter loops over the playing video and continuous high-frequency visual effects.
- Avoid source or player reinitialization when switching appearance; test network panel for unintended media reloads.

## Media and feature state invariants

Take snapshots of: media `src`, `currentTime`, `paused`, `muted`, `volume`, `playbackRate`, caption selection, fullscreen and buffered source. Switch skin. Re-read; values should be preserved within normal playback progress tolerances. Captions, quality, PiP and volume may depend on the chosen source or platform—disable absent controls rather than simulate them.

## Loading and hydration

Resolve the persisted skin before first visible frame where possible to prevent Voyage flash before, e.g., Folio restores. Safe fallback to Voyage for invalid data. Server-side environments cannot read localStorage; use a predictable default and minimal hydration surface or client-only preference resolution that does not discard media.

## Testing approach

Unit: registry, persistence validation, menu state reducer. Integration: player DOM stability, state invariants, built-in control feature wiring. End-to-end automation: all five selections, playback unaffected, keyboard/focus, screenshots at defined sizes. Human visual acceptance belongs to owner/user (see QA document).
