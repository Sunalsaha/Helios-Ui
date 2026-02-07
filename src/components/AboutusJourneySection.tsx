import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronRight, Target, Globe, Cpu, Award, Zap } from "lucide-react";
import JournyImg from "../assets/Journy.png";


const milestones = [
  { year: "2010", icon: <Target className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />, title: "Company Founded", description: "HELIOS Medical Systems was established with a vision to revolutionize healthcare technology." },
  { year: "2013", icon: <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />, title: "First Product Launch", description: "Launched our first medical imaging system, setting new standards in diagnostic accuracy." },
  { year: "2016", icon: <Globe className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />, title: "Global Expansion", description: "Expanded operations to Europe and Asia, serving healthcare institutions worldwide." },
  { year: "2019", icon: <Cpu className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />, title: "AI Integration", description: "Introduced artificial intelligence capabilities across our entire product line." },
  { year: "2022", icon: <Award className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />, title: "Innovation Award", description: "Received the Global Healthcare Innovation Award for breakthrough medical technology." },
  { year: "2024", icon: <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />, title: "Future Vision", description: "Leading the next generation of smart, connected medical systems." }
];

const AboutusJourneySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lastScrollTime = useRef(0);
  const scrollThrottle = 800;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight / 2;
      
      if (!isInView) {
        setScrollLocked(false);
        return;
      }

      if (!scrollLocked && activeIndex < milestones.length - 1) {
        setScrollLocked(true);
      }

      if (activeIndex === milestones.length - 1 && rect.bottom > window.innerHeight) {
        setScrollLocked(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!scrollLocked || !sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight / 2;
      
      if (!isInView) return;

      const now = Date.now();
      if (now - lastScrollTime.current < scrollThrottle) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0 && activeIndex < milestones.length - 1) {
        e.preventDefault();
        setIsTransitioning(true);
        setActiveIndex(prev => prev + 1);
        lastScrollTime.current = now;
        setTimeout(() => setIsTransitioning(false), 700);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        e.preventDefault();
        setIsTransitioning(true);
        setActiveIndex(prev => prev - 1);
        lastScrollTime.current = now;
        setTimeout(() => setIsTransitioning(false), 700);
      } else if (activeIndex === milestones.length - 1 && e.deltaY > 0) {
        setScrollLocked(false);
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (!scrollLocked || !sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight / 2;
      
      if (!isInView) return;

      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      if (touch2) {
        // Pinch gesture - ignore for now
        return;
      }

      // Single touch scroll simulation
      const now = Date.now();
      if (now - lastScrollTime.current < scrollThrottle) {
        e.preventDefault();
        return;
      }
      
      // You can add touch-based swipe detection here if needed
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouch, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [scrollLocked, activeIndex]);

  const anglePerMilestone = 360 / milestones.length;
  const hourHandAngle = -90 + (activeIndex * anglePerMilestone);
  const minuteHandAngle = -90 + (activeIndex * anglePerMilestone * 2);

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-white/80 via-orange-50/50 to-white/80 relative overflow-hidden min-h-screen"
      style={{
          backgroundImage: `url(${JournyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated Time Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-orange-300/50 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Time Vortex Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-conic from-orange-200/40 via-orange-100/30 to-orange-200/40 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-spin slow-spin" style={{ animationDuration: '25s' }} />
        <div className="absolute inset-0 bg-gradient-radial from-orange-200/30 via-transparent to-transparent rounded-full" />
      </div>
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-4 sm:top-6 md:top-10 lg:top-20 right-4 sm:right-6 md:right-10 lg:right-20 w-16 sm:w-24 md:w-32 lg:w-48 xl:w-64 h-16 sm:h-24 md:h-32 lg:h-48 xl:h-64 bg-orange-300/40 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 lg:bottom-20 left-4 sm:left-6 md:left-10 lg:left-20 w-20 sm:w-28 md:w-40 lg:w-60 xl:w-80 h-20 sm:h-28 md:h-40 lg:h-60 xl:h-80 bg-orange-200/40 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 sticky top-4 sm:top-8 md:top-12 lg:top-16 xl:top-20 z-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2 sm:px-4 md:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 bg-clip-text text-transparent leading-tight tracking-tight">
            The Journey of Innovation
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white-100 max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed px-2">
            Turn back time and witness our journey through the ages.
          </p>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28 h-0.5 sm:h-1 md:h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-4 sm:mt-6 md:mt-8 rounded-full shadow-sm"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] xl:grid-cols-[1.3fr_0.7fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-stretch max-w-7xl mx-auto">
          
          {/* Left: Analog Clock */}
          <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] 2xl:h-[500px] flex items-center justify-center order-2 lg:order-1 w-full px-4">
            <div className="relative w-full aspect-square max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[360px] xl:max-w-[400px] 2xl:max-w-[460px]">
              
              {/* Clock Face Container with Glow */}
              <div className="absolute inset-0 bg-gradient-radial from-orange-500/30 to-transparent rounded-full blur-lg sm:blur-xl md:blur-2xl animate-pulse" style={{ animationDuration: '3s' }} />
              
              <svg className="w-full h-full absolute" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="clockFace" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#fff7ed" />
                  </linearGradient>
                  
                  <linearGradient id="clockRim" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </linearGradient>

                  <radialGradient id="centerGlow">
                    <stop offset="0%" stopColor="#fb923c" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
                  </radialGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer Clock Rim */}
                <circle cx="200" cy="200" r="170" fill="none" stroke="url(#clockRim)" strokeWidth="3" filter="url(#glow)" opacity="0.6" />

                {/* Clock Face */}
                <circle cx="200" cy="200" r="165" fill="url(#clockFace)" stroke="#fed7aa" strokeWidth="2" />

                {/* Inner Decorative Circles */}
                <circle cx="200" cy="200" r="155" fill="none" stroke="#fdba74" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
                <circle cx="200" cy="200" r="145" fill="none" stroke="#fdba74" strokeWidth="0.5" opacity="0.15" />

                {/* Hour Markers */}
                {[...Array(12)].map((_, i) => {
                  const angle = -90 + (i * 30);
                  const angleRad = (angle * Math.PI) / 180;
                  const radius = 150;
                  const innerRadius = i % 3 === 0 ? 135 : 140;
                  const x1 = 200 + innerRadius * Math.cos(angleRad);
                  const y1 = 200 + innerRadius * Math.sin(angleRad);
                  const x2 = 200 + radius * Math.cos(angleRad);
                  const y2 = 200 + radius * Math.sin(angleRad);

                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={i % 3 === 0 ? "#fb923c" : "#fed7aa"}
                      strokeWidth={i % 3 === 0 ? "3" : "1.5"}
                      opacity={i % 3 === 0 ? "0.7" : "0.4"}
                    />
                  );
                })}

                {/* Progress Arc */}
                <circle
                  cx="200"
                  cy="200"
                  r="160"
                  fill="none"
                  stroke="url(#clockRim)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="1005.31"
                  strokeDashoffset={1005.31 - (activeIndex / milestones.length) * 1005.31}
                  className="transition-all duration-1000 ease-out"
                  style={{ 
                    filter: 'drop-shadow(0 0 8px rgba(251, 146, 60, 0.4))',
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center'
                  }}
                  opacity="0.5"
                />

                {/* Hour Hand */}
                <line
                  x1="200"
                  y1="200"
                  x2={200 + 80 * Math.cos((hourHandAngle * Math.PI) / 180)}
                  y2={200 + 80 * Math.sin((hourHandAngle * Math.PI) / 180)}
                  stroke="#fb923c"
                  strokeWidth="6"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  className="transition-all duration-1000 ease-out"
                  style={{ transformOrigin: 'center' }}
                />

                {/* Minute Hand */}
                <line
                  x1="200"
                  y1="200"
                  x2={200 + 120 * Math.cos((minuteHandAngle * Math.PI) / 180)}
                  y2={200 + 120 * Math.sin((minuteHandAngle * Math.PI) / 180)}
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  className="transition-all duration-1000 ease-out"
                  style={{ transformOrigin: 'center' }}
                />

                {/* Center Hub */}
                <circle cx="200" cy="200" r="25" fill="url(#centerGlow)" opacity="0.2" />
                <circle cx="200" cy="200" r="12" fill="#ffffff" stroke="url(#clockRim)" strokeWidth="2" />
                <circle cx="200" cy="200" r="4" fill="#fb923c" />
              </svg>

              {/* Milestone Nodes */}
              {milestones.map((m, i) => {
                const angle = -90 + (i * anglePerMilestone);
                const angleRad = (angle * Math.PI) / 180;
                const radius = 160;
                const x = 200 + radius * Math.cos(angleRad);
                const y = 200 + radius * Math.sin(angleRad);
                const isActive = i === activeIndex;
                const isPassed = i <= activeIndex;

                return (
                  <div
                    key={i}
                    className="absolute transition-all duration-700 ease-out"
                    style={{
                      left: `${(x / 400) * 100}%`,
                      top: `${(y / 400) * 100}%`,
                      transform: `translate(-50%, -50%) scale(${isActive ? 1.2 : isPassed ? 1 : 0.8})`,
                      zIndex: isActive ? 10 : 1
                    }}
                  >
                    <button
                      onClick={() => {
                        setIsTransitioning(true);
                        setActiveIndex(i);
                        setTimeout(() => setIsTransitioning(false), 700);
                      }}
                      className={`group relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 rounded-full transition-all duration-500 shadow-lg ${
                        isActive 
                          ? 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-[0_0_20px_rgba(251,146,60,0.6)] animate-pulse' 
                          : isPassed
                          ? 'bg-gradient-to-br from-orange-300 to-orange-400 shadow-md shadow-orange-300/40'
                          : 'bg-white/80 border-2 border-orange-200 hover:border-orange-300 hover:bg-white shadow-md'
                      }`}
                    >
                      <div className={`font-bold text-[6px] sm:text-[7px] md:text-[8px] lg:text-[10px] xl:text-xs transition-colors ${
                        isPassed ? 'text-white drop-shadow-sm' : 'text-orange-500'
                      }`}>
                        {isActive ? m.icon : m.year.slice(-2)}
                      </div>
                      
                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-orange-400/80 animate-ping opacity-75" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Content Card */}
          <div className="relative order-1 lg:order-2 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-2 sm:px-4">
            <div
              className="relative p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl shadow-orange-100/50 overflow-hidden group transition-all duration-700 hover:shadow-2xl hover:shadow-orange-200/60 border border-white/50 backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.4) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform origin-left group-hover:translate-x-full transition-all duration-1000" />
              
              {/* Top Edge Highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

              {/* Glow Orb */}
              <div className="absolute top-0 right-0 w-20 sm:w-24 md:w-32 lg:w-40 h-20 sm:h-24 md:h-32 lg:h-40 bg-orange-400/30 rounded-full -mr-12 sm:-mr-16 md:-mr-16 lg:-mr-20 -mt-12 sm:-mt-16 md:-mt-16 blur-2xl group-hover:bg-orange-400/50 transition-all duration-700" />
              
              {/* Corner Accents */}
              <div className="absolute top-2 left-2 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-t-2 border-white/70 rounded-tl-lg" />
              <div className="absolute bottom-2 right-2 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-b-2 border-white/70 rounded-br-lg" />

              <div 
                key={activeIndex} 
                className={`relative z-10 transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
              >
                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/70 backdrop-blur-md text-orange-600 text-xs sm:text-sm font-bold mb-3 sm:mb-4 shadow-lg border border-white/70">
                  <Calendar className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                  {milestones[activeIndex].year}
                </div>
                
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900 leading-tight tracking-tight line-clamp-2">
                  {milestones[activeIndex].title}
                </h3>
                
                <p className="text-gray-800/90 text-xs sm:text-sm md:text-base font-medium leading-relaxed line-clamp-3">
                  {milestones[activeIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Dots */}
        <div className="flex lg:hidden justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 md:mt-10 px-4 pb-6">
          {milestones.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setActiveIndex(i);
                setTimeout(() => setIsTransitioning(false), 700);
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 flex-shrink-0 shadow-sm ${
                i === activeIndex 
                  ? 'bg-orange-500 w-6 sm:w-8 border-2 border-orange-400 shadow-lg shadow-orange-400/50' 
                  : i <= activeIndex
                  ? 'bg-orange-400/70 w-2 sm:w-2.5 border border-orange-400/70'
                  : 'bg-orange-200/70 w-2 sm:w-2.5 border-2 border-orange-200/70 hover:bg-orange-300/70'
              }`}
              aria-label={`Go to milestone ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style >{`
        @media (max-width: 640px) {
          .slow-spin {
            animation-duration: 30s;
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default AboutusJourneySection;
