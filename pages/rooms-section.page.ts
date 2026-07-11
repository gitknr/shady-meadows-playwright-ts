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

    async verifyRoomSectionTitle() {
        const roomsSectionTitle = this.page.locator('section[id="rooms"] h2[class^="display"]');
        await expect(roomsSectionTitle).toBeVisible();
        const titleText = await roomsSectionTitle.textContent();
        expect(titleText).toContain('Our Rooms');
    }

    async verifyRoomSectionLeadText() {
        const roomsSectionLeadText = this.page.locator('section[id="rooms"] p[class^="lead"]');
        await expect(roomsSectionLeadText).toBeVisible();
        const leadText = await roomsSectionLeadText.textContent();
        expect(leadText).toContain('Comfortable beds and delightful breakfast from locally sourced ingredients');
    }

    async getRoomCardByRoomType(roomType: string) {
        const cssSelector = `div[class$="room-card"]:has(h5[class="card-title"]:has-text("${roomType}"))`;
        return this.page.locator(cssSelector);
    }

    async verifyRoomCardExists(roomType: string) {
        const roomCard = await this.getRoomCardByRoomType(roomType);
        await expect(roomCard).toBeVisible();
    }

    async getRoomText(roomType: string, roomText: string) {
        const roomCard = await this.getRoomCardByRoomType(roomType);
        await expect(roomCard.locator(`p[class="card-text"]`)).toHaveText(roomText);
    }

    async verifyRoomDetails(roomType: string, roomDetail: string) {
        const roomCard = await this.getRoomCardByRoomType(roomType);
        await expect(roomCard.locator('div[class="card-text"]', { hasText: roomDetail })).toBeVisible();
    }

    async verifyRoomRate(roomType: string, roomRate: string) {
        const roomCard = await this.getRoomCardByRoomType(roomType);
        await expect(roomCard.locator('div[class^="card-footer"] div', { hasText: roomRate })).toBeVisible();
    }

    async verifyBookNowButton(roomType: string) {
        const roomCard = await this.getRoomCardByRoomType(roomType);
        await expect(roomCard.locator('a[class="btn btn-primary"]', { hasText: 'Book Now' })).toBeVisible();
    }

}
