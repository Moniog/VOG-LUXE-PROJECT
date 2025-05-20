/*
  # Add user registration policy

  1. Security Changes
    - Add RLS policy to allow users to insert their own records during registration
    - Policy ensures users can only insert rows where their auth.uid matches the user.id
*/

CREATE POLICY "Users can insert their own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);