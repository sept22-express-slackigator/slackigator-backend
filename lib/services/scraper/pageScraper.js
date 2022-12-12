const scraperObject = {
  url: 'https://globalpdx.org/events/list/',
  async scraper(browser) {
    const page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    // navigate to the selected page
    await page.goto(this.url);
    // wait for the required dom to be rendered
    await page.waitForSelector('.page_inner');
    // get the link to required data
    const eventUrls = [];
    const urls = await page.$$eval(
      '.tribe-events-calendar-list div .tribe-events-calendar-list__event-wrapper.tribe-common-g-col article div header h3 a'
    );
    urls.forEach((anchor) => {
      eventUrls.push(anchor.href);
    });
  },
};

module.exports = scraperObject;
