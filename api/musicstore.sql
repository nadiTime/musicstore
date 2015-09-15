CREATE DATABASE IF NOT EXISTS musicstore DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE musicstore;

-- Table structure for table albums
DROP TABLE IF EXISTS albums;
CREATE TABLE IF NOT EXISTS albums (
	album_id int(9) NOT NULL AUTO_INCREMENT,
	album_name varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	album_artist varchar(30) COLLATE utf8_unicode_ci NOT NULL,
	album_duration varchar(6) COLLATE utf8_unicode_ci NOT NULL,
	album_release_year varchar(4) COLLATE utf8_unicode_ci NOT NULL,
	album_description varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	album_long_description text COLLATE utf8_unicode_ci,
	album_created timestamp NOT NULL,
	album_price double DEFAULT NULL,
	PRIMARY KEY (album_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- Table structure for table albums_stock
DROP TABLE IF EXISTS albums_stock;
CREATE TABLE IF NOT EXISTS albums_stock (
	album_id int(9) NOT NULL,
	album_stock smallint(3) DEFAULT '0',
	PRIMARY KEY (album_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Table structure for table fb_users
DROP TABLE IF EXISTS fb_users;
CREATE TABLE IF NOT EXISTS fb_users (
	user_id int(9) NOT NULL,
	user_fb_uid bigint(13) NOT NULL,
	PRIMARY KEY (user_id),
	UNIQUE KEY user_fb_uid (user_fb_uid),
	KEY user_fb_uid_2 (user_fb_uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Table structure for table genres
DROP TABLE IF EXISTS genres;
CREATE TABLE IF NOT EXISTS genres (
	genre_id int(7) NOT NULL AUTO_INCREMENT,
	genre_parent_id int(7) NOT NULL DEFAULT '0',
	genre_name varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
	PRIMARY KEY (genre_id),
	KEY genre_parent_id (genre_parent_id),
	KEY genre_name (genre_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- Table structure for table genres_to_albums
DROP TABLE IF EXISTS genres_to_albums;
CREATE TABLE IF NOT EXISTS genres_to_albums (
	album_id int(9) NOT NULL,
	genre_id int(7) NOT NULL,
	PRIMARY KEY (album_id),
	KEY genre_id (genre_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Table structure for table images
DROP TABLE IF EXISTS images;
CREATE TABLE IF NOT EXISTS images (
	image_id bigint(12) NOT NULL AUTO_INCREMENT,
	image_path varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	image_title varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
	PRIMARY KEY (image_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- Table structure for table images_to_albums
DROP TABLE IF EXISTS images_to_albums;
CREATE TABLE IF NOT EXISTS images_to_albums (
	image_id bigint(12) NOT NULL,
	album_id int(9) NOT NULL,
	PRIMARY KEY (image_id),
	KEY album_id (album_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Table structure for table orders
DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders (
	order_id bigint(12) NOT NULL AUTO_INCREMENT,
	user_id int(9) NOT NULL,
	order_created timestamp NOT NULL,
	order_shipping_city varchar(30) COLLATE utf8_unicode_ci NOT NULL,
	order_shipping_address varchar(120) COLLATE utf8_unicode_ci NOT NULL,
	order_shipping_zipcode varchar(6) COLLATE utf8_unicode_ci DEFAULT NULL,
	order_total double DEFAULT NULL,
	PRIMARY KEY (order_id),
	KEY user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- Table structure for table orders_to_albums
DROP TABLE IF EXISTS orders_to_albums;
CREATE TABLE IF NOT EXISTS orders_to_albums (
	order_id bigint(12) NOT NULL,
	album_id int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Table structure for table songs
DROP TABLE IF EXISTS songs;
CREATE TABLE IF NOT EXISTS songs (
	song_id bigint(12) NOT NULL AUTO_INCREMENT,
	song_name varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	song_duration varchar(5) COLLATE utf8_unicode_ci NOT NULL,
	song_path varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY (song_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

-- Table structure for table songs_to_albums
DROP TABLE IF EXISTS songs_to_albums;
CREATE TABLE IF NOT EXISTS songs_to_albums (
	song_id bigint(12) NOT NULL,
	album_id int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Table structure for table users
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	user_id int(9) NOT NULL AUTO_INCREMENT,
	user_email varchar(100) COLLATE utf8_unicode_ci NOT NULL,
	user_password varchar(32) COLLATE utf8_unicode_ci NOT NULL,
	user_firstname varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
	user_lastname varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
	PRIMARY KEY (user_id),
	UNIQUE KEY user_email (user_email),
	KEY user_email_2 (user_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;