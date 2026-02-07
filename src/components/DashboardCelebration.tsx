import { useState, useEffect, useCallback } from 'react';
import type { TouchEvent } from 'react';

interface CelebrationImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

const celebrationImages: CelebrationImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    alt: "Robotic surgery - futuristic medical innovation",
    title: "AI Surgical Precision",
    description: "Revolutionary robotic-assisted procedures"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    alt: "Precision robotic arm in surgery",
    title: "Microscopic Accuracy",
    description: "Sub-millimeter precision in complex surgeries"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    alt: "Medical team celebrating success",
    title: "Team Success",
    description: "Celebrating another successful procedure"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    alt: "Doctors applauding achievement",
    title: "Medical Breakthrough",
    description: "Groundbreaking surgical innovation"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    alt: "Advanced medical technology",
    title: "Tech Integration",
    description: "Seamless human-machine collaboration"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    alt: "Healthcare innovation celebration",
    title: "Future of Medicine",
    description: "Pioneering new healthcare standards"
  },
];

export default function DashboardCelebration() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % celebrationImages.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + celebrationImages.length) % celebrationImages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  const mainImage = celebrationImages[currentIndex];
  const rightImages = [
    celebrationImages[(currentIndex + 1) % celebrationImages.length],
    celebrationImages[(currentIndex + 2) % celebrationImages.length],
    celebrationImages[(currentIndex + 3) % celebrationImages.length],
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(254,160,0,0.1),transparent_50%)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
         
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-400 mb-4">
            Medical <span className="bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Excellence</span> Celebrated
          </h2>
          <p className="text-lg md:text-xl text-white-100 max-w-3xl mx-auto">
            Witness the future of surgical precision and celebrate our team's groundbreaking achievements
          </p>
        </div>

        {/* Gallery Container */}
        <div className="relative max-w-8xl mx-auto">
          <div 
            className="relative rounded-2xl lg:rounded-3xl overflow-hidden h-150 sm:h-175 md:h-200 lg:h-150 shadow-2xl shadow-orange-900/40 border border-white/10"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10" />
            
            <div className="relative h-full flex flex-col lg:flex-row z-20 gap-4 p-4 lg:p-6 ">
              {/* Left - Main Hero Image */}
              <div className="relative w-full lg:w-2/3 h-1/2 lg:h-full overflow-hidden rounded-xl lg:rounded-2xl group">
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/30 to-amber-500/20 z-10" />
                <img
                  src={mainImage.src}
                  alt={mainImage.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105"
                />
                
                {/* Main Image Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 lg:p-8 bg-linear-to-t from-black/80 via-black/50 to-transparent">
               
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {mainImage.title}
                  </h3>
                  <p className="text-orange-100 text-base lg:text-lg max-w-2xl">
                    {mainImage.description}
                  </p>
                </div>
              </div>

              {/* Right - Gallery Stack */}
              <div className="w-full lg:w-1/3 h-1/2 lg:h-full flex flex-col gap-4">
                {/* Top Image */}
                <div className="relative flex-1 overflow-hidden rounded-xl lg:rounded-2xl group cursor-pointer">
                  <div className="absolute inset-0 bg-linear-to-br from-orange-900/40 to-transparent z-10" />
                  <img
                    src={rightImages[0].src}
                    alt={rightImages[0].alt}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-linear-to-t from-black/70 to-transparent">
                    <h4 className="text-white font-semibold text-sm lg:text-base truncate">
                      {rightImages[0].title}
                    </h4>
                  </div>
                </div>

                {/* Bottom Row - Two Images */}
                <div className="flex flex-1 gap-4">
                  {[rightImages[1], rightImages[2]].map((image, idx) => (
                    <div 
                      key={idx}
                      className="relative w-1/2 h-full overflow-hidden rounded-xl lg:rounded-2xl group cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-orange-900/30 to-transparent z-10" />
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-linear-to-t from-black/70 to-transparent">
                        <h4 className="text-white font-semibold text-xs lg:text-sm truncate">
                          {image.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-5 w-4 h-4 bg-amber-400/20 rounded-full animate-pulse hidden lg:block"></div>
        <div className="absolute top-1/3 right-10 w-6 h-6 bg-orange-500/20 rounded-full animate-pulse delay-300 hidden lg:block"></div>
        <div className="absolute bottom-20 left-10 w-8 h-8 bg-amber-400/10 rounded-full animate-pulse delay-700 hidden lg:block"></div>
      </div>
    </section>
  );
}