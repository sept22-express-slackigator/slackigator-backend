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

  // it('GET /api/v1/events should return all events', async () => {
  //   const resp = await request(app).get('/api/v1/events');
  //   expect(resp.status).toBe(200);
  //   expect(resp.body[0]).toMatchInlineSnapshot(`undefined`);
  // });

  it('POST /api/v1/events should post a new event', async () => {
    const resp = await request(app)
      .post('/api/v1/events')
      .send({ title: 'butt', date: 'blah', detail_url: 'blahblah' });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      date: expect.any(String),
      detail_url: expect.any(String),
    });
  });
});
