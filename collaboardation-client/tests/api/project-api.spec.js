import { test, expect, request } from "@playwright/test"
import { log } from "node:console"
import { title } from "node:process"

test("user can create a project", async() => {
    const apiContext = await request.newContext({
        baseURL:"http://localhost:3000"})

    const loginResponse = await apiContext.post("users/login", {
        data:{
            email: "newuser@test.com",
            password: "test"
        }
    })
    const loginBody = await loginResponse.json()
    
    expect(loginResponse.status()).toBe(200)

    const projectResponse = await apiContext.post("/projects", {
        data: {
            title: "Testing Project API",
        }
    })

    expect(projectResponse.status()).toBe(201)

    const projectBody = await projectResponse.json()
    expect(projectBody.success).toBe(true)
    expect(projectBody.message).toBe("New Project Created")
    expect(projectBody.data.project.userId).toBe(loginBody.data.safeUser.id)
    expect(projectBody.data.project.title).toBe("Testing Project API")
    expect(typeof projectBody.data.project.id).toBe("number")
})

test("user can get a specific project", async() => {
     const apiContext = await request.newContext({
        baseURL:"http://localhost:3000"})

    const loginResponse = await apiContext.post("users/login", {
        data:{
            email: "newuser@test.com",
            password: "test"
        }
    })
    const loginBody = await loginResponse.json()
    
    expect(loginResponse.status()).toBe(200)

    const projectResponse = await apiContext.post("/projects", {
        data: {
            title: "Testing Get Project By Id API",
        }
    })
    
    expect(projectResponse.status()).toBe(201)

    const projectBody = await projectResponse.json()
    const projectId = projectBody.data.project.id

    const getProjectResponse = await apiContext.get(`/projects/${projectId}`)
    expect(getProjectResponse.status()).toBe(200)
    const getProjectResponseBody = await getProjectResponse.json()
    

    expect(typeof getProjectResponseBody.id).toBe("number")
    expect(getProjectResponseBody.title).toBe("Testing Get Project By Id API")
    expect(getProjectResponseBody.userId).toBe(loginBody.data.safeUser.id)
})

test("user can update a project", async() => {
    const apiContext = await request.newContext({
        baseURL:"http://localhost:3000"})

    const loginResponse = await apiContext.post("users/login", {
        data:{
            email: "newuser@test.com",
            password: "test"
        }
    })
    const loginBody = await loginResponse.json()
    
    expect(loginResponse.status()).toBe(200)

    const projectResponse = await apiContext.post("/projects", {
        data: {
            title: "Testing Get Project By Id API",
        }
    })
    
    expect(projectResponse.status()).toBe(201)

    const projectBody = await projectResponse.json()
    const projectId = projectBody.data.project.id

    const updatedProjectResponse = await apiContext.patch(`/projects/${projectId}`, 
        {
            data: {
                title: "Update Project API"
            }
        }
    )
    expect(updatedProjectResponse.status()).toBe(200)
    const updatedProjectResponseBody = await updatedProjectResponse.json()
    expect(updatedProjectResponseBody.updatedProject[0].title).toBe("Update Project API")
})

test("user can delete a project", async() => {
    const apiContext = await request.newContext({
        baseURL:"http://localhost:3000"})

    const loginResponse = await apiContext.post("users/login", {
        data:{
            email: "newuser@test.com",
            password: "test"
        }
    })
    const loginBody = await loginResponse.json()
    
    expect(loginResponse.status()).toBe(200)

    const projectResponse = await apiContext.post("/projects", {
        data: {
            title: "Testing Delete Project API",
        }
    })
    
    expect(projectResponse.status()).toBe(201)

    const projectBody = await projectResponse.json()
    const projectId = projectBody.data.project.id

    const deleteProjectResponse = await apiContext.delete(`/projects/${projectId}`)
    expect(deleteProjectResponse.status()).toBe(200)

    const getProjectResponse = await apiContext.get(`/projects/${projectId}`)
    expect(getProjectResponse.status()).toBe(404)
})

