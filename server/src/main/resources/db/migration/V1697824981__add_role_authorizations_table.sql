CREATE TABLE role_based_authorization_configuration (
    id SERIAL PRIMARY KEY,
    role_type_id INT NOT NULL REFERENCES role_type(id),
    entity VARCHAR(50) NOT NULL,
    permission VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL,
    role_description TEXT NOT NULL,
    role_type_id INT NOT NULL REFERENCES role_type(id),
    client_id INT NOT NULL REFERENCES clients(id),
    created_at DATE,
    created_by BIGINT
);