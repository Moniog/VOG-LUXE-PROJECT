import React from 'react';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';
import TermsNavigation from '../../components/terms/TermsNavigation';

const TermsEligibilityPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Eligibility" />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <TermsNavigation />
          
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-100">
            <h1 className="text-3xl font-bold mb-6">Service Eligibility</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Age Requirements</h2>
                <p className="text-gray-300">
                  You must be at least 18 years old to use our services. If you are under 18, 
                  you may only use our services with the involvement of a parent or legal guardian.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Account Eligibility</h2>
                <p className="text-gray-300">
                  To be eligible for an account, you must provide accurate and complete 
                  information during the registration process. You are responsible for 
                  maintaining the accuracy of this information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Geographic Restrictions</h2>
                <p className="text-gray-300">
                  Our services are available to users worldwide, subject to applicable laws 
                  and regulations. However, certain products or services may be restricted 
                  in specific regions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Compliance Requirements</h2>
                <p className="text-gray-300">
                  Users must comply with all local, state, national, and international laws 
                  and regulations. Any violation may result in immediate termination of access 
                  to our services.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsEligibilityPage;