import { expect, type Locator, type Page } from '@playwright/test';

export class ToDoPage {
    readonly page: Page;
    readonly WhatNeedsToBeDone: Locator;
    readonly labelPath: string;
    readonly deleteAppend: string;


    constructor(page: Page) {
        this.page = page;
        this.WhatNeedsToBeDone = page.getByRole('textbox', { name: 'What needs to be done?' });
        this.labelPath = "//label[text()='LABEL']";
        this.deleteAppend = "/following-sibling::button[@class='destroy']";
    }

    async openToDoDemo() {
        await this.page.goto('https://demo.playwright.dev/todomvc/');
    }

    async getToDoTitle(page: Page) {
        return await page.title();
    }

    async addToDo(todoName: string) {
        await this.WhatNeedsToBeDone.click();
        await this.WhatNeedsToBeDone.fill(todoName);
        await this.WhatNeedsToBeDone.press('Enter');
        await expect(
            this.page.locator(this.getLabelPath(todoName)))
            .toBeVisible();
    }

    async deleteToDo(todoName: string) {
        await this.page.locator(this.getLabelPath(todoName)).hover();
        await expect(
            this.page.locator(this.getDeletePath(todoName)))
            .toBeVisible();
        await this.page.locator(this.getDeletePath(todoName)).click();
    }

    //Probs should be in a Util class
    getLabelPath = (label: string): string => {
        return this.labelPath.replace("LABEL", label);
    }

    getDeletePath = (label: string): string => {
        return this.getLabelPath(label) + this.deleteAppend;
    }

}