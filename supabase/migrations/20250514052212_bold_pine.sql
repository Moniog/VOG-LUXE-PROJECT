-- Update the featured image URL for the minimalist wardrobe blog post
UPDATE blog_posts
SET featured_image = 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg'
WHERE id = '34c91532-2a4d-4e1e-f427-6f9e23294bb4';

-- Update the author's avatar
UPDATE public.users
SET avatar = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
WHERE id = '34d81932-1a4d-4e1e-9427-1f9e23294bb4';