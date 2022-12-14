const Event = require('../lib/models/Event');

async function getScraped() {
  const dbEvents = await Event.getAll();
  return dbEvents;
}

const inFetchEvents = getScraped();
console.log(inFetchEvents);

const fetch = require('node-fetch');
const payload = {
  channel: 'webhook-tests',
  blocks: [],
};

fetch(`https://hooks.slack.com/services.${process.env.SLACK_WEBHOOK_TOKENS}`, {
  method: 'POST',
  body: JSON.stringify(payload),
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': payload.length,
    Accept: 'applcation/json',
  },
})
  .then((res) => {
    if (!res.ok) {
      throw new Error(`SERVER ERROR ${res.status}`);
    }
    return res.json();
  })
  .catch((error) => {
    console.log(error);
  });
