import { expect } from '@playwright/test';
import { step } from '../../../../utils/reporters/steps';
import { Component } from '../../../abstract.classes';
import { CartItem } from './CartItemComponent';

export class CartItems extends Component {
  private readonly itemsLocator = this.page.locator('.view-cart-items .item');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.itemsLocator).not.toHaveCount(0),
      await new CartItem(this.itemsLocator.first()).expectLoaded(),
    ]);
  }

  @step()
  async getCartItems(title: string): Promise<CartItem[]> {
    await this.expectLoaded();
    const items = await this.itemsLocator.all();
    const filtered = [];

    for (const item of items) {
      if ((await new CartItem(item).title()).includes(title)) {
        filtered.push(item);
      }
    }

    return filtered.map(item => new CartItem(item));
  }

  @step()
  async getCartItemsDetails(): Promise<Awaited<ReturnType<CartItem['details']>>[]> {
    await this.expectLoaded();
    const items = await this.itemsLocator.all();
    const details = [];

    for (const item of items) {
      details.push(await new CartItem(item).details());
    }

    return details;
  }
}
