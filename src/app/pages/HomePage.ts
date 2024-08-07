import { expect } from '@playwright/test';
import { step } from '../../utils/reporters/steps';
import { AppPage } from '../abstract.classes';
import { Header } from '../components';

export class HomePage extends AppPage {
  public readonly pagePath = '/';

  public readonly header = new Header(this.page);

  private readonly browseProductsButton = this.page
    .locator('.home')
    .filter({ hasText: 'cPanel Licenses' })
    .getByRole('link', { name: 'Browse Products' })
    .first();

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([await expect(this.browseProductsButton).toBeVisible()]);
  }

  @step()
  async clickOnBrowseProductsButton(): Promise<void> {
    await this.browseProductsButton.click();
  }
}
