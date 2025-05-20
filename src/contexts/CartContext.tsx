import React, { createContext, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  isOpen: boolean;
}

interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.1; // 10% tax rate

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CartState>({
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    isOpen: false
  });

  // Load cart from localStorage with proper type checking
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        const items = parsedCart?.items && Array.isArray(parsedCart.items) 
          ? parsedCart.items 
          : [];
        calculateTotals(items);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      calculateTotals([]);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const calculateTotals = (items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    setState(prev => ({
      ...prev,
      items,
      subtotal,
      tax,
      total
    }));
  };

  const addItem = async (newItem: CartItem) => {
    setState(prev => {
      const existingItem = prev.items.find(item => item.id === newItem.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = prev.items.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
            : item
        );
      } else {
        updatedItems = [...prev.items, { ...newItem, quantity: newItem.quantity || 1 }];
      }

      calculateTotals(updatedItems);
      return { ...prev, items: updatedItems, isOpen: true };
    });
  };

  const removeItem = (id: string) => {
    setState(prev => {
      const updatedItems = prev.items.filter(item => item.id !== id);
      calculateTotals(updatedItems);
      return { ...prev, items: updatedItems };
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setState(prev => {
      const updatedItems = prev.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      calculateTotals(updatedItems);
      return { ...prev, items: updatedItems };
    });
  };

  const clearCart = () => {
    setState(prev => ({
      ...prev,
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0
    }));
  };

  const toggleCart = () => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const closeCart = () => {
    setState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      closeCart
    }}>
      {children}
      <AnimatePresence>
        {state.isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                  <button
                    onClick={closeCart}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>

                {state.items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {state.items.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-lg"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="text-white font-medium">{item.name}</h3>
                            <p className="text-blue-400">${item.price.toFixed(2)}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-gray-400 hover:text-white"
                              >
                                -
                              </button>
                              <span className="text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-400 hover:text-white"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-700/50 pt-4 space-y-2">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span>${state.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Tax</span>
                        <span>${state.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white font-bold pt-2 border-t border-gray-700/50">
                        <span>Total</span>
                        <span>${state.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <button
                        onClick={closeCart}
                        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Checkout
                      </button>
                      <button
                        onClick={clearCart}
                        className="w-full px-6 py-3 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};