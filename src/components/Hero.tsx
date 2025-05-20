import React from 'react';
import Container from './layout/Container';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div id="hero" className="relative overflow-hidden pt-32">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 md:py-16 lg:py-24">
          <div className="flex flex-col justify-center relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Elevate Your Style With Modern Essentials
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Discover curated collections of premium quality clothing and accessories that blend comfort with contemporary design.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Link to="/new-arrivals">
                <Button size="lg">Shop New Arrivals</Button>
              </Link>
              <Link to="/shop">
                <Button size="lg" variant="outline">
                  View Collections
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center">
                <span className="mr-2">✓</span> Free shipping on orders over $100
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span> 30-day returns
              </div>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden">
            <img
              src="https://images.pexels.com/photos/5531004/pexels-photo-5531004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Featured collection"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-400">Featured Collection</p>
              <h3 className="text-xl font-bold text-white">Summer Essentials 2025</h3>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;