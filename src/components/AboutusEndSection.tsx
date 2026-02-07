import { ArrowRight } from "lucide-react";
import AboutFootBg from "../assets/Aboutfoot.png";
import { useNavigate } from "react-router-dom";


const AboutusEndSection = () => {
  const navigate = useNavigate()
  return (
    <section
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${AboutFootBg})`,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="relative bg-white/10 backdrop-blur-xl p-8 sm:p-12 lg:p-16 text-center border border-white/70 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
            {/* Top glossy reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/5 to-transparent pointer-events-none"></div>
            
            {/* Diagonal shine effect */}
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Inner border glow */}
            <div className="absolute inset-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/50 to-transparent pointer-events-none"></div>

            {/* Bottom shadow for depth */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-orange-600 drop-shadow-lg">
                Ready to Transform Healthcare?
              </h2>

              <p className="text-lg sm:text-xl text-gray-800 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 drop-shadow-sm">
                Join thousands of healthcare professionals who trust HELIOS Medical Systems
                to deliver exceptional patient care.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0">
                {/* Contact button */}
                <button
                  onClick={()=> navigate('/products')}
                  className="w-full sm:w-auto text-base sm:text-lg px-8 sm:px-10 py-3 rounded-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white shadow-lg transition-all duration-300 hover:scale-105 bg-white/50 backdrop-blur-sm"
                  
                >
                 Explore our products
                
                </button>

                {/* Demo button */}
                <button
                  onClick={()=> navigate('/products')}
                  className="w-full sm:w-auto flex items-center justify-center bg-orange-400 hover:bg-orange-500 text-white text-base sm:text-lg px-8 sm:px-10 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105"
                
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="ml-3 w-5 sm:w-6 h-5 sm:h-6" />
                 
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutusEndSection;