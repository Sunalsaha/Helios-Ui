// components/LatestLaunches.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Shield, Truck, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import med1 from '../assets/med1.jpg';
import med2 from '../assets/med2.jpg';
import med3 from '../assets/med3.jpg';
import med4 from '../assets/med4.jpg';

// --- Embedded useInView hook
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

// --- Embedded ImageSlider component with click-to-disclose
const ImageSlider: React.FC<{ onImageClick?: (slideIndex: number) => void }> = ({ onImageClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const slides = [
    {
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Advanced Diagnostic Equipment',
      description: 'State-of-the-art medical imaging and diagnostic tools',
      slug: 'advanced-diagnostic-equipment'
    },
    {
      image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Surgical Instruments',
      description: 'Precision surgical tools and equipment for medical professionals',
      slug: 'surgical-instruments'
    },
    {
      image: 'https://www.shutterstock.com/image-photo/portrait-man-doctor-standing-team-600nw-2478537933.jpg',
      title: 'Laboratory Equipment',
      description: 'Complete laboratory solutions for accurate testing and analysis',
      slug: 'laboratory-equipment'
    },
    {
      image: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Patient Monitoring Systems',
      description: 'Advanced monitoring equipment for patient care and safety',
      slug: 'patient-monitoring-systems'
    },
    { 
      image: med1, 
      title: 'Advanced Monitoring', 
      description: 'Real-time patient monitoring solutions',
      slug: 'advanced-monitoring'
    },
    { 
      image: med2, 
      title: 'Laboratory Excellence', 
      description: 'Precision testing equipment',
      slug: 'laboratory-excellence'
    },
    { 
      image: med4, 
      title: 'Surgical Precision', 
      description: 'Professional surgical instruments',
      slug: 'surgical-precision'
    },
    { 
      image: med3, 
      title: 'Diagnostic Solutions', 
      description: 'Comprehensive diagnostic tools',
      slug: 'diagnostic-solutions'
    },
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

  const handleImageClick = (slideIndex: number) => {
    if (onImageClick) {
      onImageClick(slideIndex);
    }
    // Default navigation - replace with your preferred routing
    // window.location.href = `/disclose/${slides[slideIndex].slug}`;
  };

  return (
    <div 
      className="relative w-full h-125 overflow-hidden rounded-2xl shadow-2xl group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex transition-transform duration-1000 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="w-full h-full shrink-0 relative"
            onClick={() => handleImageClick(index)}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover transition-transform duration-3000 ease-out hover:scale-110 cursor-pointer" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
            {/* Click prompt overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 px-6 py-3 rounded-full backdrop-blur-sm">
                Click to view details →
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 cursor-pointer ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const LatestLaunches: React.FC = () => {
  const [ref, inView] = useInView(0.1);
  
  const handleImageClick = (slideIndex: number) => {
    const slides = [
      'advanced-diagnostic-equipment',
      'surgical-instruments',
      'laboratory-equipment',
      'patient-monitoring-systems',
      'advanced-monitoring',
      'laboratory-excellence',
      'surgical-precision',
      'diagnostic-solutions'
    ];
    
    // Navigate to disclose page with product slug
    // Option 1: Using window.location (immediate navigation)
    window.location.href = `/ProductDisclouse`;
    
    // Option 2: If using React Router, uncomment this instead:
    // const router = useRouter();
    // router.push(`/disclose/${slides[slideIndex]}`);
    
    // Option 3: If using Next.js, uncomment this instead:
    // router.push(`/disclose/${slides[slideIndex]}`);
  };
  
  return (
    <section
      id="home"
      ref={ref}
      className="bg-gradient-to-br from-orange-50 to-white py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className={`text-5xl lg:text-6xl font-bold text-gray-800 leading-tight transition-all duration-1000 ease-out ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              Latest Products
              <span className={`text-orange-400 block transition-all duration-1000 ease-out delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}>
                Launched
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
            <ImageSlider onImageClick={handleImageClick} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestLaunches;
