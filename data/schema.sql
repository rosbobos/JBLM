-- DROP DATABASE IF EXISTS jblm_unlimited_cf19;
-- CREATE DATABASE jblm_unlimited_cf19;
-- \c jblm_unlimited_cf19;


DROP TABLE IF EXISTS event;
CREATE TABLE event (
  id SERIAL PRIMARY KEY,
  event_title varchar(255),
  event_date varchar(255),
  event_description varchar(255),
  event_link varchar (255)
);

DROP TABLE IF EXISTS resource;
CREATE TABLE resource (
  id SERIAL PRIMARY KEY,
  title varchar(255),
  description text,
  resource_url varchar(255),
  logo_png bytea
);

DROP TABLE IF EXISTS resource_file;
CREATE TABLE resource_file (
  id SERIAL PRIMARY KEY,
  resource_id int,
  file_name varchar(255),
  file_content bytea
);

ALTER TABLE resource_file ADD CONSTRAINT fk_resource FOREIGN KEY (resource_id) REFERENCES resource(id);
