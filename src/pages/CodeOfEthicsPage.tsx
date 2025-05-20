import React from 'react';
import Container from '../components/layout/Container';
import { Shield, Users, Heart, Globe, Scale, Leaf } from 'lucide-react';

const CodeOfEthicsPage: React.FC = () => {
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
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Code of Ethics
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our commitment to ethical business practices, sustainability, and social responsibility 
              guides every decision we make.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <Heart className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Integrity</h3>
              <p className="text-gray-300">
                We conduct business with honesty, transparency, and accountability, 
                maintaining the highest ethical standards in all our operations.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <Users className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Respect</h3>
              <p className="text-gray-300">
                We value diversity, promote inclusion, and treat all stakeholders with 
                dignity and respect, fostering a culture of mutual understanding.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <Globe className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Responsibility</h3>
              <p className="text-gray-300">
                We take responsibility for our environmental and social impact, 
                working to create positive change in our communities.
              </p>
            </div>
          </div>

          {/* Ethical Commitments */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Our Ethical Commitments</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-none">
                  <Scale className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Fair Labor Practices</h3>
                  <p className="text-gray-300">
                    We ensure fair wages, safe working conditions, and ethical labor practices 
                    throughout our supply chain. Regular audits and partnerships with certified 
                    manufacturers maintain these standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-none">
                  <Leaf className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Environmental Stewardship</h3>
                  <p className="text-gray-300">
                    Our commitment to sustainability includes using eco-friendly materials, 
                    reducing waste, and implementing energy-efficient practices in our operations.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-none">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Transparency</h3>
                  <p className="text-gray-300">
                    We maintain open communication about our practices, pricing, and supply chain. 
                    Regular reporting and third-party audits ensure accountability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Business Conduct</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Zero tolerance for corruption and bribery</li>
                <li>• Fair competition and antitrust compliance</li>
                <li>• Protection of intellectual property</li>
                <li>• Responsible marketing practices</li>
                <li>• Data privacy and security</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">Social Responsibility</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Community engagement and support</li>
                <li>• Diversity and inclusion initiatives</li>
                <li>• Educational programs and partnerships</li>
                <li>• Charitable giving and volunteering</li>
                <li>• Support for local artisans</li>
              </ul>
            </div>
          </div>

          {/* Reporting Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ethics Reporting</h2>
            <p className="text-gray-300 mb-6">
              We encourage reporting of any ethical concerns or violations. Your confidentiality 
              is protected, and we maintain a strict no-retaliation policy.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Report a Concern
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CodeOfEthicsPage;