const pup = require('puppeteer');

async function startBrowser() {
  let browser;
  try {
    console.log('opening the browser...');
    browser = await pup.launch({ headless: false });
  } catch (e) {
    console.log('could not create in-browser instance =>', e);
  }
  return browser;
}

module.exports = { startBrowser };
