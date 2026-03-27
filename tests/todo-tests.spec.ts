import { test, expect } from "./fixtures.js"; // <---- What we downloaded when we initialized playwright project. Under dir node_modules

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

    })
});

test.describe("ToDo Regression", () => {
    test("regression examples", async ({ utils }) => { 
        
        await utils.MessageDuringTest("This test is happening right now!");

    })
});

test.describe("API Tests", () => {
    test("API Example", async ({ request }) => { 
        const response =  await request.get("https://jsonplaceholder.typicode.com/todos/1");
        const responseObject = await response.json();
        console.log(responseObject);
        expect(responseObject.userId).toEqual(1);
        


        // await request.post("www.url.com");
        // await request.put("www.url.com");
        // await request.delete("www.url.com");
    })
});