import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/anamnesis');
});

test.describe('Create Anamnesis', () => {
  test('it should go to create page', async ({ page }) => {
    await page.locator('data-testid=create-anamnesis-button').click();

    await expect(page).toHaveURL('http://localhost:5173/anamnesis/create');
  });
});
