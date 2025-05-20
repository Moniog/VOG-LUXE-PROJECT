/*
  # Create Orders Table

  1. New Tables
    - orders: Stores order information and status
      - id (uuid, primary key)
      - user_id (uuid, foreign key to auth.users)
      - items (jsonb)
      - subtotal (numeric)
      - tax (numeric)
      - total (numeric)
      - shipping_address (jsonb)
      - billing_address (jsonb)
      - payment_details (jsonb)
      - status (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS
    - Users can only view their own orders
    - Admin users can view all orders
*/

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    items jsonb NOT NULL,
    subtotal numeric(10,2) NOT NULL,
    tax numeric(10,2) NOT NULL,
    total numeric(10,2) NOT NULL,
    shipping_address jsonb NOT NULL,
    billing_address jsonb,
    payment_details jsonb NOT NULL,
    status text NOT NULL DEFAULT 'processing',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT valid_status CHECK (status IN ('processing', 'confirmed', 'shipped', 'delivered', 'cancelled'))
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own orders"
    ON public.orders
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

CREATE POLICY "Users can create their own orders"
    ON public.orders
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION update_orders_updated_at();