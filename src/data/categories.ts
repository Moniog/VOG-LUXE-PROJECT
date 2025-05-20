import { Category } from '../types';

export const categories: Category[] = [
  {
    id: 1,
    name: "Women's Fashion",
    image: 'https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg',
    itemCount: 450,
    subcategories: [
      {
        name: 'Casual Wear',
        sections: [
          {
            name: 'Dresses',
            items: [
              { name: 'Midi Dresses', priceRange: '$129-299' },
              { name: 'Maxi Dresses', priceRange: '$149-349' },
              { name: 'Mini Dresses', priceRange: '$99-249' },
              { name: 'Casual Dresses', priceRange: '$89-199' }
            ]
          },
          {
            name: 'Tops',
            items: [
              { name: 'Blouses', priceRange: '$79-179' },
              { name: 'T-Shirts', priceRange: '$39-89' },
              { name: 'Sweaters', priceRange: '$89-249' },
              { name: 'Tank Tops', priceRange: '$29-69' }
            ]
          },
          {
            name: 'Bottoms',
            items: [
              { name: 'Pants', priceRange: '$89-199' },
              { name: 'Skirts', priceRange: '$79-179' },
              { name: 'Shorts', priceRange: '$59-129' },
              { name: 'Jeans', priceRange: '$99-249' }
            ]
          }
        ]
      },
      {
        name: 'Formal Wear',
        sections: [
          {
            name: 'Suits',
            items: [
              { name: 'Blazers', priceRange: '$199-499' },
              { name: 'Suit Sets', priceRange: '$299-799' },
              { name: 'Formal Pants', priceRange: '$149-349' }
            ]
          },
          {
            name: 'Evening Wear',
            items: [
              { name: 'Evening Gowns', priceRange: '$299-999' },
              { name: 'Cocktail Dresses', priceRange: '$199-599' },
              { name: 'Formal Jumpsuits', priceRange: '$179-449' }
            ]
          }
        ]
      },
      {
        name: 'Activewear & Loungewear',
        sections: [
          {
            name: 'Activewear',
            items: [
              { name: 'Leggings', priceRange: '$49-129' },
              { name: 'Sports Bras', priceRange: '$39-89' },
              { name: 'Athletic Tops', priceRange: '$45-99' }
            ]
          },
          {
            name: 'Loungewear',
            items: [
              { name: 'Lounge Sets', priceRange: '$79-199' },
              { name: 'Pajamas', priceRange: '$69-159' },
              { name: 'Robes', priceRange: '$59-149' }
            ]
          }
        ]
      },
      {
        name: 'Accessories',
        sections: [
          {
            name: 'Fashion Accessories',
            items: [
              { name: 'Scarves', priceRange: '$39-129' },
              { name: 'Belts', priceRange: '$49-149' },
              { name: 'Hair Accessories', priceRange: '$19-79' }
            ]
          }
        ]
      },
      {
        name: 'Lingerie & Sleepwear',
        sections: [
          {
            name: 'Lingerie',
            items: [
              { name: 'Bras', priceRange: '$49-129' },
              { name: 'Panties', priceRange: '$19-59' },
              { name: 'Shapewear', priceRange: '$39-99' }
            ]
          },
          {
            name: 'Sleepwear',
            items: [
              { name: 'Nightgowns', priceRange: '$59-149' },
              { name: 'Sleep Sets', priceRange: '$69-169' },
              { name: 'Slips', priceRange: '$49-119' }
            ]
          }
        ]
      }
    ],
    products: [
      {
        id: 101,
        name: 'Silk Blend Midi Dress',
        description: 'Elegant midi dress crafted from silk blend fabric, perfect for special occasions',
        price: 189.99,
        image: 'https://images.pexels.com/photos/6765164/pexels-photo-6765164.jpeg',
        category: "Women's Fashion",
        brand: 'Minimal Luxe',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Ivory']
      },
      {
        id: 102,
        name: 'High-Waisted Tailored Pants',
        description: 'Contemporary high-waisted pants with a tailored fit and premium fabric',
        price: 129.99,
        image: 'https://images.pexels.com/photos/6765089/pexels-photo-6765089.jpeg',
        category: "Women's Fashion",
        brand: 'Modern Edit',
        sizes: ['2', '4', '6', '8', '10', '12'],
        colors: ['Black', 'Camel', 'Gray']
      }
    ]
  },
  {
    id: 2,
    name: "Men's Fashion",
    image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
    itemCount: 380,
    subcategories: [
      {
        name: 'Casual Wear',
        sections: [
          {
            name: 'Tops',
            items: [
              { name: 'T-Shirts', priceRange: '$39-89' },
              { name: 'Shirts', priceRange: '$89-199' },
              { name: 'Polos', priceRange: '$59-129' },
              { name: 'Sweaters', priceRange: '$99-249' }
            ]
          },
          {
            name: 'Bottoms',
            items: [
              { name: 'Jeans', priceRange: '$99-249' },
              { name: 'Chinos', priceRange: '$89-199' },
              { name: 'Shorts', priceRange: '$59-129' }
            ]
          }
        ]
      },
      {
        name: 'Formal Wear',
        sections: [
          {
            name: 'Suits',
            items: [
              { name: 'Full Suits', priceRange: '$499-999' },
              { name: 'Blazers', priceRange: '$299-599' },
              { name: 'Dress Shirts', priceRange: '$89-199' }
            ]
          }
        ]
      },
      {
        name: 'Activewear & Loungewear',
        sections: [
          {
            name: 'Activewear',
            items: [
              { name: 'Athletic Shirts', priceRange: '$45-99' },
              { name: 'Athletic Shorts', priceRange: '$49-99' },
              { name: 'Track Pants', priceRange: '$69-149' }
            ]
          },
          {
            name: 'Loungewear',
            items: [
              { name: 'Lounge Sets', priceRange: '$79-199' },
              { name: 'Sweatpants', priceRange: '$59-129' },
              { name: 'Hoodies', priceRange: '$69-159' }
            ]
          }
        ]
      }
    ],
    products: [
      {
        id: 201,
        name: 'Italian Cotton Shirt',
        description: 'Premium cotton shirt with a modern fit and subtle texture',
        price: 119.99,
        image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
        category: "Men's Fashion",
        brand: 'Modern Edit',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Light Blue', 'Navy']
      }
    ]
  },
  {
    id: 3,
    name: "Children's Wear",
    image: 'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg',
    itemCount: 280,
    subcategories: [
      {
        name: 'Girls (0-12)',
        sections: [
          {
            name: 'Clothing',
            items: [
              { name: 'Dresses', priceRange: '$39-99' },
              { name: 'Tops', priceRange: '$25-59' },
              { name: 'Bottoms', priceRange: '$29-69' },
              { name: 'Sets', priceRange: '$49-119' }
            ]
          }
        ]
      },
      {
        name: 'Boys (0-12)',
        sections: [
          {
            name: 'Clothing',
            items: [
              { name: 'Shirts', priceRange: '$25-59' },
              { name: 'Pants', priceRange: '$29-69' },
              { name: 'Sets', priceRange: '$49-119' }
            ]
          }
        ]
      },
      {
        name: 'Baby (0-24m)',
        sections: [
          {
            name: 'Clothing',
            items: [
              { name: 'Bodysuits', priceRange: '$19-49' },
              { name: 'Sets', priceRange: '$39-89' },
              { name: 'Sleepwear', priceRange: '$25-59' }
            ]
          }
        ]
      }
    ],
    products: [
      {
        id: 301,
        name: 'Girls Cotton Dress',
        description: 'Sweet cotton dress with floral print and peter pan collar',
        price: 49.99,
        image: 'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg',
        category: "Children's Wear",
        brand: 'Mini Minimal',
        sizes: ['2Y', '3Y', '4Y', '5Y', '6Y'],
        colors: ['Pink', 'Blue', 'Yellow']
      }
    ]
  },
  {
    id: 4,
    name: 'Footwear',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    itemCount: 220,
    subcategories: [
      {
        name: "Women's Shoes",
        sections: [
          {
            name: 'Shoes',
            items: [
              { name: 'Heels', priceRange: '$99-299' },
              { name: 'Flats', priceRange: '$79-199' },
              { name: 'Sneakers', priceRange: '$89-249' },
              { name: 'Boots', priceRange: '$149-399' }
            ]
          }
        ]
      },
      {
        name: "Men's Shoes",
        sections: [
          {
            name: 'Shoes',
            items: [
              { name: 'Formal Shoes', priceRange: '$129-349' },
              { name: 'Casual Shoes', priceRange: '$89-249' },
              { name: 'Sneakers', priceRange: '$99-299' }
            ]
          }
        ]
      },
      {
        name: "Children's Shoes",
        sections: [
          {
            name: 'Shoes',
            items: [
              { name: 'Sneakers', priceRange: '$49-99' },
              { name: 'School Shoes', priceRange: '$59-119' },
              { name: 'Casual Shoes', priceRange: '$45-89' }
            ]
          }
        ]
      }
    ],
    products: [
      {
        id: 401,
        name: 'Leather Ballet Flats',
        description: 'Classic leather ballet flats with cushioned insole',
        price: 89.99,
        image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
        category: 'Footwear',
        brand: 'Minimal Luxe',
        sizes: ['36', '37', '38', '39', '40', '41'],
        colors: ['Black', 'Nude', 'Red']
      }
    ]
  },
  {
    id: 5,
    name: 'Bags & Accessories',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
    itemCount: 180,
    subcategories: [
      {
        name: 'Handbags',
        sections: [
          {
            name: 'Bags',
            items: [
              { name: 'Totes', priceRange: '$199-599' },
              { name: 'Crossbody Bags', priceRange: '$149-449' },
              { name: 'Clutches', priceRange: '$99-299' }
            ]
          }
        ]
      },
      {
        name: 'Travel',
        sections: [
          {
            name: 'Luggage',
            items: [
              { name: 'Suitcases', priceRange: '$299-799' },
              { name: 'Weekend Bags', priceRange: '$199-499' },
              { name: 'Travel Accessories', priceRange: '$49-149' }
            ]
          }
        ]
      }
    ],
    products: [
      {
        id: 501,
        name: 'Leather Tote Bag',
        description: 'Spacious leather tote with laptop compartment',
        price: 249.99,
        image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
        category: 'Bags & Accessories',
        brand: 'Minimal Luxe',
        colors: ['Black', 'Tan', 'Navy']
      }
    ]
  },
  {
    id: 6,
    name: 'Jewelry & Watches',
    image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
    itemCount: 150,
    subcategories: [
      {
        name: 'Fine Jewelry',
        sections: [
          {
            name: 'Jewelry',
            items: [
              { name: 'Necklaces', priceRange: '$299-2999' },
              { name: 'Rings', priceRange: '$199-1999' },
              { name: 'Earrings', priceRange: '$149-1499' }
            ]
          }
        ]
      },
      {
        name: 'Watches',
        sections: [
          {
            name: 'Timepieces',
            items: [
              { name: 'Luxury Watches', priceRange: '$999-4999' },
              { name: 'Fashion Watches', priceRange: '$199-799' },
              { name: 'Smart Watches', priceRange: '$299-999' }
            ]
          }
        ]
      }
    ],
    products: [
      {
        id: 601,
        name: 'Minimalist Watch',
        description: 'Clean-lined watch with Swiss movement',
        price: 299.99,
        image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg',
        category: 'Jewelry & Watches',
        brand: 'Minimal Time',
        colors: ['Silver', 'Gold', 'Rose Gold']
      }
    ]
  },
  {
    id: 7,
    name: 'Beauty & Fragrance',
    image: 'https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg',
    itemCount: 120,
    subcategories: [
      {
        name: 'Makeup',
        sections: [
          {
            name: 'Face',
            items: [
              { name: 'Foundation', priceRange: '$39-89' },
              { name: 'Concealer', priceRange: '$29-59' },
              { name: 'Blush', priceRange: '$25-49' }
            ]
          },
          {
            name: 'Eyes',
            items: [
              { name: 'Eyeshadow', priceRange: '$35-79' },
              { name: 'Mascara', priceRange: '$25-45' },
              { name: 'Eyeliner', priceRange: '$22-39' }
            ]
          }
        ]
      },
      {
        name: 'Fragrance',
        sections: [
          {
            name: 'Perfumes',
            items: [
              { name: 'Women\'s Perfume', priceRange: '$89-299' },
              { name: 'Men\'s Cologne', priceRange: '$79-249' },
              { name: 'Gift Sets', priceRange: '$99-399' }
            ]
          }
        ]
      }
    ],
    products: [
      {
        id: 701,
        name: 'Signature Perfume',
        description: 'Elegant fragrance with notes of jasmine and vanilla',
        price: 129.99,
        image: 'https://images.pexels.com/photos/2659939/pexels-photo-2659939.jpeg',
        category: 'Beauty & Fragrance',
        brand: 'Minimal Scents',
        sizes: ['50ml', '100ml']
      }
    ]
  }
];