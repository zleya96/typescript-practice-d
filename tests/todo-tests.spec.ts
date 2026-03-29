import { todoTest as test, expect } from "./fixtures.ts";

//tests take in two parameters: 1. Title of test 2. Function

test.describe("ToDo Smoke", { tag: ['@todo_smoke'] }, () => {

    test("Verify ToDo Created and Deleted", async ({ page, tdPage }, testInfo) => { // <--- tdPage is my ToDoPage object that I instantiated in fixtures.ts

        const todoA: string = "Pet Marvin";
        const todoB: string = "Pet Clem";

        await test.step("Add ToDos", async () => {
            await tdPage.addToDo(todoA);
            await tdPage.addToDo(todoB);
            await tdPage.verifyTodoExists(todoA);
            await tdPage.verifyTodoExists(todoB);
            
            const screenshot = await page.screenshot({ path: "todos-added.png" });
            await testInfo.attach('ToDos Added', {
                body: screenshot,
                contentType: 'image/png',
            });
        });



        await test.step("Delete ToDo_A", async () => {
            await tdPage.deleteToDo(todoA);
            await expect(page.locator(tdPage.getLabelPath(todoA))).toBeHidden();
        });

        // test.step("Verify ToDo_A Deleted", async () => {
        // });

    });
});

test.describe("ToDo Regression", { tag: ['@todo_regression'] }, () => {
    test("regression examples", async ({ utils }) => {

        await utils.MessageDuringTest("This test is happening right now!");

    });

    test("Browsers Test", async ({ tdPage, browser }) => {
        //Create ToDo_A in Page 1
        const todoA: string = "Pet Marvin";
        await tdPage.addToDo(todoA);
        await tdPage.verifyTodoExists(todoA);

        //Verify Todo_A does exist in new tab
        const context = await browser.newContext();
        await tdPage.newTodoTab(context);
        expect.soft(await tdPage.verifyTodoExists(todoA)).toBeTruthy();

        //Verify ToDo_A does not exist in new page
        const tdPage2 = await tdPage.newToDoPage(browser);
        expect(await tdPage2.verifyTodoExists(todoA)).toBeFalsy();
    });
});

test.describe("API Example Test", { tag: ['@api_test'] }, () => {

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

        expect(responseStatus).toBe(200); // <-- GET
        expect(response.ok).toBeTruthy();
    })
});
