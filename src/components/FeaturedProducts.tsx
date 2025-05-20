import React from 'react';
import Container from './layout/Container';
import ProductCard from './ProductCard';

// Mock data for products
const featuredProducts = [
  {
    id: 1,
    name: 'Minimalist Watch',
    price: 299.99,
    image: 'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Accessories',
    description: 'Swiss movement watch with sapphire crystal and Italian leather strap. Perfect blend of classic design and modern functionality.'
  },
  {
    id: 2,
    name: 'Wool Blend Coat',
    price: 389.99,
    image: 'https://images.pexels.com/photos/6764040/pexels-photo-6764040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Outerwear',
    description: 'Premium wool-blend coat with a tailored fit. Features Italian fabric and sustainable production methods.'
  },
  {
    id: 3,
    name: 'Leather Tote Bag',
    price: 249.99,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Bags',
    description: 'Handcrafted leather tote with spacious interior and laptop sleeve. Made from full-grain leather that ages beautifully.'
  },
  {
    id: 4,
    name: 'Premium Sneakers',
    price: 189.99,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Footwear',
    description: 'Minimalist sneakers crafted from Italian leather. Features comfort-enhanced insoles and durable construction.'
  },
  {
    id: 5,
    name: 'Cashmere Sweater',
    price: 279.99,
    image: 'https://images.pexels.com/photos/6765171/pexels-photo-6765171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Knitwear',
    description: 'Ultra-soft cashmere sweater with a relaxed fit. Sourced from sustainable Mongolian cashmere farms.'
  },
  {
    id: 6,
    name: 'Silk Scarf',
    price: 129.99,
    image: 'https://images.pexels.com/photos/6626908/pexels-photo-6626908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Accessories',
    description: 'Luxurious silk scarf with hand-rolled edges. Features an exclusive print designed in-house.'
  },
  {
    id: 7,
    name: 'Leather Wallet',
    price: 89.99,
    image: 'https://images.pexels.com/photos/6626999/pexels-photo-6626999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Accessories',
    description: 'Slim leather wallet with RFID protection. Crafted from vegetable-tanned leather for durability.'
  },
  {
    id: 8,
    name: 'Linen Shirt',
    price: 149.99,
    image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    category: 'Clothing',
    description: 'Premium linen shirt with mother-of-pearl buttons. Perfect for warm weather with breathable fabric.'
  }
];

const FeaturedProducts: React.FC = () => {
  return (
    <section id="featured" className="relative py-16">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #60A5FA 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <div className="absolute -left-64 -top-64 w-128 h-128 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -right-64 -bottom-64 w-128 h-128 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="flex flex-col items-center mb-12 relative">
          <p className="text-blue-400 font-medium mb-2">Curated Selection</p>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-2xl">
            Discover our hand-picked selection of premium products designed for modern living.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center relative">
          <a 
            href="/shop" 
            className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300"
          >
            View All Products
            <svg 
              className="ml-2 w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;