import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. REPLACE WITH LOGIN NEEDED FOR TESTS.

        await page.goto('https://github.com/login');
        await page.getByLabel('Username or email address').fill('username');
        await page.getByLabel('Password').fill('password');
        await page.getByRole('button', { name: 'Sign in' }).click();

  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.

        await page.waitForURL('https://github.com/');


  // Alternatively, you can wait until the page reaches a state where all cookies are set. Or you can wait for an API Response that is only available after login. Or you can wait for a specific element that is only visible after login.

        await page.waitForResponse(response => response.url().includes('/api/user') && response.status() === 200);
        await page.waitForSelector('text=Signed in as username');
        await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});

// Look to config file for further implementation details - Specifically, the 'setup' project and its dependencies.