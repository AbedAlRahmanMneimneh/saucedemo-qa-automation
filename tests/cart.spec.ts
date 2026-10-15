import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('A4 - Adding items to cart results in correct cart badge and cart content details', async ({ page }) => {

  // Login with standard user credentials
    await new LoginPage(page).login('standard_user', 'secret_sauce');

  // Add backpack to cart
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addProductToCart('sauce-labs-backpack');

  // Verify cart badge shows 1
    await inventoryPage.validateCartBadge(1);

  // Add bolt t-shirt to cart
    await inventoryPage.addProductToCart('sauce-labs-bolt-t-shirt');

  // Verify cart badge shows 2
    await inventoryPage.validateCartBadge(2);

  // Click on cart icon
    await inventoryPage.openCart();
    
  // Verify that the cart page is opened
    await inventoryPage.validateCartOpened();

  // Verify backpack and t-shirt are in the cart
    const cartPage = new CartPage(page);

    // Verify the backpack
      await cartPage.validateProductInCart('Sauce Labs Backpack', 1, '$29.99');
    
    // Verify the T-shirt
      await cartPage.validateProductInCart('Sauce Labs Bolt T-Shirt', 1, '$15.99');
});