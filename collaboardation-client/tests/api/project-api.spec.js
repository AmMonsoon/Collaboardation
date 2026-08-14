import { test, expect, request } from "@playwright/test"
import { createApiContext, loginApi , createProject, getCsrfToken } from "./helpers/apiHelpers"

test("user can create a project", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)
    const csrfToken = await getCsrfToken(apiContext)
    const projectBody = await createProject(apiContext, csrfToken)

    expect(projectBody.success).toBe(true)
    expect(projectBody.message).toBe("New Project Created")
    expect(projectBody.data.project.userId).toBe(loginBody.data.safeUser.id)
    expect(projectBody.data.project.title).toBe("Testing Project API")
    expect(typeof projectBody.data.project.id).toBe("number")
})

test("user can get a specific project", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)

    const csrfToken = await getCsrfToken(apiContext)

    
    const projectBody = await createProject(apiContext, csrfToken,  "Testing Get Project By Id API")
    const projectId = projectBody.data.project.id

    const getProjectResponse = await apiContext.get(`/projects/${projectId}`)
    expect(getProjectResponse.status()).toBe(200)
    const getProjectResponseBody = await getProjectResponse.json()
    

    expect(typeof getProjectResponseBody.id).toBe("number")
    expect(getProjectResponseBody.title).toBe("Testing Get Project By Id API")
    expect(getProjectResponseBody.userId).toBe(loginBody.data.safeUser.id)
})

test("user can update a project", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)

    const csrfToken = await getCsrfToken(apiContext)

    const projectBody = await createProject(apiContext, csrfToken)
    const projectId = projectBody.data.project.id

    const updatedProjectResponse = await apiContext.patch(`/projects/${projectId}`, 
        {
            headers:{
                "x-csrf-token": csrfToken
            },
            data: {
                title: "Update Project API"
            }
        }
    )
    expect(updatedProjectResponse.status()).toBe(200)
    const updatedProjectResponseBody = await updatedProjectResponse.json()
    expect(updatedProjectResponseBody.updatedProject.title).toBe("Update Project API")
})

test("user can delete a project", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)

    const csrfToken = await getCsrfToken(apiContext)

    const projectBody = await createProject(apiContext, csrfToken)
    const projectId = projectBody.data.project.id

    const deleteProjectResponse = await apiContext.delete(`/projects/${projectId}`,
        { headers:{
                "x-csrf-token": csrfToken
            }
        })
    expect(deleteProjectResponse.status()).toBe(200)

    const getProjectResponse = await apiContext.get(`/projects/${projectId}`)
    expect(getProjectResponse.status()).toBe(404)
})

