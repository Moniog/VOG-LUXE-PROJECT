import React from 'react';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';
import TermsNavigation from '../../components/terms/TermsNavigation';

const TermsAcceptancePage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs currentPage="Acceptance" />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <TermsNavigation />
          
          <div className="lg:col-span-3 bg-white/5 backdrop-blur-lg rounded-lg p-6 text-gray-100">
            <h1 className="text-3xl font-bold mb-6">Terms of Service Acceptance</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300">
                  By accessing and using this website, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms of Service. If you do not 
                  agree with any part of these terms, you must not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Modifications to Terms</h2>
                <p className="text-gray-300">
                  We reserve the right to modify these terms at any time. Changes will be 
                  effective immediately upon posting to the website. Your continued use of 
                  the service following any changes indicates your acceptance of such changes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Electronic Communications</h2>
                <p className="text-gray-300">
                  By using our services, you consent to receive communications from us 
                  electronically. We will communicate with you via email or by posting 
                  notices on the website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Legal Compliance</h2>
                <p className="text-gray-300">
                  You agree to comply with all applicable laws and regulations when using 
                  our services. Any violation of these laws may result in immediate 
                  termination of your access to our services.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAcceptancePage;