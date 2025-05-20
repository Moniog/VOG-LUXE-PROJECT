import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsOrdersPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Orders" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <TermsNavigation />
          
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Orders</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Order Placement</h2>
                <p className="mb-4">
                  By placing an order through our website, you agree to provide accurate and complete information for your purchase. All orders are subject to availability and acceptance by us.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Order Confirmation</h2>
                <p className="mb-4">
                  Upon successful placement of an order, you will receive an order confirmation email. This email serves as acknowledgment of your order but does not constitute acceptance of your order.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Order Cancellation</h2>
                <p className="mb-4">
                  We reserve the right to cancel any order if we suspect fraudulent activity, if the product is out of stock, or if there are errors in pricing or product information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Payment Processing</h2>
                <p className="mb-4">
                  Payment must be received in full before an order is processed and shipped. We accept various payment methods as displayed during checkout.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Order Tracking</h2>
                <p className="mb-4">
                  Once your order is shipped, you will receive a tracking number via email. You can track your order status through your account dashboard or using the provided tracking information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Order Modifications</h2>
                <p className="mb-4">
                  Once an order is placed, modifications may be limited. Please contact our customer service team as soon as possible if you need to make changes to your order.
                </p>
              </section>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/terms/products"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ← Products
                </Link>
                <Link
                  to="/terms/shipping"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Shipping →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOrdersPage;