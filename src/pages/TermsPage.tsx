import React from 'react';
import Container from '../components/layout/Container';
import { Link } from 'react-router-dom';
import { Printer, ArrowLeft } from 'lucide-react';

const TermsPage: React.FC = () => {
  const lastUpdated = "May 15, 2025";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen pt-32 pb-16">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #60A5FA 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
        <div className="absolute -left-64 -top-64 w-128 h-128 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -right-64 -bottom-64 w-128 h-128 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/"
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <button
                onClick={handlePrint}
                className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
            </div>

            <div className="prose prose-invert max-w-none">
              <h1>Terms of Use</h1>
              <p className="text-sm text-gray-400">Last Updated: {lastUpdated}</p>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-8">
                <h2 className="mt-0">Table of Contents</h2>
                <ol className="list-decimal list-inside">
                  <li><a href="#acceptance">Acceptance of Terms</a></li>
                  <li><a href="#eligibility">Eligibility</a></li>
                  <li><a href="#account">Account Registration</a></li>
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#products">Products and Services</a></li>
                  <li><a href="#orders">Orders and Payments</a></li>
                  <li><a href="#shipping">Shipping and Delivery</a></li>
                  <li><a href="#returns">Returns and Refunds</a></li>
                  <li><a href="#intellectual">Intellectual Property</a></li>
                  <li><a href="#user">User Content</a></li>
                  <li><a href="#prohibited">Prohibited Activities</a></li>
                  <li><a href="#disclaimer">Disclaimers</a></li>
                  <li><a href="#limitation">Limitation of Liability</a></li>
                  <li><a href="#indemnification">Indemnification</a></li>
                  <li><a href="#termination">Termination</a></li>
                  <li><a href="#changes">Changes to Terms</a></li>
                  <li><a href="#contact">Contact Information</a></li>
                </ol>
              </div>

              <section id="acceptance">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the VOG LUXURY website (the "Site"), you accept and agree to be bound by these Terms of Use, our Privacy Policy, and any other legal notices, conditions, or guidelines posted on the Site.
                </p>
              </section>

              <section id="eligibility">
                <h2>2. Eligibility</h2>
                <p>
                  You must be at least 18 years old to use the Site. By using the Site, you represent and warrant that you have the right, authority, and capacity to enter into these Terms and to abide by all of the terms and conditions set forth herein.
                </p>
              </section>

              <section id="account">
                <h2>3. Account Registration</h2>
                <p>
                  To access certain features of the Site, you may be required to register for an account. You agree to:
                </p>
                <ul>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Promptly update any changes to your information</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </section>

              <section id="privacy">
                <h2>4. Privacy Policy</h2>
                <p>
                  Your use of the Site is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding your personal information.
                </p>
              </section>

              <section id="products">
                <h2>5. Products and Services</h2>
                <p>
                  All product descriptions, specifications, and prices are subject to change without notice. We reserve the right to discontinue any product at any time.
                </p>
              </section>

              <section id="orders">
                <h2>6. Orders and Payments</h2>
                <p>
                  All orders are subject to acceptance and availability. We reserve the right to refuse any order or limit order quantity. Payment must be received prior to order acceptance.
                </p>
              </section>

              <section id="shipping">
                <h2>7. Shipping and Delivery</h2>
                <p>
                  Shipping times and costs may vary based on location and selected shipping method. We are not responsible for delays caused by customs or other factors outside our control.
                </p>
              </section>

              <section id="returns">
                <h2>8. Returns and Refunds</h2>
                <p>
                  Please refer to our Returns Policy for detailed information about returns, exchanges, and refunds. Certain items may be ineligible for return.
                </p>
              </section>

              <section id="intellectual">
                <h2>9. Intellectual Property</h2>
                <p>
                  All content on the Site, including text, graphics, logos, images, and software, is the property of VOG LUXURY or its licensors and is protected by copyright and other intellectual property laws.
                </p>
              </section>

              <section id="user">
                <h2>10. User Content</h2>
                <p>
                  By submitting content to the Site, you grant us a non-exclusive, royalty-free license to use, modify, reproduce, and distribute that content.
                </p>
              </section>

              <section id="prohibited">
                <h2>11. Prohibited Activities</h2>
                <p>
                  You agree not to:
                </p>
                <ul>
                  <li>Use the Site for any unlawful purpose</li>
                  <li>Interfere with the Site's operation</li>
                  <li>Attempt to gain unauthorized access</li>
                  <li>Collect user information without consent</li>
                  <li>Engage in fraudulent activities</li>
                </ul>
              </section>

              <section id="disclaimer">
                <h2>12. Disclaimers</h2>
                <p>
                  THE SITE IS PROVIDED "AS IS" WITHOUT ANY WARRANTIES, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED OR ERROR-FREE.
                </p>
              </section>

              <section id="limitation">
                <h2>13. Limitation of Liability</h2>
                <p>
                  IN NO EVENT SHALL VOG LUXURY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE.
                </p>
              </section>

              <section id="indemnification">
                <h2>14. Indemnification</h2>
                <p>
                  You agree to indemnify and hold VOG LUXURY harmless from any claims arising out of your use of the Site or violation of these Terms.
                </p>
              </section>

              <section id="termination">
                <h2>15. Termination</h2>
                <p>
                  We reserve the right to terminate or suspend your access to the Site at our sole discretion, without notice, for any violation of these Terms.
                </p>
              </section>

              <section id="changes">
                <h2>16. Changes to Terms</h2>
                <p>
                  We may modify these Terms at any time. Your continued use of the Site following any changes constitutes your acceptance of the modified Terms.
                </p>
              </section>

              <section id="contact">
                <h2>17. Contact Information</h2>
                <p>
                  For questions about these Terms, please contact us at:
                </p>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                  <p className="mb-0">
                    VOG LUXURY Group S.p.A.<br />
                    123 Fashion Street<br />
                    New York, NY 10001<br />
                    United States<br />
                    Email: legal@vog-luxe.com<br />
                    Phone: +1 (555) 123-4567
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TermsPage;