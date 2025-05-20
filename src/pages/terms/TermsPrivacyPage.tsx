import React from 'react';
import TermsNavigation from '../../components/terms/TermsNavigation';
import TermsBreadcrumbs from '../../components/terms/TermsBreadcrumbs';

const TermsPrivacyPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <TermsBreadcrumbs />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <TermsNavigation />
          
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-xl p-6 space-y-6">
              <h1 className="text-3xl font-bold text-white">Privacy</h1>
              
              <div className="prose prose-invert max-w-none">
                <p>
                  We take your privacy seriously and are committed to protecting your personal information. 
                  This section outlines how we collect, use, and safeguard your data when you use our services.
                </p>

                <h2>Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, including:
                </p>
                <ul>
                  <li>Contact information (name, email address, shipping address)</li>
                  <li>Account credentials</li>
                  <li>Payment information</li>
                  <li>Order history and preferences</li>
                  <li>Communications with our customer service team</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>
                  We use the collected information to:
                </p>
                <ul>
                  <li>Process your orders and payments</li>
                  <li>Communicate with you about your orders and account</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our services and user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2>Data Protection</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2>Third-Party Services</h2>
                <p>
                  We may share your information with trusted third-party service providers who assist us in 
                  operating our website, conducting our business, or servicing you. These parties agree to 
                  keep this information confidential and secure.
                </p>

                <h2>Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent for data processing</li>
                </ul>

                <h2>Updates to Privacy Terms</h2>
                <p>
                  We may update these privacy terms from time to time. We will notify you of any material 
                  changes by posting the new terms on our website or through other communications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPrivacyPage;