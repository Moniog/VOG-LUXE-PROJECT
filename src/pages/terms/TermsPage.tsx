import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <TermsNavigation />
          
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-lg p-6 space-y-6">
              <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
              
              <div className="prose prose-invert max-w-none">
                <p>
                  Welcome to MINIMAL. These Terms of Service govern your use of our website
                  and services. Please read these terms carefully before using our platform.
                </p>
                
                <p>
                  By accessing or using our services, you agree to be bound by these Terms
                  of Service. If you disagree with any part of the terms, you may not
                  access our services.
                </p>

                <h2>Quick Links</h2>
                <ul>
                  <li>
                    <Link to="/terms/acceptance" className="text-blue-400 hover:text-blue-300">
                      Acceptance of Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms/eligibility" className="text-blue-400 hover:text-blue-300">
                      Eligibility
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms/account" className="text-blue-400 hover:text-blue-300">
                      Account Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms/privacy" className="text-blue-400 hover:text-blue-300">
                      Privacy & Data Protection
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms/products" className="text-blue-400 hover:text-blue-300">
                      Products & Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms/orders" className="text-blue-400 hover:text-blue-300">
                      Orders & Payments
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms/shipping" className="text-blue-400 hover:text-blue-300">
                      Shipping Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms/returns" className="text-blue-400 hover:text-blue-300">
                      Returns & Refunds
                    </Link>
                  </li>
                </ul>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions about these Terms of Service, please{' '}
                  <Link to="/contact" className="text-blue-400 hover:text-blue-300">
                    contact us
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;