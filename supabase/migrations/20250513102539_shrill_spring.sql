/*
  # Blog System Schema

  1. New Tables
    - blog_posts: Main table for blog content
    - blog_categories: Categories for organizing posts
    - blog_tags: Tags for additional post classification
    - blog_post_categories: Junction table for post-category relationships
    - blog_post_tags: Junction table for post-tag relationships

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users to read content
    - Policies for authors to manage their posts

  3. Features
    - Automatic updated_at timestamp updates
    - Cascading deletes for related records
    - Status management for posts (draft/published/archived)
*/

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  author_id uuid NOT NULL REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT blog_posts_status_check CHECK (status IN ('draft', 'published', 'archived'))
);

-- Blog Categories Table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Blog Tags Table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Blog Post Categories Junction Table
CREATE TABLE IF NOT EXISTS blog_post_categories (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id uuid REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Blog Post Tags Junction Table
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can read published blog posts" ON blog_posts;
  DROP POLICY IF EXISTS "Authors can create blog posts" ON blog_posts;
  DROP POLICY IF EXISTS "Authors can update their own blog posts" ON blog_posts;
  DROP POLICY IF EXISTS "Anyone can read blog categories" ON blog_categories;
  DROP POLICY IF EXISTS "Anyone can read blog tags" ON blog_tags;
  DROP POLICY IF EXISTS "Anyone can read blog post categories" ON blog_post_categories;
  DROP POLICY IF EXISTS "Anyone can read blog post tags" ON blog_post_tags;
END $$;

-- Policies for blog_posts
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING ((status = 'published') OR (auth.uid() = author_id));

CREATE POLICY "Authors can create blog posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own blog posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id);

-- Policies for blog_categories
CREATE POLICY "Anyone can read blog categories"
  ON blog_categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for blog_tags
CREATE POLICY "Anyone can read blog tags"
  ON blog_tags
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for blog_post_categories
CREATE POLICY "Anyone can read blog post categories"
  ON blog_post_categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for blog_post_tags
CREATE POLICY "Anyone can read blog post tags"
  ON blog_post_tags
  FOR SELECT
  TO authenticated
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger for blog_posts
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();