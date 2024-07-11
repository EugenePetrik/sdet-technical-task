import { expect } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';

export class PaymentDetails extends Component {
  private readonly cardNumberInput = this.page.locator('#inputCardNumber');

  private readonly cardExpiryInput = this.page.locator('#inputCardExpiry');

  private readonly cardCVVInput = this.page.locator('#inputCardCVV');

  private readonly descriptionInput = this.page.locator('#inputDescription');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.cardNumberInput).toBeVisible(),
      await expect(this.cardExpiryInput).toBeVisible(),
      await expect(this.cardCVVInput).toBeVisible(),
      await expect(this.descriptionInput).toBeVisible(),
    ]);
  }
}
