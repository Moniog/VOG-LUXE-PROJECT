import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight, Phone } from 'lucide-react';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { title: 'Cruise 2026 Fashion Show', path: '/collections/cruise-2026' },
    { title: 'New In', path: '/new-arrivals' },
    { title: 'Handbags', path: '/category/handbags' },
    { title: 'Women', path: '/category/women' },
    { title: 'Men', path: '/category/men' },
    { title: 'Children', path: '/category/children' },
    { title: 'Travel', path: '/category/travel' },
    { title: 'Jewelry & Watches', path: '/category/jewelry-watches' },
    { title: 'Décor & Lifestyle', path: '/category/decor-lifestyle' },
    { title: 'Fragrances & Make-Up', path: '/category/beauty' },
    { title: 'Gifts', path: '/category/gifts' },
  ];

  const serviceLinks = [
    { title: 'Services', path: '/services' },
    { title: 'World of MINIMAL', path: '/about' },
    { title: 'Store Locator', path: '/stores' },
  ];

  const accountLinks = [
    { title: 'Sign In', path: '/login' },
    { title: 'My Orders', path: '/account/orders' },
    { title: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full max-w-md h-full bg-white transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Main Menu */}
            <nav className="p-6 space-y-6">
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center justify-between py-2 hover:text-blue-600 transition-colors group"
                    onClick={onClose}
                  >
                    <span>{item.title}</span>
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center justify-between py-2 hover:text-blue-600 transition-colors group"
                    onClick={onClose}
                  >
                    <span>{item.title}</span>
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                {accountLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center justify-between py-2 hover:text-blue-600 transition-colors group"
                    onClick={onClose}
                  >
                    <span>{item.title}</span>
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <a
              href="tel:+1877482649"
              className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>+1 877 482 2649</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;