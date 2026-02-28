import React, { useState, useEffect, useRef } from 'react';

import {
  Phone, Mail, MapPin, Facebook, Instagram, Linkedin,
  ArrowRight, Shield, Truck, Award,
  Stethoscope, Microscope, Zap, Bed, Wrench, Users, Building2
} from 'lucide-react';
import { Package } from 'lucide-react';
import { SiX } from 'react-icons/si';

// Import Navbar and other assets
import Navbar from '../components/NavberLandingPage'; // Adjust path based on your folder structure
import companyLogo from '../assets/company-logo.png';
import med1 from '../assets/med1.jpg'
import med2 from '../assets/med2.jpg'
import med3 from '../assets/med3.jpg'
import med4 from '../assets/med4.jpg'
import snapcode from '../assets/snapcode.png';

// --- Enhanced useInView hook with Lenis support
function useInView(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { 
        threshold,
        rootMargin: '50px 0px -50px 0px'
      }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  
  return [ref, inView] as const;
}

/**
 * Enhanced AnimatedCounter Component with better timing
 */
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2500,
  suffix = ''
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;
    
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration, hasAnimated]);

  return (
    <span
      ref={counterRef}
      className={`font-bold text-2xl sm:text-3xl text-orange-400 inline-block transition-all duration-700 ease-out ${
        isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
      }`}
    >
      {count.toLocaleString()}{suffix}
    </span>
  );
};

/**
 * ImageSlider — dots removed, smoother transition, infinite forward loop (no reverse)
 */
interface ImageSliderProps {
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ className = '' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Advanced Diagnostic Equipment',
      description: 'State-of-the-art medical imaging and diagnostic tools'
    },
    {
      image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Surgical Instruments',
      description: 'Precision surgical tools and equipment for medical professionals'
    },
    {
      image: 'https://www.shutterstock.com/image-photo/portrait-man-doctor-standing-team-600nw-2478537933.jpg',
      title: 'Laboratory Equipment',
      description: 'Complete laboratory solutions for accurate testing and analysis'
    },
    {
      image: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Patient Monitoring Systems',
      description: 'Advanced monitoring equipment for patient care and safety'
    },
    { image: med1, title: 'Advanced Monitoring', description: 'Real-time patient monitoring solutions' },
    { image: med2, title: 'Laboratory Excellence', description: 'Precision testing equipment' },
    { image: med4, title: 'Surgical Precision', description: 'Professional surgical instruments' },
    { image: med3, title: 'Diagnostic Solutions', description: 'Comprehensive diagnostic tools' },
  ];

  // Append clone of first slide at end for seamless infinite loop
  const extendedSlides = [...slides, slides[0]];
  const totalReal = slides.length;

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide(prev => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  // When we land on the clone (index === totalReal), silently snap back to index 0
  const handleTransitionEnd = () => {
    if (currentSlide === totalReal) {
      setIsTransitioning(false); // disable CSS transition instantly
      setCurrentSlide(0);        // snap to real first slide
    }
  };

  // Re-enable transition after the silent snap (double rAF to ensure paint happened)
  useEffect(() => {
    if (!isTransitioning && currentSlide === 0) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning, currentSlide]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-none border-0 shadow-none group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={sliderRef}
        className="flex h-full"
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: isTransitioning
            ? 'transform 800ms cubic-bezier(0.76, 0, 0.24, 1)'
            : 'none',
          willChange: 'transform',
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="w-full h-full shrink-0 relative group">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover brightness-100 contrast-100 transition-all duration-700 hover:scale-105 sm:hover:scale-110 hover:brightness-110"
            />

            {/* Text overlay */}
            <div
              className={`absolute inset-0 z-20 flex flex-col justify-start pointer-events-none ${
                index === currentSlide ||
                (currentSlide === totalReal && index === totalReal)
                  ? 'opacity-100'
                  : 'opacity-0'
              } transition-opacity duration-700`}
            >
              <div className="w-full h-screen flex items-center justify-start">
                <div
                  className="w-full max-w-2xl h-full px-10 py-12 flex flex-col justify-center"
                  style={{ background: 'rgba(0, 0, 0, 0.54)' }}
                >
                  <h3 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
                    {slide.title}
                  </h3>
                  <p className="text-lg sm:text-xl font-medium text-orange-300 leading-relaxed">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots removed */}
    </div>
  );
};

/**
 * Enhanced Hero Section with full-screen image and overlay text
 */
