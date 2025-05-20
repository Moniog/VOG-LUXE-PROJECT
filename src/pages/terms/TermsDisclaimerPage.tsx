import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsDisclaimerPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Disclaimer" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <TermsNavigation />
          
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Disclaimers</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">General Disclaimer</h2>
                <p className="mb-4">
                  Important disclaimers regarding our services:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Services provided "as is"</li>
                  <li>No guarantees of availability</li>
                  <li>Results may vary</li>
                  <li>Subject to change without notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Product Disclaimers</h2>
                <p className="mb-4">
                  Regarding our products:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Colors may vary from images</li>
                  <li>Specifications subject to change</li>
                  <li>Availability not guaranteed</li>
                  <li>Pricing may vary</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Third-Party Content</h2>
                <p className="mb-4">
                  Regarding external content and services:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>No control over third-party content</li>
                  <li>External links provided as convenience</li>
                  <li>No endorsement implied</li>
                  <li>Use at your own risk</li>
                </ul>
              </section>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/terms/prohibited"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ← Prohibited Activities
                </Link>
                <Link
                  to="/terms/liability"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Limitation of Liability →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsDisclaimerPage;