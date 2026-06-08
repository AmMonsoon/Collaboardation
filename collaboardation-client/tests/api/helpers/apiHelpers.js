import { request , expect } from "@playwright/test"

export const createApiContext = async() => {
    return request.newContext({
        baseURL: "http://localhost:3000"
    })
}

export const loginApi = async( apiContext ) => {
    const loginResponse = await apiContext.post("/users/login",{
        data: {
            email: "newuser@test.com",
            password: "test"
        }
    })

    expect(loginResponse.status()).toBe(200)
    return await loginResponse.json()
}

export const createProject = async(apiContext, title = "Testing Project API") => {
    const projectResponse = await apiContext.post("/projects", {
        data: {
            title,
        }
    })
    expect(projectResponse.status()).toBe(201)

    return await projectResponse.json()
}


export const createBoard = async(
     apiContext,
     projectId, 
     title = "Testing Create Board API", 
     description = "please pass the first time"
    ) => {
    const boardResponse = await apiContext.post(`/projects/${projectId}/boards`, {
        data:{
            title,
            description
        }
    })
    expect(boardResponse.status()).toBe(201)
    return await boardResponse.json()
}

export const createTask = async(
    apiContext,
    projectId,
    boardId,
    title = "Testing Create Task API",
    description = "adding assertions next",
    dueDate = new Date().toISOString()
) => {
    const taskResponse =  await apiContext.post(`/projects/${projectId}/boards/${boardId}/tasks`, {
        data:{
            title,
            description,
            dueDate
        }
    })
    expect(taskResponse.status()).toBe(201)
    return await taskResponse.json()
}