const { Router } = require('express');
const Event = require('../models/Event');
const fetch = require('node-fetch');
const { updateById } = require('../models/Event');

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
        // is title in comment
        text: '',
      },
    },
    {
      type: 'section',
      text: {
        // is title in comment
        type: 'mrkdwn',
        text: '',
      },
    },
    {
      type: 'section',
      fields: [
        {
          // is title in comment
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

module.exports = Router().get('/', async (req, res, next) => {
  const events = await Event.getNewEvents();
  if (events === null) {
    try {
      res.send('there are no new events today');
    } catch (e) {
      next(e);
    }
  } else {
    console.log('events', events);
    // console.log('block title text field', payload.blocks[1].text.text);
  }
  const payloadEvents = events.map((event) => {
    // console.log('event title', event.title);
    // payload.blocks[1].text.text;
    // payload.blocks[2].text.text = `<${event.detail_url}|Global PDX event page>`;
    // payload.blocks[3].fields[0].text = ;

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
            // 1 is title in comment
            text: event.title,
          },
        },
        {
          type: 'section',
          text: {
            // 2 is title in comment
            type: 'mrkdwn',
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
        },
        {
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'google calendar',
              emoji: true,
            },
            value: 'click_me_123',
            url: event.add_to_cal_url,
            action_id: 'button-action',
          },
        },
      ],
    };
    console.log('event title', event);
    updateById(event.id);

    return payload;
  });

  // console.log('mapped array of events', payloadEvents);

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
