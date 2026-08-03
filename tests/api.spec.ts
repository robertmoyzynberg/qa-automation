import { test, expect } from "@playwright/test";

test.describe("Enterprise Backend Architecture: Direct REST API Validation Engine", () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com";

  test("GET Request: Verify Backend Microservice Data Structure & Performance", async ({
    request,
  }) => {
    const startTime = Date.now();

    // 1. EXECUTE: Fire a direct HTTP GET request to the backend REST endpoint
    const response = await request.get(`${BASE_URL}/posts/1`);
    const duration = Date.now() - startTime;

    // 2. ASSERT STATUS: Verify HTTP 200 OK
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    // 3. PARSE PAYLOAD: Convert response to JSON object
    const body = await response.json();

    // 4. ASSERT DATA & SCHEMA: Validate specific payload key-value pairs
    expect(body).toHaveProperty("id", 1);
    expect(body).toHaveProperty("userId");
    expect(typeof body.title).toBe("string");

    // 5. ASSERT PERFORMANCE: Ensure response time met SLA threshold (< 1000ms)
    expect(duration).toBeLessThan(1000);

    console.log(
      `✅ [API GET SUCCESS] Status: ${response.status()} | Response Time: ${duration}ms | Title: "${body.title.substring(0, 30)}..."`,
    );
  });

  test("POST Request: Test Resource Creation & Data Payload Ingestion", async ({
    request,
  }) => {
    const newPostPayload = {
      title: "Autonomous System Infrastructure",
      body: "Decoupled API execution matrix initialized.",
      userId: 42,
    };

    // 1. EXECUTE: Fire a direct HTTP POST request with JSON payload
    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPostPayload,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    // 2. ASSERT STATUS: Verify HTTP 201 Created
    expect(response.status()).toBe(201);

    // 3. PARSE PAYLOAD & VERIFY CREATION
    const body = await response.json();
    expect(body.title).toBe(newPostPayload.title);
    expect(body.userId).toBe(newPostPayload.userId);
    expect(body).toHaveProperty("id"); // Backend auto-generated unique ID

    console.log(
      `✅ [API POST SUCCESS] Status: ${response.status()} Created | Assigned ID: ${body.id}`,
    );
  });

  test("NEGATIVE / DEFENSIVE TEST: Verify 404 Handling for Non-Existent Resources", async ({
    request,
  }) => {
    // Fire GET request to an endpoint resource that does not exist
    const response = await request.get(`${BASE_URL}/posts/999999`);

    // Assert defensive perimeter correctly catches invalid resource requests
    expect(response.status()).toBe(404);
    expect(response.ok()).toBeFalsy();

    console.log(
      `✅ [API DEFENSIVE SUCCESS] Correctly trapped 404 Not Found for invalid resource.`,
    );
  });
});
