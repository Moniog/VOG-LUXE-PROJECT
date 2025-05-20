import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import { ChevronRight } from 'lucide-react';

interface SitemapSection {
  title: string;
  links: {
    name: string;
    path: string;
  }[];
}

const sitemapData: SitemapSection[] = [
  {
    title: 'Shop',
    links: [
      { name: 'All Products', path: '/shop' },
      { name: 'Women', path: '/category/women' },
      { name: 'Men', path: '/category/men' },
      { name: 'Accessories', path: '/category/accessories' }
    ]
  },
  {
    title: 'Information',
    links: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Reviews', path: '/reviews' },
      { name: 'Blog', path: '/blogs' }
    ]
  },
  {
    title: 'Customer Service',
    links: [
      { name: 'Shopping Cart', path: '/cart' },
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Email Preferences', path: '/unsubscribe' }
    ]
  }
];

const SitemapPage: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-white mb-8">Sitemap</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapData.map((section, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              >
                <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="flex items-center text-gray-300 hover:text-white transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SitemapPage;