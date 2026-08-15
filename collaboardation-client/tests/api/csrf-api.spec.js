import { test, expect } from "@playwright/test";
import { createApiContext, loginApi, getCsrfToken} from "./helpers/apiHelpers";

test("rejects POST request without CSRF token", async () => {
    const apiContext = await createApiContext();

    await loginApi(apiContext);

    const response = await apiContext.post("/projects", {
        data: {
            title: "CSRF Test Project"
        }
    });

    expect(response.status()).toBe(403);
});

test("rejects POST request with invalid CSRF token", async () => {
    const apiContext = await createApiContext();

    await loginApi(apiContext);

    const response = await apiContext.post("/projects", {
        headers: {
            "x-csrf-token": "invalid-token"
        },
        data: {
            title: "Invalid CSRF Test Project"
        }
    });

    expect(response.status()).toBe(403);
});

test("rejects stale CSRF token after session changes", async () => {
    const apiContext = await createApiContext();

    // Token associated with the pre-login session
    const staleCsrfToken = await getCsrfToken(apiContext);

    // Login changes the session
    await loginApi(apiContext);

    // Try using the old token
    const response = await apiContext.post("/projects", {
        headers: {
            "x-csrf-token": staleCsrfToken
        },
        data: {
            title: "Stale CSRF Test Project"
        }
    });

    expect(response.status()).toBe(403);
});