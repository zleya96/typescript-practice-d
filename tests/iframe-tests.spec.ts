import { test, expect } from "@playwright/test";

test.describe("IFrame Tests", { tag: ['@iframe_test'] }, () => {

    test("IFrame Test", async ({ page }) => {
        await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");

        const frameLocator = page.frameLocator("#courses-iframe");
        await expect(frameLocator.locator("div[class='text-center'] a")).toHaveText("VIEW ALL COURSES");


        const headerSections = frameLocator.locator("header[class='main-header'] > div");
        await expect(headerSections).toHaveCount(4);
    });

    test("Nested IFrame Test", async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/nested_frames");

        const parentFrame = page.frameLocator("frame[name='frame-top']");
        const childFrame = parentFrame.frameLocator("frame[name='frame-middle']");

        

        await expect(childFrame.locator("#content")).toHaveText("MIDDLE");       
    });
});