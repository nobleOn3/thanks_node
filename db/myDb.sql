List of important commands for the thank you site.
Author: Jessen Noble
*********************************************************************************************

TABLES:
(* indicates primary key)
(- indicates foreign key relationship)
--------------------------------------
users (id:int*, name:varchar(60), passsword:varchar(20))

primary_color (id:int*, name:varchar(30))

thank_you_images (id:int*, name:varchar(30), -primary_color:int, image:varchar(100)) 
   (related to primary color)

user_favorites (-user_id:int, -image_id:int); (related to users and thank_you_images)

*********************************************************************************************
Creating tables:
CREATE TABLE table_name (var_name		var_type (add primary key here too if it applies), 
	var_name	var_type, etc.);
*********************************************************************************************
INSERTING INFO:
INSERT INTO table_name VALUES(val_1, val_2, val_3, etc); (value variables should be in order
 they appear in the table)
*********************************************************************************************
DELETING INFO:

Removing a table:
DROP TABLE table_name;
----------------------
Removing the contents of a table:
DELETE FROM table_name;
-----------------------
Removing a row:
DELETE FROM table_name WHERE column_name = value; (column_name ex: id; value ex: 1)
-----------------------------------------------------------------------------------

*********************************************************************************************
Other commands (workspace):

CREATE TABLE users
(
	id SERIAL PRIMARY KEY,
	name VARCHAR(60) NOT NULL, 
	pass VARCHAR(80) NOT NULL
);

CREATE TABLE thank_you_images
(
	id SERIAL PRIMARY KEY,
	name VARCHAR(60) NOT NULL,
	main_color int references primary_color(id),
	image_file VARCHAR(60)
);

CREATE TABLE user_favorites
(
	user_id  int references users(id),
	image_id int references thank_you_images(id)
);

SELECT a.name, m.title, t.id AS actor_id, m.id AS movie_id FROM movie m
JOIN actor_movie am ON m.id = am.movie_id 
WHERE title = 'The Return of the King';

temp_user (id SERIAL PRIMARY KEY, name VARCHAR(60), pass VARCHAR(120));

CREATE TABLE person
(
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	birthday VARCHAR(20) NOT NULL
);

INSERT INTO movie(title, year) VALUES 
('Harry Potter and the Chamber of Secrets', 2002),
('The Return of the King', 2003);

INSERT INTO person (first_name, last_name, birthday) VALUES 
('John', 'Who', 'October 14, 1999'),
('Scott', 'Burton', 'January 1, 1980'),
('Jessen', 'Noble', 'August 5, 1993');

INSERT INTO users (name, pass) VALUES 
('jMan2015', 'human023');
