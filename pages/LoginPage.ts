import { expect, type Page } from "@playwright/test";

export class LoginPage {

  constructor(private readonly page: Page) {}

  async login(username: string, password: string) {
    await this.page.goto("/");
    await this.page.getByTestId("username").fill(username);
    await this.page.getByTestId("password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }
  
  async validateSuccessfulLogin() {
    // Verify that the user is redirected to the inventory page
    await expect(this.page).toHaveURL(/inventory.html/);

    // Verify that the inventory page displays the "Products" header
    await expect(this.page.getByText("Products")).toBeVisible();

    // Verify that at least one product is displayed on the inventory page
    await expect(this.page.getByTestId("inventory-item").first()).toBeVisible();
  }
  
  async validateLoginError() {
    // Verify that the user is still on the login page
        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
      
      // Verify that the error message is displayed
        await expect(this.page.getByTestId('error')).toBeVisible();
  }
}
