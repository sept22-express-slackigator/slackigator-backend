const pup = require('puppeteer');

async function startBrowser() {
  let browser;
  try {
    /* eslint-disable no-console */
    console.log('opening the browser...');

    browser = await pup.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreDefaultArgs: ['--disable-extensions'],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    });
  } catch (e) {
    console.log('could not create in-browser instance =>', e);
  }
  return browser;
}

module.exports = { startBrowser };
