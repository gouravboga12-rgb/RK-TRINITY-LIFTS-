import React, { useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import InquiryForm from '../components/InquiryForm';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-slateBg min-h-screen">
      
      {/* 1. HEADER */}
      <section className="relative bg-primary py-24 sm:py-32 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary-dark/60 via-primary to-primary-dark"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent font-semibold text-xs tracking-wider uppercase rounded-full mb-3">
            Get In Touch
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
            Connect With Our Engineering Team
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-300">
            Submit your construction blueprints or request elevator repair assistance directly.
          </p>
        </div>
      </section>

      {/* 2. GRID INFO AND FORM */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-5 space-y-8" data-aos="fade-right">
              <div>
                <h2 className="font-display font-extrabold text-2xl text-primary mb-3">
                  RK Trinity Lifts Headquarters
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We service projects across Tirupati and wider Andhra Pradesh & Telangana regions. Contact us to schedule an on-site dimension audit.
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Location */}
                <div className="flex items-start bg-white p-5 rounded-lg border border-gray-200/80 shadow-premium">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-lg mr-4 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-primary mb-1">Company Address</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">#23-7-62/5, Vasavi Nagar, Near New Balaji Colony, M.R. Palli, Tirupati - 517502.</p>
                  </div>
                </div>

                {/* Call */}
                <div className="flex items-start bg-white p-5 rounded-lg border border-gray-200/80 shadow-premium">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-lg mr-4 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-primary mb-1">Call Representative</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Tel: 0877-2261919</p>
                    <p className="text-xs text-gray-500 leading-relaxed">Mob: 7799383334 | 9676824255</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start bg-white p-5 rounded-lg border border-gray-200/80 shadow-premium">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-lg mr-4 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-primary mb-1">Support Email</h4>
                    <p className="text-xs text-gray-300"><a href="mailto:trinitylifts@gmail.com" className="text-gray-500 hover:text-accent font-medium">trinitylifts@gmail.com</a></p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start bg-white p-5 rounded-lg border border-gray-200/80 shadow-premium">
                  <div className="p-3 bg-secondary/10 text-secondary rounded-lg mr-4 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-primary mb-1">Operating Hours</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Monday - Saturday: 09:00 AM - 07:00 PM</p>
                    <p className="text-xs text-amber-600 font-semibold leading-relaxed">24/7 Breakdown Emergency Dispatch Enabled</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7" data-aos="fade-left">
              <InquiryForm />
            </div>

          </div>
        </div>
      </section>

      {/* 3. GOOGLE MAPS IFRAME */}
      <section className="h-[450px] w-full bg-gray-200 relative" data-aos="zoom-in">
        {/* Google Maps Embed iframe for Tirupati, M.R. Palli */}
        <iframe 
          title="RK TRINITY LIFTS Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.666324677761!2d79.39958742514193!3d13.61633510521639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4f4ffd42289f81%3A0xc3cf338805f6e520!2sM.R.Palli%2C%20Tirupati%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1719572620241!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </section>

    </div>
  );
}
