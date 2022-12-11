const pool = require('../utils/pool');

class Event {
  id;
  title;
  date;
  time;
  cost;
  category;
  website;
  organizer;
  organizer_url;
  venue;
  description;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.date = row.date;
    this.time = row.time;
    this.cost = row.cost;
    this.category = row.category;
    this.website = row.website;
    this.organizer = row.organizer;
    this.organizer_url = row.organizer_url;
    this.venue = row.venue;
    this.description = row.description;
  }

  static async insert({
    title,
    date,
    time,
    cost,
    category,
    website,
    organizer,
    organizer_url,
    venue,
    description,
  }) {
    const { rows } = await pool.query(
      `
        INSERT INTO events (title, date, time, cost, category, website, organizer, organizer_url, venue, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *   
        `,
      [
        title,
        date,
        time,
        cost,
        category,
        website,
        organizer,
        organizer_url,
        venue,
        description,
      ]
    );
    return new Event(rows[0]);
  }
}

module.exports = { Event };
