import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';

import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Categories from './components/Categories';
import Features from './components/Features';
import PromoSection from './components/PromoSection';
import Footer from './components/Footer';
import ChatWidget from './components/chat/ChatWidget';

import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import BlogsPage from './pages/BlogsPage';
import BlogPost from './pages/BlogPost';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import UnsubscribePage from './pages/UnsubscribePage';
import NewsletterResubscribePage from './pages/NewsletterResubscribePage';
import SitemapPage from './pages/SitemapPage';
import FAQsPage from './pages/FAQsPage';
import EquilibriumPage from './pages/EquilibriumPage';
import CodeOfEthicsPage from './pages/CodeOfEthicsPage';
import CareersPage from './pages/CareersPage';
import LegalPage from './pages/LegalPage';
import CorporatePage from './pages/CorporatePage';
import SearchPage from './pages/SearchPage';
import ProductPage from './pages/ProductPage';
import SalesPage from './pages/SalesPage';

import TermsPage from './pages/terms/TermsPage';
import TermsAcceptancePage from './pages/terms/TermsAcceptancePage';
import TermsEligibilityPage from './pages/terms/TermsEligibilityPage';
import TermsAccountPage from './pages/terms/TermsAccountPage';
import TermsPrivacyPage from './pages/terms/TermsPrivacyPage';
import TermsProductsPage from './pages/terms/TermsProductsPage';
import TermsOrdersPage from './pages/terms/TermsOrdersPage';
import TermsShippingPage from './pages/terms/TermsShippingPage';
import TermsReturnsPage from './pages/terms/TermsReturnsPage';
import TermsIntellectualPage from './pages/terms/TermsIntellectualPage';
import TermsUserContentPage from './pages/terms/TermsUserContentPage';
import TermsProhibitedPage from './pages/terms/TermsProhibitedPage';
import TermsDisclaimerPage from './pages/terms/TermsDisclaimerPage';
import TermsLiabilityPage from './pages/terms/TermsLiabilityPage';
import TermsIndemnificationPage from './pages/terms/TermsIndemnificationPage';
import TermsTerminationPage from './pages/terms/TermsTerminationPage';
import TermsChangesPage from './pages/terms/TermsChangesPage';
import TermsContactPage from './pages/terms/TermsContactPage';

import ProfilePage from './pages/account/ProfilePage';
import OrderHistoryPage from './pages/account/OrderHistoryPage';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

import BlogEditor from './pages/admin/BlogEditor';
import BlogPosts from './pages/admin/BlogPosts';

import BackgroundVideo from './components/BackgroundVideo'; // 🎥 New video background

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);
  return null;
};

const HomePage = () => {
  useEffect(() => {
    sessionStorage.removeItem('unsubscribeComplete');

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Features />
    </main>
  );
};

function App() {
  useEffect(() => {
    document.title = 'MINIMAL | Premium Essentials';
  }, []);

  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen relative">
            {/* 🎥 Fullscreen Video Background */}
            <BackgroundVideo />

            {/* Site Content */}
            <div className="relative backdrop-blur-sm">
              <div className="relative">
                <PromoSection />
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
              </div>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/sale" element={<SalesPage />} />
                <Route path="/new-arrivals" element={<NewArrivalsPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/unsubscribe" element={<UnsubscribePage />} />
                <Route path="/newsletter" element={<NewsletterResubscribePage />} />
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route path="/faqs" element={<FAQsPage />} />
                <Route path="/equilibrium" element={<EquilibriumPage />} />
                <Route path="/code-of-ethics" element={<CodeOfEthicsPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/corporate" element={<CorporatePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/product/:productId" element={<ProductPage />} />

                {/* Terms */}
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/terms/acceptance" element={<TermsAcceptancePage />} />
                <Route path="/terms/eligibility" element={<TermsEligibilityPage />} />
                <Route path="/terms/account" element={<TermsAccountPage />} />
                <Route path="/terms/privacy" element={<TermsPrivacyPage />} />
                <Route path="/terms/products" element={<TermsProductsPage />} />
                <Route path="/terms/orders" element={<TermsOrdersPage />} />
                <Route path="/terms/shipping" element={<TermsShippingPage />} />
                <Route path="/terms/returns" element={<TermsReturnsPage />} />
                <Route path="/terms/intellectual" element={<TermsIntellectualPage />} />
                <Route path="/terms/user-content" element={<TermsUserContentPage />} />
                <Route path="/terms/prohibited" element={<TermsProhibitedPage />} />
                <Route path="/terms/disclaimer" element={<TermsDisclaimerPage />} />
                <Route path="/terms/liability" element={<TermsLiabilityPage />} />
                <Route path="/terms/indemnification" element={<TermsIndemnificationPage />} />
                <Route path="/terms/termination" element={<TermsTerminationPage />} />
                <Route path="/terms/changes" element={<TermsChangesPage />} />
                <Route path="/terms/contact" element={<TermsContactPage />} />

                {/* Account */}
                <Route path="/account/profile" element={<ProfilePage />} />
                <Route path="/account/orders" element={<OrderHistoryPage />} />

                {/* Auth */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Admin */}
                <Route path="/admin/posts" element={<BlogPosts />} />
                <Route path="/admin/posts/new" element={<BlogEditor />} />
                <Route path="/admin/posts/:id" element={<BlogEditor />} />
              </Routes>
              <Footer />
              <ChatWidget />
            </div>
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
