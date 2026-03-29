import { test, expect } from "@playwright/test";

//https://demo.playwright.dev/api-mocking

test.describe("Mock API Tests", { tag: ['@mock_api_test'] }, () => {

    test("Mock Request Test", async ({ page }) => {

        // Function to intercept the API request and mock the response
        await page.route('*/**/api/v1/fruits', async route => {
            const json = [
                { name: 'Charmander', id: 4 },
                { name: 'Mew', id: 151 },
                { name: 'Gyrados', id: 131 }
            ];
            await route.fulfill({ json });
        });

        // Navigate to the page that makes the API request
        await page.goto('https://demo.playwright.dev/api-mocking');

        // Assertions to verify the mocked data is displayed correctly
        await expect(page.getByText('Charmander')).toBeVisible();
        await expect(page.getByText('Mew')).toBeVisible();
        await expect(page.getByText('Gyrados')).toBeVisible();

    });

    test("Mock Response Test", async ({ page }) => {

        // Function to intercept the API request and mock the response
        await page.route('*/**/api/v1/fruits', async route => {
            const response = await route.fetch();
            const responseBody = await response.json();
            console.log("Original API Response:", JSON.stringify(responseBody, null, 2));

            // Get the response body, modify it, and then fulfill the request with the modified response
            const json = await response.json();
            json.push({ name: 'Charmander', id: 4 });
            json.push({ name: 'Mew', id: 151 });
            json.push({ name: 'Gyrados', id: 131 });
            console.log("Modified API Response:", JSON.stringify(json, null, 2));

            await route.fulfill({ response, json });
        });

        // Navigate to the page that makes the API request
        await page.goto('https://demo.playwright.dev/api-mocking');

        // Assertions to verify the mocked data is displayed correctly
        await expect(page.getByText('Charmander')).toBeVisible();
        await expect(page.getByText('Mew')).toBeVisible();
        await expect(page.getByText('Gyrados')).toBeVisible();

    });
});
