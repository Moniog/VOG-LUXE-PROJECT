import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsShippingPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Shipping" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <TermsNavigation />
          
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Shipping Policy</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Shipping Methods</h2>
                <p className="mb-4">
                  We offer various shipping options to meet your delivery needs:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Standard Shipping (5-7 business days)</li>
                  <li>Express Shipping (2-3 business days)</li>
                  <li>Next Day Delivery (order by 2 PM)</li>
                  <li>International Shipping (10-14 business days)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Shipping Costs</h2>
                <p className="mb-4">
                  Shipping costs are calculated based on:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Order value</li>
                  <li>Shipping destination</li>
                  <li>Selected shipping method</li>
                  <li>Package weight and dimensions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Free Shipping</h2>
                <p className="mb-4">
                  Free standard shipping is available for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Orders over $100 (domestic)</li>
                  <li>Premium member orders</li>
                  <li>Special promotional periods</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Tracking Orders</h2>
                <p className="mb-4">
                  Once your order ships, you will receive:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Shipping confirmation email</li>
                  <li>Tracking number</li>
                  <li>Estimated delivery date</li>
                  <li>Real-time tracking updates</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">International Shipping</h2>
                <p className="mb-4">
                  For international orders:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Additional customs fees may apply</li>
                  <li>Import duties are the responsibility of the recipient</li>
                  <li>Delivery times may vary by country</li>
                  <li>Not all products are available for international shipping</li>
                </ul>
              </section>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/terms/orders"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ← Orders
                </Link>
                <Link
                  to="/terms/returns"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Returns →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsShippingPage;