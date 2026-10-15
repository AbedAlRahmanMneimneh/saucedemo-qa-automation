import{expect, type Page} from '@playwright/test'

export class CheckoutPage {

    constructor(private readonly page: Page) {}

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.getByTestId('firstName').fill(firstName);
        await this.page.getByTestId('lastName').fill(lastName);
        await this.page.getByTestId('postalCode').fill(postalCode);
    }

    async clickContinue() {
        await this.page.getByTestId('continue').click();
    }

    async getSubtotal() {
        await this.page.getByTestId('subtotal-label').waitFor({ state: 'visible' });
        return Number((await this.page.getByTestId('subtotal-label').textContent())?.replace('Item total: $', ''));
    }

    async getTax() {
        await this.page.getByTestId('tax-label').waitFor({ state: 'visible' });
        return Number((await this.page.getByTestId('tax-label').textContent())?.replace('Tax: $', ''));
    }

    async getTotal() {
        await this.page.getByTestId('total-label').waitFor({ state: 'visible' });
        return Number((await this.page.getByTestId('total-label').textContent())?.replace('Total: $', ''));
    }

    async clickFinish() {
        await this.page.getByTestId('finish').click();
    }

    async validateCheckoutFormOpened(){
        await expect(this.page).toHaveURL(/checkout-step-one.html/);
        await expect(this.page.getByTestId('title')).toHaveText('Checkout: Your Information');
    }
    
    async validateCheckoutOverviewOpened(){
        await expect(this.page).toHaveURL(/checkout-step-two.html/);
        await expect(this.page.getByTestId('title')).toHaveText('Checkout: Overview');
    }

    async validateSubtotal(expectedSubtotal: number) {
        const subtotal = await this.getSubtotal();
        expect(Number.isNaN(subtotal)).toBe(false);
        expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
    }

    async validateTax() {
        const tax = await this.getTax();
        expect(Number.isNaN(tax)).toBe(false);
    }

    async validateTotal() {
        const subtotal = await this.getSubtotal();
        const tax = await this.getTax();
        const total = await this.getTotal();
        expect(Number.isNaN(total)).toBe(false);
        expect(total).toBeCloseTo(subtotal + tax, 2);
    }

    async validateCheckoutCompleted(){
        await expect(this.page).toHaveURL(/checkout-complete.html/);
        await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
    }
}
