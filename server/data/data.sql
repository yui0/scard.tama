/* ©2023 Yuichiro Nakada */
/* sqlite3 data.db < data.sql */

CREATE TABLE user (
	id integer primary key autoincrement,
	uid text,
	name varchar(128) NOT NULL,
	pass varchar(128) NOT NULL,
	tel text,
	email text,
	addr1 text,
	addr2 text,
	addr3 text,
	addr4 text,
	edit_date timestamp NOT NULL default (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))
);
INSERT INTO user (id, name, pass) VALUES ("0", "admin", "pass");

CREATE TABLE data (
	id integer primary key autoincrement,
	uid text,
	shop text,
	point integer,
	edit_date timestamp NOT NULL default (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))
);

CREATE TABLE history (
	id integer primary key autoincrement,
	uid text,
	shop text,
	amount integer,
	point integer,
	note text,
	edit_date timestamp NOT NULL default (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))
);

