import React from "react";

interface ProductCard {
  title: string;
  description: string;
  image: string;
  badge?: string;
}

const productData: ProductCard[] = [
  {
    title: "HELIOS Scanner Pro",
    description:
      "Advanced MRI system with AI-powered diagnostics for precise medical imaging",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    badge: "New Launch",
  },
  {
    title: "HELIOS Surgical Suite",
    description:
      "Complete surgical automation and guidance system with real-time analytics",
    image:
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    badge: "Featured",
  },
  {
    title: "HELIOS Diagnostics AI",
    description:
      "AI-powered diagnostic platform for faster and accurate disease detection",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    badge: "New Launch",
  },
  {
    title: "NEURO Voice AI",
    description:
      "Brain-computer interface for real-time patient monitoring and analysis",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    badge: "Upcoming",
  },
];

const LatestLaunches: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-900 via-orange-600 to-amber-700 bg-clip-text text-transparent">
          Latest Product Launches
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Discover our newest medical technology solutions designed to enhance
          healthcare delivery and improve patient outcomes.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mx-auto mt-8"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-8xl mx-auto">
        {productData.map((product, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-200 flex flex-col"
          >
            {/* Badge */}
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-300 to-orange-500/80 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/30">
                {product.badge}
              </div>
            )}

            {/* Image Container */}
            <div className="h-72 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 shrink-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
            </div>

            {/* Content - now using flex column + grow + justify-between */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-400 transition-colors">
                  {product.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {product.description}
                </p>
              </div>

              <button
                className="
                  w-full 
                  bg-gradient-to-r from-orange-400 to-orange-300 
                  hover:from-blue-700 hover:to-cyan-700 
                  text-white 
                  font-semibold 
                  py-4 px-6 
                  rounded-xl 
                  shadow-lg 
                  hover:shadow-xl 
                  transition-all duration-300 
                  transform hover:-translate-y-0.5 
                  active:translate-y-0 active:shadow-lg 
                  flex items-center justify-center gap-2 group
                "
              >
                <span>Learn More</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
              <div className="absolute w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent transform rotate-45 translate-x-12 -translate-y-12" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestLaunches;
