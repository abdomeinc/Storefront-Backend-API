CREATE TABLE order_products (
    id SERIAL PRIMARY KEY NOT NULL,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    create_date DATE NOT NULL);