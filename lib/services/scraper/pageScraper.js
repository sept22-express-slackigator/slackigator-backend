// const fs = require('fs');
// const Event = require('../../models/Event.js');

const scraperObject = {
  url: 'https://globalpdx.org/events/list/',
  async scraper(browser) {
    const page = await browser.newPage();
    /* eslint-disable no-console */
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
    const scrapedObjects = [];

    // loop through links
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const newPage = await browser.newPage();
      await newPage.goto(url);

      const eventTitle = await newPage.$eval(
        '.tribe-events-single-event-title',
        (text) => text.textContent
      );

      //multiple classes separated by '.' as opposed to spaces that the copied path might contain optional chaining is done with a comma
      const eventDate = await newPage.$eval(
        '.tribe-events-abbr.tribe-events-start-date.published.dtstart, .tribe-events-abbr.tribe-events-start-datetime.updated.published.dtstart',
        (text) => text.textContent
      );

      const eventCalendar = await newPage.$eval(
        '.tribe-events-c-subscribe-dropdown .tribe-events-c-subscribe-dropdown__content .tribe-events-c-subscribe-dropdown__list .tribe-events-c-subscribe-dropdown__list-item .tribe-events-c-subscribe-dropdown__list-item-link',
        (a) => a.getAttribute('href')
      );

      const dataObj = {
        // calendar: eventCalendar,
        title: eventTitle,
        date: eventDate,
        detail_url: url,
        add_to_cal_url: eventCalendar,
      };

      scrapedObjects.push(dataObj);

      // await Event.insert(dataObj);
      await newPage.close();
    }
    await page.close();
    // close the headless browser session
    await browser.close();
    return scrapedObjects;
  },
};

module.exports = scraperObject;
