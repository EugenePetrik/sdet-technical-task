import { expect } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';

export class AccountSecurity extends Component {
  private readonly password1Input = this.page.locator('#inputNewPassword1');

  private readonly password2Input = this.page.locator('#inputNewPassword2');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.password1Input).toBeVisible(),
      await expect(this.password2Input).toBeVisible(),
    ]);
  }
}
