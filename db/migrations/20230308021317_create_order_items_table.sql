-- migrate:up
CREATE TABLE order_items (
 id INT NOT NULL PRIMARY KEY,
 order_id INT NOT NULL,
 product_id INT NOT NULL,
 quantity INT NOT NULL,
 CONSTRAINT order_items_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id),
 CONSTRAINT order_items_order_id_fk FOREIGN KEY (order_id) REFERENCES orders (id)
);

-- migrate:down
DROP TABLE order_items;
