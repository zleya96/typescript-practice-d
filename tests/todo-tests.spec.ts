import { test, expect } from "./fixtures.js";

//tests take in two parameters: 1. Title of test 2. Function

test.describe("ToDo Smoke", () => {
    test("Verify ToDo Created and Deleted", async ({ page, tdPage }, testInfo) => { // <--- tdPage is my ToDoPage object that I instantiated in fixtures.ts

        const todoA: string = "Pet Marvin";
        const todoB: string = "Pet Clem";

        // await tdPage.openToDoDemo();

        //Create ToDo_A
        await tdPage.addToDo(todoA);
        await tdPage.addToDo(todoB);

        const screenshot = await page.screenshot();
        await testInfo.attach('ToDos Added', {
            body: screenshot,
            contentType: 'image/png',
        });

        //Delete ToDo_A
        await tdPage.deleteToDo(todoA);

        //Verify ToDo_A Deleted
        await expect(page.locator(tdPage.getLabelPath(todoA))).toBeHidden;

    });

    
});

test.describe("ToDo Regression", () => {
    test("regression examples", async ({ utils }) => {

        await utils.MessageDuringTest("This test is happening right now!");

    });
    test("Browser Test", async ({ tdPage, browser }) => {
        const todoTitle = await tdPage.getToDoTitle();
        console.log(todoTitle);
        expect.soft(todoTitle).toEqual("React • TodoMVC");

        const tdPage2 = await tdPage.newToDoPage(browser);

        const todoTitle2 = await tdPage2.getToDoTitle();
        console.log(todoTitle2);
        expect(todoTitle2).toEqual("React • TodoMVC");
    });
});

test.describe("API Tests", () => {
    test("Get Test", async ({ request }) => {
        const response = await request.get("https://jsonplaceholder.typicode.com/posts/1");

        const responseStatus = await response.status();
        console.log(responseStatus);

        const responseStatusText = await response.statusText();
        console.log(responseStatusText);

        const responseHeaders = await response.headers();
        // console.log(responseHeaders);

        const responseObject = await response.json();
        // console.log(responseObject);

        // expect(responseObject.userId).toEqual(1);
        expect(responseStatus).toBe(200); // <-- GET
        expect(response.ok).toBeTruthy();



        // expect(responseStatus).toBe(201); // <-- POST
        // expect(responseStatus).toBe(204); // <-- DELETE
    })

    // test("Post Test", async ({ request }) => { 
    //     const postResponse = await request.post("https://jsonplaceholder.typicode.com/posts", {
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //         data: {
    //             title: "This is my title",
    //             body: "This is my body",
    //             userId: 201
    //         } 
    //     });

    //     console.log(postResponse.json());

    //     const response = await request.get("https://jsonplaceholder.typicode.com/posts/101");
    //     const responseObject = await response.json();
    //     // console.log(responseObject);
    //     const responseStatus = await response.status();
    //     console.log(responseStatus);
    //     expect(responseStatus).toBe(201);

    // })
});


// await request.put("www.url.com");
// await request.delete("www.url.com");