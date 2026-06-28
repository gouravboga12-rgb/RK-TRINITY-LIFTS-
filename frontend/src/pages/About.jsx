import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Shield, Eye, Flame, Target, Compass, HardHat, Award } from 'lucide-react';
import passengerLiftImg from '../assets/passenger_lift.png';

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    {
      icon: <Shield className="w-6 h-6 text-accent" />,
      title: "Absolute Safety",
      desc: "Our primary engineering requirement. We exceed national safety code guidelines to build zero-risk elevators."
    },
    {
      icon: <Award className="w-6 h-6 text-accent" />,
      title: "Unmatched Quality",
      desc: "From guide rails to PMSM motors, we source high-quality components for long operating lifespans."
    },
    {
      icon: <Compass className="w-6 h-6 text-accent" />,
      title: "Customer First",
      desc: "We adapt to custom layouts, architect designs, and provide quick emergency response within 24 hours."
    },
    {
      icon: <HardHat className="w-6 h-6 text-accent" />,
      title: "Engineering Excellence",
      desc: "Continuous training ensures our field installation teams follow standard operating procedures."
    }
  ];

  return (
    <div className="bg-slateBg">
      
      {/* 1. PAGE HEADER */}
      <section className="relative bg-primary py-24 sm:py-32 overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary-dark/60 via-primary to-primary-dark"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <span className="inline-block px-3 py-1 bg-accent/20 border border-accent/30 text-accent font-semibold text-xs tracking-wider uppercase rounded-full mb-3">
            Who We Are
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
            Engineering Safer Vertical Mobility
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-300">
            Learn about the values, story, and quality assurance workflows that define RK Trinity Lifts.
          </p>
        </div>
      </section>

      {/* 2. COMPANY STORY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6" data-aos="fade-right">
              <span className="text-xs text-secondary font-bold uppercase tracking-widest block">
                Our Story
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-primary">
                A Legacy Built on Engineering Trust
              </h2>
              <p className="text-sm text-slateText leading-relaxed">
                RK TRINITY LIFTS PVT LTD was founded to solve a critical issue in the construction industry: the lack of highly reliable, custom-engineered elevator systems combined with dependable, long-term maintenance. Based in Tirupati, Andhra Pradesh, we grew from a regional installation contractor into a full-scale lift manufacturer, supplier, and AMC service operator.
              </p>
              <p className="text-sm text-slateText/85 leading-relaxed">
                We believe that elevator systems are the heartbeat of modern buildings. Therefore, we focus on advanced permanent magnet gearless motors and high-pressure hydraulic controls. Our designs prioritize safety, high performance, and silent operation. Over the years, we have expanded to serve corporate offices, hospital facilities, shopping arcades, and luxury residences.
              </p>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left">
              <img
                src={passengerLiftImg}
                alt="Modern premium steel passenger elevator"
                className="rounded-lg shadow-lg w-full object-cover h-[350px]"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-20 bg-slateBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-premium border border-gray-100 flex flex-col items-start" data-aos="fade-up">
              <div className="p-3 bg-secondary/10 text-secondary rounded-lg mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-primary mb-3">Our Vision</h3>
              <p className="text-sm text-slateText leading-relaxed">
                To become India's most trusted engineering brand for vertical transport, leading the industry through technological innovations, sustainable green elevator architectures, and outstanding maintenance response speeds.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-premium border border-gray-100 flex flex-col items-start" data-aos="fade-up" data-aos-delay="150">
              <div className="p-3 bg-secondary/10 text-secondary rounded-lg mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-primary mb-3">Our Mission</h3>
              <p className="text-sm text-slateText leading-relaxed">
                To build high-performance, safe, and energy-efficient elevators that improve building value, backed by transparent annual maintenance contracts, automated tracking, and dedicated technician training.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-xs text-secondary font-bold uppercase tracking-widest block mb-2">
              Our Foundations
            </span>
            <h2 className="font-display font-extrabold text-3xl text-primary">
              The Principles Guarding Every Install
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-slateBg p-6 rounded-lg border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="p-3 bg-white rounded-full shadow-sm mb-4 border border-gray-100">
                  {val.icon}
                </div>
                <h4 className="font-display font-bold text-base text-primary mb-2">{val.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INFRASTRUCTURE & QUALITY ASSURANCE */}
      <section className="py-20 bg-primary text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6" data-aos="fade-right">
              <span className="text-xs text-accent font-bold uppercase tracking-widest block">
                Quality Compliance
              </span>
              <h2 className="font-display font-extrabold text-3xl text-white">
                Engineered under Strict Quality Control Standards
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                RK TRINITY LIFTS operates with an in-house steel fabrication and electronic assembly center. Every control panel cabinet, VVVF drive configuration, and brake drum caliper is tested through over 10,000 cycles under full-load simulators before dispatch.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start">
                  <div className="text-accent mr-3 mt-1 font-bold">✓</div>
                  <div>
                    <h5 className="font-semibold text-sm">PMSM Gearless Traction</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Smooth, lubricant-free operation requiring zero gearbox oil changes.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-accent mr-3 mt-1 font-bold">✓</div>
                  <div>
                    <h5 className="font-semibold text-sm">Interactive Logic Boards</h5>
                    <p className="text-xs text-gray-400 mt-0.5">Microprocessor controllers offering predictive error logs and elevator levelling.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative" data-aos="fade-left">
              <div className="absolute inset-0 bg-secondary/15 rounded-lg filter blur-md transform rotate-1 scale-105"></div>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                alt="Engineering quality assurance testing laboratory"
                className="rounded-lg shadow-2xl w-full object-cover h-[380px] relative z-10"
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
