import { Link } from "react-router-dom";
import logo from "../assets/company-logo.png";

interface FooterProps {
  className?: string;
}

const Footer = ({ className = "" }: FooterProps) => {
  return (
    <footer className={`bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={logo} 
                  alt="HELIOS MEDICAL SYSTEMS Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-2xl font-bold">HELIOS MEDICAL SYSTEMS</span>
            </div>
            <p className="text-white/80 leading-relaxed text-lg">
              Leading provider of innovative medical technology solutions for healthcare 
              professionals worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-base"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-base"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Support</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-base"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-base"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-base"
                >
                  Technical Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-base"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-base"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-base"
                >
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/80 text-lg">
            © 2026 HELIOS MEDICAL SYSTEMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;