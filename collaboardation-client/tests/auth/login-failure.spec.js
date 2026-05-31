import {test , expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test("user cannot be logged in with invalid user credentials", async({ page }) => {
    const loginPage =  new LoginPage(page)
    await loginPage.goto()
    await loginPage.login("loginfailuser@test.com", "fail")

    await expect(page).toHaveURL(/login/)
    await expect(page.getByText("Invalid Email or Password")).toBeVisible()
})