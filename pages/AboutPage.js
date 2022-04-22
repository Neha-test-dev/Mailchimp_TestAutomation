'use strict';
const path = require('path');
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const { doesNotMatch } = require('assert');
const { $ } = require('taiko');
const utils = require('../utils/commonUtils');

class AboutPage {


  async getFoundersInfo() {
    var elementIds = ['2h1Bfl8RDSmCmmoSCiwuy6', '1DzpQ8Fyg8esSQea8UiUYg'];
    let coFounderDetailsArray = [];
    for (let i = 0; i < elementIds.length; i++) {

      let coFounderName = await this.coFounderName(elementIds[i]);
      let position = await this.coFounderPosition(elementIds[i]);
      let description = await this.coFounderDescription(elementIds[i]);
      coFounderDetailsArray.push([coFounderName, position, description]);
    }
    utils.createAndWriteToCSVFile(coFounderDetailsArray, utils.getValue('scenarioName'));
  }

  async coFounderName(elementId) {
    let name = await $("//*[@data-entry-id='" + elementId + "']//h5").text();
    return name;
  }
  async coFounderPosition(elementId) {
    let position = await $("//*[@data-entry-id='" + elementId + "']//strong").text();
    return position;
  }
  async coFounderDescription(elementId) {
    let description = await $("//*[@data-entry-id='" + elementId + "']//div[@class='normalize']//p").text();
    return description;
  }
}

module.exports.AboutPage = AboutPage;
