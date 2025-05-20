import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import { emailService } from '../lib/email';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const NewsletterResubscribePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'error'>('initial');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const success = await emailService.subscribe(email);
      if (success) {
        setStatus('success');
      } else {
        throw new Error('Failed to resubscribe');
      }
    } catch (error) {
      console.error('Error resubscribing:', error);
      setStatus('error');
      setErrorMessage('An error occurred while processing your request');
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-16">
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
        <div className="max-w-lg mx-auto relative">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
            {status === 'loading' ? (
              <div className="text-center py-8">
                <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
                <p className="text-gray-300">Processing your request...</p>
              </div>
            ) : status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-4">Welcome Back!</h1>
                <p className="text-gray-300 mb-6">
                  You've successfully resubscribed to our newsletter. We're excited to share our latest updates with you!
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Return to Homepage
                </Link>
              </div>
            ) : status === 'error' ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-4">Oops!</h1>
                <p className="text-red-400 mb-6">{errorMessage}</p>
                <Button onClick={() => setStatus('initial')}>Try Again</Button>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-white mb-4">
                    Resubscribe to Our Newsletter
                  </h1>
                  <p className="text-gray-300">
                    Stay updated with our latest collections, exclusive offers, and style tips.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white"
                      placeholder="Enter your email"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Resubscribe
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NewsletterResubscribePage;