import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsUserContentPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="User Content" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <TermsNavigation />
          
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">User-Generated Content Policy</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Content Guidelines</h2>
                <p className="mb-4">
                  When submitting content to our platform, users must follow these guidelines:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Content must be original or properly licensed</li>
                  <li>No offensive or inappropriate material</li>
                  <li>No spam or promotional content</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Content Rights</h2>
                <p className="mb-4">
                  By submitting content, you agree that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You own or have rights to share the content</li>
                  <li>We may use the content on our platform</li>
                  <li>Content may be moderated or removed</li>
                  <li>You retain ownership of your content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Content Moderation</h2>
                <p className="mb-4">
                  Our content moderation process includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Regular review of submitted content</li>
                  <li>Removal of violating content</li>
                  <li>User notifications of content status</li>
                  <li>Appeal process for removed content</li>
                </ul>
              </section>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/terms/intellectual"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ← Intellectual Property
                </Link>
                <Link
                  to="/terms/prohibited"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Prohibited Activities →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsUserContentPage;