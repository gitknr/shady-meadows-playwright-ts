import 'dotenv/config';
import { test as setup, expect } from '@playwright/test';
import * as path from 'node:path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
const baseURL = requireEnv('BASE_URL');
const testUser = requireEnv('TEST_USERNAME');
const testPassword = requireEnv('TEST_PASSWORD');

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) throw new Error(`${name} is not set`);
    return value;
}

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto(baseURL + 'admin');
    await page.getByLabel('Username').fill(testUser);
    await page.getByLabel('Password').fill(testPassword);
    await page.locator('button[id="doLogin"]').click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await expect(page).toHaveURL(/admin\/rooms/);

    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});
