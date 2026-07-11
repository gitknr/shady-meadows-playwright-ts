import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class RoomsSection extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async visit() {
        await this.page.goto('#rooms', { waitUntil: 'load' });
        await this.verifyRoomsSectionIsVisible();
    }

    async verifyRoomsSectionIsVisible() {
        const roomsSection = this.page.locator('section[id="rooms"]');
        await expect(roomsSection).toBeVisible();
    }

    async verifyRoomsCount(expectedCount: number) {
        const roomsCards = this.page.locator('section[id="rooms"] div[class="card-body"]');
        await expect(roomsCards).toHaveCount(expectedCount);
    }
}
