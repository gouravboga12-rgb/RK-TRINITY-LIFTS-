import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productLinks = [
    { name: 'Passenger Lifts', path: '/products/passenger-lifts' },
    { name: 'Home Lifts', path: '/products/home-lifts' },
    { name: 'Hospital Lifts', path: '/products/hospital-lifts' },
    { name: 'Hydraulic Lifts', path: '/products/hydraulic-lifts' },
    { name: 'Capsule & MRL Lifts', path: '/products/capsule-lifts' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Products', path: '/products' },
    { name: 'Project Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <footer className="bg-primary text-gray-400 font-sans border-t border-primary-light/50">
      {/* Top Footer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-primary-light/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h3 className="font-display font-bold text-2xl text-white">
              Need a Custom Lift Solution for your Building?
            </h3>
            <p className="mt-2 text-sm text-gray-400 max-w-xl">
              We design, manufacture, install and maintain customized elevators for residential, commercial and heavy industrial requirements. Contact us for a free technical consultation.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3.5 bg-accent hover:bg-accent-dark text-primary font-bold text-sm tracking-wider uppercase rounded-md shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Get a Free Quote
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Info */}
          <div className="space-y-6">
            <Link to="/" onClick={handleScrollToTop} className="flex items-center">
              <img 
                src={logoImg} 
                alt="RK TRINITY LIFTS Logo" 
                className="h-28 md:h-36 w-auto object-contain my-[-25px] md:my-[-35px]" 
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Elevating safety and sustaining reliability across India. We manufacture and service high-quality residential, commercial, and freight lifts.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="p-2 border border-gray-700 hover:border-accent hover:text-accent rounded-full transition-colors flex items-center justify-center w-8 h-8">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 8H7v3h2v9h3v-9h2.72l.42-3H12V6.62c0-.88.21-1.12.87-1.12H14V2h-2.62C8.68 2 7 3.5 7 6.38V8h2z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter (X)" className="p-2 border border-gray-700 hover:border-accent hover:text-accent rounded-full transition-colors flex items-center justify-center w-8 h-8">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 border border-gray-700 hover:border-accent hover:text-accent rounded-full transition-colors flex items-center justify-center w-8 h-8">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="font-display text-white text-base font-semibold tracking-wider uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    onClick={handleScrollToTop}
                    className="hover:text-accent hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products Categories */}
          <div>
            <h4 className="font-display text-white text-base font-semibold tracking-wider uppercase mb-6">
              Our Products
            </h4>
            <ul className="space-y-3.5 text-sm">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    onClick={handleScrollToTop}
                    className="hover:text-accent hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h4 className="font-display text-white text-base font-semibold tracking-wider uppercase mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-accent mr-3 mt-0.5 shrink-0" />
                <span className="text-gray-300">#23-7-62/5, Vasavi Nagar, Near New Balaji Colony, M.R. Palli, Tirupati - 517502.</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-accent mr-3 mt-1.5 shrink-0" />
                <div>
                  <a href="tel:08772261919" className="text-gray-300 hover:text-accent transition-colors block">
                    Tel: 0877-2261919
                  </a>
                  <a href="tel:+917799383334" className="text-gray-300 hover:text-accent transition-colors block mt-0.5">
                    Mob: 7799383334 / 9676824255
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-accent mr-3 shrink-0" />
                <a href="mailto:trinitylifts@gmail.com" className="text-gray-300 hover:text-accent transition-colors">
                  trinitylifts@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Sub-footer Copyright */}
      <div className="bg-primary-dark/80 py-6 border-t border-primary-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="text-gray-500">
            &copy; {currentYear} RK TRINITY LIFTS PVT LTD. All Rights Reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-gray-500">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
