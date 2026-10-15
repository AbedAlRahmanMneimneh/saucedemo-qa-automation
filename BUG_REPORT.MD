# BUG-001: Last Name field cannot be filled during checkout

**Application:** SauceDemo  
**Test account:** `problem_user`  
**Page:** Checkout: Your Information  
**Severity:** High  
**Priority:** High (suggested)  
**Status:** New

### Preconditions
- User is logged in with the `problem_user` account.
- At least one product has been added to the shopping cart.
- User has opened the checkout information page.

### Steps to Reproduce
1. Log in to SauceDemo using `problem_user`.
2. Add an available product to the cart.
3. Open the shopping cart and click **Checkout**.
4. Enter `John` in the **First Name** field.
5. Attempt to enter `Doe` in the **Last Name** field.
6. Click **Continue**.

### Expected Result
- First Name remains `John`.
- Last Name contains `Doe`.
- The user can proceed to Checkout Overview when all required fields are completed.

### Actual Result
- First Name changes from `John` to `e`, the last character typed while attempting to enter `Doe`.
- Last Name remains empty.
- Clicking Continue displays: **"Error: Last Name is required"**.
- The user cannot proceed to Checkout Overview.

### Impact
The defect prevents the affected user from completing the checkout process.
