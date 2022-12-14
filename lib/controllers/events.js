const { Router } = require('express');
const Event = require('../models/Event');
const { events } = require('../../eventsjson.js');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const allEvents = [];
    events.forEach(async (event) => {
      await Event.insert(event);
      allEvents.push(event);
    });
    res.json(allEvents);
  } catch (e) {
    next(e);
  }
});
