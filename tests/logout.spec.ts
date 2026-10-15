import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('A6 - User can log out successfully', async ({ page }) => {

   // Login with standard user credentials
    await new LoginPage(page).login('standard_user', 'secret_sauce');

    // Click on the menu button
    await page.getByRole('button', {name: 'Open Menu'}).click();

    // Click on the logout link
    await page.getByTestId('logout-sidebar-link').click();
    
    // Verify that the user is redirected to the login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');

});

test('A6 - Browser sessions are independent', async ({ browser }) => {

    // Create two separate browser contexts
    const contextA = await browser.newContext();
    const contextB = await browser.newContext();

    // Create two separate pages
    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    // Log in with the first user in context A
    await new LoginPage(pageA).login('standard_user', 'secret_sauce');

    await expect(pageA).toHaveURL(/inventory.html/);

    // verify that the second user in context B is still on the login page
    await pageB.goto('/');
    await expect(pageB).toHaveURL('https://www.saucedemo.com/');
    await expect(pageB.getByRole('button', {name: 'Login'})).toBeVisible();

    await contextA.close();
    await contextB.close();
});