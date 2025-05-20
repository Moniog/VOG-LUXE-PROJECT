import React from 'react';
import Container from '../components/layout/Container';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-16">
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
          <article className="prose prose-invert max-w-none">
            <h1>Privacy & Cookies Policy</h1>
            <p className="text-sm text-gray-400">Last Updated: May 15, 2025 (v1.0)</p>

            <p>Welcome to VOG LUXURY ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our website and services.</p>

            <h2>1. Information We Collect</h2>
            <h3>1.1 Information You Provide</h3>
            <ul>
              <li>Account information (name, email, password)</li>
              <li>Profile information (shipping address, preferences)</li>
              <li>Order information (purchase history, payment details)</li>
              <li>Communications (customer service inquiries, reviews)</li>
            </ul>

            <h3>1.2 Automatically Collected Information</h3>
            <ul>
              <li>Device information (IP address, browser type)</li>
              <li>Usage data (pages visited, time spent)</li>
              <li>Location data (country, region)</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>Process your orders and payments</li>
              <li>Provide customer support</li>
              <li>Send order updates and marketing communications</li>
              <li>Improve our website and services</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We share your information with:</p>
            <ul>
              <li>Service providers (payment processors, shipping companies)</li>
              <li>Analytics partners</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>4. Your Rights</h2>
            <p>Under GDPR and CCPA, you have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>

            <h2>5. Cookie Policy</h2>
            <h3>5.1 Essential Cookies</h3>
            <p>Required for basic website functionality:</p>
            <ul>
              <li>Authentication</li>
              <li>Shopping cart</li>
              <li>Security features</li>
            </ul>

            <h3>5.2 Analytics Cookies</h3>
            <p>Help us understand how visitors use our website:</p>
            <ul>
              <li>Page views</li>
              <li>Traffic sources</li>
              <li>User behavior</li>
            </ul>

            <h3>5.3 Marketing Cookies</h3>
            <p>Used for targeted advertising and tracking conversions.</p>

            <h2>6. Data Security</h2>
            <p>We implement appropriate security measures:</p>
            <ul>
              <li>SSL/TLS encryption</li>
              <li>Secure data storage</li>
              <li>Regular security assessments</li>
              <li>Access controls</li>
              <li>Employee training</li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>Our services are not intended for children under 16. We do not knowingly collect data from children.</p>

            <h2>8. International Data Transfers</h2>
            <p>We may transfer your data to countries outside your residence. We ensure appropriate safeguards are in place:</p>
            <ul>
              <li>Standard contractual clauses</li>
              <li>Data processing agreements</li>
              <li>Privacy Shield certification (where applicable)</li>
            </ul>

            <h2>9. Data Retention</h2>
            <p>We retain your data for as long as necessary to:</p>
            <ul>
              <li>Provide our services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
            </ul>

            <h2>10. Changes to Privacy Policy</h2>
            <p>We may update this policy periodically. We will notify you of significant changes by:</p>
            <ul>
              <li>Email notification</li>
              <li>Website announcement</li>
              <li>App notification</li>
            </ul>

            <h2>11. Contact Information</h2>
            <p>For privacy-related inquiries:</p>
            <ul>
              <li>Email: privacy@vog-luxe.com</li>
              <li>Address: 123 Fashion Street, New York, NY 10001</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>

            <h2>12. Additional Rights (California Residents)</h2>
            <p>Under CCPA, California residents have additional rights:</p>
            <ul>
              <li>Know what personal information is collected</li>
              <li>Know if personal information is sold or disclosed</li>
              <li>Say no to the sale of personal information</li>
              <li>Access personal information</li>
              <li>Equal service and price</li>
            </ul>

            <div className="mt-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
              <h3 className="mt-0">Need Help?</h3>
              <p className="mb-0">If you have questions about this Privacy Policy, please contact our Data Protection Officer:</p>
              <ul className="mb-0">
                <li>Email: dpo@vog-luxe.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Hours: Monday - Friday, 9:00 AM - 5:00 PM EST</li>
              </ul>
            </div>
          </article>
        </div>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;