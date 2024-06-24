import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // The page title
  await expect(page).toHaveTitle('Movies');
});

test('matches screenshot', async ({ page }) => {
  await page.goto('/');

  // The page matches the screenshot
  await expect(page).toHaveScreenshot('movies.png');
});
