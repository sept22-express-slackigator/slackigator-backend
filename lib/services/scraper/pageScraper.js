const scraperObject = {
  url: 'https://globalpdx.org/events/list/',
  async scraper(browser) {
    const page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
  },
};

module.exports = scraperObject;
