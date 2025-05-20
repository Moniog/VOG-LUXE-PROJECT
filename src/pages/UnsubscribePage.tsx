import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import { emailService } from '../lib/email';
import { Loader2, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

const UnsubscribePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'error' | 'invalid'>('initial');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [preferences, setPreferences] = useState<{
    marketing: boolean;
    newsletter: boolean;
    productUpdates: boolean;
  }>({
    marketing: true,
    newsletter: true,
    productUpdates: true
  });

  useEffect(() => {
    const processUnsubscribe = async () => {
      const emailParam = searchParams.get('email');
      if (!emailParam) {
        setStatus('initial');
        return;
      }

      setEmail(emailParam);
      setStatus('loading');

      try {
        // Validate email format
        if (!isValidEmail(emailParam)) {
          setStatus('invalid');
          setErrorMessage('Invalid email address format');
          return;
        }

        // Check if email exists in our system
        const { data: subscriber } = await supabase
          .from('email_subscribers')
          .select('preferences, status')
          .eq('email', emailParam)
          .single();

        if (!subscriber) {
          setStatus('invalid');
          setErrorMessage('Email address not found in our system');
          return;
        }

        if (subscriber.status === 'unsubscribed') {
          setStatus('invalid');
          setErrorMessage('This email is already unsubscribed');
          return;
        }

        setPreferences(subscriber.preferences);
        setStatus('initial');
      } catch (error) {
        console.error('Error checking subscription:', error);
        setStatus('error');
        setErrorMessage('An error occurred while processing your request');
      }
    };

    processUnsubscribe();
  }, [searchParams]);

  const handleUnsubscribe = async () => {
    setStatus('loading');
    try {
      const success = await emailService.unsubscribe(email);
      if (success) {
        setStatus('success');
      } else {
        throw new Error('Failed to unsubscribe');
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
      setStatus('error');
      setErrorMessage('An error occurred while processing your unsubscribe request');
    }
  };

  const handlePreferencesUpdate = async () => {
    setStatus('loading');
    try {
      const success = await emailService.updatePreferences(email, preferences);
      if (success) {
        setStatus('success');
      } else {
        throw new Error('Failed to update preferences');
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      setStatus('error');
      setErrorMessage('An error occurred while updating your preferences');
    }
  };

  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-400 mb-4" />
                <p className="text-gray-300">Processing your request...</p>
              </div>
            ) : status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-4">
                  Changes Saved Successfully
                </h1>
                <p className="text-gray-300 mb-6">
                  Your email preferences have been updated. You can resubscribe or modify your preferences at any time.
                </p>
                <div className="space-y-4">
                  <Link to="/" className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Return to Homepage
                  </Link>
                  <Link
                    to="/newsletter"
                    className="block text-sm text-blue-400 hover:text-blue-300"
                  >
                    Resubscribe to our newsletter
                  </Link>
                </div>
              </div>
            ) : status === 'error' || status === 'invalid' ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-4">
                  {status === 'invalid' ? 'Invalid Request' : 'Something Went Wrong'}
                </h1>
                <p className="text-gray-300 mb-6">{errorMessage}</p>
                <Link to="/" className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-800/50 border border-gray-700/50 rounded-lg hover:bg-gray-700/50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return to Homepage
                </Link>
              </div>
            ) : (
              <div className="py-8">
                <div className="flex items-center justify-center mb-8">
                  <Mail className="w-12 h-12 text-blue-400" />
                </div>
                <h1 className="text-2xl font-bold text-white text-center mb-8">
                  Email Preferences
                </h1>
                
                <div className="mb-8">
                  <p className="text-gray-300 text-center">
                    Update your email preferences for:
                    <br />
                    <span className="text-white font-medium">{email}</span>
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <label className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg cursor-pointer">
                    <div>
                      <span className="text-white font-medium">Marketing Emails</span>
                      <p className="text-sm text-gray-400">Promotions, discounts, and special offers</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        marketing: e.target.checked
                      }))}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg cursor-pointer">
                    <div>
                      <span className="text-white font-medium">Newsletter</span>
                      <p className="text-sm text-gray-400">Weekly updates and style guides</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.newsletter}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        newsletter: e.target.checked
                      }))}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg cursor-pointer">
                    <div>
                      <span className="text-white font-medium">Product Updates</span>
                      <p className="text-sm text-gray-400">New arrivals and product announcements</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.productUpdates}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        productUpdates: e.target.checked
                      }))}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                    />
                  </label>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handlePreferencesUpdate}
                    className="w-full"
                  >
                    Save Preferences
                  </Button>
                  
                  <Button
                    onClick={handleUnsubscribe}
                    variant="outline"
                    className="w-full text-red-400 hover:text-red-300 border-red-400/50 hover:border-red-300/50"
                  >
                    Unsubscribe from all emails
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-gray-700/50 text-center">
              <p className="text-sm text-gray-400">
                MINIMAL<br />
                123 Fashion Street<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UnsubscribePage;