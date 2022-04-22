/* globals gauge*/
'use strict';
const path = require('path');
require('dotenv').config();
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const { HomePage } = require('../pages/HomePage');


step("Open Mailchimp application", async function() {
    let homePage = new HomePage();
    await homePage.launchHomePage(); 
});