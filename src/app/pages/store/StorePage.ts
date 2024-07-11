import { expect } from '@playwright/test';
import { step } from '../../../utils/reporters/steps';
import { AppPage } from '../../abstract.classes';
import { Licenses, type License } from './component';

export class StorePage extends AppPage {
  public readonly pagePath = '/store/cpanel-licenses';

  private readonly header = this.page.locator('.header-lined h1');

  private readonly licenses = new Licenses(this.page);

  private readonly licenseList = this.page.locator('.products');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.licenseList).toBeVisible(),
      await expect(this.header).toHaveText('cPanel Licenses'),
    ]);
  }

  @step()
  async getLicenseDetails(
    title: string,
  ): Promise<Awaited<ReturnType<License['details']>>> {
    const matchedFirstResult: License = (await this.licenses.getLicenses(title))[0];
    return matchedFirstResult.details();
  }

  @step()
  async openLicense(title: string): Promise<void> {
    const matchedFirstResult: License = (await this.licenses.getLicenses(title))[0];
    await matchedFirstResult.select();
  }
}
