   import {test, expect} from "@playwright/test"
   import { LoginPage } from "../pages/LoginPage"     

test("user can delete a project", async({page}) => {

    //login
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login("newuser@test.com", "test")

    await expect(page).not.toHaveURL(/login/)
    await expect(page.getByRole("button", {name: "Logout"})).toBeVisible()
    //create a project
    const projectTitle = `Project ${Date.now().toString().slice(-6)}`
    await page.getByTestId("create-project-button").click()
    await page.getByTestId("project-title-input").fill(projectTitle)
    await page.getByTestId("submit-project-button").click()

    await expect(page.getByRole("heading", {name: projectTitle})).toBeVisible()

    const specificProject = page.getByTestId("project-list").filter({hasText: projectTitle})
    await specificProject.hover("project-actions-menu-button")
    await specificProject.getByTestId("project-actions-menu-button").click()

    await specificProject.getByTestId("project-delete-button").click()
    await page.getByTestId("delete-confirm-button").click()
    await expect(page.getByTestId("project-list").filter({hasText: projectTitle})).toHaveCount(0)
})