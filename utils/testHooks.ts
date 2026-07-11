import { test as baseTest } from '@playwright/test';

type TestFixtures = {
    logTitleFixture: void;
};

export const test = baseTest.extend<TestFixtures>({
    // eslint-disable-next-line no-empty-pattern
    logTitleFixture: [async ({}, use, testInfo) => {
        console.log(`🚀 Starting test: ${testInfo.title}`);

        await use();

        if (testInfo.status === 'passed') {
            console.log(`✅ Successfully verified test: ${testInfo.title}`);
        } else {
            console.warn(`❌ Failed or Skipped test: ${testInfo.title}. Status: ${testInfo.status}`);
        }
    }, { auto: true }],
});

export { expect } from '@playwright/test';
