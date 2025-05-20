import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsLiabilityPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Limitation of Liability" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <TermsNavigation />
          
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Limitation of Liability</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">General Limitations</h2>
                <p className="mb-4">
                  Our liability is limited in the following ways:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maximum liability capped at purchase price</li>
                  <li>No liability for indirect damages</li>
                  <li>No consequential damages</li>
                  <li>Force majeure exclusions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Specific Exclusions</h2>
                <p className="mb-4">
                  We are not liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Data loss or corruption</li>
                  <li>Service interruptions</li>
                  <li>Third-party actions</li>
                  <li>User misuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Jurisdictional Limitations</h2>
                <p className="mb-4">
                  Legal considerations:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Varies by jurisdiction</li>
                  <li>Consumer law rights preserved</li>
                  <li>Statutory requirements</li>
                  <li>Local law compliance</li>
                </ul>
              </section>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/terms/disclaimer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ← Disclaimer
                </Link>
                <Link
                  to="/terms/indemnification"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Indemnification →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsLiabilityPage;