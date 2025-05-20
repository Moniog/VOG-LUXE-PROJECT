import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Download, 
  Printer, 
  ShoppingBag, 
  Truck, 
  FileText,
  Share2,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Loader2,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface OrderDetails {
  id: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  shipping_address: {
    firstName: string;
    lastName: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    postal: string;
    country: string;
  };
  payment_details: {
    last4: string;
    expiry: string;
  };
  created_at: string;
  status: string;
}

const OrderConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const orderId = searchParams.get('id');
    if (!orderId) {
      setError('No order ID provided');
      setLoading(false);
      return;
    }

    const checkAuthAndFetchOrder = async () => {
      try {
        // First check if we have a valid session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw new Error('Authentication error');
        }

        if (!session) {
          // Redirect to login if no session exists
          navigate('/auth/login', { 
            state: { 
              returnTo: `/order-confirmation?id=${orderId}`,
              message: 'Please sign in to view your order'
            }
          });
          return;
        }

        // Now fetch the order with error handling
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .eq('user_id', session.user.id)
          .single();

        if (orderError) {
          console.error('Database error:', orderError);
          throw new Error('Failed to fetch order details');
        }

        if (!order) {
          throw new Error('Order not found');
        }

        // Validate order data
        if (!order.items || !Array.isArray(order.items)) {
          throw new Error('Invalid order data: missing items');
        }

        if (!order.shipping_address) {
          throw new Error('Invalid order data: missing shipping address');
        }

        if (!order.payment_details) {
          throw new Error('Invalid order data: missing payment details');
        }

        setOrder(order);
      } catch (error: any) {
        console.error('Error fetching order:', error);
        setError(error.message || 'An error occurred while fetching the order');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchOrder();
  }, [searchParams, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('Downloading order confirmation...');
  };

  const handleShare = async (platform: string) => {
    const shareText = `Just ordered some amazing items from MINIMAL! Check them out:`;
    const shareUrl = window.location.href;

    switch (platform) {
      case 'email':
        window.location.href = `mailto:?subject=My Order from MINIMAL&body=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'instagram':
        // Instagram sharing typically requires a native app integration
        alert('Instagram sharing is not available through the web browser');
        break;
      default:
        // Copy to clipboard
        try {
          await navigator.clipboard.writeText(shareUrl);
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy link:', err);
          alert('Failed to copy link to clipboard');
        }
        break;
    }

    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Link to="/" className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

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
        <div className="relative max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-8 h-8 text-green-400" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-4">Thank You for Your Order!</h1>
            <p className="text-gray-300">
              Your order has been confirmed and will be shipped soon.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Order Details</h2>
                <p className="text-gray-300">Order #{order.id.slice(0, 8)}</p>
                <p className="text-gray-300">
                  Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                >
                  <Download className="w-5 h-5" />
                  <span className="hidden sm:inline">Download PDF</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                >
                  <Printer className="w-5 h-5" />
                  <span className="hidden sm:inline">Print Receipt</span>
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-gray-700/50 py-6">
              <h3 className="text-lg font-bold text-white mb-4">Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="text-white">{item.name}</p>
                      <p className="text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="border-t border-gray-700/50 py-6">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-2 border-t border-gray-700/50">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping & Payment */}
            <div className="border-t border-gray-700/50 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Shipping Address</h3>
                  <div className="text-gray-300">
                    <p>{order.shipping_address.firstName} {order.shipping_address.lastName}</p>
                    <p>{order.shipping_address.address}</p>
                    {order.shipping_address.apartment && (
                      <p>{order.shipping_address.apartment}</p>
                    )}
                    <p>
                      {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal}
                    </p>
                    <p>{order.shipping_address.country}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Payment Method</h3>
                  <div className="text-gray-300">
                    <p>Card ending in {order.payment_details.last4}</p>
                    <p>Expires {order.payment_details.expiry}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-gray-700/50 pt-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Truck className="w-5 h-5 text-blue-400" />
                <span>Estimated delivery by {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
            <Link
              to="/account/orders"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <FileText className="w-5 h-5 mr-2" />
              View All Orders
            </Link>
          </div>

          {/* Share */}
          <div className="mt-8 text-center">
            <div className="relative inline-block">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white"
              >
                <Share2 className="w-5 h-5" />
                Share Order
              </button>

              {showShareMenu && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => handleShare('email')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded"
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded"
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('instagram')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-left text-gray-300 hover:bg-gray-700 rounded"
                    >
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrderConfirmationPage;