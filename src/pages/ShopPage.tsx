import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/layout/Container';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/categories';
import { CategoryProduct } from '../types';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<CategoryProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<CategoryProduct[]>([]);
  
  // Get sort and filter params from URL
  const sortBy = searchParams.get('sort') || 'default';
  const filterBy = searchParams.get('filter') || 'all';

  useEffect(() => {
    // Combine all products from all categories
    const allProducts = categories.reduce((acc, category) => {
      return [...acc, ...category.products];
    }, [] as CategoryProduct[]);
    
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    let sorted = [...products];

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, you would sort by date
        // For now, we'll just reverse the array to simulate newest first
        sorted.reverse();
        break;
      default:
        // Keep original order
        break;
    }

    // Apply filtering
    if (filterBy !== 'all') {
      sorted = sorted.filter(product => product.category.toLowerCase() === filterBy.toLowerCase());
    }

    setFilteredProducts(sorted);
  }, [products, sortBy, filterBy]);

  const handleSortChange = (value: string) => {
    setSearchParams(prev => {
      prev.set('sort', value);
      return prev;
    });
  };

  const handleFilterChange = (value: string) => {
    setSearchParams(prev => {
      prev.set('filter', value);
      return prev;
    });
  };

  // Get unique categories for filter dropdown
  const uniqueCategories = Array.from(
    new Set(products.map(product => product.category))
  );

  return (
    <div className="relative min-h-screen pt-32 pb-16">
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
        <div className="relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop</h1>
              <p className="text-gray-300 text-lg">
                Discover our curated collection of premium essentials
              </p>
            </div>
            
            <div className="mt-6 md:mt-0 flex flex-wrap gap-4">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700/50 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500/50"
              >
                <option value="default">Sort By</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              
              <select
                value={filterBy}
                onChange={(e) => handleFilterChange(e.target.value)}
                className="bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700/50 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500/50"
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShopPage;