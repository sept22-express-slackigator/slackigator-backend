const { startBrowser } = require('./lib/services/scraper/browser.js');
const scraperObject = require('./lib/services/scraper/pageScraper.js');

async function grabScraped() {
  const browser = await startBrowser();
  const scrapedList = await scraperObject.scraper(browser);
  console.log('scraped lists', scrapedList);
  return scrapedList;
}
grabScraped();

// module.exports = { grabScraped };
