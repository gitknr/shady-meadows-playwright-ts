import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class RoomPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async verifyRoomTitle(roomType: string) {
        const roomTitle = this.page.locator('h1');
        await expect(roomTitle).toContainText(roomType);
    }

    async verifyRoomDescription(roomDescription: string) {
        const roomDescriptionElement = this.page.locator('h2:has-text("Room Description") + p');
        await expect(roomDescriptionElement).toContainText(roomDescription);
    }

    async verifyRoomAmenity(amenity: string) {
        const roomAmenity = this.page.locator('h2:has-text("Room Features") + div span', { hasText: amenity });
        await expect(roomAmenity).toBeVisible();
    }

    async verifyRoomPolicySection(sectionTitle: string, expectedListItems: string[]) {
        const roomPolicySection = this.page.locator('h2:has-text("Room Policies") + div h3', { hasText: sectionTitle });
        const roomPolicySectionListItems = roomPolicySection.locator('..').locator('ul li');

        await expect(roomPolicySection).toBeVisible();
        await expect(roomPolicySectionListItems).toHaveText(expectedListItems);
    }
}
