-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS scraper CASCADE;
-- DROP TABLE IF EXISTS filtered_events CASCADE;


CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);

CREATE TABLE scraper (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR,
  date VARCHAR,
  detail_url VARCHAR
);

-- CREATE TABLE filtered_events (
--   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--   title VARCHAR,
--   date VARCHAR,
--   detail_url VARCHAR,
--   scraper_id BIGINT,
--   FOREIGN KEY (scraper_id) REFERENCES scraper(id)
-- );




