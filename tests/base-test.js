/* globals gauge*/
'use strict';
const path = require('path');
const assert = require('assert');
require('dotenv').config();
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const { goto, openBrowser, closeBrowser, screenshot } = require('taiko');
const { doesNotMatch } = require('assert');
const utils = require('../utils/commonUtils');


beforeSuite(async () => {});

afterSuite(async () => {
});

beforeScenario(
  async (context) => {
    utils.storeValue('specName', context.currentSpec.name);
    utils.storeValue('scenarioName', context.currentScenario.name);
    await openBrowser({
      headless: headless,
      args: [
        '--start-maximized',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote'
      ]
    });
  },
  { tags: ['setup'] }
);

afterScenario(async () => {
  await closeBrowser();
});

//Return a screenshot file name
gauge.customScreenshotWriter = async function () {
  const screenshotFilePath = path.join(
    process.env['gauge_screenshots_dir'],
    `screenshot-${process.hrtime.bigint()}.png`
  );

  await screenshot({
    path: screenshotFilePath
  });
  return path.basename(screenshotFilePath);
};
