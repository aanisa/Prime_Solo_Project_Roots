All SQL Queries used to create database and http requests

-- Users Table Creation and Addition of First and Last Name --
CREATE TABLE "users" (
"id" serial primary key,
"username" varchar(80) not null,
"password" varchar (140) not null
);

ALTER TABLE users ADD firstName varchar(200);
ALTER TABLE users ADD lastName varchar(200);

INSERT INTO users (username, password, firstName, lastName) VALUES ('tsample@mail.com', '12345', 'Test', 'Sample') RETURNING id;




-- Biography table Creation with only a subset of required data ---
CREATE TABLE "biography" (
"id" serial primary key,
"user_id" INT REFERENCES "users",
"firstName" varchar (200),
"lastName" varchar (200),
"birthday" date,
"age" INT,
"alive" BOOLEAN
);

--SELECT For GET bio request
SELECT * FROM biography;

--JOIN user.id to "user" in biography table
SELECT * FROM "users"
JOIN "biography" ON "users"."id" = "biography"."user_id";

--CREATE new bio for Test user
INSERT INTO "biography" ("user", "firstName", "lastName", "birthday", "age", "alive")
VALUES (1, 'Test', 'Testing', '01/08/1984', 33, 'true');


--SET date as M/D/Y rather than Y/M/D -> Need to make this part of GET request to format correctly
SELECT "id", "user", "firstName", "lastName", to_char(birthday, 'MM/DD/YYYY') as birthday, age, alive FROM "biography";

--UPDATE bio for all entries in user 1 --> TEST
UPDATE biography SET birthday= '1/8/1984', age = 34, user_id =1 WHERE id= 1;
--UPDATE bio for only person with ID 8, in user 1 account --> TEST
UPDATE biography SET "firstName" = 'Work' WHERE user_id=1 AND id = 8;


--ADD remaining BIOGRAPHY Data
ALTER TABLE biography  ADD "middleName" varchar(200);
ALTER TABLE biography ADD "birthplace" varchar (200);
ALTER TABLE biography ADD "education" text;
ALTER TABLE biography ADD "profession" text;
ALTER TABLE biography ADD "earlyLife" text;
ALTER TABLE biography ADD "adultLife" text;
ALTER TABLE biography ADD "email" varchar (100);
ALTER TABLE biography ADD "adress" varchar (200);
ALTER TABLE biography ADD "homePhone" varchar (16);
ALTER TABLE biography ADD "mobilePhone" varchar (16);
ALTER TABLE biography ADD "contactNotes" text;
--Will still need relations (get info from relation table) for Biography Views


--CREATE Relations table
CREATE TABLE "relations" (
"id" serial PRIMARY KEY,
"person_id" INT REFERENCES "biography",
"mother_id" INT REFERENCES "biography",
"father_id" INT REFERENCES "biography"
);
--JOIN id's from "biography" to "relations"
SELECT * FROM "biography"
JOIN "relations" ON "biography"."id" = "relations"."person_id";

SELECT * FROM "biography"
JOIN "relations" ON "biography"."id" = "relations"."mother_id";

SELECT * FROM "biography"
JOIN "relations" ON "biography"."id" = "relations"."father_id";

--Insert relations from existing people -- TEST
INSERT INTO "relations" ("person_id", "mother_id", "father_id") VALUES (7, 43, 8);
INSERT INTO "relations" ("person_id", "mother_id", "father_id") VALUES (59, 56, 65);

--TEST SELECT
SELECT * FROM "relations" WHERE "person_id" = 3;

--JOIN user_id to relations table so only get logged in users t
ALTER TABLE relations ADD "user_id" INT REFERENCES users;

SELECT * FROM "users"
JOIN "relations" ON "users"."id" = "relations"."user_id";

--TEST UPDATE
UPDATE "relations" SET "mother_id" = 56, "father_id" = 60 WHERE "user_id" = 3 AND "person_id" = 59 ;

--TEST DELETE
DELETE FROM relations WHERE id=15;
