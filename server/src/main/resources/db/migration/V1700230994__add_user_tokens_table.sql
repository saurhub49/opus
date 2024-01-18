CREATE TABLE user_tokens (
    id SERIAL PRIMARY KEY,
    token BINARY(16) NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(id),
    confirmed_at DATE,
    expired_at DATE
);
