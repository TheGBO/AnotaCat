CREATE DATABASE anotacat;
SET CLIENT_ENCODING = 'UTF8';

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL
);

CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    owid INT NOT NULL,
    content TEXT NOT NULL
);