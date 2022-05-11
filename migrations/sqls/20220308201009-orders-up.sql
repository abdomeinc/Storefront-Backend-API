CREATE TABLE orders (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id),
    order_status INTEGER NOT NULL,
    create_date DATE NOT NULL);