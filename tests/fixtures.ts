import {test as base} from "@playwright/test";
import { ToDoPage } from "../pages/todo-page";


type Fixtures = {
    tdPage: ToDoPage
}
export const test = base.extend<Fixtures>({
    tdPage: async ({ page }, use) => {
        const tdPage = new ToDoPage(page);
        await tdPage.openToDoDemo();
        await use(tdPage);
        await page.close();
    }
})

export { expect } from '@playwright/test';