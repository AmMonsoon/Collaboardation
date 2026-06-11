import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test("user can log in and edit a task", async({page}) => {
    //login
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await loginPage.login("newuser@test.com", "test")
    
        await expect(page).not.toHaveURL(/login/)
        await expect(page.getByRole("button", {name: "Logout"})).toBeVisible()
        //create a project
        const projectTitle = `E2E Project ${Date.now()}`
        await page.getByTestId("create-project-button").click()
        await page.getByTestId("project-title-input").fill(projectTitle)
        await page.getByTestId("submit-project-button").click()
    
        await expect(page.getByText(projectTitle)).toBeVisible()
    
        //create a board
        const boardTitle = `E2E Board ${Date.now()}`
        await page.getByTestId("board-title-input").fill(boardTitle)
        await page.getByTestId("board-description-input").fill("E2E Board Description")
        await page.getByTestId("submit-board-button").click()
    
        await expect(page.getByText(boardTitle)).toBeVisible()
        await expect(page.getByText("E2E Board Description")).toBeVisible()
    
        //create a task
        const taskTitle = `E2E Task ${Date.now()}`
        await page.getByTestId("task-title-input").fill(taskTitle)
        await page.getByTestId("task-description-input").fill("E2E Task Description")
        await page.getByTestId("submit-task-button").click()
    
        await expect(page.getByText(taskTitle)).toBeVisible()
        await expect(page.getByText("E2E Task Description")).toBeVisible()

        const taskCard = page.getByTestId("task-card").filter({hasText: taskTitle})
        await taskCard.getByTestId("task-edit-button").click()
        
        await page.getByTestId("edit-task-title-input").clear()
        await page.getByTestId("edit-task-description-input").clear()
        
        await page.getByTestId("edit-task-title-input").fill("Edited Task Title")
        await page.getByTestId("edit-task-description-input").fill("Edited Task Description")

        await page.getByTestId("edit-task-save-button").click()
       
        await expect(page.getByText("Edited Task Title")).toBeVisible()
        await expect(page.getByText("Edited Task Description")).toBeVisible()

})