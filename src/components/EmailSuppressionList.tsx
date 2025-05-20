import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { AlertCircle, Loader2 } from 'lucide-react';

interface SuppressionEntry {
  email: string;
}

const EmailSuppressionList: React.FC = () => {
  const [suppressedEmails, setSuppressedEmails] = useState<SuppressionEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuppressedEmails = async () => {
      try {
        const { data, error } = await supabase
          .from('email_suppression')
          .select('email');

        if (error) throw error;
        setSuppressedEmails(data || []);
      } catch (err: any) {
        console.error('Error fetching suppressed emails:', err);
        setError(err.message || 'Failed to fetch suppressed emails');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppressedEmails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
      <h2 className="text-xl font-bold text-white mb-4">Suppressed Emails</h2>
      {suppressedEmails.length === 0 ? (
        <p className="text-gray-400">No suppressed emails found.</p>
      ) : (
        <ul className="space-y-2">
          {suppressedEmails.map((entry, index) => (
            <li 
              key={index}
              className="text-gray-300 py-2 px-4 bg-gray-700/50 rounded-lg"
            >
              {entry.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailSuppressionList;