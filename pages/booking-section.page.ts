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

    async clickCheckInInput() {
        await this.inputForLabel('Check In').click();
    }

    async selectCheckInDate(daysFromToday: number) {
        await this.clickCheckInInput();
        await this.selectDate(daysFromToday);
    }

    async clickCheckOutInput() {
        await this.inputForLabel('Check Out').click();
    }

    async selectCheckOutDate(daysFromToday: number) {
        await this.clickCheckOutInput();
        await this.selectDate(daysFromToday);
    }

    async clickCheckAvailabilityButton() {
        const responsePromise = this.page.waitForResponse(
            response => response.url().includes('/api/room') && response.request().method() === 'GET'
        );

        await this.page
            .locator('section[id="booking"] button', { hasText: 'Check Availability' })
            .click();

        const response = await responsePromise;
        const responseBody = await response.json();

        return responseBody.rooms.length;
    }
}
