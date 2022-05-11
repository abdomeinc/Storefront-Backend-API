CREATE TABLE products (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    create_date DATE NOT NULL);