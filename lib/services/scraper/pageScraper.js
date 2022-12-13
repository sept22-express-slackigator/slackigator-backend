const scraperObject = {
  url: 'https://globalpdx.org/events/list/',
  async scraper(browser) {
    const page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);

    // await page.setCookie(...cookies);
    // navigate to the selected page
    await page.goto(this.url);
    // wait for the required dom to be rendered
    // await page.waitForSelector('.tribe-events-calendar-list');
    // get the link to required data
    // const elementHandles = await page.$$(
    //   '.tribe-events-calendar-list div .tribe-events-calendar-list__event-wrapper.tribe-common-g-col article div header h3 a'
    // );
    const urls = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          '.tribe-events-calendar-list div .tribe-events-calendar-list__event-wrapper.tribe-common-g-col article div header h3 a[href]'
        ),
        (a) => a.getAttribute('href')
      )
    );

    console.log('urls', urls);
    // loop through links
    urls.forEach(async (url) => {
      const dataObj = {};
      const newPage = await browser.newPage();
      await newPage.goto(url);
      console.log('anchor', url);

      dataObj['title'] = await newPage.$eval(
        '.tribe-events-single-event-title',
        (text) => text.textContent
      );
      //multiple classes seperated by '.' as opposed to spaces that the copied path might contain
      dataObj['date'] = await newPage.$eval(
        '.tribe-events-abbr.tribe-events-start-date.published.dtstart',
        (text) => text.textContent
      );
      dataObj['venue'] = await newPage.$eval(
        '.tribe-events-event-url a[href]',
        (text) => text.textContent
      );

      return url;
    });
  },
};

module.exports = scraperObject;
