const retry = require('async-await-retry');
//const data = require('./data').data;
const createCsvWriter = require('csv-writer').createArrayCsvWriter;

async function tryAgain(func) {
  try {
    const res = await retry(press('Enter'), null, { retriesMax: 5 });
  } catch (err) {
    console.log('The function execution failed !');
  }
}

function storeValue(key, value) {
  gauge.dataStore.specStore.put(key, value);
}

function getValue(key) {
  return gauge.dataStore.specStore.get(key);
}

async function writeCampaignDetails(FounderDetailsFileName) {
  // create a JSON object
  //   const campaignDetails = {
  //     CampaignId: getValue('CID'),
  //     CampaignName: getValue('CampaignName'),
  //     StartDate: getValue('SDate'),
  //     EndDate: getValue('EDate'),
  //     UpdatedEndDate: getValue('UpdatedEDate'),
  //     LocationValue: getValue('LocationDetails'),
  //     ExcludeLocationValue: getValue('ExcludeLocationDetails'),
  //     AdId: getValue('AdID')
  //  };
  //storeValue('CampaignDetails', campaignDetails);
  // convert JSON object to string
  //const data = JSON.stringify(campaignDetails);

}

function removeSpaces(value) {
  return String(value).replace(/\s/g, '');
}


function trimListElements(list) {
  temp = [];
  list.forEach((ele) => {
    temp.push(ele.trim());
  });
  return temp;
}

function createAndWriteToCSVFile(coFounderDetailsArray, scenarionName) {

  const csvWriter = createCsvWriter({
    path: scenarionName+'_CoFounderDetails.csv',
    header: ['Co-Founder Name', 'Position', 'Description']
  });

  csvWriter
    .writeRecords(coFounderDetailsArray)
    .then(() => console.log('The CSV file was written successfully'));

}

var fs = require('fs');

function readDataFromCSV(scenarionName) {

var data = fs.readFileSync(scenarionName)
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split(',').map(e => e.trim())); // split each line to array
    
    return data;
// console.log(data);
// console.log(JSON.stringify(data, '', 2));
}

// function getJsonFile() {
//   const jsondata = require('../dataSets/' + getValue('specName') + '.json');
//   let js;
//   for (let i = 0; i < jsondata.length; i++) {
//     js = jsondata[i];
//     if (
//       String(js.ScenarioName).trim() == String(getValue('scenarioName')).trim()
//     ) {
//       break;
//     }
//   }
//   return js;
// }

// function stringArrayToString(arrayString) {
//   let value = '';
//   value = arrayString[0];

//   if (arrayString.length > 1) {
//     for (let i = 1; i < arrayString.length; i++) {
//       arrayString.join(', ');
//       //value = value + ", " + arrayString[i];
//     }
//   }
//   return value;
// }

// function clearTasks(){
//     await evaluate(() => localStorage.clear());

// }

module.exports = {
  tryAgain,
  storeValue,
  getValue,
  writeCampaignDetails,
  removeSpaces,
  trimListElements,
  createAndWriteToCSVFile,
  readDataFromCSV
};
