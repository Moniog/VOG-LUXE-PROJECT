-- Update orders table RLS policies to allow public access to order confirmation
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;

-- Create new policies for order viewing
CREATE POLICY "Allow order confirmation access"
ON orders
FOR SELECT
TO public
USING (
  -- Allow access if the order ID is provided and matches
  id::text = coalesce(current_setting('request.headers.x-order-id', true), '')
  -- Or if the user is authenticated and owns the order
  OR (
    auth.uid() IS NOT NULL AND (
      auth.uid() = user_id
      OR EXISTS (
        SELECT 1 FROM users
        WHERE users.id = auth.uid()
        AND users.role = 'admin'
      )
    )
  )
);

-- Add index for faster order lookups
CREATE INDEX IF NOT EXISTS idx_orders_id ON orders(id);