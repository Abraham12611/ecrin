import { expect, test, type Page } from '@playwright/test';

const SKINS = [
  ['voyage', 'Voyage'],
  ['bridle', 'Bridle'],
  ['horlogerie', 'Horlogerie'],
  ['folio', 'Folio'],
  ['grand-tourer', 'Grand Tourer'],
] as const;

const snap = (page: Page) =>
  page.evaluate(() => {
    const v = document.querySelector('video')!;
    return { src: v.currentSrc, t: v.currentTime, paused: v.paused, muted: v.muted, volume: v.volume };
  });

async function start(page: Page, skin = 'voyage') {
  await page.goto(`/?skin=${skin}`);
  await page.waitForFunction(() => (document.querySelector('video') as HTMLVideoElement | null)?.readyState! >= 1, null, { timeout: 30_000 });
  // Tag the element so we can prove it is never replaced.
  await page.evaluate(() => {
    (document.querySelector('video') as HTMLVideoElement).dataset.id = 'original';
  });
}
async function openAppearance(page: Page) {
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('button', { name: /Appearance/ }).click();
}
const radio = (page: Page, label: string) => page.getByRole('radio', { name: new RegExp(`^${label}`) });

test('all 20 directed switches keep the same media element, source and playback state', async ({ page }) => {
  await start(page);
  await page.locator('.ecrin-deck .ecrin-play').click();
  await expect.poll(async () => (await snap(page)).t, { timeout: 20_000 }).toBeGreaterThan(1);
  await page.getByRole('button', { name: 'Mute', exact: true }).click();
  await openAppearance(page);
  const before = await snap(page);
  for (const [from, fromLabel] of SKINS) {
    for (const [to, toLabel] of SKINS) {
      if (to === from) continue;
      await radio(page, fromLabel).check({ force: true });
      await expect(page.locator('.ecrin')).toHaveAttribute('data-ecrin-skin', from);
      await radio(page, toLabel).check({ force: true });
      await expect(page.locator('.ecrin')).toHaveAttribute('data-ecrin-skin', to);
      const after = await snap(page);
      expect(after.src).toBe(before.src);
      expect(after.paused).toBe(false);
      expect(after.muted).toBe(true);
      expect(after.t).toBeGreaterThanOrEqual(before.t);
      expect(await page.locator('video[data-id="original"]').count()).toBe(1);
    }
  }
});

test('switching while paused keeps it paused and keeps the time', async ({ page }) => {
  await start(page, 'folio');
  await page.evaluate(() => {
    (document.querySelector('video') as HTMLVideoElement).currentTime = 40;
  });
  await openAppearance(page);
  await radio(page, 'Horlogerie').check({ force: true });
  const s = await snap(page);
  expect(s.paused).toBe(true);
  expect(Math.round(s.t)).toBe(40);
});

test('menu stays open after a switch and announces the new appearance', async ({ page }) => {
  await start(page);
  await openAppearance(page);
  await radio(page, 'Bridle').check({ force: true });
  await expect(page.getByRole('dialog', { name: 'Settings' })).toBeVisible();
  await expect(radio(page, 'Bridle')).toBeChecked();
  await expect(page.locator('.ecrin-sr[role="status"]')).toHaveText('Bridle appearance selected.');
});

test('keyboard: open settings, pick a skin with arrows, Escape closes and returns focus', async ({ page }) => {
  await start(page);
  const trigger = page.getByRole('button', { name: 'Settings' });
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Settings' });
  await expect(dialog).toBeVisible();
  await page.getByRole('button', { name: /Appearance/ }).press('Enter');
  await expect(radio(page, 'Voyage')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('.ecrin')).toHaveAttribute('data-ecrin-skin', 'bridle');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('Space inside the settings panel does not toggle playback', async ({ page }) => {
  await start(page);
  await openAppearance(page);
  await radio(page, 'Voyage').focus();
  await page.keyboard.press('Space');
  expect((await snap(page)).paused).toBe(true);
});

test('selection persists after reload; an invalid saved value falls back to voyage', async ({ page }) => {
  await page.goto('/');
  await openAppearance(page);
  await radio(page, 'Grand Tourer').check({ force: true });
  await page.reload();
  await expect(page.locator('.ecrin')).toHaveAttribute('data-ecrin-skin', 'grand-tourer');
  await page.evaluate(() => localStorage.setItem('ecrin.skin.v1', 'bogus'));
  await page.reload();
  await expect(page.locator('.ecrin')).toHaveAttribute('data-ecrin-skin', 'voyage');
});

test('volume control is a real slider bound to media volume; mute keeps the stored volume', async ({ page }) => {
  for (const skin of ['voyage', 'bridle', 'horlogerie', 'folio', 'grand-tourer']) {
    await start(page, skin);
    const vol = page.getByRole('slider', { name: 'Volume' }).first();
    await vol.focus();
    await page.keyboard.press('Home');
    await expect.poll(async () => (await snap(page)).volume, skin).toBeLessThanOrEqual(0.01);
    await page.keyboard.press('End');
    await expect.poll(async () => (await snap(page)).volume, skin).toBeGreaterThanOrEqual(0.99);
    await page.keyboard.press('ArrowLeft');
    await expect.poll(async () => (await snap(page)).volume, skin).toBeLessThan(1);
    const v = (await snap(page)).volume;
    await page.getByRole('button', { name: 'Mute', exact: true }).click();
    const m = await snap(page);
    expect(m.muted, skin).toBe(true);
    expect(m.volume, skin).toBeCloseTo(v, 2);
  }
});

test('seek slider works with the keyboard', async ({ page }) => {
  await start(page);
  const seek = page.getByRole('slider', { name: 'Seek' }).first();
  await seek.focus();
  await page.keyboard.press('End');
  await expect.poll(async () => (await snap(page)).t, { timeout: 10_000 }).toBeGreaterThan(100);
});

test('no horizontal overflow at 320, 375 and 768 px for every skin', async ({ page }) => {
  for (const width of [320, 375, 768]) {
    await page.setViewportSize({ width, height: 800 });
    for (const [id] of SKINS) {
      await page.goto(`/?skin=${id}`);
      const over = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(over, `${id} @ ${width}`).toBe(false);
    }
  }
});

test('reduced motion removes panel animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await start(page, 'folio');
  await page.getByRole('button', { name: 'Settings' }).click();
  const name = await page.locator('.ecrin-panel').evaluate((el) => getComputedStyle(el).animationName);
  expect(name).toBe('none');
});

test('every deck control has an accessible name in every skin', async ({ page }) => {
  for (const [id] of SKINS) {
    await page.goto(`/?skin=${id}`);
    const unnamed = await page.evaluate(() =>
      [...document.querySelectorAll('.ecrin-deck button, .ecrin-deck [role="slider"]')]
        .filter((el) => !(el.getAttribute('aria-label') || el.textContent?.trim()))
        .map((el) => el.className),
    );
    expect(unnamed, id).toEqual([]);
  }
});
