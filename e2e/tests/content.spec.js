import { test, expect } from '@playwright/test';

import { getStoredData } from '../data/getStoredData';

const storedData = getStoredData();

const testItem = async (item, movie) => {
  const { original_title, vote_average } = movie;

  // Hovering over the movie item so make the info visible
  await item.hover();

  // The movie title and rating are visible
  await expect(item.getByText(original_title)).toBeVisible();
  await expect(item.getByText(`${vote_average} / 10`)).toBeVisible();

  // Toggle the movie item
  const toggle = item.locator('.ListToggle');
  await expect(toggle).toHaveAttribute('data-toggled', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('data-toggled', 'true');
  await toggle.click();
  await expect(toggle).toHaveAttribute('data-toggled', 'false');
}

test('displays the movies section', async ({ page }) => {
  const { movies } = await storedData;

  // Stored data is not empty
  expect(movies).toHaveLength(4);
  
  await page.goto('/');

  // There is a "Movies" section
  const section = page.locator('.TitleList', {
    has: page.getByRole('heading', { name: 'Movies' })
  });
  
  for (const movie of movies) {
    // There is an item per movie in the section
    const item = section.locator('.Item', {
      has: page.getByText(movie.original_title)
    });
    await testItem(item, movie);
  }
});

test('displays the watching section', async ({ page }) => {
  const { watching } = await storedData;

  // Stored data is not empty
  expect(watching).toHaveLength(4);
  
  await page.goto('/');

  // There is a "Watching" section
  const section = page.locator('.TitleList', {
    has: page.getByRole('heading', { name: 'Continue Watching for Cindy' })
  });
  
  for (const movie of watching) {
    // There is an item per movie in the section
    const item = section.locator('.Item', {
      has: page.getByText(movie.original_title)
    });
    await testItem(item, movie);
  }
});
