const fs = require('fs');
// const Event = require('../../models/Event.js');

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
    const scrapedObjects = [];

    console.log('urls', urls);
    // loop through links
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const newPage = await browser.newPage();
      await newPage.goto(url);
      console.log('anchor', url);

      const eventTitle = await newPage.$eval(
        '.tribe-events-single-event-title',
        (text) => text.textContent
      );
      //multiple classes separated by '.' as opposed to spaces that the copied path might contain
      const eventDate = await newPage.$eval(
        '.tribe-events-abbr.tribe-events-start-date.published.dtstart',
        (text) => text.textContent
      );
      // * Working on this later, as a stretch * \\
      // const eventCalendar = await newPage.$eval(
      //   '/html/body/div[1]/div[2]/main/div[2]/div[3]/div[2]/div/div/div[2]/ul/li[1]/a',
      //   (text) => text.textContent
      // );

      const dataObj = {
        // calendar: eventCalendar,
        title: eventTitle,
        date: eventDate,
        detail_url: url,
      };

      scrapedObjects.push(dataObj);

      fs.writeFile(
        './eventsjson.js',
        'const events = ' +
          JSON.stringify(scrapedObjects) +
          ';' +
          ' module.exports = { events };',
        (err) => (err ? console.log(err) : null)
      );
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
