import  {test, expect} from "@playwright/test";

import postApiRequest from "../test-data/api-requests/POST-API-Request.json";
import { formatAPIRequest } from "../pages/API_helpers";

import path from "path";
import fs from "fs";

test.use({
    baseURL: "https://restful-booker.herokuapp.com", // Can store in config or .env as well --- Need to research .env usage more (check config file for dotenv import)
})
                                            

test.describe("Static File API Tests", () => {
    test("Booking API Test - Static File - POST", async ({ request }) => {
        // POST Request
        const postResponse = await request.post(`/booking`, { data: postApiRequest }); 

        // Capture response details
        const jsonPostResponse = await postResponse.json();
        const statusText = await postResponse.statusText();
        const responseHeaders = await postResponse.headers();

        // Print some stuff for my own reference
        console.log("Status Text:", statusText);
        console.log("Response Body:", JSON.stringify(jsonPostResponse, null, 2));

        // Assertions about the response status and headers
        await expect(postResponse.status()).toBe(200);
        await expect(postResponse.ok).toBeTruthy();
        await expect(responseHeaders['content-type']).toContain('application/json');

        // Assertions about properties in the response body
        expect(jsonPostResponse.booking).toHaveProperty("firstname");
        expect(jsonPostResponse.booking).toHaveProperty("lastname");
        expect(jsonPostResponse.booking.bookingdates).toHaveProperty("checkin");
        expect(jsonPostResponse.booking.bookingdates).toHaveProperty("checkout");

        // Assertions about the values of properties in the response body
        expect(jsonPostResponse.bookingid).toBeGreaterThan(0);
        expect(jsonPostResponse.booking.firstname).toBe("Marvin");
        expect(jsonPostResponse.booking.lastname).toBe("The Cat");
        expect(jsonPostResponse.booking.bookingdates.checkin).toBe("2026-04-07"); // <--- Nested json property assertion
        expect(jsonPostResponse.booking.bookingdates.checkout).toBe("2026-04-14");
    });

    test("Booking API Test - Static File - GET", async ({ request }) => {
        const getResponse = await request.get(`/booking`);

        const getResponseJson = await getResponse.json();
        console.log("Response Body:", JSON.stringify(getResponseJson, null, 2));

        expect(getResponse.status()).toBe(200);
    });
});

test.describe("Dynamic Data API Tests", () => {
    test("Booking API Test - Dynamic Data - POST", async ({ request }) => {
        const filePath = path.join(__dirname, "../test-data/api-requests/Dynamic_POST_API_Request.json");
        const jsonTemplate = fs.readFileSync(filePath, "utf-8");

        const values = ["Marvin", "The Cat", 1500];

        const postApiRequest = await formatAPIRequest(jsonTemplate, ...values);
        const postResponse = await request.post(`/booking`, { data: JSON.parse(postApiRequest) }); 
        
        // Capture response details
        const jsonPostResponse = await postResponse.json();
        const statusText = await postResponse.statusText();

        // Print some stuff for my own reference
        console.log("Status Text:", statusText);
        console.log("Response Body:", JSON.stringify(jsonPostResponse, null, 2));

        // Assertions about the response status and headers
        await expect(postResponse.status()).toBe(200);

        // Assertions about properties in the response body
        expect(jsonPostResponse.booking).toHaveProperty("firstname");

        // Assertions about the values of properties in the response body
        expect(jsonPostResponse.bookingid).toBeGreaterThan(0);
        expect(jsonPostResponse.booking.firstname).toBe("Marvin");
        expect(jsonPostResponse.booking.lastname).toBe("The Cat");
    });

    test("Booking API Test - Dynamic Query Parameters - GET", async ({ request }) => {
        const filePath = path.join(__dirname, "../test-data/api-requests/Dynamic_POST_API_Request.json");
        const jsonTemplate = fs.readFileSync(filePath, "utf-8");

        const values = ["Marvin", "The Cat", 1500];

        const postApiRequest = await formatAPIRequest(jsonTemplate, ...values);
        const postResponse = await request.post(`/booking`, { data: JSON.parse(postApiRequest) }); 
        
        // Capture response details
        const jsonPostResponse = await postResponse.json();
        const statusText = await postResponse.statusText();

        // Print some stuff for my own reference
        console.log("Status Text:", statusText);
        console.log("Response Body:", JSON.stringify(jsonPostResponse, null, 2));

        await expect(postResponse.status()).toBe(200);
        await expect(jsonPostResponse.bookingid).toBeGreaterThan(0);

        // Now use the response from the POST request to make a GET request with query parameters
        const bookingId = jsonPostResponse.bookingid;
        const firstName = jsonPostResponse.booking.firstname;
        const lastName = jsonPostResponse.booking.lastname;

        // const getResponse = await request.get(`/booking/${bookingId}?firstname=${firstName}&lastname=${lastName}`);');
        const getResponse = await request.get(`/booking/${bookingId}`, {
            params: {
                bookingid: bookingId,
                firstname: firstName,
                lastname: lastName
            }
        }); // Alternative way to send query parameters using the params option

        const getResponseJson = await getResponse.json();
        console.log("GET Response Body:", JSON.stringify(getResponseJson, null, 2));

        expect(getResponse.status()).toBe(200);
        expect(getResponseJson.firstname).toBe("Marvin");
        expect(getResponseJson.lastname).toBe("The Cat");
    });
});