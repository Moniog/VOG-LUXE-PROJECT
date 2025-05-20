import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsProhibitedPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Prohibited Activities" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <TermsNavigation />
          
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Prohibited Activities</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">General Prohibitions</h2>
                <p className="mb-4">
                  The following activities are strictly prohibited:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unauthorized access to our systems</li>
                  <li>Distribution of malware or viruses</li>
                  <li>Impersonation of others</li>
                  <li>Fraudulent activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Content Restrictions</h2>
                <p className="mb-4">
                  Users may not post or share:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Illegal or harmful content</li>
                  <li>Copyrighted material without permission</li>
                  <li>Misleading or false information</li>
                  <li>Spam or unsolicited advertising</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Account Usage</h2>
                <p className="mb-4">
                  The following account activities are prohibited:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Creating multiple accounts</li>
                  <li>Sharing account credentials</li>
                  <li>Automated account access</li>
                  <li>Unauthorized resale of products</li>
                </ul>
              </section>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/terms/user-content"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ← User Content
                </Link>
                <Link
                  to="/terms/disclaimer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Disclaimer →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsProhibitedPage;