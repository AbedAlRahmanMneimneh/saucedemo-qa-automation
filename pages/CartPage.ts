import {expect, type Page} from '@playwright/test';

export class CartPage {

    constructor(private readonly page: Page) {}

    async proceedToCheckout() {
        await this.page.getByTestId('checkout').click();
    }

    getCartItem(productName: string) {
        return this.page.getByTestId('inventory-item').filter({ hasText: productName });
    }

    getProductName(name: string) {
        return this.getCartItem(name).getByTestId('inventory-item-name');
    }

    getProductQuantity(name: string) {
        return this.getCartItem(name).getByTestId('item-quantity');
    }

    getProductPrice(name: string) {
        return this.getCartItem(name).getByTestId('inventory-item-price');
    }

    async validateProductInCart(productName: string, expectedQuantity: number, expectedPrice: string) {
        const cartItem = this.getCartItem(productName);
        await expect(cartItem).toBeVisible();
        await expect(this.getProductQuantity(productName)).toHaveText(expectedQuantity.toString());
        await expect(this.getProductPrice(productName)).toHaveText(expectedPrice);
    }
}