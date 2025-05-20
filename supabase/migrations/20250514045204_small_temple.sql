/*
  # Fix Blog Data Setup

  1. Changes
    - Create sample user in auth.users and public.users
    - Insert blog categories and tags
    - Insert sample blog posts with proper foreign key relationships

  2. Features
    - Proper error handling
    - Safe inserts with conflict handling
    - Maintains data integrity
*/

-- Create sample user in auth.users if not exists
INSERT INTO auth.users (
  id,
  email,
  raw_user_meta_data,
  created_at,
  updated_at,
  last_sign_in_at
)
SELECT 
  '34d81932-1a4d-4e1e-9427-1f9e23294bb4',
  'author@example.com',
  '{"full_name": "John Author"}',
  NOW(),
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users 
  WHERE id = '34d81932-1a4d-4e1e-9427-1f9e23294bb4'
);

-- Create sample user in public.users if not exists
INSERT INTO public.users (
  id,
  full_name,
  role
)
SELECT 
  '34d81932-1a4d-4e1e-9427-1f9e23294bb4',
  'John Author',
  'author'
WHERE NOT EXISTS (
  SELECT 1 FROM public.users 
  WHERE id = '34d81932-1a4d-4e1e-9427-1f9e23294bb4'
);

-- Insert sample categories if they don't exist
INSERT INTO blog_categories (id, name, slug, description)
VALUES
  ('67e71832-6a0d-4e0e-a947-0f8e25094cc4', 'Style Guide', 'style-guide', 'Tips and advice on modern fashion and style'),
  ('89b91532-4a8d-4c1e-b427-2f1e83294ef4', 'Sustainability', 'sustainability', 'Sustainable fashion and eco-friendly practices'),
  ('12c42632-2a3d-4f2e-8427-3f9e23294bb4', 'Trends', 'trends', 'Latest fashion trends and industry insights')
ON CONFLICT (id) DO NOTHING;

-- Insert sample tags if they don't exist
INSERT INTO blog_tags (id, name, slug)
VALUES
  ('45d81932-1a4d-4e1e-9427-1f9e23294bb4', 'Fashion', 'fashion'),
  ('56e91532-3a6d-4c1e-b427-2f1e83294ef4', 'Minimalism', 'minimalism'),
  ('78f91532-5a8d-4e1e-c427-3f9e23294bb4', 'Eco-friendly', 'eco-friendly'),
  ('90a91532-7a0d-4c1e-d427-4f9e23294bb4', 'Style Tips', 'style-tips'),
  ('12b91532-9a2d-4e1e-e427-5f9e23294bb4', 'Trends', 'trends')
ON CONFLICT (id) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (
  id,
  title,
  slug,
  content,
  excerpt,
  featured_image,
  author_id,
  status,
  category_id,
  published_at
)
VALUES
(
  '34c91532-2a4d-4e1e-f427-6f9e23294bb4',
  'The Essential Guide to Building a Minimalist Wardrobe',
  'essential-guide-minimalist-wardrobe',
  '# The Essential Guide to Building a Minimalist Wardrobe

Creating a minimalist wardrobe is more than just a trend—it''s a sustainable approach to fashion that can simplify your life while reducing environmental impact. In this comprehensive guide, we''ll explore how to build a versatile wardrobe that stands the test of time.

## Understanding Minimalist Fashion

Minimalist fashion emphasizes quality over quantity, focusing on timeless pieces that can be mixed and matched effortlessly. The goal is to create a wardrobe that reflects your personal style while maintaining functionality and versatility.

### Key Benefits of a Minimalist Wardrobe

- **Reduced Decision Fatigue**: Fewer choices mean easier daily outfit decisions
- **Better Quality Investments**: Focus on high-quality pieces that last longer
- **Environmental Impact**: Less consumption leads to reduced waste
- **Financial Savings**: Long-term savings from buying fewer, better items

## Essential Pieces for Your Minimalist Wardrobe

### 1. Classic Outerwear
- A well-fitted blazer in navy or black
- A versatile trench coat
- A quality wool coat for winter

### 2. Versatile Basics
- White button-down shirts
- Plain t-shirts in neutral colors
- Well-fitted jeans in dark wash
- Black trousers

### 3. Timeless Accessories
- Leather belt
- Classic watch
- Minimal jewelry pieces
- Quality leather bag

## Building Your Wardrobe: A Step-by-Step Approach

1. **Audit Your Current Wardrobe**
   - Remove items you haven''t worn in the past year
   - Identify gaps in your wardrobe
   - Assess what truly works for your lifestyle

2. **Define Your Style**
   - Create a mood board
   - Identify colors that work best for you
   - Consider your lifestyle needs

3. **Invest in Quality Pieces**
   - Research brands known for quality
   - Focus on natural materials
   - Consider cost per wear

## Maintaining Your Minimalist Wardrobe

- Regular maintenance and care for your clothes
- Seasonal reviews and updates
- One-in-one-out rule for new purchases

## Conclusion

Remember, building a minimalist wardrobe is a journey, not a destination. Take your time to curate pieces that truly work for you, and don''t feel pressured to achieve perfection overnight. The goal is to create a wardrobe that serves you well and brings joy to your daily life.',
  'Discover how to build and maintain a minimalist wardrobe that combines style, functionality, and sustainability. Learn essential tips for creating a versatile collection of timeless pieces.',
  'https://images.pexels.com/photos/5705424/pexels-photo-5705424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  '34d81932-1a4d-4e1e-9427-1f9e23294bb4',
  'published',
  '67e71832-6a0d-4e0e-a947-0f8e25094cc4',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Link posts to tags
INSERT INTO blog_post_tags (post_id, tag_id)
VALUES
  ('34c91532-2a4d-4e1e-f427-6f9e23294bb4', '45d81932-1a4d-4e1e-9427-1f9e23294bb4'),
  ('34c91532-2a4d-4e1e-f427-6f9e23294bb4', '56e91532-3a6d-4c1e-b427-2f1e83294ef4'),
  ('34c91532-2a4d-4e1e-f427-6f9e23294bb4', '90a91532-7a0d-4c1e-d427-4f9e23294bb4')
ON CONFLICT DO NOTHING;