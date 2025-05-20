import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsTerminationPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Termination" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <TermsNavigation />
          
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Termination</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Termination by Us</h2>
                <p className="mb-4">
                  We may terminate services for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Terms violations</li>
                  <li>Fraudulent activity</li>
                  <li>Extended inactivity</li>
                  <li>Legal requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Termination by You</h2>
                <p className="mb-4">
                  You may terminate your account:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>At any time</li>
                  <li>Through account settings</li>
                  <li>By contacting support</li>
                  <li>With written notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Effect of Termination</h2>
                <p className="mb-4">
                  Upon termination:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access rights end</li>
                  <li>Data may be deleted</li>
                  <li>Obligations continue</li>
                  <li>Refunds per policy</li>
                </ul>
              </section>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/terms/indemnification"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ← Indemnification
                </Link>
                <Link
                  to="/terms/changes"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Changes to Terms →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsTerminationPage;