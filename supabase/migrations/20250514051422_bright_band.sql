/*
  # Add Author Profile Data

  1. Changes
    - Add author profile data to auth.users
    - Add author profile data to public.users
    - Ensure proper avatar URLs and user information
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
  '{"full_name": "John Author", "avatar": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"}',
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
  avatar,
  role
)
SELECT 
  '34d81932-1a4d-4e1e-9427-1f9e23294bb4',
  'John Author',
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  'author'
WHERE NOT EXISTS (
  SELECT 1 FROM public.users 
  WHERE id = '34d81932-1a4d-4e1e-9427-1f9e23294bb4'
);