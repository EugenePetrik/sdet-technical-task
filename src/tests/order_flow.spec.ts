import { faker } from '@faker-js/faker';
import { baseFixture as test } from '../fixtures/base';
import {
  getPriceForCurrentMonth,
  priceToText,
  roundToCents,
} from '../utils/helpres/price';

test.describe('Checking filling form data for cPanel order', { tag: '@e2e' }, () => {
  test('order a produce flow', async ({ app }) => {
    let licenseInfo: { title: string; description: string; price: number };
    let addonInfo: { title: string; price: number };

    const licenseTitle = 'cPanel Solo® Cloud (1 Account)';
    const addonTitle = 'Monthly CloudLinux';
    const ipAddress = faker.internet.ipv4();

    await test.step('Navigate to the cPanel store', async () => {
      await app.homePage.open();

      await app.homePage.header.expectLoaded();

      await app.homePage.clickOnBrowseProductsButton();

      await app.storePage.expectLoaded();
    });

    await test.step('Order a product', async () => {
      licenseInfo = await app.storePage.getLicenseDetails(licenseTitle);
      await app.storePage.openLicense(licenseTitle);

      await app.cartConfigurePage.expectLoaded();
    });

    await test.step('Enter IP address', async () => {
      await app.cartConfigurePage.fillInIpAddress(ipAddress);

      await app.cartConfigurePage.expectIpAddressIsVerified();
    });

    await test.step('Select addons', async () => {
      addonInfo = await app.cartConfigurePage.getAddonDetails(addonTitle);
      await app.cartConfigurePage.selectAddon(addonTitle);
    });

    await test.step('Continue to checkout', async () => {
      await app.cartConfigurePage.orderSummary.expectLoaded();
      await app.cartConfigurePage.orderSummary.expectOrderOption(
        licenseInfo.title,
        priceToText(licenseInfo.price),
      );
      await app.cartConfigurePage.orderSummary.expectOrderOption(
        addonInfo.title,
        priceToText(addonInfo.price),
      );
      await app.cartConfigurePage.orderSummary.expectOrderOption(
        'Setup Fees:',
        priceToText(0),
      );
      await app.cartConfigurePage.orderSummary.expectOrderOption(
        'Monthly:',
        priceToText(licenseInfo.price + addonInfo.price),
      );

      await app.cartConfigurePage.clickOnContinueButton();
    });

    await test.step('Verify product and price', async () => {
      await app.cartReviewPage.expectLoaded();

      const licenseCardOrderItem =
        await app.cartReviewPage.getCartItemDetails(licenseTitle);
      await app.cartReviewPage.expectOrderItemPrice(
        licenseCardOrderItem.price,
        getPriceForCurrentMonth(licenseInfo.price),
      );
      await app.cartReviewPage.expectOrderItemPrice(
        licenseCardOrderItem.monthlyPrice,
        roundToCents(licenseInfo.price + addonInfo.price),
      );

      const addonCardOrderItem = await app.cartReviewPage.getCartItemDetails(addonTitle);
      await app.cartReviewPage.expectOrderItemPrice(
        addonCardOrderItem.price,
        getPriceForCurrentMonth(addonInfo.price),
      );
      await app.cartReviewPage.expectOrderItemPrice(
        addonCardOrderItem.monthlyPrice,
        addonInfo.price,
      );

      const totalDueTodayPrice = priceToText(
        getPriceForCurrentMonth(licenseInfo.price + addonInfo.price),
      );
      await app.cartReviewPage.orderSummary.expectTotalDueTodayPrice(totalDueTodayPrice);
    });

    await test.step('Proceed to checkout', async () => {
      await app.cartReviewPage.orderSummary.clickOnCheckoutButton();

      await app.cartCheckoutPage.expectLoaded();
    });

    await test.step('Verify checkout information', async () => {
      const licenseProduct = await app.cartCheckoutPage.getProductDetails(licenseTitle);
      await app.cartCheckoutPage.expectProductData(
        licenseProduct.productType,
        licenseInfo.title,
      );
      await app.cartCheckoutPage.expectProductData(licenseProduct.ipAddress, ipAddress);
      await app.cartCheckoutPage.expectProductData(
        licenseProduct.recurringPrice,
        roundToCents(licenseInfo.price + addonInfo.price),
      );
      await app.cartCheckoutPage.expectProductData(
        licenseProduct.dueTodayPrice,
        getPriceForCurrentMonth(licenseInfo.price),
      );

      const addonProduct = await app.cartCheckoutPage.getProductDetails(addonTitle);
      await app.cartCheckoutPage.expectProductData(
        addonProduct.productType,
        addonInfo.title,
      );
      await app.cartCheckoutPage.expectProductData(addonProduct.ipAddress, ipAddress);
      await app.cartCheckoutPage.expectProductData(
        addonProduct.recurringPrice,
        addonInfo.price,
      );
      await app.cartCheckoutPage.expectProductData(
        addonProduct.dueTodayPrice,
        getPriceForCurrentMonth(addonInfo.price),
      );

      const totalPrice = priceToText(
        getPriceForCurrentMonth(licenseInfo.price + addonInfo.price),
      );
      await app.cartCheckoutPage.expectCartSubtotalPrice(totalPrice);
      await app.cartCheckoutPage.expectTotalDueTodayPrice(totalPrice);

      await app.cartCheckoutPage.header.expectCartItemCount(2);

      await app.cartCheckoutPage.personalInformation.expectLoaded();
      await app.cartCheckoutPage.billingAddress.expectLoaded();
      await app.cartCheckoutPage.accountSecurity.expectLoaded();
      await app.cartCheckoutPage.termsAndConditions.expectLoaded();
      await app.cartCheckoutPage.paymentDetails.expectLoaded();

      await app.cartCheckoutPage.expectCompleteOrderButtonIsDisabled();
    });
  });
});
