import { expect, type Locator } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';
import { escapeSpecialCharsInRegExp } from '../../../../utils/helpres/regexp';

export class OrderSummary extends Component {
  private readonly root = this.page.locator('.order-summary');

  private readonly title = this.root.locator('h2');

  private readonly productName = this.root.locator('.product-name');

  private readonly orderTotalPrice = this.root.locator('.total-due-today .amt');

  getOrderOption(text: string): Locator {
    const formattedText = escapeSpecialCharsInRegExp(text);
    return this.root.locator('.clearfix', { hasText: new RegExp(formattedText, 'gi') });
  }

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.title).toHaveText('Order Summary'),
      await expect(this.productName).toBeVisible(),
      await expect(this.orderTotalPrice).toBeVisible(),
    ]);
  }

  @step()
  async expectOrderOption(name: string, value: string): Promise<void> {
    await expect(this.getOrderOption(name)).toContainText(value);
  }
}
