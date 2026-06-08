import { test, expect } from "@playwright/test"
import { createApiContext, loginApi, createProject, createBoard, createTask } from "./helpers/apiHelpers"


test("user can create a task", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)
    const projectBody = await createProject(apiContext)
    const projectId = projectBody.data.project.id
    const boardBody = await createBoard(apiContext, projectId, "Testing Board for Task API", "test description")
    const boardId = boardBody.data.board.id
    const taskBody = await createTask(apiContext, projectId, boardId)
    
    expect(taskBody.success).toBe(true)
    expect(taskBody.message).toBe("New Task Created")
    expect(typeof taskBody.data.task.id).toBe("number")
    expect(taskBody.data.task.title).toBe("Testing Create Task API")
    expect(taskBody.data.task.description).toBe("adding assertions next")
    expect(taskBody.data.task.boardId).toBe(boardId)
    expect(typeof taskBody.data.task.dueDate).toBe("string")
})

test("user can get a task", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)
    const projectBody = await createProject(apiContext)
    const projectId = projectBody.data.project.id
    const boardBody = await createBoard(apiContext, projectId, "Testing Board for Task API", "test description")
    const boardId = boardBody.data.board.id
    const taskBody = await createTask(apiContext, projectId, boardId, "Testing a specific task", "get task test")
    const taskId = taskBody.data.task.id

    const getTaskResponse =  await apiContext.get(`/projects/${projectId}/boards/${boardId}/tasks/${taskId}`)
    expect(getTaskResponse.status()).toBe(200)

    const getTaskBody = await getTaskResponse.json()
    
    expect(getTaskBody.id).toBe(taskId)
    expect(getTaskBody.title).toBe(taskBody.data.task.title)
    expect(getTaskBody.description).toBe(taskBody.data.task.description)
    expect(getTaskBody.dueDate).toBe(taskBody.data.task.dueDate)
    expect(getTaskBody.boardId).toBe(boardId)
})

test("user can update a task", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)
    const projectBody = await createProject(apiContext)
    const projectId = projectBody.data.project.id
    const boardBody = await createBoard(apiContext, projectId, "Testing Board for Task API", "test description")
    const boardId = boardBody.data.board.id
    const taskBody = await createTask(apiContext, projectId, boardId, "Testing update for a task", "update task test")
    const taskId = taskBody.data.task.id

    const updatedTaskResponse =  await apiContext.patch(`/projects/${projectId}/boards/${boardId}/tasks/${taskId}`, {
        data:{
            title: "Updated Task",
            description: "Updated Description",
        }
    })

    expect(updatedTaskResponse.status()).toBe(200)
    const updatedTaskBody = await updatedTaskResponse.json()

    expect(updatedTaskBody.message).toBe("Task Updated Successfully")
    expect(updatedTaskBody.updatedTask[0].id).toBe(taskId)
    expect(updatedTaskBody.updatedTask[0].title).toBe("Updated Task")
    expect(updatedTaskBody.updatedTask[0].description).toBe("Updated Description")
    expect(updatedTaskBody.updatedTask[0].dueDate).toBe(taskBody.data.task.dueDate)
    expect(updatedTaskBody.updatedTask[0].boardId).toBe(boardId)

    const getTaskResponse =  await apiContext.get(`/projects/${projectId}/boards/${boardId}/tasks/${taskId}`)
    expect(getTaskResponse.status()).toBe(200)

    const getTaskBody = await getTaskResponse.json()
    expect(getTaskBody.title).toBe("Updated Task")
    expect(getTaskBody.description).toBe("Updated Description")
})

test("user can delete a task", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)
    const projectBody = await createProject(apiContext)
    const projectId = projectBody.data.project.id
    const boardBody = await createBoard(apiContext, projectId, "Testing Board for Task API", "test description")
    const boardId = boardBody.data.board.id
    const taskBody = await createTask(apiContext, projectId, boardId, "Testing Delete Task", "delete task test")
    const taskId = taskBody.data.task.id

    const deleteTaskResponse =  await apiContext.delete(`/projects/${projectId}/boards/${boardId}/tasks/${taskId}`)
    expect(deleteTaskResponse.status()).toBe(200)

    const getTaskResponse =  await apiContext.get(`/projects/${projectId}/boards/${boardId}/tasks/${taskId}`)
    expect(getTaskResponse.status()).toBe(404)
})