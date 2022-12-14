const dotenv = require('dotenv');
dotenv.config();
const { startBrowser } = require('./lib/services/scraper/browser.js');
const scraperObject = require('./lib/services/scraper/pageScraper.js');
const Event = require('./lib/models/Event.js');
console.log(process.env.DATABASE_URL);
async function grabScraped() {
  const browser = await startBrowser();
  const events = await scraperObject.scraper(browser);
  try {
    await Promise.all(events.map((event) => Event.insert(event)));
  } catch (e) {
    console.error(e);
  }
  return events;
}
grabScraped();

// module.exports = { grabScraped };
