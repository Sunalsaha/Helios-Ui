import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// Import your logo
import companyLogo from '../assets/company-logo.png';

/**
 * Enhanced Navbar with smoother interactions
 */
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-all duration-500 ${
      scrolled ? 'shadow-lg backdrop-blur-sm' : 'shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a className="flex items-center space-x-3 group transition-all duration-300">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <img src={companyLogo} alt="Helios Medical Logo" className="h-14 w-14 object-contain" />
            </div>
            <span className=" hidden sm:block text-2xl font-bold text-orange-500 transition-colors duration-300 group-hover:text-orange-600">
              HELIOS MEDICAL SYSTEMS
            </span>
          </a>
          
          <div className="hidden md:flex items-center space-x-4">
          
            <a href="/login" className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg">
             Explore Us
            </a>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-400 transition-all duration-300 hover:scale-110"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top-2 duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <div className="flex flex-col space-y-2 px-3 py-2">
                
                <a href="/login" className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500 font-medium transition-all duration-300 text-center hover:scale-105">
                  Explore Us
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;