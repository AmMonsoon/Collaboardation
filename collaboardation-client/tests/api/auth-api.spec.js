import {test, expect, request} from "@playwright/test"
import { getCsrfToken } from "./helpers/apiHelpers"

test("user can fetch current user after login", async() => {
    const apiContext = await request.newContext({
        baseURL: "http://localhost:3000"
    })
    const csrfToken = await getCsrfToken(apiContext);

    const loginResponse =  await apiContext.post("/users/login", {
        headers:{
            "x-csrf-token": csrfToken
        },
        data: {
            email: "newuser@test.com",
            password: "test"
        }
    })

    expect(loginResponse.status()).toBe(200)
    
    const loginBody = await loginResponse.json()
    expect(loginBody.message).toBe("Login Successful")
    expect(loginBody.success).toBe(true)
    expect(loginBody.data.safeUser.email).toBe("newuser@test.com")
    expect(typeof loginBody.data.safeUser.id).toBe("number")

    const meResponse = await apiContext.get("/users/me")

    expect(meResponse.status()).toBe(200)

    const meBody = await meResponse.json()

    expect(meBody.success).toBe(true)
    expect(meBody.data.safeUser.id).toBe(loginBody.data.safeUser.id)
    expect(meBody.data.safeUser.email).toBe(loginBody.data.safeUser.email)
})

test("user cannot fetch current user when not authenticated", async() => {
    const apiContext = await request.newContext({
        baseURL: "http://localhost:3000"
    })
    const meResponse = await apiContext.get("users/me")
    expect(meResponse.status()).toBe(401)
})

test("user must have valid credentials", async() => {
    const apiContext = await request.newContext({
        baseURL: " http://localhost:3000"
    })

    const csrfToken = await getCsrfToken(apiContext);

    const loginResponse = await apiContext.post("/users/login", {
        headers: {
            "x-csrf-token": csrfToken
        },
        data: {
            email: "invaliduser@test.com",
            password: "fail"
        }
    })
    expect(loginResponse.status()).toBe(401)
})

test("user can successfully logout", async() => {
    const apiContext = await request.newContext({
        baseURL: " http://localhost:3000"
    })
    const csrfToken = await getCsrfToken(apiContext);
    
    const loginResponse = await apiContext.post("/users/login", {
        headers:{
            "x-csrf-token": csrfToken
        },
        data: {
            email: "newuser@test.com",
            password: "test"
        }
    })
    

    expect(loginResponse.status()).toBe(200)

    const authenticatedCsrfToken = await getCsrfToken(apiContext)

    const logoutReponse = await apiContext.post("users/logout", {
        headers:{
            "x-csrf-token": authenticatedCsrfToken
        },
    })

    expect(logoutReponse.status()).toBe(200)

    const meResponse = await apiContext.get("/users/me")

    expect(meResponse.status()).toBe(401)
})
