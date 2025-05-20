import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { CategoryProduct } from '../types';

interface ProductCardProps {
  product: CategoryProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent event bubbling
    e.stopPropagation();
    
    try {
      await addItem(product);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await addItem(product);
      navigate('/checkout');
    } catch (error) {
      console.error('Error processing purchase:', error);
    }
  };

  return (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-700/50 hover:border-blue-500/50">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        
        {/* Quick actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={handleAddToCart}
              className="bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-blue-600 text-white transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button 
              type="button"
              className="bg-white/10 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-blue-600 text-white transition-colors"
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Category tag */}
        <div className="absolute top-2 left-2">
          <span className="bg-gray-900/80 backdrop-blur-sm text-gray-300 text-xs font-medium px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-white font-medium text-lg mb-1">{product.name}</h3>
        <p className="text-gray-300 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-blue-400 font-bold">${product.price.toFixed(2)}</p>
          <button
            type="button"
            onClick={handleBuyNow}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-1.5 rounded-lg transition-colors duration-200 font-medium text-sm"
            aria-label={`Shop ${product.name}`}
          >
            SHOP THIS
          </button>
        </div>
        {product.colors && (
          <div className="mt-2 flex gap-1">
            {product.colors.map((color, index) => (
              <span key={index} className="text-xs text-gray-400">{color}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;