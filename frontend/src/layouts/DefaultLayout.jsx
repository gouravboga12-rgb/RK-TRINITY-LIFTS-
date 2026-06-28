import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function DefaultLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-slateBg">
      {/* Top sticky navigation bar */}
      <Navbar />

      {/* Main viewport contents */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Floating social connection triggers */}
      <WhatsAppButton />

      {/* Footer information blocks */}
      <Footer />
    </div>
  );
}
