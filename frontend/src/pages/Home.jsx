import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  ArrowRight, ShieldCheck, Cpu, Clock, Award, 
  Settings, CheckCircle, Phone, Mail, MapPin, 
  ChevronLeft, ChevronRight, Star, Shield, Eye, Flame, Target 
} from 'lucide-react';
import InquiryForm from '../components/InquiryForm';
import passengerLiftImg from '../assets/passenger_lift.png';
import homeLiftImg from '../assets/home_lift.png';
import goodsLiftImg from '../assets/goods_lift.png';
import capsuleLiftImg from '../assets/capsule_lift.png';
import escalatorImg from '../assets/escalator.png';
import liftAssemblyImg from '../assets/lift_assembly.png';
import { productsList } from '../constants/productsData';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);

  const slides = [
    {
      title: "Elevating Safety. Sustaining Reliability.",
      subtitle: "Enterprise Lift Solutions",
      description: "RK TRINITY LIFTS delivers premium-grade elevator engineering, manufacturing, and installation tailored for luxury residences, commercial complexes, and industrial plants.",
      image: passengerLiftImg,
      ctaText: "Explore Products",
      ctaLink: "/products"
    },
    {
      title: "Luxury Home Elevators & Capsule Lifts",
      subtitle: "Bespoke Aesthetics & Architecture",
      description: "Exquisite glass capsule lifts and gearless residential elevators designed to blend seamlessly with your home interior while demanding minimal pit space.",
      image: capsuleLiftImg,
      ctaText: "View Home Lifts",
      ctaLink: "/products/home-lifts"
    },
    {
      title: "Industrial Freight & Heavy Duty Elevators",
      subtitle: "Robust Engineering Capabilities",
      description: "Explosion-proof freight lifts and automated hospital bed elevators certified to operate smoothly under extreme loads and demanding conditions.",
      image: goodsLiftImg,
      ctaText: "Contact Engineers",
      ctaLink: "/contact"
    }
  ];

  const handleNextSlide = () => {
    setActiveSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(handleNextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "1200+", label: "Lifts Installed" },
    { number: "450+", label: "AMC Subscriptions" },
    { number: "24/7", label: "Emergency Support" }
  ];

  const categories = [
    {
      title: "Commercial Lifts",
      description: "High-speed passenger elevators and capsule lifts for office complexes, hotels, and retail malls.",
      image: capsuleLiftImg,
      slug: "commercial-lifts"
    },
    {
      title: "Residential Lifts",
      description: "Compact, gearless home lifts and hydraulic elevators requiring zero head room and minimal power.",
      image: homeLiftImg,
      slug: "residential-lifts"
    },
    {
      title: "Industrial Lifts",
      description: "Robust goods elevators, freight lifts, and hospital stretchers engineered for heavy load stability.",
      image: goodsLiftImg,
      slug: "industrial-lifts"
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Site Consultation",
      desc: "Our structural engineers audit the building shaft dimensions and load requirements."
    },
    {
      num: "02",
      title: "Bespoke Design",
      desc: "We generate custom 2D/3D layout drawings including cabin materials and electrical systems."
    },
    {
      num: "03",
      title: "Manufacturing",
      desc: "Lift components are fabricated under ISO 9001 quality compliance using raw steel."
    },
    {
      num: "04",
      title: "Rigorous Installation",
      desc: "Experienced technicians assemble guide rails, car frames, and testing safety gear overrides."
    },
    {
      num: "05",
      title: "Handover & Service",
      desc: "Safety certifications are verified, and the elevator enters our AMC maintenance pool."
    }
  ];

  const testimonials = [
    {
      name: "Ramanathan Swamy",
      role: "Managing Director",
      company: "Swamy Infrastructure",
      feedback: "RK TRINITY LIFTS provided exceptional service during the installation of 4 commercial elevators in our corporate plaza. Their team was professional, and the lifts have run flawlessly without single downtime.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Anjali Sharma",
      role: "Architectural Lead",
      company: "Sharma & Partners Associates",
      feedback: "We requested a customized capsule elevator for a luxury villa project. The gold-mirror cabin finish and smooth gearless ride surpassed our client's expectations. Truly premium work.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
    }
  ];

  return (
    <div className="relative">
      
      {/* 1. HERO SLIDER SECTION */}
      <section className="relative h-screen bg-primary overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Content Container */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center z-20">
              <div className="max-w-2xl text-white">
                <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent font-semibold text-xs tracking-wider uppercase rounded-full mb-4 animate-pulse">
                  {slide.subtitle}
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-lg text-gray-300 mb-8 leading-relaxed font-sans">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link
                    to={slide.ctaLink}
                    className="flex items-center justify-center px-6 py-3.5 bg-accent hover:bg-accent-dark text-primary font-bold text-sm tracking-wider uppercase rounded-md shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    {slide.ctaText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center px-6 py-3.5 border border-white/40 hover:border-accent hover:bg-white/10 text-white font-bold text-sm tracking-wider uppercase rounded-md transition-all duration-300"
                  >
                    Get Technical Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 border border-white/20 hover:border-accent bg-primary/30 text-white hover:text-accent rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 border border-white/20 hover:border-accent bg-primary/30 text-white hover:text-accent rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* 2. STATS BAR SECTION */}
      <section className="bg-primary-dark border-y border-primary-light/40 relative z-20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-1" data-aos="fade-up" data-aos-delay={idx * 100}>
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-accent block">
                  {stat.number}
                </span>
                <span className="text-xs sm:text-sm text-gray-300 uppercase tracking-widest block font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT US INTRO */}
      <section className="py-20 bg-slateBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative" data-aos="fade-right">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/15 rounded-lg -z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
                alt="Corporate Architecture elevator shaft"
                className="rounded-lg shadow-xl w-full object-cover h-[450px]"
              />
              <div className="absolute bottom-4 right-4 bg-primary text-white p-5 rounded-md shadow-lg border border-primary-light max-w-xs">
                <span className="text-xs text-accent font-bold uppercase tracking-wider block mb-1">Safety First</span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Every elevator is certified under national code requirements and equipped with emergency backup power rescue features.
                </p>
              </div>
            </div>

            <div className="space-y-6" data-aos="fade-left">
              <div className="space-y-2">
                <span className="text-xs text-secondary font-bold uppercase tracking-widest block">
                  Introduction
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-primary leading-tight">
                  Elevating India's High-Rise Infrastructure
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slateText leading-relaxed">
                RK TRINITY LIFTS PVT LTD is an engineering corporation focused on elevator manufacturing, installation, sales, repair, and annual maintenance contracts (AMC). Based in Tirupati, Andhra Pradesh, we design custom systems fitted to modern houses, industrial units, and office shafts.
              </p>
              <p className="text-sm text-slateText/85 leading-relaxed">
                By choosing gearless, energy-efficient permanent magnet synchronous motors (PMSM) and robust hydraulic architectures, we provide silent, low-maintenance vertical transportation systems. Our services guarantee that reliability is never compromised.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center font-bold text-xs uppercase tracking-wider text-secondary hover:text-accent transition-colors group"
                >
                  Read Our Company Story
                  <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="mt-20 border-t border-gray-200/60 pt-16">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs text-secondary font-bold uppercase tracking-widest block mb-2">Our Operating Pillars</span>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-primary">Core Corporate Values</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300" data-aos="fade-up">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-base text-primary mb-2">Absolute Safety</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">Compliant with strict IS codes. We construct lifts following detailed guidelines for maximum passenger security.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300" data-aos="fade-up" data-aos-delay="100">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4">
                  <Eye className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-base text-primary mb-2">Customer Centricity</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">Every installation coordinates with builder parameters, providing tailored shaft optimizations.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300" data-aos="fade-up" data-aos-delay="200">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4">
                  <Flame className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-base text-primary mb-2">Engineering Excellence</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">Incorporating advanced PMSM traction and hydraulic drives for vibration-free operations.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300" data-aos="fade-up" data-aos-delay="300">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-base text-primary mb-2">Sustained Reliability</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">Dedicated AMC monitoring and certified field technician dispatches ensure persistent runtime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-xs text-secondary font-bold uppercase tracking-widest block mb-2">
              Our Products
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-primary mb-4">
              Lift Categories Tailored to Your Architecture
            </h2>
            <p className="text-sm text-gray-500">
              Select an elevator layout optimized for passenger traffic, residential convenience, or heavy loading logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="group bg-slateBg rounded-lg overflow-hidden border border-gray-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-primary mb-2.5">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
                      {cat.description}
                    </p>
                  </div>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="inline-flex items-center text-xs font-bold text-secondary group-hover:text-accent transition-colors mt-auto"
                  >
                    View Category Lifts
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS CATALOG PREVIEW */}
      <section className="py-20 bg-slateBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-xs text-secondary font-bold uppercase tracking-widest block mb-2">
              Featured Catalog
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-primary mb-4">
              Premium Lift Models & Specs
            </h2>
            <p className="text-sm text-gray-500">
              Discover our top dynamic elevator configurations designed for high efficiency and seamless integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productsList.slice(0, 4).map((prod, idx) => (
              <div 
                key={prod.id} 
                className="bg-white rounded-lg p-6 border border-gray-200/80 shadow-premium flex flex-col sm:flex-row gap-6 font-sans"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="sm:w-1/3 shrink-0 h-44 rounded-lg overflow-hidden relative">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-extrabold tracking-wider text-accent">
                        {prod.categoryLabel}
                      </span>
                      {prod.reviews && prod.reviews.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span className="text-[10px] text-slateText font-semibold">
                            {(prod.reviews.reduce((acc, c) => acc + c.rating, 0) / prod.reviews.length).toFixed(1)} ({prod.reviews.length})
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg text-primary mb-2">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                      {prod.shortDesc}
                    </p>
                    <div className="bg-slateBg p-3 rounded text-[11px] text-primary/80 grid grid-cols-2 gap-x-4 gap-y-1 mb-4 font-mono">
                      <div>Capacity: <span className="text-gray-500 font-sans">{prod.specifications.capacity.split('(')[0]}</span></div>
                      <div>Speed: <span className="text-gray-500 font-sans">{prod.specifications.speed}</span></div>
                    </div>
                  </div>
                  <Link 
                    to={`/products/${prod.slug}`} 
                    className="inline-flex items-center text-xs font-bold text-secondary hover:text-accent transition-colors"
                  >
                    View Specifications Sheet
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-secondary text-secondary hover:bg-secondary hover:text-white font-bold text-sm tracking-wider uppercase rounded-md transition-all duration-300"
            >
              Browse Complete Catalog
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-20 bg-slateBg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            <div className="lg:col-span-1 space-y-4" data-aos="fade-right">
              <span className="text-xs text-secondary font-bold uppercase tracking-widest block">
                Quality Standards
              </span>
              <h2 className="font-display font-extrabold text-3xl text-primary leading-tight">
                Why Industry Leaders Trust RK Trinity Lifts
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                We combine German traction motor technology, high-strength structural guide rails, and emergency systems to deliver absolute safety.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary/10 text-secondary rounded-md mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-primary mb-1.5">Safety Certified</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Compliant with BIS guidelines. Features include ARD (Automatic Rescue Device), emergency call triggers, and overspeed governors.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="100">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary/10 text-secondary rounded-md mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-primary mb-1.5">Energy Efficient</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Variable Voltage Variable Frequency (VVVF) controllers reduce power consumption by up to 50% compared to traditional geared motors.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary/10 text-secondary rounded-md mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-primary mb-1.5">Preventive AMC Pools</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Routine monthly diagnostics prevent component wear and reduce the probability of service downtime by over 80%.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="300">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary/10 text-secondary rounded-md mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-primary mb-1.5">Skilled Engineers</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  All systems are assembled and serviced under the supervision of field engineers with a decade of expertise.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR INSTALLATION PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-xs text-secondary font-bold uppercase tracking-widest block mb-2">
              Workflow Setup
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-primary mb-4">
              Our Structured Construction Process
            </h2>
            <p className="text-sm text-gray-500">
              We coordinate closely with civil contractors and builders from initial consultation to final structural safety signoff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative text-center group" data-aos="fade-up" data-aos-delay={idx * 100}>
                {/* Visual connecting line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-[2px] bg-slate-200 group-hover:bg-accent transition-colors z-0"></div>
                )}
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-slateBg group-hover:bg-accent border-2 border-gray-200 group-hover:border-accent text-primary group-hover:text-primary rounded-full font-display font-bold text-lg mb-6 z-10 transition-all duration-300">
                  {step.num}
                </div>
                <h4 className="font-display font-bold text-base text-primary mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DYNAMIC GALLERY SHOWCASE PREVIEW */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16" data-aos="fade-up">
            <div>
              <span className="text-xs text-secondary font-bold uppercase tracking-widest block mb-2">
                Completed Project Portals
              </span>
              <h2 className="font-display font-extrabold text-3xl text-primary">
                Explore Our Modern Installations
              </h2>
            </div>
            <Link 
              to="/gallery"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-secondary hover:text-accent transition-colors mt-4 md:mt-0"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
            <div className="group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-slateBg" data-aos="fade-up">
              <div className="h-52 overflow-hidden relative">
                <img src={escalatorImg} alt="Commercial Atrium Escalator" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <span className="text-[10px] uppercase font-bold text-secondary tracking-widest block mb-1">Escalator</span>
                <h4 className="font-display font-bold text-base text-primary mb-2">Commercial Atrium Escalator</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Dual continuous escalator system installed at Telangana Retail Hub.</p>
              </div>
            </div>

            <div className="group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-slateBg" data-aos="fade-up" data-aos-delay="100">
              <div className="h-52 overflow-hidden relative">
                <img src={capsuleLiftImg} alt="Bespoke Curved Glass Capsule Lift" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <span className="text-[10px] uppercase font-bold text-secondary tracking-widest block mb-1">Completed Site</span>
                <h4 className="font-display font-bold text-base text-primary mb-2">Bespoke Curved Glass Capsule Lift</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Scenic panoramic glass elevator installed in a 5-star hotel lobby.</p>
              </div>
            </div>

            <div className="group rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col bg-slateBg" data-aos="fade-up" data-aos-delay="200">
              <div className="h-52 overflow-hidden relative">
                <img src={liftAssemblyImg} alt="Apartment Shaft PMSM Assembly" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 flex-grow">
                <span className="text-[10px] uppercase font-bold text-secondary tracking-widest block mb-1">Installation Works</span>
                <h4 className="font-display font-bold text-base text-primary mb-2">Apartment Shaft PMSM Assembly</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Engineers aligning structural guide rails and motor assemblies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-20 bg-slateBg border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-xs text-secondary font-bold uppercase tracking-widest block mb-2">
              Testimonials
            </span>
            <h2 className="font-display font-extrabold text-3xl text-primary mb-4">
              What Our Partners Say About Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 sm:p-8 rounded-lg shadow-premium border border-gray-100 flex flex-col justify-between"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div>
                  <div className="flex space-x-1 mb-4">
                    {[...Array(test.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-slateText italic leading-relaxed mb-6">
                    "{test.feedback}"
                  </p>
                </div>
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                  <img
                    src={test.image}
                    alt={test.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h5 className="font-display font-bold text-sm text-primary">{test.name}</h5>
                    <p className="text-xs text-gray-400">{test.role}, {test.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INQUIRY & CONTACT SECTION */}
      <section className="py-20 bg-primary relative text-white" id="inquiry">
        {/* Background geometric accents */}
        <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-secondary-dark/10 rounded-tl-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8" data-aos="fade-right">
              <div className="space-y-3">
                <span className="text-xs text-accent font-bold uppercase tracking-widest block">
                  Quick Inquiry
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                  Let's Discuss Your Vertical Mobility Strategy
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Need a pricing quote or shaft dimension consulting? Fill out the contact form or call our central office to consult a certified lift specialist directly.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-start">
                  <div className="p-2 border border-white/20 bg-white/5 rounded-md mr-4 text-accent shrink-0 text-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-white">Office Location</h5>
                    <p className="text-xs text-gray-300 mt-1">#23-7-62/5, Vasavi Nagar, Tirupati - 517502</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 border border-white/20 bg-white/5 rounded-md mr-4 text-accent shrink-0 text-accent">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-white">Call Specialist</h5>
                    <p className="text-xs text-gray-300 mt-1">0877-2261919 | 7799383334</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 border border-white/20 bg-white/5 rounded-md mr-4 text-accent shrink-0 text-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-white">Email Address</h5>
                    <p className="text-xs text-gray-300 mt-1">trinitylifts@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7" data-aos="fade-left">
              <div className="text-slateText">
                <InquiryForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. GOOGLE MAPS BLOCK */}
      <section className="h-[400px] w-full bg-gray-200 relative" data-aos="zoom-in">
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
