const pool = require('../utils/pool');

class Event {
  id;
  title;
  date;
  detail_url;
  new_post;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.date = row.date;
    this.detail_url = row.detail_url;
    this.new_post = row.new_post;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT * from scraper
      `
    );
    return rows.map((row) => new Event(row));
  }

  static async getNewEvents() {
    const { rows } = await pool.query(
      `
      SELECT * from scraper WHERE new_post is true
      `
    );
    if (rows.length === 0) {
      return null;
    } else return rows.map((row) => new Event(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * from scraper WHERE id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return new Event(rows[0]);
  }

  static async updateById(id) {
    const event = await Event.getById(id);
    if (!event) return null;
    const { rows } = await pool.query(
      `UPDATE scraper
      SET new_post = false
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );
    return new Event(rows[0]);
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
