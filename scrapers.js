const puppeteer = require('puppeteer');
// const { Event } = require('./lib/models/Event');

async function scrapePage(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const [el] = await page.$x(
    '/html/body/div[1]/div[2]/div/div/div[2]/div[1]/div[2]/article/div/header/div/time'
  );
  const text = await el.getProperty('textContent');
  const rawTxt = await text.jsonValue();
  console.log({ rawTxt });

  browser.close();
}
// await Event.insert(rawTxt);

scrapePage('https://globalpdx.org/events/list/');
