import React from 'react';
import Container from '../components/layout/Container';
import { Leaf, Recycle, Heart, Globe, Shield, Users } from 'lucide-react';

const EquilibriumPage: React.FC = () => {
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
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-gray-400 rounded-sm transform rotate-45" />
              </div>
              <span className="ml-3 text-lg font-light text-gray-400 tracking-wider">
                EQUILIBRIUM
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Commitment to Sustainability
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              MINIMAL Equilibrium represents our dedication to creating a balanced future 
              through sustainable practices, ethical manufacturing, and environmental stewardship.
            </p>
          </div>

          {/* Vision Section */}
          <div className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg"
                  alt="Sustainable Fashion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
                <p className="text-gray-300 mb-6">
                  We envision a fashion industry that operates in harmony with nature, 
                  respects human rights, and creates beautiful products without compromising 
                  our planet's future.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Globe className="w-5 h-5 text-blue-400" />
                    <span>Carbon neutral by 2025</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Recycle className="w-5 h-5 text-blue-400" />
                    <span>100% sustainable materials by 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Heart className="w-5 h-5 text-blue-400" />
                    <span>Fair labor practices worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Initiatives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <Leaf className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Sustainable Materials</h3>
              <p className="text-gray-300">
                We use organic, recycled, and innovative materials that minimize 
                environmental impact while maintaining premium quality.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <Shield className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Ethical Production</h3>
              <p className="text-gray-300">
                Our manufacturing partners meet strict ethical standards, ensuring 
                fair wages and safe working conditions.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
              <Users className="w-10 h-10 text-blue-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">Community Impact</h3>
              <p className="text-gray-300">
                We invest in local communities through education, empowerment, and 
                sustainable development programs.
              </p>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-12 border border-gray-700/50 mb-24">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">85%</div>
                <p className="text-gray-300">Recycled Materials</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">-60%</div>
                <p className="text-gray-300">Water Usage</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
                <p className="text-gray-300">Fair Trade Certified</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
                <p className="text-gray-300">Trees Planted</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="text-center mb-24">
            <h2 className="text-3xl font-bold text-white mb-12">Our Certifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['GOTS Certified', 'Fair Trade', 'B Corp', 'Climate Neutral'].map((cert, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-blue-400 rounded-sm transform rotate-45" />
                  </div>
                  <p className="text-white font-medium">{cert}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Journey</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Together, we can create a more sustainable future for fashion. 
              Explore our sustainable collection and be part of the change.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Shop Sustainable Collection
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EquilibriumPage;