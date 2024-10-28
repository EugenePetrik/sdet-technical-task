import { expect } from '@playwright/test';
import { step } from '../../../../utils/reporters/steps';
import { Component } from '../../../abstract.classes';
import { Addon } from './AddonComponent';

export class Addons extends Component {
  private readonly addonsLocator = this.page.locator('.panel-addon');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.addonsLocator).not.toHaveCount(0),
      await new Addon(this.addonsLocator.first()).expectLoaded(),
    ]);
  }

  @step()
  async getAddons(title: string): Promise<Addon[]> {
    await this.expectLoaded();
    const addons = await this.addonsLocator.all();
    const filtered = [];

    for (const addon of addons) {
      if ((await new Addon(addon).title()) === title) {
        filtered.push(addon);
      }
    }

    return filtered.map(addon => new Addon(addon));
  }

  @step()
  async getAddonsDetails(): Promise<Awaited<ReturnType<Addon['details']>>[]> {
    await this.expectLoaded();
    const addons = await this.addonsLocator.all();
    const details = [];

    for (const addon of addons) {
      details.push(await new Addon(addon).details());
    }

    return details;
  }
}
