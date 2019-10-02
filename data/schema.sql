DROP DATABASE IF EXISTS jblm_unlimited_cf19;
CREATE DATABASE jblm_unlimited_cf19;
\c jblm_unlimited_cf19;


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

INSERT INTO resource (title, description, resource_url) VALUES ('Recruit Military', 'RecruitMilitary is a wholly-owned subsidiary of Bradley-Morris, Inc. (BMI), the largest military-focused recruiting company in the U.S.', 'https://events.recruitmilitary.com/exhibitors/schedule');

INSERT INTO resource (title, description, resource_url) VALUES ('JBLM-SFL-TAP', 'JBLM SFL-TAP’s mission is to provide pre-separation counseling, transition and employment assistance services to Active Duty, Guard, and Reserve Soldiers and Airmen, Department of Army Civilians who are considering or preparing to depart the military and all work age family members of each of the above groups.', 'https://jblmunlimited.com//jobs');
