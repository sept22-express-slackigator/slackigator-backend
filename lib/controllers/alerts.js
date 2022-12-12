const fetch = require('node-fetch');
// const { Router } = require('express');

const payload = {
  channel: 'webhook-tests',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*My first Slack Message*',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Random example message text',
      },
    },
  ],
};

// module.exports = Router().get('/', async (req, res, next) => {
fetch(
  `https://hooks.slack.com/services/${process.env.SLACK_WEBHOOK_TOKENS}`,
  {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': payload.length,
      // Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
      Accept: 'application/json',
    },
  }
)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Server error ${res.status}`);
    }

    return res.json();
  })
  .catch((error) => {
    console.log(error);
  });
// });
