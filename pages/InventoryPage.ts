import { expect, type Page } from '@playwright/test';

export class InventoryPage {

    constructor(private readonly page: Page) {}

    async sortByPriceLowToHigh() {
        await this.page.getByTestId('product-sort-container').selectOption('lohi');
    }

    async validateSorting(): Promise<boolean> {
        const prices = await this.getDisplayedPrices();
        const priceNumbers = prices.map((price) => Number(price.replace('$', '')));
        for (let i = 0; i < priceNumbers.length - 1; i++) {
            if (priceNumbers[i] > priceNumbers[i + 1]) {
                return false;
            }
        }
        return true;
    }

    async getDisplayedPrices(): Promise<string[]> {
        const prices = this.page.getByTestId('inventory-item-price');
        await prices.first().waitFor({ state: 'visible' });
        return await prices.allTextContents();
        
    }

    async addProductToCart(productId: string) {
        await this.page.getByTestId(`add-to-cart-${productId}`).click();
    }

    async validateCartBadge(expectedCount: number) {
        await expect(this.page.getByTestId('shopping-cart-badge')).toHaveText(expectedCount.toString());
    }

    async openCart() {
        await this.page.getByTestId('shopping-cart-link').click();
    }

    async validateCartOpened() {
        await expect(this.page).toHaveURL(/cart.html/);
    }

    async openMenu() {
        await this.page.getByRole('button', { name: 'Open Menu' }).click();
    }

}