// axios installed. Axios is a promise-based HTTP Client for node.js and the browser and is isomorphic (it can run in browser and nodejs)
const Axios = require('axios');
const express = require('express');
const Router = express.Router();

Router.get('/', async (req, res, next) => {
  try {
    // sending message to specific slack channel URL w/ tokens attached
    await Axios.post(
      `https://hooks.slack.com/services/${process.env.SLACK_WEBHOOK_TOKENS}`,
      //markdown used to construct message layout. We can have fun with this!
      {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'hello world!',
            },
          },
        ],
      }
    );
    // res date not needed. Just something that is fun to have in the get request and shows that it's working
    res.json({
      date: new Date().toISOString(),
    });
  } catch (e) {
    next(e);
  }
});

module.exports = Router;
