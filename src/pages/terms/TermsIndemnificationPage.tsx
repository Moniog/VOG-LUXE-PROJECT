import React from 'react';
import { Link } from 'react-router-dom';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsIndemnificationPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Indemnification" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <TermsNavigation />
          
          <div className="flex-1 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-blue-400">Indemnification</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">User Obligations</h2>
                <p className="mb-4">
                  Users agree to indemnify us against:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Claims from third parties</li>
                  <li>Legal fees and costs</li>
                  <li>Damages and settlements</li>
                  <li>Related expenses</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Covered Claims</h2>
                <p className="mb-4">
                  Indemnification covers claims arising from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Terms violations</li>
                  <li>Content violations</li>
                  <li>Intellectual property infringement</li>
                  <li>Unlawful conduct</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-blue-300">Cooperation</h2>
                <p className="mb-4">
                  Your responsibilities include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Prompt notification of claims</li>
                  <li>Cooperation in defense</li>
                  <li>Document preservation</li>
                  <li>Witness availability</li>
                </ul>
              </section>

              <div className="mt-8 flex gap-4">
                <Link
                  to="/terms/liability"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  ← Limitation of Liability
                </Link>
                <Link
                  to="/terms/termination"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Termination →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsIndemnificationPage;