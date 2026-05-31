import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage";
test("user can login", async ({ page }) => {
    const loginPage =  new LoginPage(page)
    loginPage.goto()
    loginPage.login("newuser@test.com", "test")
    
    await expect(page).not.toHaveURL(/login/)
    await expect(page.getByRole("button", {name: "Logout"})).toBeVisible()
})