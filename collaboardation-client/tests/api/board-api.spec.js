import { test, expect } from "@playwright/test"
import { createApiContext, loginApi, createProject } from "./helpers/apiHelpers"

test("user can create a board", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)
    const projectBody = await createProject(apiContext)
    const projectId = projectBody.data.project.id
    
    const boardResponse =  await apiContext.post(`/projects/${projectId}/boards`, {
        data: {
            title: "Testing Create Board API",
            description: "please pass the first time"
        }
    })

    expect(boardResponse.status()).toBe(201)
    const boardBody = await boardResponse.json()

    expect(boardBody.success).toBe(true)
    expect(boardBody.message).toBe("New Board Created")
    expect(boardBody.data.board.projectId).toBe(projectId)
    expect(boardBody.data.board.title).toBe("Testing Create Board API")
    expect(boardBody.data.board.description).toBe("please pass the first time")
    expect(typeof boardBody.data.board.id).toBe("number")
})

test("user can get a specific board", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)
    const projectBody = await createProject(apiContext)
    const projectId = projectBody.data.project.id
    
    const boardResponse =  await apiContext.post(`/projects/${projectId}/boards`, {
        data: {
            title: "Testing Get Board API",
            description: "hopefully one and done"
        }
    })
    expect(boardResponse.status()).toBe(201)
    const boardBody = await boardResponse.json()
    const boardId = boardBody.data.board.id


    const getBoardResponse = await apiContext.get(`/projects/${projectId}/boards/${boardId}`)
    expect(getBoardResponse.status()).toBe(200)
    const getBoardBody = await getBoardResponse.json()
    

    expect(getBoardBody.id).toBe(boardId)
    expect(getBoardBody.projectId).toBe(projectId)
    expect(getBoardBody.title).toBe(boardBody.data.board.title)
    expect(getBoardBody.description).toBe(boardBody.data.board.description)
})

test("user can update a board", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)
    const projectBody = await createProject(apiContext)
    const projectId = projectBody.data.project.id
    
    const boardResponse =  await apiContext.post(`/projects/${projectId}/boards`, {
        data: {
            title: "Testing Update Board API",
            description: "working on api update testing"
        }
    })
    expect(boardResponse.status()).toBe(201)
    const boardBody = await boardResponse.json()
    const boardId = boardBody.data.board.id

    const updatedBoardResponse = await apiContext.patch(`/projects/${projectId}/boards/${boardId}`, {
        data:{
            title: "Updated Title",
            description: "Updated Description"
        }
    })

    expect(updatedBoardResponse.status()).toBe(200)
    const updatedBoardBody = await updatedBoardResponse.json()
    
    expect(updatedBoardBody.message).toBe("Board Updated Successfully")
    expect(updatedBoardBody.updatedBoard[0].title).toBe("Updated Title")
    expect(updatedBoardBody.updatedBoard[0].description).toBe("Updated Description")
    expect(typeof updatedBoardBody.updatedBoard[0].id).toBe("number")
    expect(updatedBoardBody.updatedBoard[0].projectId).toBe(projectId)
    expect(updatedBoardBody.updatedBoard[0].id).toBe(boardId)

    const getBoardResponse = await apiContext.get(`/projects/${projectId}/boards/${boardId}`)

    const getBoardBody = await getBoardResponse.json()

    expect(getBoardBody.title).toBe("Updated Title")
    expect(getBoardBody.description).toBe("Updated Description")
})

test("user can delete a board", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)
    const projectBody = await createProject(apiContext)
    const projectId = projectBody.data.project.id
    
    const boardResponse =  await apiContext.post(`/projects/${projectId}/boards`, {
        data: {
            title: "Testing Delete Board API",
            description: "this wont exist after the test"
        }
    })

    expect(boardResponse.status()).toBe(201)
    const boardBody = await boardResponse.json()
    const boardId = boardBody.data.board.id

    const deletedBoardResponse = await apiContext.delete(`/projects/${projectId}/boards/${boardId}`)

    expect(deletedBoardResponse.status()).toBe(200)

    const getBoardResponse = await apiContext.get(`/projects/${projectId}/boards/${boardId}`)
    expect(getBoardResponse.status()).toBe(404)
    
})