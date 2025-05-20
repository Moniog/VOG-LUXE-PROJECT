import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/layout/Container';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/categories';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const category = categories.find(
    (c) => c.name.toLowerCase() === categoryName?.toLowerCase()
  );

  if (!category) {
    return (
      <Container>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold text-white">Category not found</h1>
        </div>
      </Container>
    );
  }

  return (
    <div className="relative min-h-screen py-12">
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
        <div className="mb-12 relative">
          <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
          <p className="text-lg text-gray-300">
            Explore our collection of {category.name.toLowerCase()} products, featuring premium quality items
            designed for modern living.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;