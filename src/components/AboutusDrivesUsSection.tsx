import { Target, Heart, Users, Award, type LucideIcon } from "lucide-react";

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  gradient: string;
  hasBg?: boolean;
}

const AboutusDrivesUsSection = () => {
  const values: Value[] = [
    { 
      icon: Target, 
      title: "Innovation First", 
      description: "We continuously push the boundaries of what's possible in medical technology, investing heavily in R&D to bring breakthrough solutions to healthcare.",
      color: "from-orange-400 to-orange-600",
      gradient: "from-orange-500/10 via-orange-400/5 to-transparent",
      hasBg: true
    },
    { 
      icon: Heart, 
      title: "Patient-Centered", 
      description: "Every decision we make is guided by how it will ultimately improve patient outcomes and enhance the quality of healthcare delivery.",
      color: "from-amber-400 to-orange-500",
      gradient: "from-amber-500/10 via-orange-400/5 to-transparent",
      hasBg: false
    },
    { 
      icon: Users, 
      title: "Collaboration", 
      description: "We work closely with healthcare professionals, researchers, and institutions to develop solutions that meet real-world clinical needs.",
      color: "from-amber-400 to-orange-500",
      gradient: "from-amber-500/10 via-orange-400/5 to-transparent",
      hasBg: false
    },
    { 
      icon: Award, 
      title: "Excellence", 
      description: "We maintain the highest standards of quality, safety, and reliability in all our products and services.",
     color: "from-orange-400 to-orange-600",
      gradient: "from-orange-500/10 via-orange-400/5 to-transparent",
      hasBg: true
    }
  ];

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 relative overflow-hidden bg-gradient-to-br from-white-50/80 via-amber-50/40 to-white">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-orange-200/40 via-orange-100/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-radial from-amber-200/30 via-yellow-100/15 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-radial from-orange-300/25 via-orange-100/10 to-transparent rounded-full blur-3xl"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.06),transparent_50%)]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.06),transparent_50%)]"></div>
      
      {/* Mesh gradient effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-200/40 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-200/40 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-yellow-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-orange-900 via-orange-600 to-amber-700 bg-clip-text text-transparent leading-tight">
            What Drives Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto leading-relaxed">
            Our core values shape every decision we make and every solution we create.
          </p>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-4 sm:mt-6 md:mt-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <div key={index} className="group h-full perspective-1000">
                <div className={`relative ${value.hasBg ? 'bg-white' : 'bg-white/40 backdrop-blur-sm'} p-6 h-full transform transition-all duration-700 group-hover:scale-[1.02] group-hover:-translate-y-2 overflow-hidden rounded-2xl flex flex-col border-2 ${value.hasBg ? 'border-orange-100/50' : `border-orange-300/60`} shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_60px_rgb(251,146,60,0.15)]`}>
                  
                  {/* Premium gradient background - only show if hasBg is true */}
                  {value.hasBg && (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-700`}></div>
                      
                      {/* Animated border gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-700`}></div>
                      
                      {/* Glass morphism effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent pointer-events-none rounded-2xl"></div>
                      
                      {/* Subtle grid pattern */}
                      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(251,146,60,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(251,146,60,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    </>
                  )}
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 group-hover:animate-shimmer"></div>
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Icon and Title Section */}
                    <div className="mb-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative overflow-hidden flex-shrink-0`}>
                          {/* Icon glass effect */}
                          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/20 to-transparent rounded-xl"></div>
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <Icon className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mt-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-600 group-hover:bg-clip-text transition-all duration-300">
                            {value.title}
                          </h3>
                          <div className={`h-0.5 w-12 bg-gradient-to-r ${value.color} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1 mb-4">
                      <p className="text-gray-600 leading-relaxed text-md">
                        {value.description}
                      </p>
                    </div>

                    {/* Bottom decorative element */}
                    <div className="pt-3 border-t border-orange-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                          
                          
                        </div>
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${value.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                      </div>
                    </div>
                  </div>

                  {/* Corner accent - only show if hasBg is true */}
                  {value.hasBg && (
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${value.color} opacity-5 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-700`}></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .group:hover .group-hover\:animate-shimmer {
          animation: shimmer 1.5s ease-in-out;
        }
        
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default AboutusDrivesUsSection;