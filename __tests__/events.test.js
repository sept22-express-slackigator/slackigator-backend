const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('events routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('POST /api/v1/events should post a new event', async () => {
    const resp = await request(app)
      .post('/api/v1/events')
      .send({ description: 'butt' });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      date: expect.any(String),
      time: expect.any(String),
      cost: expect.any(String),
      category: expect.any(String),
      website: expect.any(String),
      organizer: expect.any(String),
      organizer_url: expect.any(String),
      venue: expect.any(String),
      description: expect.any(String),
    });
  });
});
