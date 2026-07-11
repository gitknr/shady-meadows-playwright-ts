import { Locator, Page } from '@playwright/test';

export class BasePage {
    constructor(protected readonly page: Page) {}

    protected inputForLabel(label: string): Locator {
        return this.page
            .locator('label', { hasText: label })
            .locator('..')
            .locator('input');
    }

    protected async selectDate( daysFromToday: number) {
        const target = new Date();
        target.setDate(target.getDate() + daysFromToday);

        const label = `Choose ${target.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })}`;

        await this.page.getByLabel(label).click();
    }
}