import { expect, type Locator } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';

export class CartItem extends Component {
  private readonly titleLocator = this.root.locator('.item-title');

  private readonly priceLocator = this.root.locator('.item-price span').first();

  private readonly monthlyPriceLocator = this.root.locator('.item-price span').last();

  constructor(private root: Locator) {
    super(root.page());
  }

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.titleLocator).toBeVisible(),
      await expect(this.priceLocator).toBeVisible(),
      await expect(this.monthlyPriceLocator).toBeVisible(),
    ]);
  }

  @step()
  async title(): Promise<string> {
    const title = await this.titleLocator.innerText();
    return title.trim();
  }

  @step()
  async price(): Promise<number> {
    const price = await this.priceLocator.innerText();
    return parseFloat(price.replace(/[^\d+.]/g, ''));
  }

  @step()
  async monthlyPrice(): Promise<number> {
    const price = await this.monthlyPriceLocator.innerText();
    return parseFloat(price.replace(/[^\d+.]/g, ''));
  }

  @step()
  async details(): Promise<{ title: string; price: number; monthlyPrice: number }> {
    return {
      title: await this.title(),
      price: await this.price(),
      monthlyPrice: await this.monthlyPrice(),
    };
  }
}
