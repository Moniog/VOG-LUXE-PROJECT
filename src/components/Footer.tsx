import React from 'react';
import { Link } from 'react-router-dom';
import Container from './layout/Container';
import { Link as LinkIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* May We Help You? */}
          <div>
            <h3 className="text-sm font-light tracking-widest uppercase text-gray-400 mb-6">
              May We Help You?
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  My Order
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/unsubscribe" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  Email Preferences
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* The Company */}
          <div>
            <h3 className="text-sm font-light tracking-widest uppercase text-gray-400 mb-6">
              The Company
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  About VOG LUXURY
                </Link>
              </li>
              <li>
                <Link to="/equilibrium" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  VOG LUXURY Equilibrium
                </Link>
              </li>
              <li>
                <Link to="/code-of-ethics" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  Code of Ethics
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  Legal
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  Privacy & Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/corporate" className="text-gray-300 hover:text-white transition-colors duration-300 font-light underline">
                  Corporate Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Locator & Language */}
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-light tracking-widest uppercase text-gray-400 mb-6">
                Store Locator
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Country/Region, City"
                  className="w-full bg-transparent border-b border-gray-700 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-500"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                  →
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-light tracking-widest uppercase text-gray-400 mb-4">
                Language
              </h3>
              <select className="w-full bg-transparent border-b border-gray-700 py-2 text-gray-300 focus:outline-none focus:border-gray-500">
                <option value="en">ENGLISH</option>
                <option value="fr">FRANÇAIS</option>
                <option value="es">ESPAÑOL</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm font-light tracking-widest uppercase text-gray-400 mb-4">
                Country/Region
              </h3>
              <select className="w-full bg-transparent border-b border-gray-700 py-2 text-gray-300 focus:outline-none focus:border-gray-500">
                <option value="us">UNITED STATES</option>
                <option value="ca">CANADA</option>
                <option value="uk">UNITED KINGDOM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 mt-12 border-t border-gray-800">
          <div className="flex flex-wrap gap-8 items-center justify-between">
            <div className="flex items-center gap-8">
              {/* VOG LUXURY Logo */}
              <div className="flex items-center group">
                <div className="relative">
                  <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-45">
                    <div className="w-3.5 h-3.5 bg-gray-900 rounded-sm transform transition-transform duration-300 group-hover:scale-90" />
                  </div>
                  <div className="absolute -inset-0.5 bg-white/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="ml-2 text-lg font-medium tracking-wide relative overflow-hidden">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white animate-shimmer">
                    VOG LUXURY
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
                </span>
              </div>

              {/* VOG LUXURY Equilibrium Logo */}
              <Link to="/equilibrium" className="flex items-center">
                <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-sm transform rotate-45" />
                </div>
                <span className="ml-2 text-sm font-light text-gray-400 tracking-wider">
                  EQUILIBRIUM
                </span>
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              © 2016 - 2025 VOG LUXURY Group S.p.A. - All rights reserved
            </p>
          </div>
        </div>
      </Container>

      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }

          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          .animate-shimmer {
            animation: shimmer 8s linear infinite;
            background-size: 200% auto;
          }

          .animate-shine {
            animation: shine 4s linear infinite;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;