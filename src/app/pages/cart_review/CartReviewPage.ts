import { expect } from '@playwright/test';
import { step } from '../../../utils/reporters/steps';
import { AppPage } from '../../abstract.classes';
import { CartItems, type CartItem, OrderSummary } from './component';

export class CartReviewPage extends AppPage {
  public readonly pagePath = '/cart.php?a=view';

  private readonly header = this.page.locator('.cart-body .header-lined h1');

  private readonly continueShoppingButton = this.page.locator('#btnContinueShopping');

  private readonly emptyCartButton = this.page.locator('#btnEmptyCart');

  private readonly cartItems = new CartItems(this.page);

  public readonly orderSummary = new OrderSummary(this.page);

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.header).toHaveText('Review & Checkout'),
      await expect(this.continueShoppingButton).toBeVisible(),
      await expect(this.emptyCartButton).toBeVisible(),
      await this.orderSummary.expectLoaded(),
    ]);
  }

  @step()
  async getCartItemDetails(
    title: string,
  ): Promise<Awaited<ReturnType<CartItem['details']>>> {
    const matchedFirstResult: CartItem = (await this.cartItems.getCartItems(title))[0];
    return matchedFirstResult.details();
  }

  @step()
  // eslint-disable-next-line @typescript-eslint/require-await
  async expectOrderItemPrice(actualPrice: number, expectedPrice: number): Promise<void> {
    expect(actualPrice).toEqual(expectedPrice);
  }
}
