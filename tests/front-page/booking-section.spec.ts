import {BookingSection} from '../../pages';
import {test} from "@playwright/test";

/**
 * Verifies that the Billing Section displays correctly
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Front Page Booking Section', { tag: '@front-page' }, () => {

    test('Verify Booking Section', async ({page}) => {
        const bookingSection = new BookingSection(page);
        await bookingSection.visit();
        await bookingSection.verifyBookingSectionTitle();
        await bookingSection.verifyCheckInDateInput();
        await bookingSection.verifyCheckOutDateInput();
        await bookingSection.verifyCheckAvailabilityButton();
    });

});
