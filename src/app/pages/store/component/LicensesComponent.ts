import { expect } from '@playwright/test';
import { step } from '../../../../utils/reporters/steps';
import { Component } from '../../../abstract.classes';
import { License } from './LicenseComponent';

export class Licenses extends Component {
  private readonly licensesLocator = this.page.locator('.product');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.licensesLocator).not.toHaveCount(0),
      await new License(this.licensesLocator.first()).expectLoaded(),
    ]);
  }

  @step()
  async getLicenses(title: string): Promise<License[]> {
    await this.expectLoaded();
    const licenses = await this.licensesLocator.all();
    const filtered = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const license of licenses) {
      if ((await new License(license).title()) === title) {
        filtered.push(license);
      }
    }

    return filtered.map(license => new License(license));
  }

  @step()
  async getLicensesDetails(): Promise<Awaited<ReturnType<License['details']>>[]> {
    await this.expectLoaded();
    const licenses = await this.licensesLocator.all();
    const details = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const license of licenses) {
      details.push(await new License(license).details());
    }

    return details;
  }
}
