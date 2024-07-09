import { expect, type Locator } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';

export class Addon extends Component {
  private readonly titleLocator = this.root.locator('label');

  private readonly priceLocator = this.root.locator('.panel-price');

  private readonly addToCartButtonLocator = this.root.locator('.panel-add');

  constructor(private root: Locator) {
    super(root.page());
  }

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.titleLocator).toBeVisible(),
      await expect(this.priceLocator).toBeVisible(),
      await expect(this.addToCartButtonLocator).toBeVisible(),
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
  async details(): Promise<{ title: string; price: number }> {
    return {
      title: await this.title(),
      price: await this.price(),
    };
  }

  @step()
  async select(): Promise<void> {
    await this.expectLoaded();
    await this.titleLocator.click();
  }
}
