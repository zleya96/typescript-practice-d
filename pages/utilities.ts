import { expect, type Locator, type Page } from '@playwright/test';
import { chromium, firefox } from '@playwright/test';

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

    async launchChromium() {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        return { browser, context, page };
    }

    async launchFirefox() {
        const browser = await firefox.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        return { browser, context, page };
    }
}