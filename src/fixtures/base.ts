import { ConsoleMessage, expect, test } from '@playwright/test';
import { Application } from '../app';
import { logger } from '../utils/reporters/CustomReporterConfig';

export const baseFixture = test.extend<{ app: Application }>({
  app: async ({ browser, page }, use) => {
    test.info().annotations.push({
      type: 'Browser',
      description: `${browser.browserType().name()} ${browser.version()}`,
    });

    const app = new Application(page);

    page.on('console', (message: ConsoleMessage) => {
      if (message.type() === 'error') {
        logger.error(`Page URL ${page.url()}`);
        logger.error(`Page ${JSON.stringify(message.page())}`);
        logger.error(`Text ${JSON.stringify(message.text())}`);
      }
    });

    await use(app);
  },
});

export { expect };
