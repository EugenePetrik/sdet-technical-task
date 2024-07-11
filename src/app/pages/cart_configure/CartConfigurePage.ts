import { expect } from '@playwright/test';
import { step } from '../../../utils/reporters/steps';
import { AppPage } from '../../abstract.classes';
import { Addons, type Addon, OrderSummary } from './component';

export class CartConfigurePage extends AppPage {
  public readonly pagePath = '/cart.php';

  private readonly header = this.page.locator('.header-lined h1');

  private readonly productTitle = this.page.locator('.product-title');

  private readonly ipAddressInput = this.page.locator('#customfield11');

  private readonly ipAddressValidatingLoader = this.page.locator('#customfield11Loader');

  private readonly ipAddressErrorMessage = this.page.locator('#customfield11Error');

  private readonly continueButton = this.page.locator('#btnCompleteProductConfig');

  private readonly addons = new Addons(this.page);

  private readonly addonList = this.page.locator('#productAddonsContainer');

  public readonly orderSummary = new OrderSummary(this.page);

  @step()
  override async open(productId: string): Promise<void> {
    await super.open(`${this.pagePath}?a=confproduct&i=${productId}`);
  }

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.header).toHaveText('Configure'),
      await expect(this.productTitle).toBeVisible(),
      await expect(this.ipAddressInput).toBeVisible(),
      await expect(this.continueButton).toBeVisible(),
      await expect(this.addonList).toBeVisible(),
      await this.orderSummary.expectLoaded(),
    ]);
  }

  @step()
  async fillInIpAddress(ipAddress: string): Promise<void> {
    await this.ipAddressInput.fill(ipAddress);
    await this.page.keyboard.press('Enter');
  }

  @step()
  async expectIpAddressIsVerified(): Promise<void> {
    await expect(this.ipAddressValidatingLoader).toBeHidden({ timeout: 20_000 });
    await expect(this.ipAddressErrorMessage).toBeHidden();
  }

  @step()
  async getAddonDetails(title: string): Promise<Awaited<ReturnType<Addon['details']>>> {
    const matchedFirstResult: Addon = (await this.addons.getAddons(title))[0];
    return matchedFirstResult.details();
  }

  @step()
  async selectAddon(title: string): Promise<void> {
    const matchedFirstResult: Addon = (await this.addons.getAddons(title))[0];
    await matchedFirstResult.select();
  }

  @step()
  async clickOnContinueButton(): Promise<void> {
    await expect(this.continueButton).not.toHaveClass('disabled');
    await this.continueButton.click();
  }
}
