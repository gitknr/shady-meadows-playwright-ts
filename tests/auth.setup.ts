import 'dotenv/config';
import { test as setup, expect } from '../utils/testHooks';
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
    // Perform authentication steps.
    await page.goto(baseURL + 'admin');
    await page.getByLabel('Username').fill(testUser);
    await page.getByLabel('Password').fill(testPassword);
    const landingUrl = /\/admin\/rooms(?:\/)?(?:\?.*)?$/;

    await Promise.all([
        page.waitForURL(landingUrl, { timeout: 15000 }),
        page.locator('button[id="doLogin"]').click(),
    ]);

    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Waiting for the navigation itself is more reliable than polling the
    // current URL after the click has already completed.
    await expect(page).toHaveURL(landingUrl, { timeout: 15000 });

    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});
