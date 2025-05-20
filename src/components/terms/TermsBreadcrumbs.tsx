import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TermsBreadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="mb-8">
      <ol className="flex items-center space-x-2 text-sm text-gray-400">
        <li>
          <Link to="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          
          // Format the segment for display (capitalize and replace hyphens)
          const formattedSegment = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

          return (
            <React.Fragment key={path}>
              <li className="text-gray-500">/</li>
              <li>
                {isLast ? (
                  <span className="text-white">{formattedSegment}</span>
                ) : (
                  <Link to={path} className="hover:text-white transition-colors">
                    {formattedSegment}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default TermsBreadcrumbs;