import React from 'react';
import Container from '../components/layout/Container';
import { Building2, Users, Globe, ChevronRight, BarChart3, Shield } from 'lucide-react';

const CorporatePage: React.FC = () => {
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
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-xl mb-6">
              <Building2 className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Corporate Information
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn about MINIMAL's corporate structure, governance, and commitment to 
              sustainable business practices.
            </p>
          </div>

          {/* Company Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <Globe className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Global Presence</h3>
              <p className="text-gray-300">
                Operating in over 30 countries with a network of sustainable manufacturing 
                partners and retail locations.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <Users className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Our Team</h3>
              <p className="text-gray-300">
                A diverse workforce of 1,000+ professionals dedicated to revolutionizing 
                sustainable fashion.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <BarChart3 className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Growth</h3>
              <p className="text-gray-300">
                Consistent year-over-year growth while maintaining our commitment to 
                sustainability and ethical practices.
              </p>
            </div>
          </div>

          {/* Corporate Structure */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Corporate Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Company Details</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>Legal Name: MINIMAL Group S.p.A.</li>
                  <li>Founded: 2016</li>
                  <li>Headquarters: New York, NY</li>
                  <li>Registration: NY12345678</li>
                  <li>VAT: US123456789</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Executive Team</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>CEO: Sarah Anderson</li>
                  <li>CFO: Michael Chen</li>
                  <li>COO: Emma Thompson</li>
                  <li>CTO: David Park</li>
                  <li>CSO: Maria Garcia</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Governance */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Corporate Governance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Board of Directors</h3>
                <p className="text-gray-300 mb-4">
                  Our board brings diverse expertise in fashion, sustainability, technology, 
                  and global retail operations.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    Independent oversight
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    Diverse representation
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    Regular review of strategy
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-400" />
                    Sustainability focus
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Committees</h3>
                <ul className="space-y-4 text-gray-300">
                  <li>
                    <strong className="text-white">Audit Committee</strong>
                    <p>Oversees financial reporting and internal controls</p>
                  </li>
                  <li>
                    <strong className="text-white">Sustainability Committee</strong>
                    <p>Guides environmental and social initiatives</p>
                  </li>
                  <li>
                    <strong className="text-white">Ethics Committee</strong>
                    <p>Ensures compliance with our code of conduct</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications & Compliance */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
            <div className="flex items-center gap-4 mb-8">
              <Shield className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Certifications & Compliance</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Business Standards</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• ISO 9001:2015 Certified</li>
                  <li>• B Corp Certified</li>
                  <li>• Fair Trade Partner</li>
                  <li>• BSCI Compliant</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Environmental</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• ISO 14001 Certified</li>
                  <li>• Carbon Neutral Certified</li>
                  <li>• GOTS Certified</li>
                  <li>• Zero Waste Certified</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Social Responsibility</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• SA8000 Certified</li>
                  <li>• WRAP Certified</li>
                  <li>• FLA Accredited</li>
                  <li>• SEDEX Member</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CorporatePage;