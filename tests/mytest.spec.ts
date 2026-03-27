import {test, expect} from "@playwright/test"; // <---- What we downloaded when we initialized playwright project. Under dir node_modules
import { ToDoPage } from "../pages/todo-page";


//tests take in two parameters: 1. Title of test 2. Function
//Syntax

/*
test("title", ()=> {

    //step 1
    //step 2
    //step 3

})
    */

                            // {page} <-- called a fixture. AKA --> Global Variable
test("Verify Page Title", async ({page})=>{
    const toDoPage = new ToDoPage(page);

    toDoPage.openToDoDemo();
    const url = await page.url();
    console.log("URL:", url);

    const title = toDoPage.getToDoTitle(page);
    console.log("Title = ",title);

    await expect(page).toHaveTitle(/React • TodoMVC/); // <----one assertion per test

});

test("Verify ToDo", async ({page})=>{
    const toDoPage = new ToDoPage(page);
    const todoA: string = "Pet Marvin";
    const todoB: string = "Pet Clem";

    await page.goto('https://demo.playwright.dev/todomvc/');

    //Create ToDo_A
    await toDoPage.addToDo(todoA);
    await toDoPage.addToDo(todoB);
    
    //Delete ToDo_A
    await toDoPage.deleteToDo(todoA);

    //Verify ToDo_A Deleted
    await expect(page.locator(toDoPage.getLabelPath(todoA))).toBeHidden;


    //Complete ToDoB
    // await page.locator('checkbox', { name: 'Toggle Todo' }).check();
    // await page.getByRole('link', { name: 'Active' }).click();
    // await page.getByRole('link', { name: 'Completed' }).click();
    // await page.getByTestId('todo-title').click();
    

});