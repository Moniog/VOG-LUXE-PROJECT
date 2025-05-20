-- Update orders table RLS policies to allow public access to order confirmation
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
  DROP POLICY IF EXISTS "Allow order confirmation access" ON orders;
  
  -- Create new policy for order viewing
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'orders' 
    AND policyname = 'Allow order confirmation access'
  ) THEN
    CREATE POLICY "Allow order confirmation access"
    ON orders
    FOR SELECT
    TO public
    USING (
      -- Allow access if the order ID is provided and matches
      id::text = COALESCE(current_setting('request.headers.x-order-id'::text, true), '')
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
  END IF;
END $$;

-- Add index for faster order lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_orders_id ON orders(id);