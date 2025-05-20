/*
  # Add Email Column to Users Table

  1. Changes
    - Add nullable email column first
    - Update existing users with email from auth.users
    - Add NOT NULL constraint after data is populated
    - Add unique constraint and index
*/

-- First add email column as nullable
ALTER TABLE users ADD COLUMN IF NOT EXISTS email text;

-- Update existing users with email from auth.users
UPDATE users
SET email = au.email
FROM auth.users au
WHERE users.id = au.id;

-- Now make it NOT NULL after data is populated
ALTER TABLE users 
ALTER COLUMN email SET NOT NULL;

-- Add unique constraint
ALTER TABLE users 
ADD CONSTRAINT users_email_key UNIQUE (email);

-- Add index for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email 
ON users (email);