import {RoomsSection} from '../../pages';
import {test} from '../../utils/testHooks';

/**
 * Verifies Rooms Section display and functionality
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Front Page Rooms Section', { tag: '@front-page' }, () => {

    test('Verify Rooms Section', async ({page}) => {
        const roomsSection = new RoomsSection(page);
        await roomsSection.visit();
        await roomsSection.verifyRoomsSectionIsVisible();
        await roomsSection.verifyRoomSectionTitle();
        await roomsSection.verifyRoomSectionLeadText();

        // verify the room cards for each room type
        await roomsSection.verifyRoomCardExists('Single');
        await roomsSection.getRoomText('Single', 'Aenean porttitor mauris sit amet lacinia molestie. In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.');
        await roomsSection.verifyRoomDetails('Single', 'TV');
        await roomsSection.verifyRoomDetails('Single', 'Wifi');
        await roomsSection.verifyRoomDetails('Single', 'Safe');
        await roomsSection.verifyRoomRate('Single', '£100 per night');
        await roomsSection.verifyBookNowButton('Single');

        await roomsSection.verifyRoomCardExists('Double');
        await roomsSection.getRoomText('Double', 'Vestibulum sollicitudin, lectus ac mollis consequat, lorem orci ultrices tellus, eleifend euismod tortor dui egestas erat. Phasellus et ipsum nisl.')
        await roomsSection.verifyRoomDetails('Double', 'TV');
        await roomsSection.verifyRoomDetails('Double', 'Radio');
        await roomsSection.verifyRoomDetails('Double', 'Safe');
        await roomsSection.verifyRoomRate('Double', '£150 per night');
        await roomsSection.verifyBookNowButton('Double');

        await roomsSection.verifyRoomCardExists('Suite');
        await roomsSection.getRoomText('Suite', 'Etiam metus metus, fringilla ac sagittis id, consequat vel neque. Nunc commodo quis nisl nec posuere. Etiam at accumsan ex.')
        await roomsSection.verifyRoomDetails('Suite', 'Radio');
        await roomsSection.verifyRoomDetails('Suite', 'Wifi');
        await roomsSection.verifyRoomDetails('Suite', 'Safe');
        await roomsSection.verifyRoomRate('Suite', '£225 per night');
        await roomsSection.verifyBookNowButton('Suite');
    })

})