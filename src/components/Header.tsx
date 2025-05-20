import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, Heart, ShoppingBag } from 'lucide-react';
import Container from './layout/Container';
import { supabase } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state: { items: cartItems }, toggleCart } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'SHOP', path: '/shop' },
    { name: 'BLOGS', path: '/blogs' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <header className="fixed top-12 left-0 right-0 z-50 px-4">
      <Container>
        <div className={`rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl border-2 border-gray-800/50' 
            : 'bg-gray-900/90 backdrop-blur-md border-2 border-gray-800/30'
        }`}>
          <div className="flex items-center justify-between h-14 px-6">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-45">
                    <div className="w-3.5 h-3.5 bg-blue-600 rounded-sm transform transition-transform duration-300 group-hover:scale-90" />
                  </div>
                  <div className="absolute -inset-0.5 bg-white/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="text-lg font-medium tracking-wide relative overflow-hidden">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white animate-shimmer">
                    VOG LUXURY
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.path)}
                  className={`text-sm font-medium transition-all duration-200 relative ${
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-200 ${
                    location.pathname === link.path ? 'scale-x-100' : 'scale-x-0'
                  }`} />
                </button>
              ))}
            </nav>

            {/* Desktop Right Icons */}
            <div className="hidden md:flex items-center space-x-5">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-blue-100 hover:text-white transition-colors relative group"
              >
                <Search className="h-5 w-5" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  SEARCH
                </span>
              </button>

              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-blue-100 hover:text-white transition-colors relative group"
                >
                  <User className="h-5 w-5" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ACCOUNT
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-800/50 py-1">
                    {user ? (
                      <>
                        {user.email && (
                          <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-800/50">
                            {user.email}
                          </div>
                        )}
                        <button
                          onClick={() => handleNavigation('/account/profile')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => handleNavigation('/account/orders')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50"
                        >
                          Orders
                        </button>
                        {user.user_metadata?.role === 'admin' && (
                          <button
                            onClick={() => handleNavigation('/admin/posts')}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50"
                          >
                            Admin Dashboard
                          </button>
                        )}
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800/50"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleNavigation('/login')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50"
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => handleNavigation('/register')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50"
                        >
                          Create Account
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button 
                onClick={() => handleNavigation('/wishlist')}
                className="text-blue-100 hover:text-white transition-colors relative group"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-blue-600 text-white text-xs font-medium rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  WISHLIST
                </span>
              </button>

              <button 
                onClick={toggleCart}
                className="relative group"
              >
                <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 transition-all duration-300 group-hover:bg-blue-600/30 group-hover:border-blue-400/50">
                  <ShoppingBag className="w-4 h-4 text-blue-100 group-hover:text-white transition-colors" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-blue-600 text-white text-xs font-medium rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  CART
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden text-white hover:text-blue-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isSearchOpen ? 'h-16' : 'h-0'
            }`}
          >
            <div className="px-6 py-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories, and more..."
                  className="w-full px-10 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white placeholder-gray-400"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </form>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-6 py-4 border-t border-gray-800/50">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavigation(link.path)}
                    className={`text-base font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-white'
                        : 'text-blue-100 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}

                {user ? (
                  <>
                    <button
                      onClick={() => handleNavigation('/account/profile')}
                      className="text-base font-medium text-blue-100 hover:text-white transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleNavigation('/account/orders')}
                      className="text-base font-medium text-blue-100 hover:text-white transition-colors"
                    >
                      Orders
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="text-base font-medium text-red-400 hover:text-red-300 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavigation('/login')}
                      className="text-base font-medium text-blue-100 hover:text-white transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleNavigation('/register')}
                      className="text-base font-medium text-blue-100 hover:text-white transition-colors"
                    >
                      Create Account
                    </button>
                  </>
                )}
              </nav>

              <div className="mt-6 flex items-center space-x-6">
                <button 
                  onClick={() => handleNavigation('/search')}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => handleNavigation('/wishlist')}
                  className="text-blue-100 hover:text-white transition-colors relative"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-blue-600 text-white text-xs font-medium rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={toggleCart}
                  className="relative"
                >
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 backdrop-blur-sm border border-blue-500/30">
                    <ShoppingBag className="w-4 h-4 text-blue-100" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-blue-600 text-white text-xs font-medium rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            </div>
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
    </header>
  );
};

export default Header;