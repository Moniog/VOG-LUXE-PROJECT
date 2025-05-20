/*
  # Fix Orders RLS Policy

  1. Changes
    - Add policy for order creation if it doesn't exist
    - Allow users to create their own orders
    - Maintain data integrity with user_id check
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;

-- Add policy to allow users to create their own orders
CREATE POLICY "Users can create their own orders"
ON orders
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
);