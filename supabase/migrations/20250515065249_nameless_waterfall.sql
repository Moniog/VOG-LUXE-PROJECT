-- Add payment_provider and payment_reference columns to orders table
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS payment_provider text,
ADD COLUMN IF NOT EXISTS payment_reference text;

-- Create index for payment reference lookups
CREATE INDEX IF NOT EXISTS idx_orders_payment_reference ON orders(payment_reference);

-- Update RLS policies
DROP POLICY IF EXISTS "Allow public insert" ON orders;
CREATE POLICY "Allow public insert"
ON orders
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to create orders
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
CREATE POLICY "Users can create their own orders"
ON orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);