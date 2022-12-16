const browserObject = require('./browser');
const scraperController = require('./pageController');

//start the browser and create a browser instance
const browserInstance = browserObject.startBrowser();

//pass the browser instance to the scraper controller, located in page controller
scraperController(browserInstance);
