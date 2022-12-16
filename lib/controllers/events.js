const { Router } = require('express');
const Event = require('../models/Event');
const fetch = require('node-fetch');

// markdown language sent directly to Slack, determines format of Slack message
// mock payload - Designed with Block-Builder Slack tool, for ease of payload construction
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
        text: '',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '',
      },
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: '',
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

module.exports = Router().post('/', async (req, res, next) => {
  // grabs all scraped events from db, ordered by date
  const events = await Event.getAll();

  // map through events array to construct individual payloads and create payloadEvents array
  const payloadEvents = events.map((event) => {
    const payload = {
      channel: 'webhook-tests',
      text: event.title,
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
            // pass in key value pair from event
            text: event.title,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            // template literal
            text: `<${event.detail_url}|Global PDX event page>`,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*When:*\n${event.date}`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Click the button to add ${event.title} to your Google Calendar`,
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'google calendar',
              emoji: true,
            },
            value: 'click_me_123',
            // link that directs to google calendar to add event
            url: event.add_to_cal_url,
            action_id: 'button-action',
          },
        },
      ],
    };

    return payload;
  });

  // iterating through payloadEvents array to post each event to Slack
  payloadEvents.forEach((event) => {
    try {
      fetch(
        `https://hooks.slack.com/services${process.env.SLACK_WEBHOOK_TOKENS}`,
        {
          method: 'POST',
          body: JSON.stringify(event),
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': payload.length,
            Accept: 'application/json',
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`SERVER ERROR ${res.status}`);
          }
          /* eslint-disable no-console */
          console.log(res);
          return res;
        })
        .catch((error) => {
          console.log(error);
        });
      res.send();
    } catch (e) {
      next(e);
    }
  });
});
