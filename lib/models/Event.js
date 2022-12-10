const pool = require('../utils/pool');

class Event {
  id;
  detail;

  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
  }

  static async insert({ detail }) {
    const { rows } = await pool.query(
      `
        INSERT INTO events (detail)
        VALUES ($1)
        RETURNING *   
        `,
      [detail]
    );
    return new Event(rows[0]);
  }
}

module.exports = { Event };
