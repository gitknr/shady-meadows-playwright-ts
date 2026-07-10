import { Locator, Page } from '@playwright/test';

export class BasePage {
    constructor(protected readonly page: Page) {}

    protected inputForLabel(label: string): Locator {
        return this.page
            .locator('label', { hasText: label })
            .locator('..')
            .locator('input');
    }
}