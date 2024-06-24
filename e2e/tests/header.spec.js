import { test, expect } from '@playwright/test';

test('displays the header', async ({ page }) => {
  await page.goto('/');

  // Logo
  await expect(page.locator('.logo')).toBeVisible();

  // Navigation
  await expect(page.getByRole('list').getByText('Home')).toBeVisible();
  await expect(page.getByRole('list').getByText('Movies')).toBeVisible();
  await expect(page.getByRole('list').getByText('My List')).toBeVisible();

  // Profile
  await expect(page.getByText('Cindy Lopez')).toBeVisible();
  const avatar = page.getByAltText('profile');
  await expect(avatar).toHaveAttribute('src', /.+/);
});
