# SauceDemo Test Plan

## Scope

This test plan covers the SauceDemo scenarios A1–A7
specified in the QA Automation Engineer technical assignment.

| ID | Scenario | Purpose | Risk | Expected Result | Status |
|---|---|---|---|---|---|
| A1 | User wants to login with correct credentials | Verify the standard login path and inventory availability | Authentication or inventory page regression | Inventory page opened and Products heading are visible, with at least one product displayed | Automated |
| A2 | User wants to login with invalid credentials | Verify invalid credentials login rejection | Unauthorized access | Error is visible and authenticated inventory is absent | Automated |
| A3 | User wants to sort items by price low to high | Verify correct price sorting | Incorrect client-side sorting | All prices are in ascending numeric order | Automated |
| A4 | User adds items to cart and checks the cart content | Verify cart contents | Wrong product, price, quantity, or badge state | Two requested products appear update badge to 2 and appear with correct name, quantity, and price | Automated |
| A5 | User wants to finish the order | Verify checkout totals and completion | Incorrect financial calculation or incomplete order flow | The subtotal matches the sum of selected product prices, the tax is a valid numeric amount, the final total equals subtotal plus tax, and the order confirmation appears. | Automated |
| A6 | User wants to logout or open the website in multiple browser sessions | Verify logout successful and session independance | Session leakage between tests | Logout returns to login and inventory is not visible, and when one session login the other is not affected by it | Automated |
| A7 | User login using an account having problems and bugs | Explore a risk area with problem_user | Checkout form malfunction prevents customers from completing purchases. | The First Name, Last Name, and Postal Code fields accept inputs independently, allowing checkout to proceed; defect is documented in BUG_REPORT.md | Exploratory report (manual) |