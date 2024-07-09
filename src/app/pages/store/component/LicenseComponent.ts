import { expect, type Locator } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';

export class License extends Component {
  private readonly titleLocator = this.root.locator('[id *= name]');

  private readonly descriptionLocator = this.root.locator('[id *= description]');

  private readonly priceLocator = this.root.locator('.price');

  private readonly orderButtonLocator = this.root.locator('[id *= order-button]');

  constructor(private root: Locator) {
    super(root.page());
  }

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.titleLocator).toBeVisible(),
      await expect(this.descriptionLocator).toBeVisible(),
      await expect(this.priceLocator).toBeVisible(),
      await expect(this.orderButtonLocator).toBeVisible(),
    ]);
  }

  @step()
  async title(): Promise<string> {
    return this.titleLocator.innerText();
  }

  @step()
  async description(): Promise<string> {
    return this.descriptionLocator.innerText();
  }

  @step()
  async price(): Promise<number> {
    const price = await this.priceLocator.innerText();
    return parseFloat(price.replace(/[^\d+.]/g, ''));
  }

  @step()
  async details(): Promise<{ title: string; description: string; price: number }> {
    return {
      title: await this.title(),
      description: await this.description(),
      price: await this.price(),
    };
  }

  @step()
  async select(): Promise<void> {
    await this.expectLoaded();
    await this.orderButtonLocator.click();
  }
}
