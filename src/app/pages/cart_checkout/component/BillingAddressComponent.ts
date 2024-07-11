import { expect } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';

export class BillingAddress extends Component {
  private readonly companyNameInput = this.page.locator('#inputCompanyName');

  private readonly address1Input = this.page.locator('#inputAddress1');

  private readonly address2Input = this.page.locator('#inputAddress2');

  private readonly cityInput = this.page.locator('#inputCity');

  private readonly stateInput = this.page.locator('#stateselect');

  private readonly postcodeInput = this.page.locator('#inputPostcode');

  private readonly countryInput = this.page.locator('#inputCountry');

  private readonly taxIdInput = this.page.locator('#inputTaxId');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.companyNameInput).toBeVisible(),
      await expect(this.address1Input).toBeVisible(),
      await expect(this.address2Input).toBeVisible(),
      await expect(this.cityInput).toBeVisible(),
      await expect(this.stateInput).toBeVisible(),
      await expect(this.postcodeInput).toBeVisible(),
      await expect(this.countryInput).toBeVisible(),
      await expect(this.taxIdInput).toBeVisible(),
    ]);
  }
}
