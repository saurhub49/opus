-- Add columns to the existing users table
ALTER TABLE users
ADD COLUMN phone_number VARCHAR(20),
ADD COLUMN address TEXT,
ADD COLUMN date_of_birth DATE,
ADD COLUMN gender VARCHAR(20) NOT NULL,
ADD COLUMN nationality VARCHAR(50),
ADD COLUMN marital_status VARCHAR(20);

-- Make the 'email' column unique
ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);

-- Set 'first_name' column as NOT NULL
ALTER TABLE users
MODIFY first_name VARCHAR(255) NOT NULL;
