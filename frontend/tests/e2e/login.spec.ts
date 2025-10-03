import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login page', async ({ page }) => {
    await page.click('text=Login');
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.locator('h2')).toContainText('Welcome Back');
  });

  test('should login with valid credentials', async ({ page }) => {
    // Navigate to login
    await page.click('text=Login');
    
    // Fill login form
    await page.fill('input[type="email"]', 'user@facework.com');
    await page.fill('input[type="password"]', 'User123!');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Verify successful login
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Navigate to login
    await page.click('text=Login');
    
    // Fill with invalid credentials
    await page.fill('input[type="email"]', 'invalid@email.com');
    await page.fill('input[type="password"]', 'wrong123');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Verify error message
    await expect(page.locator('.text-red-500')).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.click('text=Login');
    await page.click('text=Don\'t have an account');
    await expect(page).toHaveURL(/.*\/register/);
    await expect(page.locator('h2')).toContainText('Create Account');
  });

  test('should register new user', async ({ page }) => {
    // Navigate to register
    await page.click('text=Register');
    
    // Fill registration form
    const timestamp = Date.now();
    await page.fill('input[name="email"]', `test${timestamp}@facework.com`);
    await page.fill('input[name="password"]', 'Test123!');
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="phone"]', '0501234567');
    await page.fill('input[name="country"]', 'Israel');
    await page.fill('input[name="city"]', 'Tel Aviv');
    await page.fill('input[name="street"]', 'Test Street');
    await page.fill('input[name="houseNumber"]', '123');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Verify successful registration
    await expect(page).toHaveURL(/.*\/(dashboard|login)/);
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'user@facework.com');
    await page.fill('input[type="password"]', 'User123!');
    await page.click('button[type="submit"]');
    
    // Wait for dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    
    // Logout
    await page.click('button:has-text("Logout")');
    
    // Verify logout
    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Login')).toBeVisible();
  });
});
