import  {test, expect} from "@playwright/test";

import postApiRequest from "../test-data/api-requests/POST-API-Request.json";


//https://restful-booker.herokuapp.com/booking

test.use({
    baseURL: "https://restful-booker.herokuapp.com",
})
                                            

test ("Booking API Test - Static File - POST", async ({ request }) => {
    const postResponse = await request.post(`/booking`, { data: postApiRequest }); 

    const postResponseJson = await postResponse.json();
    // console.log("Response Body:", JSON.stringify(postResponseJson, null, 2));
    console.log("Booking ID:", postResponseJson.bookingid);

    await expect(postResponse.status()).toBe(200);

    const getResponse = await request.get(`/booking` + `/${postResponseJson.bookingid}`); 

    const getResponseJson = await getResponse.json();
    console.log("Response Body:", JSON.stringify(getResponseJson, null, 2));

    expect(getResponse.status()).toBe(200);
});

test ("Booking API Test - Static File - GET", async ({ request }) => {
    const getResponse = await request.get(`/booking`);

    const getResponseJson = await getResponse.json();
    console.log("Response Body:", JSON.stringify(getResponseJson, null, 2));

    expect(getResponse.status()).toBe(200);
});