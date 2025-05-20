import React from 'react';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';
import TermsNavigation from '../../components/terms/TermsNavigation';

const TermsAccountPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Account Terms" />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <TermsNavigation />
          
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-100">
            <h1 className="text-3xl font-bold mb-6">Account Terms</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Account Creation</h2>
                <p className="text-gray-300">
                  When creating an account, you must provide accurate and complete information. 
                  You are responsible for maintaining the security of your account credentials 
                  and for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Account Security</h2>
                <p className="text-gray-300">
                  You are responsible for maintaining the confidentiality of your account 
                  and password. You agree to notify us immediately of any unauthorized use 
                  of your account or any other breach of security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Account Restrictions</h2>
                <p className="text-gray-300">
                  We reserve the right to suspend or terminate your account at any time for 
                  any reason, including but not limited to violation of these terms or 
                  engaging in prohibited activities.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Account Deletion</h2>
                <p className="text-gray-300">
                  You may request to delete your account at any time. Upon deletion, certain 
                  information may be retained as required by law or for legitimate business 
                  purposes.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAccountPage;