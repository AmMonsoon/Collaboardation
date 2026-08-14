import { test, expect } from "@playwright/test"
import { createApiContext, loginApi, createProject, createBoard, getCsrfToken} from "./helpers/apiHelpers"

test("user can create a board", async() => {
    const apiContext = await createApiContext()
    const loginBody = await loginApi(apiContext)
    const csrfToken =  await getCsrfToken(apiContext)
    const projectBody = await createProject(apiContext, csrfToken)
    const projectId = projectBody.data.project.id
    const boardBody = await createBoard(apiContext, projectId, csrfToken)


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
    const csrfToken =  await getCsrfToken(apiContext)
    const projectBody = await createProject(apiContext, csrfToken)
    const projectId = projectBody.data.project.id
    const boardBody = await createBoard(apiContext, projectId, csrfToken, "Testing Get Board API", "hopefully one and done")
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
    const csrfToken = await getCsrfToken(apiContext)
    const projectBody = await createProject(apiContext, csrfToken)
    const projectId = projectBody.data.project.id
    const boardBody = await createBoard(apiContext, projectId,csrfToken, "Testing Update Board API", "working on api update testing")
    const boardId = boardBody.data.board.id

    const updatedBoardResponse = await apiContext.patch(`/projects/${projectId}/boards/${boardId}`, {
        headers:{
                "x-csrf-token": csrfToken
            },
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
    const csrfToken = await getCsrfToken(apiContext)
    const projectBody = await createProject(apiContext, csrfToken)
    const projectId = projectBody.data.project.id
    const boardBody = await createBoard(apiContext, projectId,csrfToken, "Testing Delete Board API", "this wont exist after the test")

    const boardId = boardBody.data.board.id

    const deletedBoardResponse = await apiContext.delete(`/projects/${projectId}/boards/${boardId}`, {
        headers:{
                "x-csrf-token": csrfToken
            }
    })

    expect(deletedBoardResponse.status()).toBe(200)

    const getBoardResponse = await apiContext.get(`/projects/${projectId}/boards/${boardId}`)
    expect(getBoardResponse.status()).toBe(404)
    
})