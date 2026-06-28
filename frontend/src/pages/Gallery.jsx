import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Eye, Image as ImageIcon, Sparkles } from 'lucide-react';
import escalatorImg from '../assets/escalator.png';
import capsuleLiftImg from '../assets/capsule_lift.png';
import liftAssemblyImg from '../assets/lift_assembly.png';
import homeLiftImg from '../assets/home_lift.png';
import liftControllerImg from '../assets/lift_controller.png';
import glassElevatorImg from '../assets/glass_elevator.png';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  const galleryItems = [
    {
      id: 1,
      title: "Commercial Atrium Escalator",
      category: "escalator",
      image: escalatorImg,
      description: "Dual continuous escalator system installed at Telangana Retail Hub."
    },
    {
      id: 2,
      title: "Bespoke Curved Glass Capsule Lift",
      category: "completed",
      image: capsuleLiftImg,
      description: "Scenic panoramic glass elevator installed in a 5-star hotel lobby."
    },
    {
      id: 3,
      title: "Apartment Shaft PMSM Assembly",
      category: "installation",
      image: liftAssemblyImg,
      description: "Engineers aligning structural guide rails and VVVF traction motor assemblies."
    },
    {
      id: 4,
      title: "Penthouse Gearless Home Lift",
      category: "completed",
      image: homeLiftImg,
      description: "Compact single-phase gearless elevator with customized rose-gold mirror trim."
    },
    {
      id: 5,
      title: "Heavy Cargo Lift Controller Panel",
      category: "installation",
      image: liftControllerImg,
      description: "Calibrating microprocessor safety override circuitry in an industrial freight lift."
    },
    {
      id: 6,
      title: "Duplex Villa Hydraulic Elevators",
      category: "completed",
      image: glassElevatorImg,
      description: "Glass facade lift requiring shallow pit depth, custom fitted for duplex residences."
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  const tabs = [
    { value: 'all', label: 'All Projects' },
    { value: 'completed', label: 'Completed Sites' },
    { value: 'installation', label: 'Installation Works' },
    { value: 'escalator', label: 'Escalators' }
  ];

  return (
    <div className="bg-slateBg min-h-screen">
      
      {/* 1. HEADER */}
      <section className="relative bg-primary py-24 sm:py-32 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary-dark/60 via-primary to-primary-dark"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent font-semibold text-xs tracking-wider uppercase rounded-full mb-3">
            Portfolio Media
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
            Engineering Gallery
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-300">
            Real photos from our construction sites, mechanical motor layouts, and finalized custom cabins.
          </p>
        </div>
      </section>

      {/* 2. TABS */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md border transition-all duration-300 ${
                  activeTab === tab.value
                    ? 'bg-secondary border-secondary text-white shadow-md'
                    : 'bg-slateBg border-gray-200 text-slateText hover:border-gray-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GRID */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 shadow-premium hover:shadow-2xl transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={(idx % 3) * 100}
              >
                {/* Media Image Wrap */}
                <div className="relative h-64 overflow-hidden bg-primary">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Hover Panel */}
                  <div className="absolute inset-0 bg-primary/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-10">
                    <span className="p-3 bg-white text-primary rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-5 h-5 text-secondary" />
                    </span>
                  </div>
                </div>

                {/* Description Bottom panel */}
                <div className="p-5 border-t border-gray-100">
                  <div className="flex items-center space-x-1.5 mb-1.5">
                    <ImageIcon className="w-4.5 h-4.5 text-accent" />
                    <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{item.category}</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-primary mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