const Hero: React.FC = () => {
  const [ref, inView] = useInView(0.1);

  const features = [
    { icon: Shield, title: "Quality Assured", desc: "ISO Certified Products" },
    { icon: Truck, title: "Fast Delivery", desc: "Nationwide Shipping" },
    { icon: Award, title: "Best Prices", desc: "Wholesale Rates" },
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Full-screen Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <ImageSlider className="w-full h-full object-cover" />
      </div>

      {/* Overlay Text Content */}
      <div
        className="relative z-10 flex flex-col justify-end"
        style={{ minHeight: "calc(100vh - 120px)", padding: "0 2.5rem 3rem" }}
      >
        <div
          className="max-w-xl"
          style={{
            animation: inView ? "fadeSlideUp 0.7s ease forwards" : "none",
            opacity: 0,
          }}
        >
          {/* Add your text/content here */}
        </div>
      </div>

      {/* FeatureBar Component */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <FeatureBar features={features} />
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

// FeatureBar Component
interface FeatureBarProps {
  features: Array<{
    icon: React.ComponentType<any>;
    title: string;
    desc: string;
  }>;
}

const FeatureBar: React.FC<FeatureBarProps> = ({ features }) => {
  const marqueeItems = [...features, ...features, ...features];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pb-4 pt-0">
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(253,248,243,0.97) 100%)",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.15), 0 20px 60px -10px rgba(251,146,60,0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Top gold accent line */}
        <div
          className="absolute top-0 left-6 sm:left-10 right-6 sm:right-10 h-[2px] rounded-full z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgb(247,188,139) 40%, #fea86a 60%, transparent)",
          }}
        />

        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(255,255,255,0.97), transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(253,248,243,0.97), transparent)" }}
        />

        {/* Scrolling marquee track */}
        <div className="flex py-3 sm:py-4 overflow-hidden">
          <div
            className="flex items-center shrink-0"
            style={{ animation: "marquee 18s linear infinite", willChange: "transform" }}
          >
            {marqueeItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center shrink-0">
                  <div className="group flex items-center gap-2 sm:gap-3 px-4 sm:px-8 cursor-default">
                    <div
                      className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
                        boxShadow: "0 2px 8px rgba(251,146,60,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
                      }}
                    >
                      <Icon
                        className="w-4 h-4 text-orange-500 group-hover:text-orange-600 transition-colors duration-300"
                        strokeWidth={1.8}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xs sm:text-sm text-gray-800 group-hover:text-orange-500 transition-colors duration-300 leading-tight whitespace-nowrap">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium leading-tight whitespace-nowrap">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div
                    className="shrink-0 w-1.5 h-1.5 rounded-full mx-2"
                    style={{ background: "rgba(251,146,60,0.4)" }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-6 sm:left-10 right-6 sm:right-10 h-[1px] rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(251,146,60,0.2), transparent)" }}
        />
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes marquee { 0%, 100% { transform: translateX(0); } }
        }
      `}</style>
    </div>
  );
};

// Enhanced Services Section with staggered card animations
const Services: React.FC = () => {
  const [ref, inView] = useInView(0.1);

  const services = [
    {
      icon: Stethoscope, title: 'Diagnostic Equipment',
      description: 'Advanced imaging systems, monitors, and diagnostic tools for accurate patient assessment.'
    },
    {
      icon: Microscope, title: 'Laboratory Supplies',
      description: 'Complete laboratory equipment and consumables for testing and analysis.'
    },
    {
      icon: Zap, title: 'Surgical Instruments',
      description: 'Precision surgical tools and equipment for various medical procedures.'
    },
    {
      icon: Bed, title: 'Patient Care Equipment',
      description: 'Hospital beds, wheelchairs, and patient mobility solutions.'
    },
    {
      icon: Shield, title: 'Safety & Protection',
      description: 'Personal protective equipment and safety supplies for healthcare workers.'
    },
    {
      icon: Wrench, title: 'Maintenance & Support',
      description: 'Equipment maintenance, calibration, and technical support services.'
    }
  ];

  return (
    <section id="services" ref={ref} className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            Our Product Categories
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We supply a comprehensive range of medical equipment and supplies to meet 
            all your healthcare facility needs with competitive wholesale pricing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className={`p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-orange-400 hover:shadow-xl transition-all duration-700 ease-out group hover:-translate-y-2 bg-white ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full mb-6 group-hover:bg-orange-400 group-hover:scale-110 transition-all duration-500 group-hover:rotate-6 mx-auto">
                <service.icon className="h-7 w-7 sm:h-8 sm:w-8 text-orange-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 group-hover:text-orange-500 transition-colors duration-300 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base text-center px-2">
                {service.description}
              </p>
              <a href="/login" className="inline-block text-orange-400 font-medium hover:text-orange-500 transition-all duration-300 group-hover:translate-x-2 text-center w-full">
                View Products →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Enhanced Statistics Section
 */
