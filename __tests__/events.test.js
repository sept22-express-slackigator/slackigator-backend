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
    const resp = await request(app).post('/api/v1/events').send({
      title: '2023 Funding and Partnership Preview',
      date: ' December 13 ',
      time: '7:00 am - 8:00 am',
      cost: 'Free',
      category: 'Webinar',
      website: 'https://www.connectiveimpact.com/23Preview',
      organizer: 'Connective Impact',
      organizer_url: 'https://www.connectiveimpact.com/',
      venue: ' Virtual Event ',
      description:
        'What were the biggest trends this year in international fundraising, and what’s in store for 2023?Our most popular event each year is when we discuss what has been successful in fundraising this past year, and what will be important to consider for next year.Come with your questions. It’s always a lively discussion!Questions? Email us: info@connectiveimpact.com',
    });
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
