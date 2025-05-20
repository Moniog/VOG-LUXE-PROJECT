import React from 'react';
import { ShoppingBag, Gift, Truck } from 'lucide-react';

interface OrderSummaryProps {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  subtotal: number;
  tax: number;
  shipping?: number;
  discount?: {
    code: string;
    amount: number;
  };
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  tax,
  shipping = 0,
  discount,
  total
}) => {
  const TAX_RATE = 10; // 10%

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
      
      {/* Items List */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-white">{item.name}</h3>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-white">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-400">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700/50 my-6" />

      {/* Calculations */}
      <div className="space-y-3">
        <div className="flex justify-between text-gray-300">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>Subtotal ({items.length} items)</span>
          </div>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Shipping</span>
          </div>
          <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>Tax ({TAX_RATE}%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {discount && (
          <div className="flex justify-between text-green-400">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span>Discount ({discount.code})</span>
            </div>
            <span>-${discount.amount.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-gray-700/50 mt-6 pt-6">
        <div className="flex justify-between text-white">
          <span className="text-lg font-bold">Total</span>
          <div className="text-right">
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
            <p className="text-sm text-gray-400">Including VAT</p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <p className="text-sm text-blue-400">
          Your order qualifies for free shipping! Expected delivery: 3-5 business days
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;