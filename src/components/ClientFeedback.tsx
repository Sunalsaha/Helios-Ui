import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const ClientFeedback = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialTransitioning, setIsTestimonialTransitioning] =
    useState(false);
  const testimonialRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(1);

  // Touch/swipe handling states
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Enhanced testimonials array with more reviews
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      content:
        "HELIOS systems have revolutionized our diagnostic capabilities. The accuracy and speed are unmatched in the industry.",
      rating: 5,
      avatar: "👩‍⚕️",
      hospital: "City General Hospital",
      location: "New York, USA",
    },
    {
      name: "Dr. Michael Chen",
      role: "Surgeon",
      content:
        "The surgical suite integration is seamless. It's improved our operational efficiency by 40% and patient outcomes significantly.",
      rating: 5,
      avatar: "👨‍⚕️",
      hospital: "Regional Medical Center",
      location: "California, USA",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Radiologist",
      content:
        "The AI-powered diagnostics have enhanced our accuracy significantly. Exceptional technology that saves lives daily.",
      rating: 5,
      avatar: "👩‍⚕️",
      hospital: "Advanced Imaging Center",
      location: "Texas, USA",
    },
    {
      name: "Dr. James Wilson",
      role: "Department Head",
      content:
        "Outstanding support and cutting-edge technology. HELIOS has transformed how we deliver patient care in our facility.",
      rating: 5,
      avatar: "👨‍⚕️",
      hospital: "Metropolitan Hospital",
      location: "London, UK",
    },
    {
      name: "Dr. Lisa Thompson",
      role: "Chief of Cardiology",
      content:
        "The precision and reliability of HELIOS equipment is extraordinary. It's become an integral part of our cardiac procedures.",
      rating: 5,
      avatar: "👩‍⚕️",
      hospital: "Heart Institute",
      location: "Toronto, Canada",
    },
    {
      name: "Dr. Ahmed Hassan",
      role: "Director of Surgery",
      content:
        "Implementing HELIOS systems has elevated our surgical capabilities to world-class standards. Truly impressive technology.",
      rating: 5,
      avatar: "👨‍⚕️",
      hospital: "Dubai Medical Complex",
      location: "Dubai, UAE",
    },
    {
      name: "Dr. Maria Santos",
      role: "Head of Radiology",
      content:
        "The image quality and diagnostic accuracy have improved dramatically. Our patients receive better care thanks to HELIOS.",
      rating: 5,
      avatar: "👩‍⚕️",
      hospital: "São Paulo Hospital",
      location: "São Paulo, Brazil",
    },
    {
      name: "Dr. Robert Kim",
      role: "Chief Medical Technology Officer",
      content:
        "HELIOS represents the future of medical technology. The integration capabilities and user interface are exceptional.",
      rating: 5,
      avatar: "👨‍⚕️",
      hospital: "Seoul National Hospital",
      location: "Seoul, South Korea",
    },
  ];

  // Auto-scroll testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTestimonial]);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3); // lg
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2); // md
      } else {
        setVisibleCount(1); // mobile
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Testimonial navigation functions
  const handleNextTestimonial = () => {
    if (isTestimonialTransitioning) return;
    setIsTestimonialTransitioning(true);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTestimonialTransitioning(false), 300);
  };

  const handlePrevTestimonial = () => {
    if (isTestimonialTransitioning) return;
    setIsTestimonialTransitioning(true);
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setTimeout(() => setIsTestimonialTransitioning(false), 300);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: any) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNextTestimonial();
    if (isRightSwipe) handlePrevTestimonial();
  };

  // Get testimonials to display (current + next 2)
  const getVisibleTestimonials = () => {
    return Array.from({ length: visibleCount }).map((_, i) => {
      const index = (currentTestimonial + i) % testimonials.length;
      return { ...testimonials[index], index };
    });
  };

  return (
    <section
      ref={testimonialRef}
      className="py-20 md:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-linear-to-r from-orange-900 via-orange-600 to-amber-700 bg-clip-text text-transparent pb-2">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Healthcare professionals worldwide trust HELIOS for their medical
            technology needs. Here's what they have to say about their
            experience with us.
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-amber-500 mx-auto"></div>

          {/* Total testimonials counter */}
          <div className="mt-6 text-sm text-gray-500">
            Showing {currentTestimonial + 1} of {testimonials.length} reviews
          </div>
        </div>

        {/* Testimonials Carousel Container */}
        <div className="relative max-w-7xl mx-auto overflow-hidden">
          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:block">
            <button
              onClick={handlePrevTestimonial}
              disabled={isTestimonialTransitioning}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white border-2 border-orange-200 rounded-full flex items-center justify-center shadow-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              style={{
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <ChevronLeft
                className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform duration-300"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </button>

            <button
              onClick={handleNextTestimonial}
              disabled={isTestimonialTransitioning}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white border-2 border-orange-200 rounded-full flex items-center justify-center shadow-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              style={{
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <ChevronRight
                className="w-6 h-6 text-orange-600 group-hover:scale-110 transition-transform duration-300"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </button>
          </div>

          {/* Testimonials Container with Touch Support */}
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Mobile swipe instruction */}
            <div className="md:hidden text-center mb-4">
              <p className="text-sm text-gray-500">
                👆 Swipe left or right to see more reviews
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getVisibleTestimonials().map((testimonial, index) => (
                <div
                  key={`${testimonial.index}-${currentTestimonial}`}
                  className={`group relative bg-linear-to-br from-orange-50/50 to-amber-50/30 backdrop-blur-sm border border-orange-100/50 rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-orange-200/50 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden ${
                    isTestimonialTransitioning
                      ? "opacity-50 scale-95"
                      : "opacity-100 scale-100"
                  } ${index === 0 ? "md:shadow-xl md:border-orange-200/70 ring-2 ring-orange-100/50" : ""}`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow:
                      "0 15px 20px -5px rgba(251, 146, 60, 0.1), 0 8px 8px -5px rgba(251, 146, 60, 0.04)",
                  }}
                >
                  {/* Animated background gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-r from-orange-400/5 via-amber-400/5 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm"></div>

                  {/* Top-right decorative blob */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-linear-to-br from-orange-400/10 to-amber-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-0 group-hover:scale-100"></div>

                  {/* Quote mark - TOP RIGHT corner */}
                  <div className="absolute top-4 right-4 text-5xl text-orange-200/60 font-serif leading-none z-20 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">
                    "
                  </div>

                  {/* Verified badge - bottom right corner */}
                  <div className="absolute bottom-3 right-4">
                    <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-green-100 text-xs text-green-700 font-semibold">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
                      Verified Client
                    </div>
                  </div>

                  <div className="relative z-10">
                    {/* Avatar + Stars + Location - Left side */}
                    <div className="flex items-start mb-5">
                      <div className="w-14 h-14 bg-linear-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg mr-4 group-hover:scale-110 transition-transform duration-500 shrink-0">
                        <span className="text-2xl">{testimonial.avatar}</span>
                      </div>

                      {/* Stars and location beside avatar */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current drop-shadow-md shrink-0"
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 font-medium truncate">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial content */}
                    <blockquote className="text-gray-800 mb-6 italic leading-relaxed text-base font-medium line-clamp-3">
                      {testimonial.content}
                    </blockquote>

                    {/* Author info */}
                    <div className="border-t border-orange-100/50 pt-4 pb-3">
                      <p className="font-bold text-lg text-gray-900 mb-1 leading-tight truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-sm font-semibold text-orange-600 mb-1 truncate">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-gray-600 font-medium truncate">
                        {testimonial.hospital}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientFeedback;
