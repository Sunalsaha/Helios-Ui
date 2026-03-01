// components/LatestLaunches.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
        if (entry.isIntersecting) setInView(true);
      },
      { threshold, rootMargin: '50px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

// --- Slide data
const slides = [
  {
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Advanced Diagnostic Equipment',
    description: 'State-of-the-art medical imaging and diagnostic tools designed for precision and reliability in clinical environments.',
  
    slug: 'advanced-diagnostic-equipment',
  },
  {
    image: 'https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Surgical Instruments',
    description: 'Precision-engineered surgical tools and equipment crafted to meet the highest standards for medical professionals worldwide.',
    
    slug: 'surgical-instruments',
  },
  {
    image: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Laboratory Equipment',
    description: 'Complete laboratory solutions for accurate testing, analysis, and research — from basic diagnostics to advanced genomics.',
    
    slug: 'laboratory-equipment',
  },
  {
    image: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Patient Monitoring Systems',
    description: 'Advanced real-time monitoring equipment ensuring patient care, safety, and continuous health tracking around the clock.',
  
    slug: 'patient-monitoring-systems',
  },
  {
    image: med1,
    title: 'Advanced Monitoring',
    description: 'Next-generation patient monitoring solutions with AI-assisted alerts and seamless EMR integration.',
   
    slug: 'advanced-monitoring',
  },
  {
    image: med2,
    title: 'Laboratory Excellence',
    description: 'High-precision testing equipment delivering fast, reproducible results for clinical and research laboratories.',
  
    slug: 'laboratory-excellence',
  },
  {
    image: med4,
    title: 'Surgical Precision',
    description: 'Professional-grade surgical instruments engineered for minimal invasiveness and maximum control.',
   
    slug: 'surgical-precision',
  },
  {
    image: med3,
    title: 'Diagnostic Solutions',
    description: 'Comprehensive end-to-end diagnostic tools that streamline workflows and improve clinical decision-making.',
   
    slug: 'diagnostic-solutions',
  },
];

// --- ImageSlider
const ImageSlider: React.FC<{
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  onImageClick: (i: number) => void;
}> = ({ currentSlide, setCurrentSlide, onImageClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isTransitioningRef = useRef(false);

  const goTo = (index: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentSlide(index);
    setTimeout(() => { isTransitioningRef.current = false; }, 500);
  };

  const nextSlide = () => goTo((currentSlide + 1) % slides.length);
  const prevSlide = () => goTo((currentSlide - 1 + slides.length) % slides.length);

  // Always auto-scroll — even when hovered, just at a faster pace
  useEffect(() => {
    const interval = isHovered ? 2000 : 3500;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [isHovered, currentSlide]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl shadow-2xl group cursor-pointer"
      style={{ height: '480px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides — absolutely stacked, smooth crossfade */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: index === currentSlide ? 1 : 0,
          }}
          onClick={() => onImageClick(index)}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            style={{
              transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 4000ms ease-out',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Bottom icon */}
          <div
            className="absolute bottom-6 left-6 text-white"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 400ms ease, transform 400ms ease',
              transitionDelay: index === currentSlide ? '150ms' : '0ms',
            }}
          >
           
          </div>
        </div>
      ))}

      {/* Hover overlay */}
      <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center pointer-events-none">
        <div className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/30">
          View Details →
        </div>
      </div>

      {/* Hover speed indicator */}
      <div
        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
       
      </div>

      {/* Nav buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/35 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/35 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/20">
        <div
          key={`${currentSlide}-${isHovered}`}
          className="h-full bg-orange-400"
          style={{
            animation: `progressBar ${isHovered ? 2000 : 3500}ms linear forwards`,
          }}
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.stopPropagation(); goTo(index); }}
            className={`rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentSlide
                ? 'bg-white w-6 h-2.5'
                : 'bg-white/50 w-2.5 h-2.5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

// --- Slide description panel (left side, synced)
const SlideInfo: React.FC<{ currentSlide: number; inView: boolean }> = ({ currentSlide, inView }) => {
  const slide = slides[currentSlide];
  const [displayed, setDisplayed] = useState(currentSlide);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);
    const t = setTimeout(() => {
      setDisplayed(currentSlide);
      setFade(true);
    }, 250);
    return () => clearTimeout(t);
  }, [currentSlide]);

  const info = slides[displayed];

  return (
    <div
      className={`space-y-6 transition-all duration-1000 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
     

      {/* Title */}
      <h2
        className="text-3xl lg:text-4xl font-bold text-gray-800 leading-snug transition-all duration-300"
        style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(8px)', transitionDelay: '40ms' }}
      >
        {info.title}
      </h2>

      {/* Description */}
      <p
        className="text-lg text-gray-600 leading-relaxed transition-all duration-300"
        style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(8px)', transitionDelay: '80ms' }}
      >
        {info.description}
      </p>



      {/* CTA */}
      <button
        onClick={() => { window.location.href = `/ProductDisclouse`; }}
        className="inline-flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5 active:scale-95"
        style={{ opacity: fade ? 1 : 0, transitionDelay: '150ms' }}
      >
        View Product
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

// --- Main component
const LatestLaunches: React.FC = () => {
  const [ref, inView] = useInView(0.1);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleImageClick = (slideIndex: number) => {
    window.location.href = `/ProductDisclouse`;
  };

  return (
    <section
      id="home"
      ref={ref}
      className="bg-gradient-to-br from-orange-50 to-white py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ── Centered heading at top ── */}
       <div className="text-center mb-12 md:mb-16">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 bg-linear-to-r from-orange-900 via-orange-600 to-amber-700 bg-clip-text text-transparent">
    Latest Product Launched
  </h2>
  <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2 sm:px-0">
    Discover our newest innovation designed to transform healthcare services with smarter technology, faster access, and seamless user experience.
  </p>
  <div className="w-20 sm:w-24 h-1 bg-linear-to-r from-orange-500 to-amber-500 mx-auto mt-6 sm:mt-8"></div>
</div>

        {/* ── Two-column layout: description left, slider right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: synced description */}
          <SlideInfo currentSlide={currentSlide} inView={inView} />

          {/* Right: image slider */}
          <div
            className={`relative transition-all duration-1000 ease-out delay-300 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <ImageSlider
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestLaunches;