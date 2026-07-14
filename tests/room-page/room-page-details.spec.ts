import {FrontPage, RoomsSection, RoomPage} from '../../pages';
import {test} from '../../utils/testHooks';

/**
 * Verifies Rooms Page display and functionality
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Room Page', { tag: '@room-page' }, () => {

    test('Verify Room Page Details', async ({page}) => {
        const roomsSection = new RoomsSection(page);
        await roomsSection.visit();
        await roomsSection.clickBookNowButton('Double');
        const roomPage = new RoomPage(page);
        await roomPage.verifyRoomTitle('Double');
        await roomPage.verifyRoomDescription('Vestibulum sollicitudin, lectus ac mollis consequat, lorem orci ultrices tellus, eleifend euismod tortor dui egestas erat. Phasellus et ipsum nisl.');
        await roomPage.verifyRoomAmenity('TV');
        await roomPage.verifyRoomAmenity('Radio');
        await roomPage.verifyRoomAmenity('Safe');
        await roomPage.verifyRoomPolicySection('Check-in & Check-out', [
            'Check-in: 3:00 PM - 8:00 PM',
            'Check-out: By 11:00 AM',
            'Early/Late: By arrangement'
        ]);
        await roomPage.verifyRoomPolicySection('House Rules', [
            'No smoking',
            'No parties or events',
            'Pets allowed (restrictions apply)'
        ]);
    })

})