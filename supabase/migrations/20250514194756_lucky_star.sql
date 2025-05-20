/*
  # Update Inventory System

  1. Changes
    - Remove category_id foreign key
    - Add product_id column
    - Update indexes and constraints
    - Update RLS policies

  2. Security
    - Public read access
    - Admin-only write access
    - Non-negative quantity check
*/

-- Drop existing foreign key if it exists
ALTER TABLE inventory
DROP CONSTRAINT IF EXISTS inventory_category_id_fkey;

-- Add product_id column
ALTER TABLE inventory
ADD COLUMN IF NOT EXISTS product_id uuid;

-- Update indexes
DROP INDEX IF EXISTS idx_inventory_category_id;
CREATE INDEX IF NOT EXISTS idx_inventory_product_id ON inventory(product_id);

-- Update RLS policies
DROP POLICY IF EXISTS "Allow public read access to inventory" ON inventory;
DROP POLICY IF EXISTS "Allow authenticated users to update inventory" ON inventory;

-- Create new policies
CREATE POLICY "Allow public read access to inventory"
ON inventory
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow admin update access to inventory"
ON inventory
FOR ALL
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

-- Add check constraint for non-negative quantity
ALTER TABLE inventory
ADD CONSTRAINT check_positive_quantity CHECK (quantity >= 0);

-- Add unique constraint to prevent duplicate product entries
ALTER TABLE inventory
ADD CONSTRAINT inventory_product_id_unique UNIQUE (product_id);

-- Add comment to table
COMMENT ON TABLE inventory IS 'Tracks product inventory levels with direct product relationships';