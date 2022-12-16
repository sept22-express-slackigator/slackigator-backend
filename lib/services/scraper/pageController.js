// require page-scraper function
const pageScraper = require('./pageScraper');

// Creates scrape all function
async function scrapeAll(browserInstance) {
  let browser;
  try {
    // starts headless browser
    browser = await browserInstance;
    await pageScraper.scraper(browser);
  } catch (e) {
    /* eslint-disable no-console */
    console.log('could not resolve the browser instance', e);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
