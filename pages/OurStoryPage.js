/* globals gauge*/
'use strict';
const path = require('path');
const { $ } = require('taiko');
require('dotenv').config();
const { Common } = require('../pages/Common');
let common;


class OurStoryPage {

    async validateLaunchOfOurStoryPage() {
        common = new Common();
        let titleText = await $("//h1[@class='hero__title h1']").text();
        return titleText;
    }

    async accessLinkInFounderStorySection() {
        common = new Common();
        await common.scrollDownAction(1000);
        await common.clickAction("Learn more about our Co-founders.");
    }


}

module.exports.OurStoryPage = OurStoryPage;
