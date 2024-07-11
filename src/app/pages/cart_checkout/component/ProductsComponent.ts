import { expect } from '@playwright/test';
import { step } from '../../../../utils/reporters/steps';
import { Component } from '../../../abstract.classes';
import { Product } from './ProductComponent';

export class Products extends Component {
  private readonly productsLocator = this.page.locator('.table tbody tr');

  @step()
  async expectLoaded(): Promise<void> {
    await Promise.all([
      await expect(this.productsLocator).not.toHaveCount(0),
      await new Product(this.productsLocator.first()).expectLoaded(),
    ]);
  }

  @step()
  async getProducts(productType: string): Promise<Product[]> {
    await this.expectLoaded();
    const products = await this.productsLocator.all();
    const filtered = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const product of products) {
      if ((await new Product(product).productType()) === productType) {
        filtered.push(product);
      }
    }

    return filtered.map(product => new Product(product));
  }

  @step()
  async getProductsDetails(): Promise<Awaited<ReturnType<Product['details']>>[]> {
    await this.expectLoaded();
    const products = await this.productsLocator.all();
    const details = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const product of products) {
      details.push(await new Product(product).details());
    }

    return details;
  }
}
