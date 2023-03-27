const dotenv = require('dotenv');
dotenv.config();
const { startBrowser } = require('./lib/services/scraper/browser.js');
const nodeCron = require('node-cron');
const scraperObject = require('./lib/services/scraper/pageScraper.js');
const Event = require('./lib/models/Event.js');
async function grabScraped() {
  const browser = await startBrowser();
  const events = await scraperObject.scraper(browser);
  try {
    await Promise.allSettled(events.map((event) => Event.insert(event)));
  } catch (e) {
    console.error(e);
  }
  return events;
}

grabScraped();


nodeCron.schedule(' 1 * * * *', async () => {
  await grabScraped();
},
{ timezone: 'America/Los_Angeles' }
);
