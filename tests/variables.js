const { test, expect } = require("@playwright/test");

/**
 * Task Details:
1. Go to the website and signup an account
2. Login to the newly registered account
3. Place order (completee the checkout process)
 */
test.describe("Wadic assessment", async ({ page }) => {
  test("1", async () => {
    await page.goto("https://qa-oc.roofscope.com");

    await page.click("text=Create An Account");
  });
});
