/*
  # Email System Schema

  1. New Tables
    - email_subscribers: Stores subscriber information and preferences
    - email_suppression: Maintains list of suppressed email addresses
    - email_metrics: Tracks email sending and engagement metrics

  2. Security
    - Enable RLS on all tables
    - Restrict access to authenticated users
    - Admin-only write access
*/

-- Create email_subscribers table
CREATE TABLE IF NOT EXISTS public.email_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  preferences jsonb NOT NULL DEFAULT '{"marketing": true, "newsletter": true, "productUpdates": true}',
  status text NOT NULL DEFAULT 'pending',
  confirmation_token uuid,
  last_email_sent timestamptz,
  bounce_count integer NOT NULL DEFAULT 0,
  complaint_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'confirmed', 'unsubscribed'))
);

-- Create email_suppression table
CREATE TABLE IF NOT EXISTS public.email_suppression (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  reason text,
  created_at timestamptz DEFAULT now()
);

-- Create email_metrics table
CREATE TABLE IF NOT EXISTS public.email_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sent integer NOT NULL DEFAULT 0,
  delivered integer NOT NULL DEFAULT 0,
  opened integer NOT NULL DEFAULT 0,
  clicked integer NOT NULL DEFAULT 0,
  bounced integer NOT NULL DEFAULT 0,
  complained integer NOT NULL DEFAULT 0,
  timestamp timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON public.email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_status ON public.email_subscribers(status);
CREATE INDEX IF NOT EXISTS idx_email_suppression_email ON public.email_suppression(email);
CREATE INDEX IF NOT EXISTS idx_email_metrics_timestamp ON public.email_metrics(timestamp);

-- Enable RLS
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_suppression ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to email_subscribers"
  ON public.email_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin write access to email_subscribers"
  ON public.email_subscribers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Allow public read access to email_suppression"
  ON public.email_suppression
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin write access to email_suppression"
  ON public.email_suppression
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Allow public read access to email_metrics"
  ON public.email_metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin write access to email_metrics"
  ON public.email_metrics
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_email_subscribers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_email_subscribers_updated_at
  BEFORE UPDATE ON public.email_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_email_subscribers_updated_at();