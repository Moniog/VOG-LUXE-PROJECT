import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/layout/Container';
import ProductCard from '../components/ProductCard';
import LoadingScreen from '../components/LoadingScreen';
import { categories } from '../data/categories';
import { CategoryProduct } from '../types';
import { Clock, Filter, SortDesc, AlertCircle } from 'lucide-react';

interface SaleProduct extends CategoryProduct {
  salePrice: number;
  discountPercentage: number;
}

const SalesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<SaleProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<SaleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get sort and filter params from URL
  const sortBy = searchParams.get('sort') || 'discount-desc';
  const filterBy = searchParams.get('category') || 'all';
  const priceRange = searchParams.get('price') || 'all';

  // Sale end date (2 weeks from now)
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 14);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Update countdown every second
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = saleEndDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [saleEndDate]);

  useEffect(() => {
    // Simulate API call to get sale products
    const fetchSaleProducts = async () => {
      setLoading(true);
      try {
        // Get all products from categories
        const allProducts = categories.reduce((acc, category) => {
          return [...acc, ...category.products];
        }, [] as CategoryProduct[]);

        // Add sale prices (20-50% off)
        const saleProducts: SaleProduct[] = allProducts.map(product => {
          const discountPercentage = Math.floor(Math.random() * 31) + 20; // 20-50%
          const salePrice = product.price * (1 - discountPercentage / 100);
          return {
            ...product,
            salePrice: Number(salePrice.toFixed(2)),
            discountPercentage
          };
        });

        setProducts(saleProducts);
      } catch (error) {
        console.error('Error fetching sale products:', error);
        setError('Failed to load sale products');
      } finally {
        setLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filterBy.toLowerCase()
      );
    }

    // Apply price range filter
    switch (priceRange) {
      case 'under-50':
        filtered = filtered.filter(product => product.salePrice < 50);
        break;
      case '50-100':
        filtered = filtered.filter(product => 
          product.salePrice >= 50 && product.salePrice <= 100
        );
        break;
      case '100-200':
        filtered = filtered.filter(product => 
          product.salePrice >= 100 && product.salePrice <= 200
        );
        break;
      case 'over-200':
        filtered = filtered.filter(product => product.salePrice > 200);
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case 'discount-desc':
        filtered.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, sortBy, filterBy, priceRange]);

  const handleSortChange = (value: string) => {
    setSearchParams(prev => {
      prev.set('sort', value);
      return prev;
    });
  };

  const handleCategoryChange = (value: string) => {
    setSearchParams(prev => {
      prev.set('category', value);
      return prev;
    });
  };

  const handlePriceRangeChange = (value: string) => {
    setSearchParams(prev => {
      prev.set('price', value);
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
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Summer Sale
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Up to 50% off on selected items
            </p>
            
            {/* Countdown Timer */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-500/10 backdrop-blur-sm rounded-xl border border-blue-400/20">
              <Clock className="w-5 h-5 text-blue-400" />
              <div className="flex items-center gap-2 text-white">
                <div className="text-center">
                  <span className="text-2xl font-bold">{timeLeft.days}</span>
                  <span className="text-sm text-gray-400 block">days</span>
                </div>
                <span className="text-2xl">:</span>
                <div className="text-center">
                  <span className="text-2xl font-bold">{timeLeft.hours}</span>
                  <span className="text-sm text-gray-400 block">hours</span>
                </div>
                <span className="text-2xl">:</span>
                <div className="text-center">
                  <span className="text-2xl font-bold">{timeLeft.minutes}</span>
                  <span className="text-sm text-gray-400 block">mins</span>
                </div>
                <span className="text-2xl">:</span>
                <div className="text-center">
                  <span className="text-2xl font-bold">{timeLeft.seconds}</span>
                  <span className="text-sm text-gray-400 block">secs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => handleCategoryChange(e.target.value)}
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

            <div className="flex items-center gap-2">
              <SortDesc className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700/50 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500/50"
              >
                <option value="discount-desc">Highest Discount</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={priceRange}
                onChange={(e) => handlePriceRangeChange(e.target.value)}
                className="bg-gray-800/50 backdrop-blur-sm text-white border border-gray-700/50 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500/50"
              >
                <option value="all">All Prices</option>
                <option value="under-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-200">$100 - $200</option>
                <option value="over-200">Over $200</option>
              </select>
            </div>
          </div>

          {loading ? (
            <LoadingScreen />
          ) : error ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative group">
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{product.discountPercentage}%
                    </div>
                  </div>
                  
                  <ProductCard
                    product={{
                      ...product,
                      price: product.salePrice
                    }}
                  />
                  
                  {/* Original Price */}
                  <div className="absolute bottom-4 right-4 text-sm text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default SalesPage;