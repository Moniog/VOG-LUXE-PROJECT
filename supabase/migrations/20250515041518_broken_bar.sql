/*
  # Fix orders table RLS policies

  1. Changes
    - Drop existing RLS policies for orders table
    - Create comprehensive RLS policies for orders table:
      - Allow users to create their own orders
      - Allow users to view their own orders
      - Allow admins to view all orders
  
  2. Security
    - Ensures users can only create orders with their own user_id
    - Maintains existing view permissions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;

-- Create new policies
CREATE POLICY "Users can create their own orders"
ON orders
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
);

CREATE POLICY "Users can view their own orders"
ON orders
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id OR
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can update orders"
ON orders
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);