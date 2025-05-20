/*
  # Fix Blog System Queries

  1. Changes
    - Add full_name column to users table
    - Update blog posts queries
    - Fix category relationships
    - Add proper indexes

  2. Security
    - Update RLS policies for better access control
*/

-- Add full_name column to users if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE users ADD COLUMN full_name text;
  END IF;
END $$;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);

-- Update blog_posts policies
DROP POLICY IF EXISTS "Anyone can read published blog posts" ON blog_posts;
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (status = 'published' OR auth.uid() = author_id);

-- Add policies for managing post categories and tags
DROP POLICY IF EXISTS "Authors can manage post categories" ON blog_post_categories;
CREATE POLICY "Authors can manage post categories"
  ON blog_post_categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_post_categories.post_id
      AND blog_posts.author_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Authors can manage post tags" ON blog_post_tags;
CREATE POLICY "Authors can manage post tags"
  ON blog_post_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_post_tags.post_id
      AND blog_posts.author_id = auth.uid()
    )
  );