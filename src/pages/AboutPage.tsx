import React from 'react';
import Container from '../components/layout/Container';

const AboutPage: React.FC = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Us</h1>
          <div className="prose prose-lg prose-invert">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              MINIMAL is more than just a brand; it's a philosophy that celebrates the beauty of simplicity and the power of thoughtful design. Founded in 2020, we've dedicated ourselves to creating premium essentials that seamlessly blend form and function.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-gray-300">
                  To redefine modern luxury through minimalist design, sustainable practices, and exceptional quality, making premium essentials accessible to discerning individuals worldwide.
                </p>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-300">
                  To create timeless pieces that transcend trends, minimize environmental impact, and enhance the daily lives of our customers through thoughtful design and superior craftsmanship.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-3">Quality First</h3>
                  <p className="text-gray-300">
                    We never compromise on quality, selecting only the finest materials and working with skilled artisans.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-3">Sustainability</h3>
                  <p className="text-gray-300">
                    Environmental responsibility is at the core of every decision we make.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
                  <p className="text-gray-300">
                    We continuously explore new technologies and methods to improve our products.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-gray-300 mb-4">
                MINIMAL began with a simple idea: to create essential pieces that would stand the test of time, both in style and durability. Our founder's vision was to combine minimalist aesthetics with sustainable practices, creating products that would become the foundation of a conscious wardrobe.
              </p>
              <p className="text-gray-300">
                Today, we continue to push boundaries in sustainable fashion, working with innovative materials and ethical manufacturing partners to create pieces that make a difference - both in your wardrobe and for our planet.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Commitment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-3">Sustainability Goals</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>100% sustainable materials by 2026</li>
                    <li>Carbon neutral operations by 2025</li>
                    <li>Zero waste packaging</li>
                    <li>Water conservation initiatives</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-xl font-bold text-white mb-3">Community Impact</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>Fair labor practices</li>
                    <li>Local artisan support</li>
                    <li>Educational initiatives</li>
                    <li>Community outreach programs</li>
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

export default AboutPage;