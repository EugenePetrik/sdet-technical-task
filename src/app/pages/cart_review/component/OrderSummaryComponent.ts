import { expect } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';

export class OrderSummary extends Component {
  private readonly root = this.page.locator('.order-summary');

  private readonly title = this.root.locator('h2');

  private readonly subtotalPrice = this.root.locator('#subtotal');

  private readonly totalDueTodayPrice = this.root.locator('#totalDueToday');

  private readonly checkoutButton = this.page.locator('#checkout');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.title).toHaveText('Order Summary'),
      await expect(this.subtotalPrice).toBeVisible(),
      await expect(this.totalDueTodayPrice).toBeVisible(),
      await expect(this.checkoutButton).toBeVisible(),
    ]);
  }

  @step()
  async expectTotalDueTodayPrice(price: string): Promise<void> {
    await expect(this.totalDueTodayPrice).toHaveText(price);
  }

  @step()
  async clickOnCheckoutButton(): Promise<void> {
    await this.checkoutButton.click();
  }
}
