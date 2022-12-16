// loads environment variables, bypasses limitations of .env
const dotenv = require('dotenv');
dotenv.config();
const { startBrowser } = require('./lib/services/scraper/browser.js');

// nodeCron is a module that allows for setting up tasks in node.js
const nodeCron = require('node-cron');

// object built out of scraped data
const scraperObject = require('./lib/services/scraper/pageScraper.js');
const Event = require('./lib/models/Event.js');

// function for taking scraped data, then inputting it into database
async function grabScraped() {
  const browser = await startBrowser();
  const events = await scraperObject.scraper(browser);
  try {
    // await each scraped detail page to settle, before returning data
    await Promise.allSettled(events.map((event) => Event.insert(event)));
  } catch (e) {
    console.error(e);
  }
  return events;
}

// scheduled task (* = second, minute, hour, day of month, month, day of week)
nodeCron.schedule('*/1 * * * *', async () => {
  await grabScraped();
});
