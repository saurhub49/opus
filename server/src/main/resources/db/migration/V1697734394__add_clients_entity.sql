CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    create_date DATE,
    status TINYINT(1), -- 1 for true (active), 0 for false (inactive)
    website VARCHAR(255),
    picture_url VARCHAR(255)
);