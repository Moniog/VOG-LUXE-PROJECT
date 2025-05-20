/*
  # Add Jewelry Styling Guide Blog Post

  1. New Content
    - Add new blog post about jewelry styling
    - Link post to existing tags
    - Ensure proper UUID format
*/

-- Insert new blog post if author exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = '34d81932-1a4d-4e1e-9427-1f9e23294bb4'
  ) THEN
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
      '78f91532-6a4d-4e1e-f427-af9e23294bb4',
      'The Ultimate Guide to Jewelry Styling: Less is More',
      'ultimate-guide-jewelry-styling',
      '# The Ultimate Guide to Jewelry Styling: Less is More

In the world of fashion, jewelry has the power to transform an outfit from simple to sophisticated. This comprehensive guide will teach you how to curate and style jewelry with a minimalist approach, creating maximum impact with carefully chosen pieces.

## The Philosophy of Minimalist Jewelry

Minimalist jewelry styling is about making intentional choices that enhance rather than overwhelm. It''s the art of selecting pieces that speak volumes through their simplicity and craftsmanship.

### Core Principles

- **Quality Over Quantity**: Invest in fewer, better pieces
- **Thoughtful Selection**: Every piece serves a purpose
- **Versatility**: Pieces that work across multiple occasions
- **Timeless Appeal**: Designs that transcend trends

## Essential Jewelry Pieces

### 1. Everyday Basics
- Delicate chain necklace
- Simple stud earrings
- Classic watch
- Minimal ring band
- Dainty bracelet

### 2. Statement Pieces
- Architectural pendant
- Sculptural earrings
- Statement ring
- Unique cuff bracelet
- Layer-ready necklace

## Styling Principles

### 1. The Rule of Three
- Choose a focal point
- Limit to three key pieces
- Balance proportions
- Consider negative space

### 2. Metal Mixing
- Start with two metals
- Use connecting pieces
- Consider your undertones
- Maintain proportion

### 3. Layering Techniques
- Start with shortest layer
- Space pieces evenly
- Mix textures thoughtfully
- Keep movement in mind

## Occasion-Based Styling

### 1. Professional Settings
- Subtle studs
- Delicate necklace
- Classic watch
- Simple ring
- Clean lines

### 2. Casual Outings
- Layered necklaces
- Mix-and-match earrings
- Stacked rings
- Casual bracelet
- Playful combinations

### 3. Special Events
- Statement earrings
- Elegant necklace
- Cocktail ring
- Coordinated set
- Elevated basics

## Care and Maintenance

### 1. Storage
- Use individual compartments
- Prevent tangling
- Control humidity
- Protect from light
- Regular cleaning

### 2. Cleaning
- Gentle cleansers
- Soft cloths
- Professional service
- Preventive care
- Regular inspection

## Building Your Collection

### 1. Investment Strategy
- Start with basics
- Add gradually
- Consider versatility
- Focus on quality
- Plan purchases

### 2. Material Selection
- Solid gold options
- Sterling silver pieces
- Platinum investment
- Vermeil alternatives
- Quality testing

## Styling Tips by Face Shape

### 1. Oval Face
- Any earring length
- Balanced proportions
- Various necklace lengths
- Versatile options
- Harmonious shapes

### 2. Round Face
- Elongating pieces
- Angular designs
- Longer necklaces
- Drop earrings
- Vertical elements

### 3. Square Face
- Soft curves
- Round shapes
- Flowing designs
- Delicate pieces
- Length variety

## Seasonal Adjustments

### 1. Summer
- Lighter pieces
- Bright metals
- Natural elements
- Casual styling
- Beach-friendly options

### 2. Winter
- Layered looks
- Substantial pieces
- Rich textures
- Formal styling
- Evening wear

## Common Mistakes to Avoid

1. **Overcrowding**
   - Too many pieces
   - Competing elements
   - Overwhelming effect
   - Lost impact
   - Busy appearance

2. **Poor Proportion**
   - Unbalanced sizing
   - Wrong scale
   - Awkward lengths
   - Mismatched elements
   - Distracting combinations

## Sustainability in Jewelry

### 1. Ethical Sourcing
- Responsible mining
- Recycled metals
- Conflict-free stones
- Transparent sourcing
- Sustainable practices

### 2. Investment Pieces
- Timeless design
- Quality materials
- Skilled craftsmanship
- Lasting value
- Versatile styling

## Conclusion

Remember that minimalist jewelry styling is about creating impact through thoughtful selection and placement. Focus on quality pieces that reflect your personal style while maintaining versatility and timeless appeal. With these guidelines, you''ll be able to create sophisticated, elegant looks that stand the test of time.',
      'Master the art of minimalist jewelry styling with our comprehensive guide. Learn how to select, combine, and care for jewelry pieces that enhance your look while maintaining elegant simplicity.',
      'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg',
      '34d81932-1a4d-4e1e-9427-1f9e23294bb4',
      'published',
      '67e71832-6a0d-4e0e-a947-0f8e25094cc4',
      NOW()
    )
    ON CONFLICT (id) DO NOTHING;

    -- Link post to tags
    INSERT INTO blog_post_tags (post_id, tag_id)
    VALUES
      ('78f91532-6a4d-4e1e-f427-af9e23294bb4', '45d81932-1a4d-4e1e-9427-1f9e23294bb4'),
      ('78f91532-6a4d-4e1e-f427-af9e23294bb4', '56e91532-3a6d-4c1e-b427-2f1e83294ef4'),
      ('78f91532-6a4d-4e1e-f427-af9e23294bb4', '90a91532-7a0d-4c1e-d427-4f9e23294bb4')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;