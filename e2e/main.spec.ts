import { test, expect } from '@playwright/test';

const BASE = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

// --- Public pages ---
test('Homepage loads with hero heading', async ({ page }) => {
  await page.goto(BASE);
  await expect(page.getByText('Find Your Perfect Property')).toBeVisible();
});

test('Buy page loads and shows search form', async ({ page }) => {
  await page.goto(`${BASE}/buy`);
  await expect(page.getByPlaceholder('Location')).toBeVisible();
});

test('Rent page loads', async ({ page }) => {
  await page.goto(`${BASE}/rent`);
  await expect(page.getByRole('heading', { name: 'Properties for Rent' })).toBeVisible();
});

test('Commercial page loads', async ({ page }) => {
  await page.goto(`${BASE}/commercial`);
  await expect(page.getByRole('heading', { name: 'Commercial Properties' })).toBeVisible();
});

test('About page loads', async ({ page }) => {
  await page.goto(`${BASE}/about`);
  await expect(page.getByRole('heading', { name: 'About EstateHub' })).toBeVisible();
});

test('Contact page has enquiry form', async ({ page }) => {
  await page.goto(`${BASE}/contact`);
  await expect(page.getByPlaceholder('Your name')).toBeVisible();
});

test('Blog page loads', async ({ page }) => {
  await page.goto(`${BASE}/blog`);
  await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
});

test('404 page renders correctly', async ({ page }) => {
  await page.goto(`${BASE}/this-page-does-not-exist`);
  await expect(page.getByText('404')).toBeVisible();
});

// --- Admin ---
test('Admin sign-in page shows credentials form', async ({ page }) => {
  await page.goto(`${BASE}/admin/signin`);
  await expect(page.getByPlaceholder('Email')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
});

test('Admin dashboard redirects if not authenticated', async ({ page }) => {
  await page.goto(`${BASE}/admin/dashboard`);
  // Should redirect to sign-in
  await expect(page).toHaveURL(/signin/);
});

// --- Enquiry form submission ---
test('Enquiry form shows success message after valid submit', async ({ page }) => {
  await page.route('**/api/enquiries', async (route) => {
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ id: 1, status: 'New' }),
    });
  });
  await page.goto(`${BASE}/contact`);
  await page.fill('[placeholder="Your name"]', 'Test User');
  await page.fill('[placeholder="Your email"]', 'test@test.com');
  await page.fill('[placeholder="Your message"]', 'Interested in property.');
  await page.click('button[type="submit"]');
  await expect(page.getByText('Enquiry sent successfully')).toBeVisible();
});
