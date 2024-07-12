## Test automation framework for Store Cpanel Application

### Prerequisites:

- Node.js version 20+
- npm version 8+

### Tools:

1. Node v20.10.0
2. Typescript
3. Playwright
4. ESlint
5. Prettier

### Getting started:

#### Install project dependencies

```bash
npm install
```

or

```bash
npm ci
```

#### Add ENV variables

```bash
cp ./.env.example ./.env
```

This config is also personal, so you could modify it as you like

#### Setting proper env variables

- `BASE_URL` defines base URL of frontend app. Defaults to `"https://cloud.scylladb.com"`

#### Run tests

```bash
npm run test
```

or

```bash
npm t
```

#### Check the code quality

```bash
npm run check-all
```

#### HTML Report

```bash
npm run report
```

### Automation steps to cover and verify:

1. **Navigate to the cPanel store**

   - Open the shopping cart

2. **Order a product**

   - Click 'Order Now' for any product

3. **Enter IP address**

   - On the new page, enter an IP address

4. **Select addons**

   - Choose any addon(s)

5. **Continue to checkout**

   - Verify the 'Order Summary' is updated
   - Click on the 'Continue' button

6. **Verify product and price**

   - Verify the expected products and addons are present (names)
   - Ensure prices are correct
   - Ensure prorated prices are correct

7. **Proceed to checkout**

   - Click on the 'Checkout' button

8. **Verify checkout information**
   - Ensure the information in the product table is correct:
     - The license name is correct
     - The IP address is shown
     - The monthly price is correct
     - The “Due Today“ prices are correct
   - Verify that the ‘Personal Information', 'Billing Address', 'Account Security', 'Terms & Conditions' and 'Payment Details’ sections are visible
   - Verify that the ‘Complete Order' button is visible but disabled
