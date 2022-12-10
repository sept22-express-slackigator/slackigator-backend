const puppeteer = require('puppeteer');

// create function to scrape page with list of upcoming events
async function scrapePage(url) {
  // create a headless browser instance
  const browser = await puppeteer.launch();

  // create a new page
  const page = await browser.newPage();

  // go to url that is passed into function when called
  await page.goto(url);

  // create function expression to evaluate page and grab anchor tags from event titles
  const grabEventDetailUrls = await page.evaluate(() => {
    const aTags = document.querySelectorAll(
      '.tribe-events-calendar-list div .tribe-events-calendar-list__event-wrapper.tribe-common-g-col article div header h3 a'
    );

    // push each anchor tag href once scraped into an array of URLs
    const eventDetailUrls = [];
    aTags.forEach((anchor) => {
      eventDetailUrls.push(anchor.href);
    });

    // return the array
    return eventDetailUrls;
  });

  // log to see array of event urls
  // console.log('before the for loop', grabEventDetailUrls);

  // iterate through url array
  for (let detailUrl = 0; detailUrl < grabEventDetailUrls.length; detailUrl++) {
    // store the current index values url
    const url = grabEventDetailUrls[detailUrl];

    // create new page
    const page = await browser.newPage();

    // go to current index url
    await page.goto(url);

    // log to see iteration and current index url
    // console.log('in the for loop', [detailUrl], url);

    // evaluate page for element with given selector
    const eventTitle = await page.$$eval(
      '.tribe-events-single-event-title',
      (eventTitle) => {
        // loop through array | grab text and store to array object
        const title = eventTitle.map((titleText) => titleText.textContent);

        // return the first index to pull out of array
        return title[0];
      }
    );

    // evaluate page for element with given selector
    const eventDate = await page.$$eval(
      '.tribe-events-abbr.tribe-events-start-date.published.dtstart',
      (eventDate) => {
        // loop through array | grab text and store to array object
        const date = eventDate.map((date) => date.textContent);

        // return the first index to pull out of array
        return date[0];
      }
    );

    // evaluate page for element with given selector
    const eventTime = await page.$$eval(
      '.tribe-events-abbr.tribe-events-start-time.published.dtstart',
      (eventTime) => {
        // loop through array | grab text, trim, and store to array object
        const time = eventTime.map((time) => time.textContent.trim());

        // provide check if no event time given on detail page
        if (time[0] === undefined) {
          return 'See event page for time!';
        } else {
          // return the first index to pull out of array
          return time[0];
        }
      }
    );

    // store data from detail page scrapes to key value pairs in event object
    const event = {
      title: eventTitle,
      date: eventDate,
      time: eventTime,
    };

    // convert JS object to JSON string
    const jsonEvent = JSON.stringify(event);

    // log the results
    // eslint-disable-next-line no-console
    console.log('===================================');
    // eslint-disable-next-line no-console
    console.log('event object{} console log', [detailUrl], jsonEvent);
    // eslint-disable-next-line no-console
    console.log('===================================');
  }

  // close the headless browser session
  await browser.close();
}

// call function with list page url
scrapePage('https://globalpdx.org/events/list/');
