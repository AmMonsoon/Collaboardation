import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test('user stays logged in after refresh',  async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login("newuser@test.com", "test")

    await expect(page.getByRole("button", {name: "Logout"})).toBeVisible()

    await page.reload()

    await expect(page.getByRole("button", {name: "Logout"})).toBeVisible()
    await expect(page).not.toHaveURL(/login/)
})