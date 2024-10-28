import { expect } from '@playwright/test';
import { step } from '../../../utils/reporters/steps';
import { AppPage } from '../../abstract.classes';
import {
  AccountSecurity,
  BillingAddress,
  OrderSummary,
  PaymentDetails,
  PersonalInformation,
  type Product,
  Products,
  TermsAndConditions,
} from './component';
import { Header } from '../../components';

export class CartCheckoutPage extends AppPage {
  public readonly pagePath = '/cart.php?a=view';

  private readonly headerLocator = this.page.locator('.header-lined h1');

  private readonly cartSubtotalPrice = this.page.locator('#cartSubtotal');

  private readonly totalDueTodayPrice = this.page.locator('#totalCartPrice');

  private readonly completeOrderButton = this.page.locator('#btnCompleteOrder');

  private readonly products = new Products(this.page);

  public readonly orderSummary = new OrderSummary(this.page);

  public readonly personalInformation = new PersonalInformation(this.page);

  public readonly billingAddress = new BillingAddress(this.page);

  public readonly accountSecurity = new AccountSecurity(this.page);

  public readonly termsAndConditions = new TermsAndConditions(this.page);

  public readonly paymentDetails = new PaymentDetails(this.page);

  public readonly header = new Header(this.page);

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.headerLocator).toHaveText('Checkout'),
      await expect(this.cartSubtotalPrice).toBeVisible(),
      await expect(this.totalDueTodayPrice).toBeVisible(),
    ]);
  }

  @step()
  async getProductDetails(
    product: string,
  ): Promise<Awaited<ReturnType<Product['details']>>> {
    const matchedFirstResult: Product = (await this.products.getProducts(product))[0];
    return matchedFirstResult.details();
  }

  @step()
  async expectProductData(
    actualData: number | string,
    expectedData: number | string,
  ): Promise<void> {
    expect(actualData).toEqual(expectedData);
  }

  @step()
  async expectCartSubtotalPrice(price: string): Promise<void> {
    await expect(this.cartSubtotalPrice).toHaveText(price);
  }

  @step()
  async expectTotalDueTodayPrice(price: string): Promise<void> {
    await expect(this.totalDueTodayPrice).toHaveText(price);
  }

  @step()
  async expectCompleteOrderButtonIsDisabled(): Promise<void> {
    await expect(this.completeOrderButton).toBeVisible();
    await expect(this.completeOrderButton).toBeDisabled();
  }
}
