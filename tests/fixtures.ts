import {test as base} from "@playwright/test";
import { ToDoPage } from "../pages/todo-page";
import { Utilities } from "../pages/utilities";


type Fixtures = {
    tdPage: ToDoPage;
    utils: Utilities;
}

export const todoTest = base.extend<Fixtures>({
    tdPage: async ({ page }, use) => {
        const tdPage = new ToDoPage(page);

        await tdPage.openToDoDemo();
        await use(tdPage);
        // await use(new ToDoPage(page));
        await page.close();
    },

    utils: async ({}, use) => {
        const utils = new Utilities();

        await utils.messageBeforeTest("Beginning test...");
        await use(utils);
        await utils.messageAfterTest("Test complete");
    }
})

export { expect } from '@playwright/test';