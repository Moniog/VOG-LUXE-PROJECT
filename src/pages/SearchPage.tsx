import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { categories } from '../data/categories';

interface SearchResult {
  id: number;
  type: 'product' | 'category' | 'blog';
  title: string;
  description?: string;
  image?: string;
  url: string;
}

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchProducts = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Search through all products in categories
      const productResults = categories.flatMap(category =>
        category.products.filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        ).map(product => ({
          id: product.id,
          type: 'product' as const,
          title: product.name,
          description: product.description,
          image: product.image,
          url: `/product/${product.id}`
        }))
      );

      // Search through categories
      const categoryResults = categories
        .filter(category =>
          category.name.toLowerCase().includes(query.toLowerCase())
        )
        .map(category => ({
          id: category.id,
          type: 'category' as const,
          title: category.name,
          image: category.image,
          url: `/category/${category.name.toLowerCase()}`
        }));

      setResults([...productResults, ...categoryResults]);
      setLoading(false);
    };

    searchProducts();
  }, [query]);

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
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setSearchParams({ q: e.target.value })}
                placeholder="Search products, categories, and more..."
                className="w-full px-12 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl focus:outline-none focus:border-blue-500/50 text-white placeholder-gray-400"
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  to={result.url}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  {result.image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
                        {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{result.title}</h3>
                    {result.description && (
                      <p className="text-gray-300 line-clamp-2">{result.description}</p>
                    )}
                    {result.type === 'product' && (
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        SHOP THIS
                      </button>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg">No results found for "{query}"</p>
              <p className="text-gray-400 mt-2">Try adjusting your search terms or browse our categories</p>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default SearchPage;