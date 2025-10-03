import { test, expect } from '@playwright/test';

test.describe('Cards Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login as business user
    await page.goto('/login');
    await page.fill('input[type="email"]', 'business@facework.com');
    await page.fill('input[type="password"]', 'Business123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('should display cards page', async ({ page }) => {
    await page.click('text=Cards');
    await expect(page).toHaveURL(/.*\/cards/);
    await expect(page.locator('h1')).toContainText('Cards');
  });

  test('should display my cards for business user', async ({ page }) => {
    await page.click('text=My Cards');
    await expect(page).toHaveURL(/.*\/my-cards/);
    await expect(page.locator('h1')).toContainText('My Cards');
  });

  test('should create a new card', async ({ page }) => {
    // Navigate to create card
    await page.click('text=My Cards');
    await page.click('text=Create Card');
    await expect(page).toHaveURL(/.*\/create-card/);
    
    // Fill card form
    const timestamp = Date.now();
    await page.fill('input[name="title"]', `Test Card ${timestamp}`);
    await page.fill('input[name="subtitle"]', 'Test Subtitle');
    await page.fill('textarea[name="description"]', 'Test Description');
    await page.fill('input[name="phone"]', '0501234567');
    await page.fill('input[name="email"]', `card${timestamp}@test.com`);
    await page.fill('input[name="web"]', 'https://test.com');
    await page.fill('input[name="image.url"]', 'https://via.placeholder.com/300');
    await page.fill('input[name="image.alt"]', 'Test Image');
    await page.fill('input[name="address.country"]', 'Israel');
    await page.fill('input[name="address.city"]', 'Tel Aviv');
    await page.fill('input[name="address.street"]', 'Test Street');
    await page.fill('input[name="address.houseNumber"]', '123');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Verify card created
    await expect(page).toHaveURL(/.*\/my-cards/);
    await expect(page.locator(`text=Test Card ${timestamp}`)).toBeVisible();
  });

  test('should like/unlike a card', async ({ page }) => {
    await page.click('text=Cards');
    
    // Find first card and like it
    const firstCard = page.locator('.card').first();
    const likeButton = firstCard.locator('button[aria-label*="like"]');
    
    // Click like
    await likeButton.click();
    
    // Verify like state changed
    await expect(likeButton).toHaveClass(/liked|active/);
    
    // Unlike
    await likeButton.click();
    await expect(likeButton).not.toHaveClass(/liked|active/);
  });

  test('should search for cards', async ({ page }) => {
    await page.click('text=Cards');
    
    // Search for specific card
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Web Development');
    await searchInput.press('Enter');
    
    // Verify filtered results
    await expect(page.locator('.card')).toHaveCount(1);
    await expect(page.locator('text=Web Development')).toBeVisible();
  });

  test('should view card details', async ({ page }) => {
    await page.click('text=Cards');
    
    // Click on first card
    const firstCard = page.locator('.card').first();
    await firstCard.click();
    
    // Verify card details page
    await expect(page).toHaveURL(/.*\/cards\/\w+/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should edit own card', async ({ page }) => {
    await page.click('text=My Cards');
    
    // Find first card and edit
    const firstCard = page.locator('.card').first();
    await firstCard.locator('button[aria-label*="edit"]').click();
    
    // Verify edit page
    await expect(page).toHaveURL(/.*\/edit-card\/\w+/);
    
    // Update title
    await page.fill('input[name="title"]', 'Updated Card Title');
    await page.click('button[type="submit"]');
    
    // Verify update
    await expect(page).toHaveURL(/.*\/my-cards/);
    await expect(page.locator('text=Updated Card Title')).toBeVisible();
  });

  test('should delete own card', async ({ page }) => {
    await page.click('text=My Cards');
    
    // Count initial cards
    const initialCount = await page.locator('.card').count();
    
    // Delete first card
    const firstCard = page.locator('.card').first();
    await firstCard.locator('button[aria-label*="delete"]').click();
    
    // Confirm deletion
    await page.click('button:has-text("Confirm")');
    
    // Verify card deleted
    const newCount = await page.locator('.card').count();
    expect(newCount).toBe(initialCount - 1);
  });

  test('should show favorites', async ({ page }) => {
    // Like a card first
    await page.click('text=Cards');
    const firstCard = page.locator('.card').first();
    await firstCard.locator('button[aria-label*="like"]').click();
    
    // Navigate to favorites
    await page.click('text=Favorites');
    await expect(page).toHaveURL(/.*\/favorites/);
    await expect(page.locator('h1')).toContainText('Favorites');
    
    // Verify liked card appears
    const cardCount = await page.locator('.card').count();
    expect(cardCount).toBeGreaterThanOrEqual(1);
  });
});
