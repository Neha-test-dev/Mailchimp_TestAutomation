/* globals gauge*/
"use strict";
const path = require('path');
const {
    evaluate,
    click,
    write,
    $,
    openBrowser,
    closeBrowser,
    screenshot,
    scrollDown,
    scrollTo,
    waitFor,
    text,
    goto,
    into
} = require('taiko');
const assert = require("assert");
const { doesNotMatch } = require('assert');
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const { Common } = require('../pages/Common');
const { HomePage } = require('../pages/HomePage');
const { AboutPage } = require('../pages/AboutPage');
const { OurStoryPage } = require('../pages/OurStoryPage');
const utils = require('../utils/commonUtils');

let homePage, common, aboutPage, ourStoryPage;

step("Clear all tasks", async function () {
    common = new Common();
    await common.clearTasks();
});


step("Lookup for Co-founders story through search option on the Home page", async function () {
    homePage = new HomePage();
    await homePage.homePageSearchElement("Co-founders story");
    assert.ok(await text("Get To Know Our Senior Leadership Team At Mailchimp").exists(), 'Get To Know Our Senior Leadership Team At Mailchimp link is not available in the search results');
    common = new Common();
    await common.scrollToAction("Get To Know Our Senior Leadership Team At Mailchimp");
});

step("Navigate to About Our Co-Founders page from search results and get the details of Co-founders", async function () {
    aboutPage = new AboutPage();
    common = new Common();
    await common.clickAction("Get To Know Our Senior Leadership Team At Mailchimp");
    assert.ok(await text("Our Co-founders").exists(), 'About - Our Co-Founders page not successfully launched');
    await aboutPage.getFoundersInfo();

});


step("Lookup for Co-founders story through Our Story Link on the Home page", async function () {
    homePage = new HomePage();
    common = new Common();
    ourStoryPage = new OurStoryPage();
    await homePage.naviagteToOurStoryPage();
    let title = await ourStoryPage.validateLaunchOfOurStoryPage();
    console.log(title);
    assert.ok(await text(title).exists(), 'Our Story page not successfully launched');
});

step("Navigate to About Our Co-Founders page from Our Story page and get the details of Co-founders", async function () {

    ourStoryPage = new OurStoryPage;
    aboutPage = new AboutPage;
    await ourStoryPage.accessLinkInFounderStorySection();
    assert.ok(await text("Our Co-founders").exists(), 'About - Our Co-Founders page not successfully launched');
    await aboutPage.getFoundersInfo();

});

step("Validate results", async function () {
    let scenarionName = utils.getValue('scenarioName');
    let actualData, expectedData = [];
    actualData = utils.readDataFromCSV(scenarionName + '_CoFounderDetails.csv');
    expectedData = utils.readDataFromCSV('CoFounderDetails.csv');

    for (let i = 1; i < actualData.length; i++) {

        let j = i;
        let expectedFounderName = expectedData[j][0];
        let actualCoFounderName = actualData[i][0];
        assert.strictEqual(actualCoFounderName, expectedFounderName, 'Founder names are not as expected');
        let expectedPositionName = expectedData[j][1];
        let actualPositionName = actualData[i][1];
        assert.strictEqual(actualPositionName, expectedPositionName, 'Founder positions are not as expected');
    }
});

