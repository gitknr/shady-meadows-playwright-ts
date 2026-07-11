import {BookingSection, RoomsSection} from '../../pages';
import {test} from '../../utils/testHooks';

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

        // verify the booking section is visible and contains the expected elements
        await bookingSection.verifyBookingSectionTitle();
        await bookingSection.verifyCheckInDateInput();
        await bookingSection.verifyCheckOutDateInput();
        await bookingSection.verifyCheckAvailabilityButton();
    });

    test('Check Availability', async ({page}) => {
        const bookingSection = new BookingSection(page);
        await bookingSection.visit();
        await bookingSection.selectCheckInDate(7);
        await bookingSection.selectCheckOutDate(14);

        // click the "Check Availability" button. the number of rooms available will be returned.
        const roomCount = await bookingSection.clickCheckAvailabilityButton();
        const roomsSection = new RoomsSection(page);

        // user is redirected to the rooms section
        await roomsSection.verifyRoomsSectionIsVisible();
        // verify the number of rooms available
        await roomsSection.verifyRoomsCount(roomCount);
    })

});
