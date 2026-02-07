import { Target, Eye, Heart } from "lucide-react";

const AboutusFoundationSection = () => {
  return (
    <section className=" relative bg-gradient-to-b from-[#fafafa] via-orange-50 to-orange-200 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-32 -right-32 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-orange-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-amber-300/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-orange-900 via-orange-600 to-amber-700 bg-clip-text text-transparent leading-tight">
          Our Foundation
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto leading-relaxed">
          Building the future of healthcare with purpose, innovation, and unwavering commitment
        </p>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-4 sm:mt-6 md:mt-8"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Mission */}
        <div className="group relative bg-gradient-to-b from-white/70 to-white/60 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] shadow-xl sm:shadow-2xl shadow-orange-100/50 border-2 border-white/70 overflow-hidden hover:shadow-2xl hover:shadow-orange-200/70 hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 ease-out hover:border-orange-200/70 flex flex-col h-72 sm:h-[22rem] md:h-[24rem] lg:h-[26rem]">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-400/15 via-transparent to-transparent -z-10 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 md:pb-8 pt-6 sm:pt-8 md:pt-10 flex flex-col items-center justify-center text-center relative z-10">
            <div className="mb-3 sm:mb-4 md:mb-6 relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-[1rem] sm:rounded-[1.25rem] bg-gradient-to-br from-orange-500/95 via-orange-400/90 to-amber-500/90 flex items-center justify-center border-3 sm:border-4 border-white/70 shadow-xl sm:shadow-2xl shadow-orange-100/50 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl group-hover:shadow-orange-200/70 transition-all duration-700 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-[1rem] sm:rounded-[1.25rem] blur opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />
                <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 group-hover:text-orange-600 transition-all duration-700 text-slate-900 drop-shadow-sm leading-tight">
              Our Mission
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-base leading-relaxed text-slate-700 group-hover:text-slate-900 transition-all duration-700 px-1 sm:px-2 md:px-4 drop-shadow-sm">
              To revolutionize healthcare delivery through innovative medical technology that empowers healthcare professionals and improves patient outcomes globally.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="group relative bg-gradient-to-b from-white/70 to-white/60 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] shadow-xl sm:shadow-2xl shadow-orange-100/50 border-2 border-white/70 overflow-hidden hover:shadow-2xl hover:shadow-orange-200/70 hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 ease-out hover:border-orange-200/70 flex flex-col h-72 sm:h-[22rem] md:h-[24rem] lg:h-[26rem]">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-400/15 via-transparent to-transparent -z-10 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 md:pb-8 pt-6 sm:pt-8 md:pt-10 flex flex-col items-center justify-center text-center relative z-10">
            <div className="mb-3 sm:mb-4 md:mb-6 relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-[1rem] sm:rounded-[1.25rem] bg-gradient-to-br from-orange-500/95 via-orange-400/90 to-amber-500/90 flex items-center justify-center border-3 sm:border-4 border-white/70 shadow-xl sm:shadow-2xl shadow-orange-100/50 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl group-hover:shadow-orange-200/70 transition-all duration-700 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-[1rem] sm:rounded-[1.25rem] blur opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 group-hover:text-orange-600 transition-all duration-700 text-slate-900 drop-shadow-sm leading-tight">
              Our Vision
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-base leading-relaxed text-slate-700 group-hover:text-slate-900 transition-all duration-700 px-1 sm:px-2 md:px-4 drop-shadow-sm">
              To be the global leader in intelligent medical systems, creating a future where advanced technology seamlessly enhances human healthcare capabilities.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="group relative bg-gradient-to-b from-white/70 to-white/60 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] shadow-xl sm:shadow-2xl shadow-orange-100/50 border-2 border-white/70 overflow-hidden hover:shadow-2xl hover:shadow-orange-200/70 hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 ease-out hover:border-orange-200/70 flex flex-col h-72 sm:h-[22rem] md:h-[24rem] lg:h-[26rem]">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-400/15 via-transparent to-transparent -z-10 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 md:pb-8 pt-6 sm:pt-8 md:pt-10 flex flex-col items-center justify-center text-center relative z-10">
            <div className="mb-3 sm:mb-4 md:mb-6 relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-20 lg:h-20 rounded-[1rem] sm:rounded-[1.25rem] bg-gradient-to-br from-orange-500/95 via-orange-400/90 to-amber-500/90 flex items-center justify-center border-3 sm:border-4 border-white/70 shadow-xl sm:shadow-2xl shadow-orange-100/50 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl group-hover:shadow-orange-200/70 transition-all duration-700 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-amber-300/20 rounded-[1rem] sm:rounded-[1.25rem] blur opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10" />
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white drop-shadow-md" />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 group-hover:text-orange-600 transition-all duration-700 text-slate-900 drop-shadow-sm leading-tight">
              Our Values
            </h3>
            <p className="text-xs sm:text-sm md:text-base lg:text-base leading-relaxed text-slate-700 group-hover:text-slate-900 transition-all duration-700 px-1 sm:px-2 md:px-4 drop-shadow-sm">
              Innovation, integrity, collaboration, and excellence guide everything we do, ensuring we deliver solutions that truly make a difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutusFoundationSection;