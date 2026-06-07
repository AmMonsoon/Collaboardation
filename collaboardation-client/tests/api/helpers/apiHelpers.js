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