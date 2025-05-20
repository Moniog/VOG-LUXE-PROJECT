/*
  # Create Legal Documents System

  1. New Tables
    - legal_documents: Stores versioned legal content
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - slug (text)
      - version (text)
      - status (text)
      - meta_description (text)
      - schema_type (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS
    - Public read access for published documents
    - Admin-only write access
*/

-- Create legal_documents table
CREATE TABLE IF NOT EXISTS public.legal_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    slug text NOT NULL,
    version text NOT NULL,
    status text NOT NULL DEFAULT 'draft',
    meta_description text,
    schema_type text NOT NULL DEFAULT 'LegalDocument',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived')),
    CONSTRAINT valid_schema_type CHECK (schema_type IN ('LegalDocument', 'TermsOfService', 'PrivacyPolicy'))
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_legal_documents_slug ON legal_documents(slug);
CREATE INDEX IF NOT EXISTS idx_legal_documents_status ON legal_documents(status);
CREATE INDEX IF NOT EXISTS idx_legal_documents_version ON legal_documents(version);

-- Enable RLS
ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to published documents"
    ON legal_documents
    FOR SELECT
    TO public
    USING (status = 'published');

CREATE POLICY "Allow admin write access"
    ON legal_documents
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

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_legal_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_legal_documents_updated_at
    BEFORE UPDATE ON legal_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_legal_documents_updated_at();