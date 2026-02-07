
import React, { useState, useEffect, useRef } from 'react';

import {
  Phone, Mail, MapPin, Facebook,  Instagram, Linkedin,
  ArrowRight, Shield, Truck, Award,
  Stethoscope, Microscope, Zap, Bed, Wrench, Users, Building2, ChevronLeft, ChevronRight
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
        rootMargin: '50px 0px -50px 0px' // Trigger animations earlier
      }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  
  return [ref, inView] as const;
}

/**
 * Lenis Smooth Scroll Hook


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
      
      // Enhanced easing function
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
      className={`font-bold text-3xl text-orange-400 inline-block transition-all duration-700 ease-out ${
        isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
      }`}
    >
      {count.toLocaleString()}{suffix}
    </span>
  );
};

/**
 * Enhanced ImageSlider Component with smoother transitions
 */
const ImageSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
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

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length, isHovered]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div 
      className="relative w-full h-125 overflow-hidden rounded-2xl shadow-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex transition-transform duration-1000 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full shrink-0 relative">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover transition-transform duration-3000 ease-out hover:scale-110" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div className={`absolute bottom-8 left-8 text-white transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <h3 className="text-2xl font-bold mb-2 transform transition-transform duration-1000">
                {slide.title}
              </h3>
              <p className="text-lg opacity-90 transform transition-transform duration-1000 delay-100">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Enhanced Hero Section with staggered animations
 */
const Hero: React.FC = () => {
  const [ref, inView] = useInView(0.1);
  
  return (
    <section
      id="home"
      ref={ref}
      className="bg-linear-to-br from-orange-50 to-white py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className={`text-5xl lg:text-6xl font-bold text-gray-800 leading-tight transition-all duration-1000 ease-out ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              Premium Medical
              <span className={`text-orange-400 block transition-all duration-1000 ease-out delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                Equipment Supply
              </span>
            </h1>
            
            <p className={`text-xl text-gray-600 leading-relaxed transition-all duration-1000 ease-out delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              Your trusted wholesale partner for high-quality medical equipment and supplies. 
              We provide hospitals, clinics, and healthcare facilities with cutting-edge 
              medical technology at competitive prices.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <a
                href="/login"
                className="bg-orange-400 text-white px-8 py-4 rounded-full hover:bg-orange-500 transition-all duration-300 flex items-center justify-center font-medium text-lg group shadow-lg hover:scale-105 hover:shadow-xl"
              >
                Request Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
              <a
                href="/login"
                className="border-2 border-orange-400 text-orange-400 px-8 py-4 rounded-full hover:bg-orange-400 hover:text-white transition-all duration-300 font-medium text-lg text-center hover:scale-105 hover:shadow-lg"
              >
                View Catalog
              </a>
            </div>
            
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 transition-all duration-1000 ease-out delay-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              {[
                { icon: Shield, title: 'Quality Assured', desc: 'ISO certified products' },
                { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide shipping' },
                { icon: Award, title: 'Best Prices', desc: 'Wholesale rates' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <item.icon className="h-8 w-8 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 ease-out delay-300 ${
            inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}>
            <ImageSlider />
          
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Enhanced Services Section with staggered card animations
 */
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
    <section id="services" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Product Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We supply a comprehensive range of medical equipment and supplies to meet 
            all your healthcare facility needs with competitive wholesale pricing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl border border-gray-200 hover:border-orange-400 hover:shadow-xl transition-all duration-700 ease-out group hover:-translate-y-2 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 group-hover:bg-orange-400 group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                <service.icon className="h-8 w-8 text-orange-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-orange-500 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>
              <a href="/login" className="inline-block text-orange-400 font-medium hover:text-orange-500 transition-all duration-300 group-hover:translate-x-2">
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
    <section ref={ref} className="py-20 bg-linear-to-br from-orange-50 to-white" id="statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Industry Leading Supplier
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to quality and service has made us the preferred wholesale partner 
            for healthcare facilities across the nation, delivering reliable medical equipment solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-orange-100 hover:shadow-xl transition-all duration-700 ease-out group hover:-translate-y-3 hover:bg-white ${
                inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-400 rounded-full mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="mb-2">
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                {stat.label}
              </h3>
              <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
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
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <img src={companyLogo} alt="Helios Medical Logo" className="h-14 w-14 object-contain" />
              </div>
              <span className="text-xl font-bold group-hover:text-orange-400 transition-colors duration-300">
                HELIOS MEDICAL SYSTEMS
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted wholesale partner for premium medical equipment and supplies, 
              serving healthcare facilities nationwide for over 15 years.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, color: 'hover:text-[#1877F2]' },
                { Icon: SiX, color: 'hover:text-white' },
                { Icon: Instagram, color: 'hover:text-[#E1306C]' },
                { Icon: Linkedin, color: 'hover:text-[#0077B5]' }
              ].map(({ Icon, color }, index) => (
                <Icon 
                  key={index}
                  className={`h-6 w-6 text-gray-400 ${color} hover:scale-125 transition-all duration-300 cursor-pointer hover:-translate-y-1`} 
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
            <div key={index}>
              <h3 className="text-lg font-semibold mb-6 text-orange-400">{section.title}</h3>
              <div className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <a 
                    key={linkIndex}
                    href="/signup" 
                    className="block text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-2"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-400">Contact Info</h3>
            <div className="space-y-4">
              {[
                { Icon: Phone, text: '+1 (555) 123-4567' },
                { Icon: Mail, text: 'sales@medequippro.com' },
                { Icon: MapPin, text: '456 Industrial Blvd.\nMedical District, MD 67890' }
              ].map(({ Icon, text }, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <Icon className="h-5 w-5 text-orange-400 mt-1 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 whitespace-pre-line">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 HELIOS MEDICAL SYSTEMS. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link, index) => (
              <a 
                key={index}
                href="/signup" 
                className="text-gray-400 hover:text-orange-400 text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced Powered by section */}
      <div className="absolute bottom-4 right-4 flex items-center group">
        <span className="text-gray-400 text-sm font-semibold mr-1 group-hover:text-gray-300 transition-colors duration-300">
          Powered by
        </span>
        <img 
          src={snapcode} 
          alt="Snapcode" 
          className="h-12 group-hover:scale-110 transition-transform duration-300" 
        />
      </div>
    </footer>
  );
};

/**
 * Main Landing Page Component with Lenis Integration
 */
const LandingPage: React.FC = () => {
  // Initialize Lenis smooth scrolling
  

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