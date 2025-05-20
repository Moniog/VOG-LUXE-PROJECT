import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const images = [
  'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
  'https://images.pexels.com/photos/6626967/pexels-photo-6626967.jpeg',
  'https://images.pexels.com/photos/5704849/pexels-photo-5704849.jpeg'
];

const LoadingScreen: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setFadeIn(true);
      }, 500);
    }, 3000);

    return () => clearInterval(imageInterval);
  }, []);

  return (
    <div className="relative min-h-[400px] rounded-xl overflow-hidden">
      {/* Background Images */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Loading Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className="animate-float">
          <Loader2 className="w-12 h-12 text-white animate-spin" />
        </div>
        
        <div className="mt-6 text-center animate-float" style={{ animationDelay: '0.2s' }}>
          <p className="text-white text-xl font-medium animate-pulse">Loading...</p>
          <p className="text-white/70 mt-2">Preparing your shopping experience</p>
        </div>
      </div>

      {/* Reduced Motion */}
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            .animate-float, .animate-pulse {
              animation: none;
            }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .animate-float {
            animation: float 2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;