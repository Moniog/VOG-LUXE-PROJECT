import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import OrderSummary from '../components/OrderSummary';
import { supabase } from '../lib/supabase';
import { usePaystackPayment } from 'react-paystack';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  shippingApartment: string;
  shippingCity: string;
  shippingState: string;
  shippingPostal: string;
  shippingCountry: string;
  sameAsShipping: boolean;
  billingAddress: string;
  billingApartment: string;
  billingCity: string;
  billingState: string;
  billingPostal: string;
  billingCountry: string;
  acceptTerms: boolean;
}

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { state: { items, subtotal, tax, total }, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    shippingAddress: '',
    shippingApartment: '',
    shippingCity: '',
    shippingState: '',
    shippingPostal: '',
    shippingCountry: '',
    sameAsShipping: true,
    billingAddress: '',
    billingApartment: '',
    billingCity: '',
    billingState: '',
    billingPostal: '',
    billingCountry: '',
    acceptTerms: false
  });

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const validateForm = (): boolean => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Please fill in all contact information fields');
      return false;
    }

    if (!formData.shippingAddress || !formData.shippingCity || !formData.shippingState || 
        !formData.shippingPostal || !formData.shippingCountry) {
      setError('Please fill in all shipping address fields');
      return false;
    }

    if (!formData.sameAsShipping && (!formData.billingAddress || !formData.billingCity || 
        !formData.billingState || !formData.billingPostal || !formData.billingCountry)) {
      setError('Please fill in all billing address fields');
      return false;
    }

    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions');
      return false;
    }

    return true;
  };

  const handlePaystackSuccess = async (reference: any) => {
    try {
      // Save order to database
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          items,
          subtotal,
          tax,
          total,
          shipping_address: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.shippingAddress,
            apartment: formData.shippingApartment,
            city: formData.shippingCity,
            state: formData.shippingState,
            postal: formData.shippingPostal,
            country: formData.shippingCountry
          },
          billing_address: formData.sameAsShipping ? null : {
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.billingAddress,
            apartment: formData.billingApartment,
            city: formData.billingCity,
            state: formData.billingState,
            postal: formData.billingPostal,
            country: formData.billingCountry
          },
          payment_details: {
            reference: reference.reference,
            status: reference.status,
            provider: 'paystack'
          },
          status: 'processing'
        });

      if (orderError) throw orderError;

      // Clear cart and redirect to confirmation page
      clearCart();
      navigate(`/order-confirmation?id=${orderId}`);
    } catch (error: any) {
      console.error('Error processing order:', error);
      setError(error.message || 'An error occurred while processing your order');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePaystackClose = () => {
    setError('Payment cancelled. Please try again.');
    setLoading(false);
  };

  const initializePayment = usePaystackPayment({
    reference: orderId || '',
    email: formData.email,
    amount: Math.round(total * 100), // Convert to kobo/cents
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: 'NGN',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    try {
      // Generate order ID
      const newOrderId = crypto.randomUUID();
      setOrderId(newOrderId);

      // Initialize Paystack payment
      initializePayment(
        () => handlePaystackSuccess({ reference: newOrderId }),
        handlePaystackClose
      );
    } catch (error: any) {
      console.error('Error initializing payment:', error);
      setError(error.message || 'An error occurred while initializing payment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>

          <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h2 className="text-xl font-bold text-white mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="shippingAddress" className="block text-sm font-medium text-white mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="shippingAddress"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="shippingApartment" className="block text-sm font-medium text-white mb-2">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="shippingApartment"
                      name="shippingApartment"
                      value={formData.shippingApartment}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="shippingCity" className="block text-sm font-medium text-white mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="shippingCity"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="shippingState" className="block text-sm font-medium text-white mb-2">
                        State/Province
                      </label>
                      <input
                        type="text"
                        id="shippingState"
                        name="shippingState"
                        value={formData.shippingState}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="shippingPostal" className="block text-sm font-medium text-white mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="shippingPostal"
                        name="shippingPostal"
                        value={formData.shippingPostal}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="shippingCountry" className="block text-sm font-medium text-white mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        id="shippingCountry"
                        name="shippingCountry"
                        value={formData.shippingCountry}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Billing Address</h2>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="sameAsShipping"
                      checked={formData.sameAsShipping}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-700/50 rounded bg-gray-800/50 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-300">Same as shipping</span>
                  </label>
                </div>

                {!formData.sameAsShipping && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="billingAddress" className="block text-sm font-medium text-white mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleChange}
                        required={!formData.sameAsShipping}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="billingApartment" className="block text-sm font-medium text-white mb-2">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        id="billingApartment"
                        name="billingApartment"
                        value={formData.billingApartment}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="billingCity" className="block text-sm font-medium text-white mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          id="billingCity"
                          name="billingCity"
                          value={formData.billingCity}
                          onChange={handleChange}
                          required={!formData.sameAsShipping}
                          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="billingState" className="block text-sm font-medium text-white mb-2">
                          State/Province
                        </label>
                        <input
                          type="text"
                          id="billingState"
                          name="billingState"
                          value={formData.billingState}
                          onChange={handleChange}
                          required={!formData.sameAsShipping}
                          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="billingPostal" className="block text-sm font-medium text-white mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="billingPostal"
                          name="billingPostal"
                          value={formData.billingPostal}
                          onChange={handleChange}
                          required={!formData.sameAsShipping}
                          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="billingCountry" className="block text-sm font-medium text-white mb-2">
                          Country
                        </label>
                        <input
                          type="text"
                          id="billingCountry"
                          name="billingCountry"
                          value={formData.billingCountry}
                          onChange={handleChange}
                          required={!formData.sameAsShipping}
                          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    required
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-700/50 rounded bg-gray-800/50 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the{' '}
                    <a href="/terms" className="text-blue-400 hover:text-blue-300">Terms and Conditions</a>
                    {' '}and{' '}
                    <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full relative"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Pay Now'
                )}
              </Button>
            </form>

            {/* Order Summary */}
            <div className="space-y-6">
              <OrderSummary
                items={items}
                subtotal={subtotal}
                tax={tax}
                total={total}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;