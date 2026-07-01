import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, LayoutDashboard, LogOut, Wrench, Shield, LogIn } from 'lucide-react';
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
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 border-b border-gray-100/80 ${
      scrolled 
        ? 'bg-white/95 shadow-md backdrop-blur-md' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Info (Left), Centered Logo (Center), Portal (Right) */}
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-1.5 md:py-2' : 'py-3 md:py-4'
        }`}>
          {/* Left Column: Phone Info (Desktop Only) */}
          <div className="hidden md:flex items-center w-1/4 justify-start">
            <a 
              href="tel:+917799383334" 
              className="flex items-center text-sm font-semibold text-slateText hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-accent" />
              <span className="tracking-wide">+91 77993 83334</span>
            </a>
          </div>

          {/* Center Column: Big Company Logo (Centered on both desktop and mobile, with padding constraint on mobile) */}
          <div className="flex justify-center items-center flex-grow md:flex-initial md:w-1/2 px-2 md:px-0">
            <Link to="/" className="flex items-center shrink-0">
              <img 
                src={logoImg} 
                alt="RK TRINITY LIFTS Logo" 
                className={`transition-all duration-300 hover:scale-105 object-contain max-w-[240px] sm:max-w-[280px] md:max-w-none w-auto ${
                  scrolled
                    ? 'h-10 sm:h-12 md:h-14' 
                    : 'h-14 sm:h-18 md:h-20'
                }`}
              />
            </Link>
          </div>

          {/* Right Column: Portal/Dashboard Actions (Desktop Only) */}
          <div className="hidden md:flex items-center w-1/4 justify-end">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center px-4 py-2 border border-accent bg-accent/10 hover:bg-accent text-primary hover:text-white font-semibold text-xs tracking-wider uppercase rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                >
                  {getRoleIcon()}
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 border border-red-500/30 hover:border-red-500 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white font-semibold text-xs tracking-wider uppercase rounded-md transition-colors duration-300"
                  title="Log Out"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center px-5 py-2.5 bg-accent hover:bg-accent-dark text-primary font-bold text-xs tracking-wider uppercase rounded-md shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In / Sign Up
              </Link>
            )}
          </div>

          {/* Mobile Menu Icon (Mobile Only) */}
          <div className="flex md:hidden items-center justify-end w-10 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-primary/10 text-primary hover:text-accent rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Bottom Row: Centered Navigation links (Desktop Only) */}
        <div className={`hidden md:block border-t border-gray-100 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-3.5'
        }`}>
          <nav className="flex items-center justify-center space-x-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-semibold transition-colors text-xs uppercase tracking-wider relative py-1 ${
                    isActive 
                      ? 'text-accent' 
                      : 'text-slateText hover:text-accent'
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
        </div>
      </div>

      {/* Mobile Drawer (Slides Down) */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-b border-gray-100 shadow-2xl transition-all duration-300 overflow-hidden ${
        mobileMenuOpen ? 'max-h-[500px] opacity-100 py-6' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-base font-semibold tracking-wide py-2 border-b border-gray-100/80 ${
                    isActive ? 'text-accent' : 'text-slateText'
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
                  className="flex items-center justify-center w-full px-4 py-3 border border-red-500/30 bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white font-semibold text-center uppercase tracking-wider rounded-md text-sm"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center justify-center w-full px-4 py-3 bg-accent text-primary font-bold text-center uppercase tracking-wider rounded-md text-sm"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
