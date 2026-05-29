import {test, expect} from "@playwright/test"

test("user must be authenticated to access protected routes", async ({page}) => {
    await page.goto("/projects/14")

    await expect(page).toHaveURL(/login/)
    await expect(page.getByRole("button", {name: "Logout"})).not.toBeVisible()
})
