import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate recovery email send
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
            Recover Password
          </h2>
          <p className="mt-1.5 text-xs text-gray-400">
            Enter your email and we'll dispatch a link to reset your password security credentials.
          </p>
        </div>

        {success ? (
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-50 text-green-500 rounded-full">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              We have dispatched a reset link to **{email}**. Please review your email inbox (and spam folder) to reset your credentials.
            </p>
            <Link
              to="/signin"
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs tracking-wider uppercase rounded-md transition-colors"
            >
              Sign In Page
            </Link>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
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
                  Requesting Reset Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
            
            <div className="text-center pt-2">
              <Link to="/signin" className="inline-flex items-center text-xs font-semibold text-gray-400 hover:text-accent transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Back to Login
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
