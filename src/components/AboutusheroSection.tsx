

import {
  Heart,
  ChevronDown,
} from "lucide-react";
import bgImage from "../assets/Aboutheader.png";

function AboutusheroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Soft, light background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gentle organic shapes - smaller on mobile */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-gradient-to-bl from-orange-100/20 via-orange-50/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-amber-100/15 via-orange-50/10 to-transparent rounded-full blur-3xl" />

        {/* Subtle dot pattern - adjusted for mobile */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fb923c 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-5 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20 lg:py-24 z-10">
        <div className="max-w-7xl mx-auto">
          {/* Centered intro section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            {/* Badge - responsive sizing */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white border-2 border-orange-200 rounded-full shadow-sm mb-4 sm:mb-6">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 fill-orange-500" />
              <span className="text-orange-600 font-semibold text-xs sm:text-sm md:text-base">
                Our Story
              </span>
            </div>

            {/* Main heading - optimized line breaks for mobile */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
              Building the Future of
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-orange-600 via-orange-600 to-amber-600 bg-clip-text text-transparent">
                Medical Innovation
              </span>
            </h1>

            {/* Description - better mobile readability */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-4 md:px-0">
              For over a decade, HELIOS has been at the forefront of healthcare
              technology, transforming lives through intelligent medical
              solutions and unwavering commitment to excellence.
            </p>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile, visible on md+ */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Discover More
          </span>
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
        </div>
      </div>
    </section>
  );
}

export default AboutusheroSection;