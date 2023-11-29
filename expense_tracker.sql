CREATE TABLE category (
   id serial primary key,
   category_type text NOT NULL
);

-- Inserting data into category table
INSERT INTO category (category_type) VALUES ('Weekly');
INSERT INTO category (category_type) VALUES ('Monthly');
INSERT INTO category (category_type) VALUES ('Weekday');
INSERT INTO category (category_type) VALUES ('Weekend');
INSERT INTO category (category_type) VALUES ('Once-off');
INSERT INTO category (category_type) VALUES ('Daily');

-- table for expenses
CREATE TABLE expense (
   id serial primary key,
   description text NOT NULL,
   amount numeric not null, 
   total_amount numeric not null,
   category_id int not null references category(id)
);























  




