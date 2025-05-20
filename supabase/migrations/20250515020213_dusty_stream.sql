/*
  # Update Inventory Management

  1. Changes
    - Add function to update inventory quantities
    - Add unique constraint for product_id
    - Add table description
*/

-- Create function to update inventory
CREATE OR REPLACE FUNCTION update_inventory(p_product_id uuid, p_quantity integer)
RETURNS void AS $$
BEGIN
  UPDATE inventory
  SET quantity = quantity - p_quantity
  WHERE product_id = p_product_id;
END;
$$ LANGUAGE plpgsql;

-- Add unique constraint to prevent duplicate product entries
ALTER TABLE inventory
ADD CONSTRAINT inventory_product_id_unique UNIQUE (product_id);

-- Add comment to table
COMMENT ON TABLE inventory IS 'Tracks product inventory levels with direct product relationships';