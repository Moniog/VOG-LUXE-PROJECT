/*
  # Fix Blog Schema

  1. Changes
    - Add full_name column to users table
    - Add category_id to blog_posts table
    - Add policies for blog post categories and tags

  2. Security
    - Update RLS policies
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

-- Add category_id to blog_posts if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN category_id uuid REFERENCES blog_categories(id);
  END IF;
END $$;

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