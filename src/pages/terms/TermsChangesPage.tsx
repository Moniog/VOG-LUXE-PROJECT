import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsChangesPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Changes to Terms" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <TermsNavigation />
          
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Changes to Terms</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Updates to Terms</h2>
                <p className="mb-4">
                  We may update these terms:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>At any time without notice</li>
                  <li>To reflect service changes</li>
                  <li>For legal compliance</li>
                  <li>For clarity improvements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Notification Process</h2>
                <p className="mb-4">
                  We will notify you of changes through:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email notifications</li>
                  <li>Website announcements</li>
                  <li>App notifications</li>
                  <li>Account dashboard alerts</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Your Rights</h2>
                <p className="mb-4">
                  When terms change:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Review updated terms</li>
                  <li>Accept or decline changes</li>
                  <li>Cancel services if needed</li>
                  <li>Contact support with questions</li>
                </ul>
              </section>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/terms/termination"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ← Termination
                </Link>
                <Link
                  to="/terms/contact"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Contact Information →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsChangesPage;