import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test("user can log in and edit a project", async({page}) => {
    //login
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login("newuser@test.com", "test")
    
        await expect(page).not.toHaveURL(/login/)
        await expect(page.getByRole("button", {name: "Logout"})).toBeVisible()
        //create a project
        const projectTitle = `Proj ${Date.now().toString().slice(-6)}`
        await page.getByTestId("create-project-button").click()
        await page.getByTestId("project-title-input").fill(projectTitle)
        await page.getByTestId("submit-project-button").click()
    
        await expect(page.getByRole("heading", {name: projectTitle})).toBeVisible()

        const specificProject = page.getByTestId("project-list").filter({hasText: projectTitle})
        await specificProject.hover("project-actions-menu-button")
        await specificProject.getByTestId("project-actions-menu-button").click()

        await specificProject.getByTestId("project-edit-button").click()

        const updatedProjectTitle = `Edit ${Date.now()}`

        await page.getByTestId("edit-project-title-input").clear()
        await page.getByTestId("edit-project-title-input").fill(updatedProjectTitle)

        await expect(page.getByTestId("edit-project-title-input")).toHaveValue(updatedProjectTitle)

        await page.getByTestId("edit-project-confirm-button").click()
        // await page.pause()
        await expect(page.getByText(updatedProjectTitle).first()).toBeVisible({
            timeout: 10000
})})