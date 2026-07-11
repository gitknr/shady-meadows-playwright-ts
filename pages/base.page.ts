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
        const today = new Date();
        const target = new Date();
        target.setDate(target.getDate() + daysFromToday);

        if (
            target.getMonth() !== today.getMonth() ||
            target.getFullYear() !== today.getFullYear()
        ) {
            await this.page.getByRole('button', { name: 'Next Month' }).click();
        }

        const label = `Choose ${target.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })}`;

        await this.page.getByLabel(label).click();
    }
}