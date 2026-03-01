import React, { useState } from "react";
import NavberDashboard from "../components/NavberDashboard";
import ProductsHeader from "../components/ProductsHeader";
import { Search, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ContactToggle from "../components/ContactToggle";

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  status: string;
  price: string;
  image: string;
  description: string;
}

/* -----------------------------------
   Promo Card Component
----------------------------------- */
interface PromoCardProps {
  title: string;
  subtitle: string;
  offer: string;
  image: string;
  category?: string;
}

const PromoCard: React.FC<PromoCardProps> = ({
  title,
  subtitle,
  image,
}) => {
  return (
    <div
      className="
        relative h-55 rounded-2xl overflow-hidden
        shadow-md hover:shadow-xl transition-all duration-300
        group cursor-pointer
      "
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-center text-white">
        <p className="text-sm text-white/80 mb-1">{subtitle}</p>
        <h3 className="text-xl font-semibold leading-tight mb-2">{title}</h3>

        <div className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all duration-300">
          View Products
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

function Product() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllCards, setShowAllCards] = useState(false);
  const [visibleCount] = useState(8);
  const navigate = useNavigate();

  /* -----------------------------------
     ALL Promo Cards Data (Backend Ready)
  ----------------------------------- */
  const allPromoCards: PromoCardProps[] = [
    {
      subtitle: "Machinery Accessories",
      title: "ACCESSORIES FOR MACHINERY",
      offer: "Up to 25% Off",
      image: "https://img.freepik.com/premium-photo/3d-rendering-medical-ventilator-machine-hospital_493806-557.jpg",
      category: "ACCESSORIES FOR MACHINERY",
    },
    {
      subtitle: "Lab Chemicals",
      title: "Chemical",
      offer: "20% Off",
      image: "https://images.unsplash.com/photo-1694230155228-cdde50083573?fm=jpg&q=60&w=3000&auto=format&fit=crop",
      category: "Chemical",
    },
    {
      subtitle: "Diagnostic Supplies",
      title: "DIPONED",
      offer: "Min. 15% Off",
      image: "https://www.henryschein.com/us-en/images/medical/defibrillators_600.jpg",
      category: "DIPONED",
    },
    {
      subtitle: "Single-Use Items",
      title: "Disposable Item",
      offer: "Special Pricing",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1170&auto=format&fit=crop",
      category: "Disposable Item",
    },
    {
      subtitle: "Powered Devices",
      title: "Electrical Item",
      offer: "Up to 30% Off",
      image: "https://protoplastics.com/wp-content/uploads/2022/02/bigstock-Operating-Room-5634793-enh.jpg",
      category: "Electrical Item",
    },
    {
      subtitle: "Essential Tools",
      title: "General Item & Instrument",
      offer: "Best Deals",
      image: "https://media.istockphoto.com/id/470454993/photo/surgery-instruments.jpg?s=612x612&w=0&k=20&c=9ANZOx4lqyGqivyWYn6hY3u78WfUYTvBgbUPCBSUzlw=",
      category: "General Item & Instrument",
    },
    {
      subtitle: "Fitness Recovery",
      title: "Gym Items",
      offer: "15-25% Off",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQPd9rxSyLvQEvW8TqQ6T_5Z5xhyeKFoUnAw&s",
      category: "Gym Items",
    },
    {
      subtitle: "Protective Gear",
      title: "HELMIER",
      offer: "Limited Offer",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/1/380003676/BH/HV/PU/157178977/helmier-aerotherm-patient-warmer.jpg",
      category: "HELMIER",
    },
    {
      subtitle: "Precision Tools",
      title: "Instrument & Implants",
      offer: "Up to 35% Off",
      image: "https://i0.wp.com/entokey.com/wp-content/uploads/2017/05/9783131764515_c004_f001.jpg?w=960",
      category: "Instrument & Implants",
    },
    {
      subtitle: "Treatment Packages",
      title: "Kits",
      offer: "20% Off",
      image: "https://d3ka6l1e5o2tqs.cloudfront.net/blogs/medical-first-aid-kit/content-1.jpg",
      category: "Kits",
    },
    {
      subtitle: "Testing Solutions",
      title: "Kits & Reagent",
      offer: "Special Discount",
      image: "https://www.shutterstock.com/image-photo/hand-blue-glove-holding-small-260nw-2673716451.jpg",
      category: "Kits & Reagent",
    },
    {
      subtitle: "Research Tools",
      title: "Lab Equipments",
      offer: "Up to 30% Off",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRveUdfmVbfYrV68iXxHdH_AK6crgo7vmEfnA&s",
      category: "Lab Equipments",
    },
    {
      subtitle: "Eye Care Solutions",
      title: "Lens",
      offer: "Up to 20% Off",
      image: "https://media.istockphoto.com/id/507172508/photo/woman-inserting-a-contact-lens-in-eye.jpg?s=612x612&w=0&k=20&c=pUgr9bk-dGMzLs00sXaJBY71_Js-F2gFUaisjn8qLW8=",
      category: "Lens",
    },
    {
      subtitle: "Bedding & Textiles",
      title: "Linen Items",
      offer: "15% Off",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf-p0GY5dwN0j04tECKOljScRjB0lk-eNlkA&s",
      category: "Linen Items",
    },
    {
      subtitle: "Cardiac Devices",
      title: "MEDTRONIC",
      offer: "Special Pricing",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB3H0M2rFnvKZ1yAvQwXsVKHfc7YOLHPonLw&s",
      category: "MEDTRONIC",
    },
    {
      subtitle: "Catheter Solutions",
      title: "MEDTRONIC CATHETER",
      offer: "25% Off",
      image: "https://metronixmedical.com/wp-content/uploads/2022/02/medtronic-launcher-catheter.jpg",
      category: "MEDTRONIC CATHETER",
    },
    {
      subtitle: "Neuro Devices",
      title: "MEDTRONIC NEURO",
      offer: "Premium Quality",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO-ZgOtMvPf802g_lBl08e-r9e_M87gvIWPA&s",
      category: "MEDTRONIC NEURO",
    },
    {
      subtitle: "Heavy Equipment",
      title: "Machinery",
      offer: "Up to 30% Off",
      image: "https://t4.ftcdn.net/jpg/02/72/22/01/360_F_272220138_vj2NbNbpuZoIktW6Q6YTyWXWTI3GERf0.jpg",
      category: "Machinery",
    },
    {
      subtitle: "Patient Monitors",
      title: "Medical Equipments",
      offer: "Best Deals",
      image: "https://protoplastics.com/wp-content/uploads/2022/02/bigstock-Operating-Room-5634793-enh.jpg",
      category: "Medical Equipments",
    },
    {
      subtitle: "Pharmaceuticals",
      title: "Medicine",
      offer: "20% Discount",
      image: "https://static.vecteezy.com/system/resources/thumbnails/072/312/443/small/medical-supplies-and-pharmaceuticals-pills-capsules-syringe-test-tubes-and-masks-photo.jpg",
      category: "Medicine",
    },
  ];

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Filter logic with pagination
  const filteredPromoCards = allPromoCards.filter((card) => {
    const matchesSearch =
      searchTerm === "" ||
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Show limited cards initially, all when button clicked
  const displayCards = showAllCards 
    ? filteredPromoCards 
    : filteredPromoCards.slice(0, visibleCount);

  const hasMoreCards = filteredPromoCards.length > visibleCount && !showAllCards;

  return (
    <>
      <NavberDashboard />
      <ProductsHeader />
      <ContactToggle />
      
      {/* Responsive Search Bar with Soft Orange Shadow - SMALLER HEIGHT */}
      <div className="border-b border-gray-200 bg-white backdrop-blur-md sticky top-0 z-30 py-3 sm:py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            {/* Responsive Centered Search Input - SLIGHTLY SMALLER HEIGHT */}
            <div className="relative w-full sm:w-auto max-w-xs sm:max-w-md lg:max-w-3xl xl:max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 lg:pl-4 flex items-center pointer-events-none z-10">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-gray-400 shrink-0" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full pl-9 sm:pl-11 lg:pl-14 pr-10 sm:pr-12 lg:pr-14 py-2 sm:py-2 lg:py-2.5
                  bg-white/80 backdrop-blur-sm
                  border border-gray-200/70 rounded-2xl lg:rounded-3xl
                  text-gray-900 text-sm sm:text-base lg:text-lg font-medium
                  placeholder-gray-500 placeholder:font-normal
                  focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400
                  shadow-[0_4px_20px_rgba(251,146,60,0.15)] hover:shadow-[0_6px_25px_rgba(251,146,60,0.25)]
                  focus:shadow-[0_8px_30px_rgba(251,146,60,0.35)] 
                  transition-all duration-300 ease-out
                  sm:min-w-70 lg:min-w-125
                "
                placeholder="Search medical equipment, brands, categories..."
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute inset-y-0 right-2 sm:right-3 lg:right-4 flex items-center text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </button>
              )}
            </div>

            {/* Active Search Display - Responsive */}
            {searchTerm.trim() !== "" && (
              <div className="flex justify-center w-full sm:w-auto">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-50/80 text-orange-800 text-xs sm:text-sm rounded-full border border-orange-200/50 shadow-sm backdrop-blur-sm">
                  "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1.5 hover:text-orange-900 transition-all duration-200 hover:scale-110"
                    aria-label="Remove search filter"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Results Count */}
        <div className="mb-6 sm:mb-8">
         <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Medical Equipment
          </h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Showing {displayCards.length} of {filteredPromoCards.length} products
            {searchTerm.trim() !== "" && ` matching "${searchTerm}"`}
            {!showAllCards && filteredPromoCards.length > visibleCount && ` (+${filteredPromoCards.length - visibleCount} more)`}
          </p>
        </div>

        {/* Promo Cards Grid */}
        {filteredPromoCards.length > 0 ? (
          <>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              onClick={() => navigate("/disclouse")}
            >
              {displayCards.map((card, index) => (
                <PromoCard key={index} {...card} />
              ))}
            </div>

            {/* LOAD MORE BUTTON */}
            {hasMoreCards && (
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                <div className="max-w-2xl mx-auto text-center py-4 sm:py-6">
                  <button
                    onClick={() => setShowAllCards(true)}
                    className="
                      inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5
                      bg-linear-to-r from-orange-400 to-orange-400
                      hover:from-orange-500 hover:to-orange-500
                      text-white font-semibold text-base sm:text-lg
                      rounded-2xl shadow-xl hover:shadow-2xl
                      transform hover:-translate-y-1 hover:scale-[1.02]
                      transition-all duration-300
                      border-0 focus:outline-none focus:ring-4 focus:ring-orange-500/50
                    "
                  >
                    View More 
                  </button>
                  <p className="text-sm text-gray-500 mt-3">
                    Click to view complete collection
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 sm:py-10 bg-gray-50/50 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 flex items-center justify-center bg-orange-100 rounded-full">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-orange-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base max-w-md mx-auto">
              {searchTerm.trim() !== ""
                ? `No products found for "${searchTerm}". Try a different search term.`
                : "No products available."}
            </p>
            {searchTerm.trim() !== "" && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-6 py-2.5 sm:px-8 sm:py-3 bg-orange-600 text-white font-medium text-sm sm:text-base rounded-xl hover:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
