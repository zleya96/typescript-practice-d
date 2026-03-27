import { expect, type Locator, type Page } from '@playwright/test';

export class Utilities {
    
    messageBeforeTest = (msg: string) => {
        console.log("Here's a message before the test:",msg);
    }

    messageAfterTest = (msg: string) => {
        console.log("Here's a message after the test:",msg);
    }

    MessageDuringTest = (msg: string) => {
        console.log("Here's a message during the test:",msg);
    }

}