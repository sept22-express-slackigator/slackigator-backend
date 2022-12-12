const { Router } = require('express');
const { events } = require('../../eventsjson.js');
const { Event } = require('../models/Event');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const totalResponse = [];
    events.forEach(async (event) => {
      await Event.insert(event);
      totalResponse.push(event);
    });
    res.json(totalResponse);
  } catch (e) {
    next(e);
  }
});
