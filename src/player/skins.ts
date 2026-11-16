export const SKIN_IDS = ['voyage', 'bridle', 'horlogerie', 'folio', 'grand-tourer'] as const;
export type SkinId = (typeof SKIN_IDS)[number];

export type SkinDefinition = {
  id: SkinId;
  label: string;
  description: string;
  /** Assets used by the skin, preloaded on hover/focus of its Appearance option. */
  assets: readonly string[];
};

export const SKINS: Record<SkinId, SkinDefinition> = {
  voyage: {
    id: 'voyage',
    label: 'Voyage',
    description: 'Travel-case leather and zipper volume',
    assets: ['leather-espresso', 'voyage-corner', 'voyage-clasp', 'voyage-zipper-pull', 'mobile-voyage-corner', 'mobile-voyage-plate'],
  },
  bridle: {
    id: 'bridle',
    label: 'Bridle',
    description: 'Saddlery and buckle seeking',
    assets: ['leather-saddle', 'bridle-buckle', 'mobile-bridle-dring'],
  },
  horlogerie: {
    id: 'horlogerie',
    label: 'Horlogerie',
    description: 'Watchmaking and a crown volume dial',
    assets: ['metal-champagne', 'enamel-bordeaux', 'horlogerie-crown', 'mobile-horlogerie-corner'],
  },
  folio: {
    id: 'folio',
    label: 'Folio',
    description: 'Quiet leather stationery and stitched ribbon',
    assets: ['leather-walnut', 'mobile-folio-ribbon'],
  },
  'grand-tourer': {
    id: 'grand-tourer',
    label: 'Grand Tourer',
    description: 'Touring cockpit and illuminated rail',
    assets: ['leather-onyx', 'veneer-walnut', 'gt-knob', 'mobile-gt-corner'],
  },
};

export const DEFAULT_SKIN: SkinId = 'voyage';
export const STORAGE_KEY = 'ecrin.skin.v1';

export function isSkinId(value: unknown): value is SkinId {
  return typeof value === 'string' && (SKIN_IDS as readonly string[]).includes(value);
}

/** Saved preference. Never throws; storage may be blocked. */
export function loadSavedSkin(storage?: Pick<Storage, 'getItem'>): SkinId {
  try {
    const raw = (storage ?? localStorage).getItem(STORAGE_KEY);
    return isSkinId(raw) ? raw : DEFAULT_SKIN;
  } catch {
    return DEFAULT_SKIN;
  }
}

export function saveSkin(skin: SkinId, storage?: Pick<Storage, 'setItem'>): void {
  try {
    (storage ?? localStorage).setItem(STORAGE_KEY, skin);
  } catch {
    /* viewing still works without persistence */
  }
}

/** `?skin=folio` takes precedence for that page load; otherwise the saved preference. */
export function resolveInitialSkin(search: string = typeof location === 'undefined' ? '' : location.search): SkinId {
  try {
    const q = new URLSearchParams(search).get('skin');
    if (isSkinId(q)) return q;
  } catch {
    /* ignore malformed query */
  }
  return loadSavedSkin();
}

const preloaded = new Set<string>();
export function preloadSkin(id: SkinId): void {
  if (typeof Image === 'undefined') return;
  for (const name of SKINS[id].assets) {
    if (preloaded.has(name)) continue;
    preloaded.add(name);
    const img = new Image();
    img.decoding = 'async';
    img.src = `/assets/${name}.webp`;
  }
}
