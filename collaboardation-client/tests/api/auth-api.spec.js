import {test, expect, request} from "@playwright/test"

test("user can fetch current user after login", async() => {
    const apiContext = await request.newContext({
        baseURL: "http://localhost:3000"
    })
    const loginResponse =  await apiContext.post("/users/login", {
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
})