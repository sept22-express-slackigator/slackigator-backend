-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS events;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);

CREATE TABLE events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  date VARCHAR NOT NULL,
  time VARCHAR NOT NULL,
  cost VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  website VARCHAR NOT NULL,
  organizer VARCHAR NOT NULL,
  organizer_url VARCHAR NOT NULL,
  venue VARCHAR NOT NULL,
  description VARCHAR NOT NULL
)