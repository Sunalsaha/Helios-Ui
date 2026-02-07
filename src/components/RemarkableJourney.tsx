import React, { useEffect, useRef, useState } from "react";
import { Building, Globe, Zap, Users, Briefcase, Calendar } from "lucide-react";
import GrowthLineChart from "./GrowthLineChart";

interface GrowthDataPoint {
  year: number;
  clients: number;
  revenue: number;
  employees: number;
  countries: number;
}

const RemarkableJourney: React.FC = () => {
  const [isGrowthVisible, setIsGrowthVisible] = useState(false);
  const growthRef = useRef<HTMLDivElement>(null);

  // Growth data (unchanged)
  const growthData: GrowthDataPoint[] = [
    { year: 2010, clients: 50, revenue: 1, employees: 10, countries: 1 },
    { year: 2012, clients: 200, revenue: 5, employees: 35, countries: 3 },
    { year: 2014, clients: 500, revenue: 15, employees: 80, countries: 8 },
    { year: 2016, clients: 900, revenue: 35, employees: 150, countries: 15 },
    { year: 2018, clients: 1400, revenue: 65, employees: 250, countries: 25 },
    { year: 2020, clients: 1900, revenue: 95, employees: 350, countries: 35 },
    { year: 2022, clients: 2300, revenue: 140, employees: 480, countries: 40 },
    { year: 2024, clients: 2500, revenue: 185, employees: 620, countries: 45 },
  ];

  useEffect(() => {
    const growthObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGrowthVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: "-50px" },
    );

    if (growthRef.current) {
      growthObserver.observe(growthRef.current);
    }

    return () => {
      growthObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={growthRef}
      className="py-24 md:py-32 bg-linear-to-br from-orange-100/30 via-amber-100/20 to-yellow-100/30 relative overflow-hidden"
    >
      {/* Background decorations – unchanged */}
      <div
        className="absolute top-0 left-0 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-yellow-400/3 rounded-full blur-3xl"
        style={{ transform: "translateZ(0) translate(-50%, -50%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header – unchanged */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-linear-to-r from-orange-900 via-orange-600 to-amber-700 bg-clip-text text-transparent">
            Our Remarkable Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            From a small startup to a global leader in medical technology,
            witness our extraordinary growth story over 14 years of innovation
            and dedication.
          </p>
          <div className="w-32 h-1 bg-linear-to-r from-orange-500 to-amber-500 mx-auto" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-stretch">
          {/* Left – Chart area (now stretches full height) */}
          <div className="lg:col-span-3 flex flex-col  h-full">
            {isGrowthVisible && (
              <GrowthLineChart data={growthData} visible={isGrowthVisible} />
            )}
          </div>

          {/* Right – Highlights card (same height behavior) */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-lg flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Building className="w-8 h-8 mr-3 text-orange-600" />
                Growth Highlights
              </h3>

              <div className="space-y-5 flex-1">
                {/* Years */}
                <div className="group cursor-pointer">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-orange-50 transition-all duration-300">
                    <div className="w-12 h-12 bg-linear-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">
                        Years of Excellence
                      </div>
                      <div className="text-gray-600">
                        Continuous innovation since 2010
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Expansion */}
                <div className="group cursor-pointer">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-orange-50 transition-all duration-300">
                    <div className="w-12 h-12 bg-linear-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shrink-0">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">
                        Global Expansion
                      </div>
                      <div className="text-gray-600">
                        From 1 to 45 countries served
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue */}
                <div className="group cursor-pointer">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-orange-50 transition-all duration-300">
                    <div className="w-12 h-12 bg-linear-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">
                        Revenue Growth
                      </div>
                      <div className="text-gray-600">
                        18,400% increase in 14 years
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team */}
                <div className="group cursor-pointer">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-orange-50 transition-all duration-300">
                    <div className="w-12 h-12 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">
                        Team Expansion
                      </div>
                      <div className="text-gray-600">
                        From 10 to 620 employees
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clients – fixed typo */}
                <div className="group cursor-pointer">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-orange-50 transition-all duration-300">
                    <div className="w-12 h-12 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shrink-0">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">
                        Clients
                      </div>
                      <div className="text-gray-600">
                        From 10 to 620 clients
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemarkableJourney;



