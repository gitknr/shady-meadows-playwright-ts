import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class BookingSection extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async visit() {
        await this.page.goto('#booking', { waitUntil: 'load' });
        const bookingSection = this.page.locator('section[id="booking"]');
        await bookingSection.scrollIntoViewIfNeeded();
        await expect(bookingSection).toBeVisible();
    }

    async verifyBookingSectionTitle() {
        const bookingSectionTitle = this.page.locator('section[id="booking"] h3[class^="card-title"]');
        await bookingSectionTitle.scrollIntoViewIfNeeded();
        await expect(bookingSectionTitle).toBeVisible();
        const titleText = await bookingSectionTitle.textContent();
        expect(titleText).toContain('Check Availability & Book Your Stay');
    }

    async verifyCheckInDateInput() {
        await expect(this.inputForLabel('Check In')).toBeVisible();
    }

    async verifyCheckOutDateInput() {
        await expect(this.inputForLabel('Check Out')).toBeVisible();
    }

    async verifyCheckAvailabilityButton() {
        const checkAvailabilityButton = this.page.locator('section[id="booking"] button', { hasText: 'Check Availability' });
        await expect(checkAvailabilityButton).toBeVisible();
    }
}
