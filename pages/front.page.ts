import { expect, type Page } from '@playwright/test';

export class FrontPage {
    constructor(private readonly page: Page) {}

    async visit() {
        await this.page.goto('', { waitUntil: 'load' });
        const welcomeHeader = this.page.getByText('Welcome to Shady Meadows B&B');

        await expect(welcomeHeader).toBeVisible();
    }

    async verifyWelcomeMessage() {
        const heroDivWelcomeMessage = this.page.locator('div[class*="hero-content"] p');
        await expect(heroDivWelcomeMessage).toBeVisible();
        const welcomeMessage = await heroDivWelcomeMessage.textContent();
        expect(welcomeMessage).toContain('A place so beautiful you will never want to leave.');
    }

    async verifyBookNowButton() {
        const bookNowButton = this.page.locator('a[href="#booking"]');
        await expect(bookNowButton).toBeVisible();
    }
}
