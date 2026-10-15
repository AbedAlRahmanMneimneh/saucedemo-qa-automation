import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test('A3 - Products are sorted by price low to high', async ({ page }) => {

  // Login with standard user credentials
    await new LoginPage(page).login('standard_user', 'secret_sauce');
    
  // Select price low to high
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortByPriceLowToHigh();

  // Read displayed prices
    const prices = await inventoryPage.getDisplayedPrices();

  // Verify that there are at least two prices to compare
    expect(prices.length).toBeGreaterThanOrEqual(2);

  // Verify ascending order
    expect(await inventoryPage.validateSorting()).toBe(true);
});