import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slateBg flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-premium border border-gray-100">
        
        {/* Title */}
        <div className="text-center">
          <Link to="/" className="inline-block font-display font-extrabold text-2xl text-primary tracking-tight">
            RK TRINITY <span className="text-accent">LIFTS</span>
          </Link>
          <h2 className="mt-4 font-display font-bold text-xl text-primary">
            Reset Account Password
          </h2>
          <p className="mt-1.5 text-xs text-gray-400">
            Define a strong, secure new password for your client credentials.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 text-red-600 rounded-md text-xs flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 text-green-500 rounded-full">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your password has been successfully reset. You can now use your new credentials to access the client portal dashboard.
            </p>
            <Link
              to="/signin"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs tracking-wider uppercase rounded-md shadow-md transition-colors"
            >
              Sign In Now
            </Link>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                New Password *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full pl-9 pr-4 py-2.5 bg-slateBg border border-gray-200 rounded-md text-sm text-primary placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                Confirm New Password *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full pl-9 pr-4 py-2.5 bg-slateBg border border-gray-200 rounded-md text-sm text-primary placeholder-gray-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs tracking-wider uppercase rounded-md shadow-md transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating Password...
                </>
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
