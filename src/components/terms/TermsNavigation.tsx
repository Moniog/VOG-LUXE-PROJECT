import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TermsNavigation = () => {
  const location = useLocation();
  
  const links = [
    { path: '/terms', label: 'Overview' },
    { path: '/terms/acceptance', label: 'Acceptance' },
    { path: '/terms/eligibility', label: 'Eligibility' },
    { path: '/terms/account', label: 'Account' },
    { path: '/terms/privacy', label: 'Privacy' },
    { path: '/terms/products', label: 'Products' },
    { path: '/terms/orders', label: 'Orders' },
    { path: '/terms/shipping', label: 'Shipping' },
    { path: '/terms/returns', label: 'Returns' },
    { path: '/terms/intellectual', label: 'Intellectual Property' },
    { path: '/terms/user-content', label: 'User Content' },
    { path: '/terms/prohibited', label: 'Prohibited Uses' },
    { path: '/terms/disclaimer', label: 'Disclaimers' },
    { path: '/terms/liability', label: 'Limitation of Liability' },
    { path: '/terms/indemnification', label: 'Indemnification' },
    { path: '/terms/termination', label: 'Termination' },
    { path: '/terms/changes', label: 'Changes to Terms' },
    { path: '/terms/contact', label: 'Contact Us' },
  ];

  return (
    <nav className="bg-white/5 backdrop-blur-lg rounded-lg shadow-lg p-4">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`block px-4 py-2 rounded-md transition-colors ${
                location.pathname === link.path
                  ? 'bg-blue-500/20 text-blue-300'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TermsNavigation;