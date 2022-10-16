CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT into blogs (author, url, title) VALUES ('Jorge','www.jorge.com','Yay what');

INSERT into blogs (author, url, title) VALUES ('Horhe','www.horhe.com','Hay hat');