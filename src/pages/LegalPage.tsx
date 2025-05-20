import React from 'react';
import Container from '../components/layout/Container';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const LegalPage: React.FC = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Legal Information</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Terms & Conditions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Terms & Conditions</h2>
              <p className="text-gray-300 mb-6">
                Our terms and conditions outline the rules, guidelines, and agreements for using 
                our services and purchasing our products.
              </p>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                  User agreements
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                  Purchase conditions
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                  Service usage
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                  Intellectual property
                </li>
              </ul>
              <Link
                to="/terms"
                className="inline-flex items-center text-blue-400 hover:text-blue-300"
              >
                Read Terms & Conditions
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Privacy Policy */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-4">Privacy Policy</h2>
              <p className="text-gray-300 mb-6">
                Our privacy policy explains how we collect, use, and protect your personal 
                information when you use our services.
              </p>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                  Data collection
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                  Information usage
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                  Cookie policy
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                  Your rights
                </li>
              </ul>
              <Link
                to="/privacy-policy"
                className="inline-flex items-center text-blue-400 hover:text-blue-300"
              >
                Read Privacy Policy
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Additional Legal Information */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Shipping & Returns</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Shipping Policy</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Free shipping on orders over $100</li>
                    <li>• International shipping available</li>
                    <li>• Express delivery options</li>
                    <li>• Tracking provided for all orders</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Returns Policy</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• 30-day return window</li>
                    <li>• Free returns on domestic orders</li>
                    <li>• Original condition required</li>
                    <li>• Quick refund processing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Corporate Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Company Details</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>MINIMAL Group S.p.A.</li>
                    <li>Registration: NY12345678</li>
                    <li>VAT: US123456789</li>
                    <li>Founded: 2016</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>123 Fashion Street</li>
                    <li>New York, NY 10001</li>
                    <li>United States</li>
                    <li>legal@minimal.com</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h2 className="text-2xl font-bold text-white mb-6">Compliance & Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Data Protection</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• GDPR Compliant</li>
                    <li>• CCPA Compliant</li>
                    <li>• ISO 27001 Certified</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Business Standards</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• B Corp Certified</li>
                    <li>• Fair Trade Partner</li>
                    <li>• ISO 9001 Certified</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Environmental</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• ISO 14001 Certified</li>
                    <li>• Carbon Neutral</li>
                    <li>• GOTS Certified</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LegalPage;