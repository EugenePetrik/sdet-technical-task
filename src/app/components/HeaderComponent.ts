import { expect } from '@playwright/test';
import { Component } from '../abstract.classes';
import { step } from '../../utils/reporters/steps';

export class Header extends Component {
  private readonly logo = this.page.locator('.navbar-brand');

  private readonly cartItemCount = this.page.locator('#cartItemCount');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.logo).toBeVisible(),
      await expect(this.cartItemCount).toBeVisible(),
    ]);
  }

  @step()
  async expectCartItemCount(count: number): Promise<void> {
    await expect(this.cartItemCount).toHaveText(count.toString());
  }
}
