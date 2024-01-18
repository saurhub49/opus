CREATE TABLE employment_details (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50),
    work_email VARCHAR(50),
    user_id BIGINT NOT NULL REFERENCES users(id),
    client_id BIGINT NOT NULL REFERENCES client(id),
    role_id BIGINT REFERENCES role(id),
    department_id BIGINT REFERENCES department(id),
    hire_date DATE,
    salary DOUBLE,
    reporting_manager_user_id BIGINT REFERENCES users(id),
    type VARCHAR(50)
);
