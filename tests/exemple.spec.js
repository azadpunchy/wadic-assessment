const { test, expect } = require("@playwright/test");
const { default: methods } = require("./methods");

test.describe("Wadic assesment", async () => {
  test("tests and assertions", async ({ page }) => {
    await page.goto("https://qa-oc.roofscope.com/");
    // await page.waitForURL("https://qa-oc.roofscope.com/");

    // await page.waitForLoadState("domcontentloaded");
    await page.locator("css=#pac-input").click();
    await methods.wait(500);
    expect(page.locator("css=#pac-input")).toBeFocused();
    await methods.wait(500);
    await page.locator("css=#pac-input").fill(`${"Lahore"}`);
    await methods.wait(500);
    await page.click(".pac-item:first-child");
    await methods.wait(500);
    await page.click("text=SEARCH ADDRESS");
    await page.waitForURL(
      "https://qa-oc.roofscope.com/index.php?route=information/product_data"
    );
    await methods.wait(500);
    const button = await page.locator("css=button#myButton"); // Replace with the actual selector for your button.

    // Use the 'expect' function to assert whether the button is disabled
    await expect(button).toHaveAttribute("disabled");
    await methods.wait(500);
    await page.click("text=CONFIRM LOCATION", { timeout: 5000 });
    await methods.wait(500);
    const verifyActiveElement = page.locator("text=MULTI-FAMILY");
    await verifyActiveElement.nth(1).click();
    await methods.wait(1000);

    const selectedActiveElements = page.locator('[aria-selected="true"]');
    // selected second element
    const activeMultiFamily = selectedActiveElements.nth(1);
    expect(activeMultiFamily).toHaveClass(
      "shipping_button shipping_button1 btn btn btn-white shadow-sm active"
    );

    await page.click("[data-bs-slide='next']");
    await methods.wait("500");

    // verify btn not visible
    const gutterScopeAssertionBtnCheck = page.locator(
      "css=.btn.btn.btn-red.next"
    );
    expect(gutterScopeAssertionBtnCheck).toHaveClass(
      "btn btn btn-red next d-none"
    );

    await page.click("text=GutterScope");
    await methods.wait("500");
    // verify btn is visible
    expect(gutterScopeAssertionBtnCheck).toHaveClass("btn btn btn-red next");
    await gutterScopeAssertionBtnCheck.click();

    await page.locator("text=ADD TO CART").click();
    await page.waitForURL(
      "https://qa-oc.roofscope.com/index.php?route=checkout/cart"
    );
    await methods.wait("500");
    await page.locator("text=PROCEED TO CHECKOUT").click();
    await page.waitForURL(
      "https://qa-oc.roofscope.com/index.php?route=checkout/checkout"
    );
    await methods.wait(500);

    await methods.wait(60000);
  });
});
