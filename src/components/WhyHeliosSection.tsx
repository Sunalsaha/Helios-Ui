import { FiAward, FiZap, FiPocket, FiCpu } from "react-icons/fi";

interface WhyHeliosFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  brandColor: string;
}

interface WhyChooseHeliosProps {
  features?: WhyHeliosFeature[];
  className?: string;
}

const whyUsFeatures: WhyHeliosFeature[] = [
  {
    icon: FiCpu,                    // Advanced Technology → microchip / processor icon
    title: "Advanced Technology",
    description: "Cutting-edge medical systems powered by AI and machine learning",
    brandColor: "from-orange-400 to-amber-500"
  },
  {
    icon: FiAward,                  // Award-Winning → trophy / award icon
    title: "Award-Winning",
    description: "Recognized globally for innovation and excellence in medical technology",
    brandColor: "from-amber-400 to-yellow-500"
  },
  {
    icon: FiPocket,                 // Future-Ready → rocket (growth / forward)
    title: "Future-Ready",
    description: "Scalable solutions that evolve with your healthcare needs",
    brandColor: "from-orange-500 to-red-500"
  },
  {
    icon: FiZap,                    // Innovation First → lightning / idea spark (close alternative to lightbulb)
    title: "Innovation First",
    description: "Continuous R&D investment to push healthcare boundaries",
    brandColor: "from-yellow-400 to-orange-500"
  }
];

export const WhyChooseHelios = ({ features = whyUsFeatures, className = "" }: WhyChooseHeliosProps) => {
  return (
    <section className={`py-20 md:py-32 bg-linear-to-br from-orange-100/30 via-amber-100/20 to-yellow-100/30 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-linear-to-r from-orange-900 via-orange-600 to-amber-700 bg-clip-text text-transparent pb-2">
            Why Choose HELIOS?
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We combine cutting-edge technology with healthcare expertise to deliver
            solutions that make a real difference in patient care.
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-orange-500 to-amber-500 mx-auto mt-8"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-linear-to-br from-white/80 to-orange-50/50 backdrop-blur-sm border lg:border-orange-300/50 
              border-orange-400/50 hover:border-orange-200 p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden hover:bg-white/90 text-center "
              style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <div className="relative z-10">
                <div className="relative mb-6 mx-auto w-24 h-24 flex items-center justify-center">
                  {/* Icon container */}
                  <div
                    className={`w-20 h-20 bg-linear-to-br ${feature.brandColor} rounded-2xl flex items-center justify-center shadow-xl mx-auto transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                  >
                    <feature.icon className="text-4xl text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-orange-600 transition-colors duration-500">
                  {feature.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed text-lg ">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseHelios;