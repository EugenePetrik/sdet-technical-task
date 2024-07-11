import { expect } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';

export class PersonalInformation extends Component {
  private readonly firstNameInput = this.page.locator('#inputFirstName');

  private readonly lastNameInput = this.page.locator('#inputLastName');

  private readonly emailInput = this.page.locator('#inputEmail');

  private readonly phoneNumberInput = this.page.locator('#inputPhone');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.firstNameInput).toBeVisible(),
      await expect(this.lastNameInput).toBeVisible(),
      await expect(this.emailInput).toBeVisible(),
      await expect(this.phoneNumberInput).toBeVisible(),
    ]);
  }
}
