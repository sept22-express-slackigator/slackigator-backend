const pool = require('../utils/pool');

class Event {
  id;
  title;
  date;
  detail_url;
  new_post;
  add_to_cal_url;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.date = row.date;
    this.detail_url = row.detail_url;
    this.new_post = row.new_post;
    this.add_to_cal_url = row.add_to_cal_url;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT * from scraper
      ORDER BY date
      `
    );
    return rows.map((row) => new Event(row));
  }

  // getNewEvents references new post constraint on whether or not post has been relayed to Slack
  static async getNewEvents() {
    const { rows } = await pool.query(
      `
      SELECT * from scraper WHERE new_post is true
      ORDER BY date
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

  // updates newPost constraint after being posted to Slack
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

  static async insert({ title, date, detail_url, add_to_cal_url }) {
    const { rows } = await pool.query(
      `
        INSERT INTO scraper (title, date, detail_url, add_to_cal_url)
        VALUES ($1, $2, $3, $4)
        RETURNING *   
        `,
      [title, date, detail_url, add_to_cal_url]
    );
    return new Event(rows[0]);
  }
}

module.exports = Event;
