import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test("user cannot login with missing password", async({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login("newuser@test.com", "")

    await expect(page).toHaveURL(/login/)
    await expect(page.getByText("Password is required")).toBeVisible()
})