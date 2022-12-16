const pup = require('puppeteer');

// This creates the browser instance in puppeteer
async function startBrowser() {
  // declare browser variable
  let browser;
  try {
    /* eslint-disable no-console */
    console.log('opening the browser...');
    
    // set browser to equal launching puppeteer module
    browser = await pup.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], ignoreDefaultArgs: ['--disable-extensions'] });

  } catch (e) {
    console.log('could not create in-browser instance =>', e);
  }

  // return browser and then export
  return browser;
}

module.exports = { startBrowser };
