import React from 'react';
import Container from './layout/Container';
import { Link } from 'react-router-dom';
import { Waves } from 'lucide-react';

const PromoSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-900/60 via-cyan-900/60 to-blue-900/60 backdrop-blur-sm h-8">
      {/* Animated Wave Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 50% 150%, rgba(56, 189, 248, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)
          `
        }}
      >
        {/* Wave Animation */}
        <div className="absolute inset-0 animate-wave opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              fill="rgb(96 165 250)"
              fillOpacity="1"
              d="M0,64L48,69.3C96,75,192,85,288,90.7C384,96,480,91,576,80C672,69,768,53,864,48C960,43,1056,48,1152,48C1248,48,1344,43,1392,40L1440,37L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </div>

      {/* Floating Bubbles */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-400/20 animate-float"
          style={{
            width: `${Math.random() * 10 + 4}px`,
            height: `${Math.random() * 10 + 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 2 + 3}s`,
          }}
        />
      ))}

      <Container>
        <div className="relative flex items-center justify-between h-8">
          {/* Content */}
          <div className="flex items-center gap-2">
            <Waves className="w-3 h-3 text-blue-300 animate-bob" />
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="animate-waterfall whitespace-nowrap">
                <span className="text-xs font-medium text-white inline-block">
                  Summer Sale Now On
                </span>
                <span className="hidden sm:inline text-xs text-blue-200 ml-2">
                  Up to 50% off selected items
                </span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/sale"
            className="relative group px-3 py-1 bg-blue-500/10 backdrop-blur-sm rounded-full 
              border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300
              overflow-hidden"
          >
            <span className="relative z-10 text-xs font-medium text-blue-200 
              group-hover:text-white transition-colors flex items-center gap-1"
            >
              Shop Sale
              <span className="transform group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/40 to-blue-600/0 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </Container>

      {/* Divider Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

      <style>
        {`
          @keyframes wave {
            0% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-45%) translateY(1px); }
            100% { transform: translateX(-50%) translateY(0); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }

          @keyframes waterfall {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          .animate-wave {
            animation: wave 8s ease-in-out infinite;
          }

          .animate-float {
            animation: float var(--duration, 5s) ease-in-out infinite;
          }

          .animate-bob {
            animation: bob 3s ease-in-out infinite;
          }

          .animate-waterfall {
            animation: waterfall 15s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default PromoSection;