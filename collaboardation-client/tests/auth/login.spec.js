import {test, expect} from "@playwright/test"

test("user can login", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill("newuser@test.com")
    await page.getByLabel("Password").fill("test")

    await page.getByRole("button", {name: "Submit"}).click()

    await expect(page).not.toHaveURL(/login/)
    await expect(page.getByRole("button", {name: "Logout"})).toBeVisible()
})