/* globals gauge*/
'use strict';
const path = require('path');
require('dotenv').config();
const { goto, scrollDown, scrollTo, click, evaluate, link, waitFor } = require('taiko');
const utils = require('../utils/commonUtils');
const { $ } = require('taiko');

class Common {
  async gotoAction(url) {
    await goto(url, {
      waitForNavigation: true,
      navigationTimeout: 60000
    });

  }

  async clearTasks() {
    await evaluate(() => {
      if (localStorage.length > 0) {
        localStorage.clear();
      }
    });
  }

  async scrollToAction(element) {
    await scrollTo(element);
  }
  async scrollDownAction(value) {
    await scrollDown(value);
  }
  async clickAction(element) {
    await waitFor(2000);
    await click(element, { waitForNavigation: false });
  }
  async clickLinkAction(element) {
    await click(link(element), { waitForNavigation: false });
  }
  async waitAction(value) {
    await waitFor(value);
  }
  async saveData() {
    utils.writeCampaignDetails(utils.getValue('specName'));
  }
}

module.exports.Common = Common;
