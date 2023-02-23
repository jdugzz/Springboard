DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist  

CREATE TABLE regions(
    id SERIAL PRIMARY KEY,
    region_name TEXT NOT NULL
);


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    pwd TEXT NOT NULL
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    cat_name TEXT NOT NULL
);

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    post_text TEXT NOT NULL,
    location_text TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id),
    region_id INTEGER REFERENCES regions(id),
    cat_id INTEGER REFERENCES categories(id)
);
