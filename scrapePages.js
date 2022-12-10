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
  // eslint-disable-next-line no-console
  console.log('before the for loop', grabEventDetailUrls);

  // close the headless browser session
  await browser.close();
}

// call function with list page url
scrapePage('https://globalpdx.org/events/list/');
