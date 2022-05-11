CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL,
    create_date DATE NOT NULL,
    last_login_date DATE);