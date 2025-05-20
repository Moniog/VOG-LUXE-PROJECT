import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import { categories } from '../data/categories';
import { useCart } from '../contexts/CartContext';
import { Heart, Share2, ChevronRight, Star, Truck, Package, RefreshCw, ImageOff } from 'lucide-react';

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  // Find the category and product
  const category = categories.find(cat => 
    cat.products.some(p => p.id === Number(productId))
  );
  const product = category?.products.find(p => p.id === Number(productId));

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.image || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!product || !category) {
      navigate('/shop');
    }
  }, [product, category, navigate]);

  if (!product || !category) {
    return null;
  }

  const handleAddToCart = async () => {
    setError(null);
    setLoading(true);

    try {
      // Convert numeric category ID to UUID format
      const categoryUUID = `00000000-0000-4000-a000-${category.id.toString().padStart(12, '0')}`;
      
      await addItem({
        ...product,
        id: String(product.id),
        categoryId: categoryUUID,
        size: selectedSize,
        color: selectedColor
      });
      navigate('/cart');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    setError(null);
    setLoading(true);

    try {
      // Convert numeric category ID to UUID format
      const categoryUUID = `00000000-0000-4000-a000-${category.id.toString().padStart(12, '0')}`;
      
      await addItem({
        ...product,
        id: String(product.id),
        categoryId: categoryUUID,
        size: selectedSize,
        color: selectedColor
      });
      navigate('/checkout');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    }
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <ImageOff className="w-12 h-12 text-gray-600" />
                  </div>
                ) : (
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-300">4.0 (24 reviews)</span>
                </div>
                <p className="text-2xl font-bold text-white">${product.price.toFixed(2)}</p>
              </div>

              <div className="space-y-6 mb-8">
                <p className="text-gray-300">{product.description}</p>

                {product.sizes && (
                  <div>
                    <h3 className="text-white font-medium mb-3">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border ${
                            selectedSize === size
                              ? 'border-blue-500 text-blue-400'
                              : 'border-gray-700 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && (
                  <div>
                    <h3 className="text-white font-medium mb-3">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg border ${
                            selectedColor === color
                              ? 'border-blue-500 text-blue-400'
                              : 'border-gray-700 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-white font-medium mb-3">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-10 h-10 rounded-lg border border-gray-700 text-gray-300 hover:border-gray-600"
                    >
                      -
                    </button>
                    <span className="text-white">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-10 h-10 rounded-lg border border-gray-700 text-gray-300 hover:border-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  disabled={loading}
                  variant="outline"
                  className="flex-1"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={loading}
                  className="flex-1"
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <button className="text-gray-300 hover:text-white transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button
                  onClick={handleShare}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Truck className="w-5 h-5 text-blue-400" />
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Package className="w-5 h-5 text-blue-400" />
                  <span>Secure packaging for safe delivery</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <RefreshCw className="w-5 h-5 text-blue-400" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;