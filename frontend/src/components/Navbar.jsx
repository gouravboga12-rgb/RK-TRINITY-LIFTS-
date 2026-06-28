import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, LayoutDashboard, LogOut, Wrench, Shield } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const getDashboardPath = () => {
    if (!user) return '/signin';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'technician') return '/technician';
    return '/dashboard';
  };

  const getRoleIcon = () => {
    if (!user) return null;
    if (user.role === 'admin') return <Shield className="w-4 h-4 mr-1.5 text-accent" />;
    if (user.role === 'technician') return <Wrench className="w-4 h-4 mr-1.5 text-accent" />;
    return <LayoutDashboard className="w-4 h-4 mr-1.5 text-accent" />;
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-primary/95 shadow-lg backdrop-blur-md py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Company Name */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoImg} 
              alt="RK TRINITY LIFTS Logo" 
              className="h-24 md:h-32 w-auto object-contain my-[-20px] md:my-[-30px] transition-transform duration-300 hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation Link Items */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium transition-colors text-sm uppercase tracking-wider relative py-1 ${
                    isActive 
                      ? 'text-accent' 
                      : 'text-gray-200 hover:text-accent'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Side CTA & Portals */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:+917799383334" 
              className="flex items-center text-sm font-semibold text-gray-200 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4 mr-1.5 text-accent" />
              +91 77993 83334
            </a>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center px-4 py-2 border border-accent/30 bg-accent/10 hover:bg-accent text-white font-semibold text-xs tracking-wider uppercase rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                >
                  {getRoleIcon()}
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="p-2 border border-red-500/30 hover:border-red-500 bg-red-500/10 hover:bg-red-500 text-white rounded-md transition-colors duration-300"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center px-5 py-2.5 bg-accent hover:bg-accent-dark text-primary font-bold text-xs tracking-wider uppercase rounded-md shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                Client Portal
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center space-x-3">
            <a 
              href="tel:+917799383334" 
              className="p-2 bg-secondary/30 border border-gray-500/20 text-accent rounded-md"
              title="Call Us"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-gray-500/20 text-gray-200 hover:text-white rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Slides Down) */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-primary-dark/95 border-t border-primary-light backdrop-blur-lg shadow-2xl transition-all duration-300 overflow-hidden ${
        mobileMenuOpen ? 'max-h-[500px] opacity-100 py-6 border-b' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base font-semibold tracking-wide py-2 border-b border-primary-light/50 ${
                    isActive ? 'text-accent' : 'text-gray-200'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="pt-2 flex flex-col space-y-3">
            {user ? (
              <div className="space-y-2">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center justify-center w-full px-4 py-3 bg-accent text-primary font-bold text-center uppercase tracking-wider rounded-md text-sm"
                >
                  {getRoleIcon()}
                  Go to Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center justify-center w-full px-4 py-3 border border-red-500/30 bg-red-500/10 text-white font-semibold text-center uppercase tracking-wider rounded-md text-sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center justify-center w-full px-4 py-3 bg-accent text-primary font-bold text-center uppercase tracking-wider rounded-md text-sm"
              >
                Client Portal Login
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
