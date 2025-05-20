import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsContactPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Contact Information" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <TermsNavigation />
          
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Contact Information</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">General Contact</h2>
                <p className="mb-4">
                  Ways to reach us:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email: support@vog-luxe.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Hours: Mon-Fri, 9 AM - 5 PM EST</li>
                  <li>Response time: 24-48 hours</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Legal Notices</h2>
                <p className="mb-4">
                  For legal correspondence:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Legal Department</li>
                  <li>VOG LUXURY Group S.p.A.</li>
                  <li>123 Fashion Street</li>
                  <li>New York, NY 10001</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Business Inquiries</h2>
                <p className="mb-4">
                  For business matters:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Partnerships: partners@vog-luxe.com</li>
                  <li>Press: press@vog-luxe.com</li>
                  <li>Careers: careers@vog-luxe.com</li>
                  <li>Investor Relations: ir@vog-luxe.com</li>
                </ul>
              </section>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/terms/changes"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ← Changes to Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsContactPage;