const { Router } = require('express');
const Event = require('../models/Event');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const event = await Event.insert(req.body);
      res.json(event);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const event = await Event.getAll();
      res.json(event);
    } catch (e) {
      next();
    }
  });
