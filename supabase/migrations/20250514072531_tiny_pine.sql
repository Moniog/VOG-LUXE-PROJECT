/*
  # Create Inventory Management System

  1. New Tables
    - inventory: Tracks product stock levels
      - id (uuid, primary key)
      - category_id (uuid, foreign key to categories)
      - quantity (integer)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on inventory table
    - Public read access for inventory levels
    - Admin-only update access
*/

-- Create the inventory table
CREATE TABLE IF NOT EXISTS public.inventory (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
    quantity integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_inventory_category_id
    ON public.inventory(category_id);

-- Enable RLS
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to inventory"
    ON public.inventory
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow authenticated users to update inventory"
    ON public.inventory
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

-- Create trigger for updating the updated_at timestamp
CREATE OR REPLACE FUNCTION update_inventory_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_inventory_updated_at
    BEFORE UPDATE ON public.inventory
    FOR EACH ROW
    EXECUTE FUNCTION update_inventory_updated_at();