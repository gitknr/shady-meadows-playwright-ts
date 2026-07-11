import {FrontPage} from '../../pages';
import {test} from '../../utils/testHooks';

/**
 * Verifies that the Front Page displays correctly
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Front Page', { tag: '@front-page' }, () => {

    test('Verify Front Page Welcome Section', async ({page}) => {
        const frontPage = new FrontPage(page);
        await frontPage.visit();
        await frontPage.verifyWelcomeMessage();
        await frontPage.verifyBookNowButton();
    });

});
