DROP DATABASE IF EXISTS jblm_unlimited_cf19;
CREATE DATABASE jblm_unlimited_cf19;
\c jblm_unlimited_cf19;


DROP TABLE IF EXISTS all_Events;

CREATE TABLE all_Events{
    id SERIAL PRIMARY KEY,
    event_title varchar(255),
    event_date varchar(255),
    event_description varchar(255),
    event_link varchar 255)

};