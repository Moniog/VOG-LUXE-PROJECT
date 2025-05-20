/*
  # Fix Orders RLS Policies

  1. Changes
    - Drop and recreate RLS policies for orders table to ensure proper access control
    - Ensure authenticated users can create their own orders
    - Ensure users can only view their own orders (except admins who can view all)
    - Ensure only admins can update orders

  2. Security
    - Maintain RLS enabled on orders table
    - Enforce user_id check for order creation
    - Restrict order viewing to owner and admins
    - Restrict order updates to admins only
*/

-- First enable RLS if not already enabled
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;

-- Create insert policy
CREATE POLICY "Users can create their own orders"
ON orders
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
);

-- Create select policy
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

-- Create update policy
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