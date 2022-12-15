const pup = require('puppeteer');

async function startBrowser() {
  let browser;
  try {
    /* eslint-disable no-console */
    console.log('opening the browser...');
    browser = await pup.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], ignoreDefaultArgs: ['--disable-extensions'] });
  } catch (e) {
    console.log('could not create in-browser instance =>', e);
  }
  return browser;
}

module.exports = { startBrowser };
