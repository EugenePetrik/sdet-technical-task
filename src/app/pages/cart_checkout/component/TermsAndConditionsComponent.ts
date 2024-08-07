import { expect } from '@playwright/test';
import { Component } from '../../../abstract.classes';
import { step } from '../../../../utils/reporters/steps';

export class TermsAndConditions extends Component {
  private readonly iHaveReadCheckbox = this.page.locator('#accepttos_custom');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([await expect(this.iHaveReadCheckbox).toBeVisible()]);
  }
}
