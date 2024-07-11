import { expect, type Locator } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';

export class Product extends Component {
  private readonly productTypeLocator = this.root.locator('td').nth(0);

  private readonly ipAddressLocator = this.root.locator('td').nth(2);

  private readonly recurringPriceLocator = this.root.locator('td').nth(3);

  private readonly dueTodayPriceLocator = this.root.locator('td').nth(4);

  constructor(private root: Locator) {
    super(root.page());
  }

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.productTypeLocator).toBeVisible(),
      await expect(this.ipAddressLocator).toBeVisible(),
      await expect(this.recurringPriceLocator).toBeVisible(),
      await expect(this.dueTodayPriceLocator).toBeVisible(),
    ]);
  }

  @step()
  async productType(): Promise<string> {
    const product = await this.productTypeLocator.innerText();
    return product.trim();
  }

  @step()
  async ipAddress(): Promise<string> {
    const ipAddress = await this.ipAddressLocator.innerText();
    return ipAddress.trim();
  }

  @step()
  async recurringPrice(): Promise<number> {
    const recurringPrice = await this.recurringPriceLocator.innerText();
    return parseFloat(recurringPrice.replace(/[^\d+.]/g, ''));
  }

  @step()
  async dueTodayPrice(): Promise<number> {
    const dueTodayPrice = await this.dueTodayPriceLocator.innerText();
    const match = dueTodayPrice.match(/[0-9]+\.[0-9]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  @step()
  async details(): Promise<{
    productType: string;
    ipAddress: string;
    recurringPrice: number;
    dueTodayPrice: number;
  }> {
    return {
      productType: await this.productType(),
      ipAddress: await this.ipAddress(),
      recurringPrice: await this.recurringPrice(),
      dueTodayPrice: await this.dueTodayPrice(),
    };
  }
}
