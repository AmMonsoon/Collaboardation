import {test , expect} from "@playwright/test"

test("user cannot be logged in with invalid user credentials", async({ page }) => {
    await page.goto("/login")

    await page.getByLabel("Email").fill("NotaRealEmail@yahoo.com")
    await page.getByLabel("Password").fill("fakemail")

    await page.getByRole("button", {name: "Submit" }).click()

    await expect(page).toHaveURL(/login/)
    await expect(page.getByText("Invalid Email or Password")).toBeVisible()
})