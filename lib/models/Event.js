const pool = require('../utils/pool');

class Event {
  id;
  title;
  date;
  detail_url;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.date = row.date;
    this.detail_url = row.detail_url;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT * from scraper
      `
    );
    return rows.map((row) => new Event(row));
  }

  static async insert({ title, date, detail_url }) {
    const { rows } = await pool.query(
      `
        INSERT INTO scraper (title, date, detail_url)
        VALUES ($1, $2, $3)
        RETURNING *   
        `,
      [title, date, detail_url]
    );
    return new Event(rows[0]);
  }
}

module.exports = Event;
