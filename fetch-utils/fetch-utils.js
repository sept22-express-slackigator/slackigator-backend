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
  blocks: [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '🌐Upcoming Events!🌐',
        emoji: true,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Beaverton Development Drinks*',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '<https://example.com|Global PDX event page>',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'GlobalPDX expands our Monthly Development Drinks to Beaverton in celebration of the new year! Join us on the Third Thursday of January, February, or March as we pilot this new location.',
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: '*When:*\nJanuary 19, 2023',
        },
        {
          type: 'mrkdwn',
          text: '*Time:*\n5:30 pm - 8:00 pm',
        },
      ],
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Click Here to add this event to your google calendar',
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'google calendar',
          emoji: true,
        },
        value: 'click_me_123',
        url: 'https://www.google.com/calendar/event?action=TEMPLATE&dates=20230119T173000/20230119T200000&text=Beaverton%20Development%20Drinks&details=%3Cimg+class%3D%22alignnone++wp-image-7142%22+src%3D%22https%3A%2F%2Fglobalpdx.org%2Fwp-content%2Fuploads%2F2021%2F11%2FGeneric-Dev-Drinks.png%22+alt%3D%22%22+width%3D%22287%22+height%3D%22287%22+%2F%3E%26nbsp%3BGlobalPDX+expands+our+Monthly+Development+Drinks+to+Beaverton+in+celebration+of+the+new+year%21Join+us+on+the+Third+Thursday+of+January%2C+February%2C+or+March+as+we+pilot+this+new+location.%3Ch3%3E%3Cspan+style%3D%22color%3A+%23c27858%3B%22%3E%3Ca+style%3D%22color%3A+%23c27858%3B%22+href%3D%22https%3A%2F%2Fsecure.lglforms.com%2Fform_engine%2Fs%2FPEecAhCb9fhOssUjIHGs_w%22%3ERSVP+Here%3C%2Fa%3E%3C%2Fspan%3E%3C%2Fh3%3E&location=TBD%20(Beaverton)&trp=false&ctz=America/Los_Angeles&sprop=website:https://globalpdx.org',
        action_id: 'button-action',
      },
    },
  ],
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
