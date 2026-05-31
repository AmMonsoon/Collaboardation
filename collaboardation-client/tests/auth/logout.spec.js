import {test,  expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
test("user can logout", async({page}) => {
    const loginPage = new LoginPage(page)
    loginPage.goto()
    loginPage.login("newuser@test.com", "test")

    await expect(page.getByRole("button", {name: "Logout"})).toBeVisible()
    await page.getByRole("button", {name: "Logout"}).click()

    await expect(page).toHaveURL(/login/)
    await expect(page.getByLabel("Email")).toBeVisible()
    await expect(page.getByLabel("Password")).toBeVisible()

})