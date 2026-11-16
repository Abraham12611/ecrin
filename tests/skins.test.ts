import { beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_SKIN, SKIN_IDS, SKINS, STORAGE_KEY, isSkinId, loadSavedSkin, resolveInitialSkin, saveSkin } from '../src/player/skins';

describe('skin registry', () => {
  it('defines exactly the five required variants', () => {
    expect([...SKIN_IDS]).toEqual(['voyage', 'bridle', 'horlogerie', 'folio', 'grand-tourer']);
    for (const id of SKIN_IDS) expect(SKINS[id].id).toBe(id);
  });
  it('validates ids', () => {
    expect(isSkinId('folio')).toBe(true);
    expect(isSkinId('kitbash')).toBe(false);
    expect(isSkinId(null)).toBe(false);
  });
});

describe('persistence', () => {
  beforeEach(() => localStorage.clear());
  it('falls back to voyage when empty or invalid', () => {
    expect(loadSavedSkin()).toBe(DEFAULT_SKIN);
    localStorage.setItem(STORAGE_KEY, 'nonsense');
    expect(loadSavedSkin()).toBe(DEFAULT_SKIN);
  });
  it('round-trips a valid skin', () => {
    saveSkin('grand-tourer');
    expect(loadSavedSkin()).toBe('grand-tourer');
  });
  it('does not throw when storage is blocked', () => {
    const blocked = { getItem: () => { throw new Error('blocked'); }, setItem: () => { throw new Error('blocked'); } };
    expect(loadSavedSkin(blocked)).toBe(DEFAULT_SKIN);
    expect(() => saveSkin('bridle', blocked)).not.toThrow();
  });
  it('query parameter wins over saved preference, and is sanitized', () => {
    saveSkin('bridle');
    expect(resolveInitialSkin('?skin=horlogerie')).toBe('horlogerie');
    expect(resolveInitialSkin('?skin=<script>')).toBe('bridle');
    expect(resolveInitialSkin('')).toBe('bridle');
  });
});
