import {test} from "../tests/fixtures.ts"; // <---- What we downloaded when we initialized playwright project. Under dir node_modules
import { ToDoPage } from "../pages/todo-page";
import { expect } from "@playwright/test";


//tests take in two parameters: 1. Title of test 2. Function

test("Verify ToDo", async ({page, tdPage})=>{
    
    const todoA: string = "Pet Marvin";
    const todoB: string = "Pet Clem";

    // await tdPage.openToDoDemo();

    //Create ToDo_A
    await tdPage.addToDo(todoA);
    await tdPage.addToDo(todoB);
    
    //Delete ToDo_A
    await tdPage.deleteToDo(todoA);

    //Verify ToDo_A Deleted
    await expect(page.locator(tdPage.getLabelPath(todoA))).toBeHidden;


    //Complete ToDoB
    // await page.locator('checkbox', { name: 'Toggle Todo' }).check();
    // await page.getByRole('link', { name: 'Active' }).click();
    // await page.getByRole('link', { name: 'Completed' }).click();
    // await page.getByTestId('todo-title').click();
    

});