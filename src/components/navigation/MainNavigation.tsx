import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SubCategory {
  name: string;
  path: string;
  filters?: {
    colors?: string[];
    sizes?: string[];
    brands?: string[];
  };
}

interface Category {
  name: string;
  path: string;
  subcategories: SubCategory[];
}

const categories: Category[] = [
  {
    name: "Women's Collection",
    path: '/women',
    subcategories: [
      { name: 'Clothing', path: '/women/clothing' },
      { name: 'Shoes', path: '/women/shoes' },
      { name: 'Bags', path: '/women/bags' },
      { name: 'Jewelry', path: '/women/jewelry' },
      { name: 'Beauty', path: '/women/beauty' }
    ]
  },
  {
    name: "Men's Collection",
    path: '/men',
    subcategories: [
      { name: 'Clothing', path: '/men/clothing' },
      { name: 'Shoes', path: '/men/shoes' },
      { name: 'Bags', path: '/men/bags' },
      { name: 'Grooming', path: '/men/grooming' },
      { name: 'Accessories', path: '/men/accessories' }
    ]
  },
  {
    name: 'Accessories',
    path: '/accessories',
    subcategories: [
      { name: 'Watches', path: '/accessories/watches' },
      { name: 'Sunglasses', path: '/accessories/sunglasses' },
      { name: 'Belts', path: '/accessories/belts' },
      { name: 'Wallets', path: '/accessories/wallets' },
      { name: 'Scarves', path: '/accessories/scarves' },
      { name: 'Hats', path: '/accessories/hats' }
    ]
  }
];

const MainNavigation: React.FC = () => {
  const location = useLocation();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center space-x-8">
        {categories.map((category) => (
          <li
            key={category.path}
            className="relative group"
            onMouseEnter={() => setHoveredCategory(category.path)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Link
              to={category.path}
              className={`flex items-center py-2 text-sm font-medium transition-colors ${location.pathname.startsWith(category.path) ? 'text-white' : 'text-gray-300 hover:text-white'}`}
            >
              {category.name}
              <ChevronDown className="w-4 h-4 ml-1" />
            </Link>

            {/* Mega Menu */}
            {hoveredCategory === category.path && (
              <div className="absolute top-full left-0 w-64 bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-xl mt-2 p-4">
                <ul className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.path}>
                      <Link
                        to={subcategory.path}
                        className="flex items-center justify-between py-2 px-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                      >
                        {subcategory.name}
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;