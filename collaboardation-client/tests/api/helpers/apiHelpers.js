import { request , expect } from "@playwright/test"

export const createApiContext = async() => {
    return request.newContext({
        baseURL: "http://localhost:3000"
    })
}

export const loginApi = async( apiContext ) => {
    const csrfToken = await getCsrfToken(apiContext)
    const loginResponse = await apiContext.post("/users/login",{
        headers: {
            "x-csrf-token": csrfToken
        },
        data: {
            email: "newuser@test.com",
            password: "test"
        }
    })

    expect(loginResponse.status()).toBe(200)
    return await loginResponse.json()
}

export const createProject = async(apiContext, csrfToken, title = "Testing Project API") => {
    const projectResponse = await apiContext.post("/projects", {
        headers: {
            "x-csrf-token": csrfToken
        },
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
     csrfToken, 
     title = "Testing Create Board API", 
     description = "please pass the first time"
    ) => {
    const boardResponse = await apiContext.post(`/projects/${projectId}/boards`, {
        headers:{
                "x-csrf-token": csrfToken
            },
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
    csrfToken,
    title = "Testing Create Task API",
    description = "adding assertions next",
    dueDate = new Date().toISOString()
) => {
    const taskResponse =  await apiContext.post(`/projects/${projectId}/boards/${boardId}/tasks`, {
        headers:{
                "x-csrf-token": csrfToken
            },
        data:{
            title,
            description,
            dueDate
        }
    })
    expect(taskResponse.status()).toBe(201)
    return await taskResponse.json()
}

export async function getCsrfToken(apiContext) {
  const response = await apiContext.get("/csrf-token");

  if (!response.ok()) {
    throw new Error(
      `Failed to fetch CSRF token: ${response.status()}`
    );
  }

  const body = await response.json();

  return body.csrfToken;
}