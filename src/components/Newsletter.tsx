import React, { useState } from 'react';
import Container from './layout/Container';
import Button from './ui/Button';
import { emailService } from '../lib/email';
import { Loader2, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const success = await emailService.subscribe(email);
      if (success) {
        setStatus('success');
        setMessage('Please check your email to confirm your subscription.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Unable to subscribe. Please try again later.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-16">
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
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-xl mb-6">
            <Mail className="w-6 h-6 text-blue-400" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to receive updates on new arrivals, special offers, and styling tips.
          </p>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-blue-500/50 text-white placeholder-gray-400"
              />
              <Button 
                type="submit" 
                disabled={loading}
                className="relative"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>

            {status !== 'idle' && (
              <div className={`mt-4 p-4 rounded-lg ${
                status === 'success' 
                  ? 'bg-green-500/10 border border-green-500/50 text-green-400'
                  : 'bg-red-500/10 border border-red-500/50 text-red-400'
              }`}>
                <p>{message}</p>
              </div>
            )}
            
            <div className="mt-6 text-sm text-gray-400">
              <p>
                By subscribing, you agree to our{' '}
                <Link to="/privacy-policy" className="text-blue-400 hover:text-blue-300">
                  Privacy & Cookies Policy
                </Link>
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <Link 
                to="/unsubscribe" 
                className="inline-flex items-center text-gray-400 hover:text-white text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Unsubscribe from our mailing list
              </Link>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <p>MINIMAL</p>
            <p>123 Fashion Street, New York, NY 10001</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;