import {expect, test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('A5 - The checkout process is completed successfully and totals are calculated correctly', async ({ page }) => {

    // Login with standard user credentials
        await new LoginPage(page).login('standard_user', 'secret_sauce');
      
    // Add backpack to cart
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.addProductToCart('sauce-labs-backpack');

    // Add bolt t-shirt to cart
        await inventoryPage.addProductToCart('sauce-labs-bolt-t-shirt');

    // Click on cart icon
        await inventoryPage.openCart();

    // Click on checkout button
        await new CartPage(page).proceedToCheckout();

    // Validate that the checkout form is opened
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.validateCheckoutFormOpened();

    // Fill in checkout information
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');

    // Click on continue button
        await checkoutPage.clickContinue();

    // Validate that the checkout overview is opened
        await checkoutPage.validateCheckoutOverviewOpened();

    // Verify item subtotal, tax, and total
        await checkoutPage.validateSubtotal(29.99 + 15.99);
        await checkoutPage.validateTax();
        await checkoutPage.validateTotal();

    // Click on finish button
        await checkoutPage.clickFinish();
    
    // Verify that the order is complete
        await checkoutPage.validateCheckoutCompleted();
});