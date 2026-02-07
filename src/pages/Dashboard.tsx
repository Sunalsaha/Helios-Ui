import { ChevronDown } from "lucide-react";
import NavberDashboard from "../components/NavberDashboard";
import heroImage from "../assets/hero-medical.jpg";

import DashboardCelebration from "../components/DashboardCelebration";

import LatestLaunches from "../components/LatestLaunches";
import RemarkableJourney from "../components/RemarkableJourney";
import CurrentStatistics from "../components/CurrentStatistics";
import Footer from "../components/Footer";
import WhyChooseHelios from "../components/WhyHeliosSection";
import ClientFeedback from "../components/ClientFeedback";
import ContactToggle from "../components/ContactToggle";
function Dashboard() {
  return (
    <>
      <NavberDashboard />
      <div className="min-h-screen">
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background with enhanced overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-orange-900/60 via-amber-800/50 to-yellow-800/40" />
          </div>

          {/* Enhanced floating animated elements optimized for Lenis */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-20 left-10 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl animate-pulse"
              style={{
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>
            <div
              className="absolute top-40 right-20 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl animate-pulse delay-1000"
              style={{
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>
            <div
              className="absolute bottom-20 left-1/3 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl animate-pulse delay-500"
              style={{
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>

            {/* Enhanced floating particles with Lenis-optimized animation */}
            <div
              className="absolute top-32 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-bounce delay-300"
              style={{
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>
            <div
              className="absolute top-48 right-1/3 w-4 h-4 bg-orange-400/40 rounded-full animate-bounce delay-700"
              style={{
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>
            <div
              className="absolute bottom-40 left-1/5 w-2 h-2 bg-amber-400/50 rounded-full animate-bounce delay-1000"
              style={{
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>
          </div>

          {/* Content */}
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto text-center">
              <div
                className={`text-white transform transition-all duration-1000 mt-15`}
                style={{
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                  <span className="bg-linear-to-r from-white via-orange-200 to-amber-200 bg-clip-text text-transparent">
                    Advancing
                  </span>
                  <span className="bg-linear-to-r from-orange-300 via-amber-300 to-yellow-300 bg-clip-text text-transparent block">
                    Medical Technology
                  </span>
                  <span className="text-white/90 text-4xl md:text-6xl block mt-2">
                    for Tomorrow
                  </span>
                </h1>

                <p className="text-2xl md:text-3xl text-white/90 mb-12 leading-relaxed max-w-5xl mx-auto font-light">
                  Revolutionary healthcare solutions that empower medical
                  professionals and transform patient care through cutting-edge
                  technology and innovation.
                </p>

                {/* Enhanced Scroll Arrow with Lenis smooth scroll */}
                <div className="mt-12 flex justify-center">
                  <button
                    aria-label="Scroll down"
                    className="animate-bounce p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 border border-white/30 backdrop-blur-sm group"
                    style={{
                      animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <ChevronDown
                      className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300"
                      style={{
                        transitionTimingFunction:
                          "cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
                      <ContactToggle/>
        <DashboardCelebration />
        <LatestLaunches/>
        <RemarkableJourney/>
        <CurrentStatistics/>
        <WhyChooseHelios/>
        <ClientFeedback/>
        <Footer/>
      </div>
    </>
  );
}

export default Dashboard;
