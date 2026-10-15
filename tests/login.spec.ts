import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('A1 - Successful login displays inventory and products', async ({ page }) => {
  const loginPage = new LoginPage(page);
  // Login with standard user credentials
    await loginPage.login('standard_user', 'secret_sauce');
  
  //Validate user is successfully logged in
    await loginPage.validateSuccessfulLogin();
});

test('A2 - Invalid login displays an error and denies access', async ({ page }) => {
    const loginPage = new LoginPage(page);
  // Login with invalid credentials
    await loginPage.login('invalid_user', 'invalid_password');

  // Validate that an error message is displayed
    await loginPage.validateLoginError();

});



