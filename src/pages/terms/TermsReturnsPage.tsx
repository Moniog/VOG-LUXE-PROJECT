import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsReturnsPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Returns" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <TermsNavigation />
          
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Return Policy</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Return Eligibility</h2>
                <p className="mb-4">
                  Items are eligible for return under the following conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Within 30 days of delivery</li>
                  <li>Unused and in original condition</li>
                  <li>Original tags attached</li>
                  <li>Original packaging included</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Return Process</h2>
                <p className="mb-4">
                  To initiate a return:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Log into your account</li>
                  <li>Select the order containing the item</li>
                  <li>Choose "Return Item"</li>
                  <li>Follow the provided instructions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Refund Information</h2>
                <p className="mb-4">
                  Refund processing details:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Original payment method refund</li>
                  <li>Processing time: 5-7 business days</li>
                  <li>Shipping costs may be non-refundable</li>
                  <li>Store credit option available</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Non-Returnable Items</h2>
                <p className="mb-4">
                  The following items cannot be returned:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personalized items</li>
                  <li>Final sale items</li>
                  <li>Intimate apparel</li>
                  <li>Used or damaged items</li>
                </ul>
              </section>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/terms/shipping"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ← Shipping
                </Link>
                <Link
                  to="/terms/intellectual"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Intellectual Property →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsReturnsPage;