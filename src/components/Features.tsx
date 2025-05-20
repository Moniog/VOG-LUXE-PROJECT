import React from 'react';
import { Package, Truck, Wallet2, HeadphonesIcon } from 'lucide-react';
import Container from './layout/Container';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Package className="w-8 h-8 text-blue-400" />,
    title: "Free Shipping",
    description: "Shop your favorite styles with the convenience of free delivery, directly to your doorstep."
  },
  {
    icon: <Truck className="w-8 h-8 text-blue-400" />,
    title: "Fast Delivery",
    description: "Experience fast delivery, ensuring your stylish finds arrive at your door in no time."
  },
  {
    icon: <Wallet2 className="w-8 h-8 text-blue-400" />,
    title: "Flexible Payment",
    description: "Shop now and pay your way with flexible payment options designed to fit your budget."
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8 text-blue-400" />,
    title: "Premium Support",
    description: "Enjoy premium support with personalized assistance, a seamless shopping experience every time."
  }
];

const Features: React.FC = () => {
  return (
    <section className="relative py-24">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;