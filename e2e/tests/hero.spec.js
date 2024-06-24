import { test, expect } from '@playwright/test';

test('displays the hero', async ({ page }) => {
  await page.goto('/');

  // Hero content
  await expect(page.getByText('Bohemian Rhapsody')).toBeVisible();
  await expect(page.getByText(
    "Queen take the music world by storm when they form the rock 'n' roll band in 1970."
  )).toBeVisible();

  // Click the play button
  await page.getByRole('link', { name: 'Play' }).click();
  expect(page.url()).toMatch(/#$/); // TODO

  // Click the list button
  await page.getByRole('link', { name: 'My List' }).click();
  expect(page.url()).toMatch(/#$/); // TODO
});
