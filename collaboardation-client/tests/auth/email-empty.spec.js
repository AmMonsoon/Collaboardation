import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test("user cannot login with missing email", async({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login("", "test")

    await expect(page).toHaveURL(/login/)
    await expect(page.getByText("Email is required")).toBeVisible()
})