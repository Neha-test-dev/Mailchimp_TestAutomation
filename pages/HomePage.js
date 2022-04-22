/* globals gauge*/
'use strict';
const path = require('path');
require('dotenv').config();
const {
  waitFor,
  write,
  $,
  into
} = require('taiko');
const { Common } = require('../pages/Common');
let common;

class HomePage {

  async launchHomePage() {
    common = new Common();
    await common.gotoAction("https://mailchimp.com/");  
  }

  async homePageSearchElement(element){
    common = new Common();
    await common.waitAction(5000);
    await common.waitAction($("//*[@class='globalNav__actions__search']"));
    await common.clickAction($("//*[@class='globalNav__actions__search']"));
    await write(element, into($("//input[@id='actionable-search-drawer-input']")));
    await common.clickAction($("//button[@type='submit']"));
    await waitFor("Filter by type:");
    await common.scrollDownAction(800);
  }

  async naviagteToOurStoryPage(){
      common = new Common();
      await common.scrollDownAction(4000);
      await common.scrollToAction("Company");
      await common.clickAction($("//div[@id='onetrust-close-btn-container']"));
      await common.clickLinkAction("Our Story");
  }

}

module.exports.HomePage = HomePage;
