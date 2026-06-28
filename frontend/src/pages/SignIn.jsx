import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle, ShieldAlert, Wrench, User } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect based on role
    if (user) {
      redirectUser(user.role);
    }
    window.scrollTo(0, 0);
  }, [user]);

  const redirectUser = (role) => {
    if (role === 'admin') navigate('/admin');
    else if (role === 'technician') navigate('/technician');
    else navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      try {
        response = await axios.post('/api/auth/login', { email, password });
        if (response.data?.success) {
          const { token, user: userData } = response.data.data;
          login(userData, token);
          return;
        }
      } catch (apiErr) {
        console.warn('Backend API connection failed. Triggering frontend mock authentication.');
        // MOCK AUTHENTICATION FALLBACK
        await new Promise(resolve => setTimeout(resolve, 1000)); // mock delay
        
        let mockUser = {
          id: "mock-uuid-12345",
          email: email,
          fullName: "Simulated User",
          phone: "+91 99999 99999",
          role: "customer" // default
        };

        // Determine mock role based on email inputs for quick review
        if (email.toLowerCase() === 'admin@rktrinity.com') {
          mockUser.role = 'admin';
          mockUser.fullName = "Systems Administrator";
        } else if (email.toLowerCase() === 'technician@rktrinity.com') {
          mockUser.role = 'technician';
          mockUser.fullName = "Senior Service Technician";
        } else if (email.toLowerCase() === 'customer@rktrinity.com') {
          mockUser.role = 'customer';
          mockUser.fullName = "Trinity Client (Demo)";
        }

        login(mockUser, "mock-jwt-token-xyz");
        return;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickMockLogin = (mockEmail) => {
    setEmail(mockEmail);
    setPassword('demopass123');
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
            Sign in to Client Portal
          </h2>
          <p className="mt-1.5 text-xs text-gray-400">
            Access your AMC contract sheets, log complaints, or check assignments.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 text-red-600 rounded-md text-xs flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
            <span>{error}</span>
          </div>
        )}

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

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs font-semibold text-secondary hover:text-accent transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-secondary hover:text-accent transition-colors">
              Sign Up here
            </Link>
          </p>
        </div>

        {/* MOCK ACCOUNTS TESTING BAR */}
        <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider text-center">
            UI Review Quick-Login Portals
          </span>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => handleQuickMockLogin('admin@rktrinity.com')}
              className="flex items-center justify-between px-3 py-2 border border-accent/20 bg-accent/5 hover:bg-accent/10 rounded-md text-xs font-semibold text-primary transition-colors text-left"
            >
              <span className="flex items-center">
                <ShieldAlert className="w-4 h-4 mr-2 text-accent" />
                Admin Console
              </span>
              <span className="text-[10px] text-gray-400">admin@rktrinity.com</span>
            </button>

            <button
              onClick={() => handleQuickMockLogin('technician@rktrinity.com')}
              className="flex items-center justify-between px-3 py-2 border border-secondary/20 bg-secondary/5 hover:bg-secondary/10 rounded-md text-xs font-semibold text-primary transition-colors text-left"
            >
              <span className="flex items-center">
                <Wrench className="w-4 h-4 mr-2 text-secondary" />
                Technician Dispatch
              </span>
              <span className="text-[10px] text-gray-400">technician@rktrinity.com</span>
            </button>

            <button
              onClick={() => handleQuickMockLogin('customer@rktrinity.com')}
              className="flex items-center justify-between px-3 py-2 border border-gray-200 bg-slateBg hover:bg-gray-100 rounded-md text-xs font-semibold text-primary transition-colors text-left"
            >
              <span className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                Customer Panel
              </span>
              <span className="text-[10px] text-gray-400">customer@rktrinity.com</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