const Statistics: React.FC = () => {
  const [ref, inView] = useInView(0.2);
  
  const stats = [
    { icon: Building2, number: 500, suffix: '+', label: 'Healthcare Facilities', description: 'Hospitals and clinics served' },
    { icon: Package, number: 2500, suffix: '+', label: 'Products Available', description: 'Medical equipment & supplies' },
    { icon: Users, number: 500, suffix: '+', label: 'Clients', description: 'Trusted healthcare partners' },
    { icon: Award, number: 15, suffix: '+', label: 'Years Experience', description: 'In medical equipment supply' }
  ];

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-gradient-to-br from-orange-50 to-white" id="statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            Industry Leading Supplier
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our commitment to quality and service has made us the preferred wholesale partner 
            for healthcare facilities across the nation, delivering reliable medical equipment solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-orange-100 hover:shadow-xl transition-all duration-700 ease-out group hover:-translate-y-3 hover:bg-white ${
                inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-orange-400 rounded-full mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 mx-auto">
                <stat.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="mb-2">
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                {stat.label}
              </h3>
              <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700 text-sm sm:text-base px-2">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Enhanced Footer
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-6 pb-8 sm:pb-0">
            <div className="flex items-center space-x-3 group flex-wrap">
              <div className="transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                <img src={companyLogo} alt="Helios Medical Logo" className="h-12 w-12 sm:h-14 sm:w-14 object-contain" />
              </div>
              <span className="text-lg sm:text-xl font-bold group-hover:text-orange-400 transition-colors duration-300">
                HELIOS MEDICAL SYSTEMS
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Your trusted wholesale partner for premium medical equipment and supplies, 
              serving healthcare facilities nationwide for over 15 years.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {[
                { Icon: Facebook, color: 'hover:text-[#1877F2]' },
                { Icon: SiX, color: 'hover:text-white' },
                { Icon: Instagram, color: 'hover:text-[#E1306C]' },
                { Icon: Linkedin, color: 'hover:text-[#0077B5]' }
              ].map(({ Icon, color }, index) => (
                <Icon 
                  key={index}
                  className={`h-5 w-5 sm:h-6 sm:w-6 text-gray-400 ${color} hover:scale-125 transition-all duration-300 cursor-pointer hover:-translate-y-1 flex-shrink-0`} 
                />
              ))}
            </div>
          </div>
          
          {[
            {
              title: 'Quick Links',
              links: ['Home', 'Products', 'About', 'About Us', 'Contact']
            },
            {
              title: 'Product Categories', 
              links: ['Diagnostic Equipment', 'Laboratory Supplies', 'Surgical Instruments', 'Patient Care', 'Safety Equipment']
            }
          ].map((section, index) => (
            <div key={index} className="sm:pt-4">
              <h3 className="text-base sm:text-lg font-semibold mb-6 text-orange-400">{section.title}</h3>
              <div className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <a 
                    key={linkIndex}
                    href="/signup" 
                    className="block text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-2 text-sm sm:text-base py-1"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
          
          <div className="sm:pt-4">
            <h3 className="text-base sm:text-lg font-semibold mb-6 text-orange-400">Contact Info</h3>
            <div className="space-y-4">
              {[
                { Icon: Phone, text: '+1 (555) 123-4567' },
                { Icon: Mail, text: 'sales@medequippro.com' },
                { Icon: MapPin, text: '456 Industrial Blvd.\nMedical District, MD 67890' }
              ].map(({ Icon, text }, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 mt-1 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 whitespace-pre-line text-sm sm:text-base">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <p className="text-gray-400 text-sm text-center sm:text-left order-2 sm:order-1">© 2025 HELIOS MEDICAL SYSTEMS. All rights reserved.</p>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:space-x-6 sm:gap-0 mt-4 sm:mt-0 order-1 sm:order-2 w-full sm:w-auto">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
              <a 
                key={index}
                href="/signup" 
                className="text-gray-400 hover:text-orange-400 text-sm transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Powered by section */}
      <div className="absolute bottom-4 right-4 flex items-center group">
        <span className="text-gray-400 text-xs sm:text-sm font-semibold mr-1 group-hover:text-gray-300 transition-colors duration-300 hidden sm:inline">
          Powered by
        </span>
        <img 
          src={snapcode} 
          alt="Snapcode" 
          className="h-10 sm:h-12 group-hover:scale-110 transition-transform duration-300" 
        />
      </div>
    </footer>
  );
};

/**
 * Main Landing Page Component
 */
const LandingPage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Statistics />
      <Footer />
    </div>
  );
};

export default LandingPage;