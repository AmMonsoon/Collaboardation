import {test,  expect} from "@playwright/test"

test("user can logout", async({page}) => {
    await page.goto("/login")

    await page.getByLabel("Email").fill("newuser@test.com")
    await page.getByLabel("Password").fill("test")

    await page.getByRole("button", {name:"Submit"}).click()

    await expect(page.getByRole("button", {name: "Logout"})).toBeVisible()
    await page.getByRole("button", {name: "Logout"}).click()

    await expect(page).toHaveURL(/login/)
    await expect(page.getByLabel("Email")).toBeVisible()
    await expect(page.getByLabel("Password")).toBeVisible()

})