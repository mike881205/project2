-- DO NOT CHANGE --

DROP DATABASE IF EXISTS schedule_db;
CREATE DATABASE schedule_db;
USE schedule_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    user VARCHAR (255) NOT NULL,
    password VARCHAR (25) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO users (user, password) 
VALUES (req.body.user, req.body.password)

CREATE TABLE dates
(
	id INT NOT NULL AUTO_INCREMENT,
    -- 'false' means user is NOT available that day
    day1 BOOLEAN false,
    day2 BOOLEAN false,
    day3 BOOLEAN false,
    day4 BOOLEAN false,
    day5 BOOLEAN false,
    day6 BOOLEAN false,
    day7 BOOLEAN false,
	user_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);