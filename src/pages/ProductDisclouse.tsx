import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import companyLogo from "../assets/company-logo.png";

import Form from "../components/Form";

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  image: string;
}

const ProductDisclose: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [productFilterOpen, setProductFilterOpen] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState<string>('All Brands');
  const [openForm, setOpenForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    phone: '',
    reason: '',
    otherReason: '',
    category: ''
  });

  const products: Product[] = [
    {
      id: 1,
      name: 'RX4901 / RX IMOLA PC / FLAT SCREEN / KEYBOARD',
      brand: 'RANDOX',
      description: 'ACCESSORIS FOR MACHINERY',
      image: 'https://dlcdnrog.asus.com/rog/media/176645697463.webp'
    },
    {
      id: 2,
      name: 'ACWPS-TYPE 6 / DI WATERPLANT 25LPH',
      brand: 'RANDOX',
      description: 'ACCESSORIS FOR MACHINERY',
      image: 'https://5.imimg.com/data5/IOS/Default/2020/12/AC/DF/LM/38175998/product-jpeg-500x500.png'
    },
    {
      id: 3,
      name: 'ACCU CHECK ACTIVE KIT N',
      brand: 'ROCHE',
      description: 'ACCESSORIS FOR MACHINERY',
      image: 'https://www.colmed.in/pub/media/catalog/product/cache/9032ff7ba287d48c7a6aa389b5ca9462/f/i/first_image_active.jpg'
    },
    {
      id: 4,
      name: 'ACCU CHECK GUIDE TEST STRIPS',
      brand: 'ROCHE',
      description: 'ACCESSORIS FOR MACHINERY',
      image: 'https://m.media-amazon.com/images/I/61pTClimq8L.jpg'
    },
    {
      id: 5,
      name: 'ACCU CHECK ACTIVE TEST STRIPS',
      brand: 'ROCHE',
      description: 'ACCESSORIS FOR MACHINERY',
      image: 'https://cdn01.pharmeasy.in/dam/products_otc/000665/accu-chek-active-glucometer-test-strips-box-of-50-6.1-1734607563.jpg'
    },
    {
      id: 6,
      name: 'ACCU CHECK PERFORMA TEST STRIPS',
      brand: 'ROCHE',
      description: 'ACCESSORIS FOR MACHINERY',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1XJjhySZ6M224Z-sMa8iRl7ihXiqypdIAQg&s'
    },
    {
      id: 7,
      name: 'ACCU CHECK INSTANT STRIPS',
      brand: 'ROCHE',
      description: 'ACCESSORIS FOR MACHINERY',
      image: 'https://m.media-amazon.com/images/I/41lj3M7qwOL._AC_UF350,350_QL80_.jpg'
    },
    {
      id: 8,
      name: 'ACCU CHECK SOFTCLIX LANCETS',
      brand: 'ROCHE',
      description: 'ACCESSORIS FOR MACHINERY',
      image: 'https://cdn01.pharmeasy.in/dam/products_otc/000685/accu-chek-softclix-lancet-25s-pack-2-1671741296.jpg'
    },
  ];

  const productTypes = [
    'All Brands', 'RANDOX', 'ROCHE', 'Premium', 'Standard', 'Budget Friendly'
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand =
      selectedProductType === 'All Brands' ||
      product.brand.toLowerCase() === selectedProductType.toLowerCase();

    return matchesSearch && matchesBrand;
  });

  const handleFormDataChange = (data: any) => {
    setFormData(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your API call here
    setOpenForm(false);
    // Reset form
    setFormData({
      name: '',
      countryCode: '+91',
      phone: '',
      reason: '',
      otherReason: '',
      category: ''
    });
  };

  return (
    <div className="helios-app">

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoom-in { from { transform: scale(0.95); } to { transform: scale(1); } }
        @keyframes slide-in-from-bottom-4 { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }

        :root {
          --cream: #faf8f6;
          --soft-white: #ffffff;
          --warm-gray: #f5f3f0;
          --text-primary: #2d2a27;
          --text-secondary: #6b6560;
          --text-muted: #9d9690;
          --accent-sage: #a8b5a0;
          --accent-terracotta: #d8a88e;
          --accent-lavender: #c4b5d8;
          --accent-sky: #b8d4e0;
          --border: rgba(45, 42, 39, 0.08);
          --shadow-sm: 0 1px 3px rgba(45, 42, 39, 0.04), 0 1px 2px rgba(45, 42, 39, 0.03);
          --shadow-md: 0 4px 12px rgba(45, 42, 39, 0.06), 0 2px 4px rgba(45, 42, 39, 0.04);
          --shadow-lg: 0 12px 28px rgba(45, 42, 39, 0.08), 0 4px 8px rgba(45, 42, 39, 0.05);
          --header-h-desktop: 82px;
          --header-h-tablet: 180px;
          --header-h-mobile: 175px;
        }

        body {
          overflow-x: hidden;
        }

        .helios-app {
          min-height: 100vh;
          background: var(--cream);
          color: var(--text-primary);
          position: relative;
          overflow-x: hidden;
        }

        .helios-app::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(circle at 20% 20%, rgba(168, 181, 160, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(216, 168, 142, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(196, 181, 216, 0.06) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          animation: fade-in 0.2s ease-out;
        }

        .modal-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(32px);
          border-radius: 24px;
          padding: 2rem;
          max-width: 28rem;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: slide-in-from-bottom-4 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .modal-close {
          padding: 0.5rem;
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .modal-close:hover {
          background: rgba(249, 115, 22, 0.1);
          color: #f97316;
        }

        /* Header */
        .header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          padding: 1rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          box-shadow: 0 4px 24px rgba(249, 115, 22, 0.12), 0 2px 8px rgba(251, 146, 60, 0.08);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          border-bottom: 1px solid rgba(249, 115, 22, 0.1);
          animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          flex-wrap: wrap;
        }

        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .back-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          width: 42px;
          height: 42px;
          padding: 0;
          border: 1.5px solid var(--border);
          border-radius: 50%;
          background: var(--soft-white);
          color: var(--text-secondary);
          cursor: pointer;
          flex-shrink: 0;
          font-size: 1.1rem;
          line-height: 1;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .back-btn:hover {
          border-color: #f97316;
          background: rgba(249, 115, 22, 0.08);
          color: #f97316;
          transform: translateX(-2px);
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-shrink: 0;
          min-width: 0;
        }

        .logo-img {
          width: 38px;
          height: 38px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .brand-name {
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s ease;
        }

        .brand-name:hover {
          color: #f97316;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 0;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        .search-container {
          position: relative;
          width: 260px;
          max-width: 100%;
        }

        .search-box {
          width: 100%;
          padding: 0.65rem 1.1rem 0.65rem 2.5rem;
          border: 1.5px solid var(--border);
          border-radius: 50px;
          font-size: 0.8125rem;
          font-family: 'DM Sans', sans-serif;
          background: var(--soft-white);
          color: var(--text-primary);
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-container::before {
          content: '⌕';
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          font-size: 1rem;
          pointer-events: none;
        }

        .search-box::placeholder { color: var(--text-muted); font-size: 0.8125rem; }
        .search-box:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
          background: var(--soft-white);
        }

        .filter-row {
          display: flex;
          gap: 0.5rem;
        }

        .filter-dropdown-wrapper { position: relative; }

        .filter-dropdown-btn {
          padding: 0.6rem 1.1rem;
          border: 1.5px solid var(--border);
          border-radius: 50px;
          background: var(--soft-white);
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .filter-dropdown-btn:hover {
          border-color: #f97316;
          background: rgba(249, 115, 22, 0.05);
          color: #f97316;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(249, 115, 22, 0.15);
        }

        .filter-dropdown-btn.active {
          background: linear-gradient(135deg, #f97316, #fb923c);
          border-color: #f97316;
          color: var(--soft-white);
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
        }

        .filter-dropdown-btn .arrow {
          font-size: 0.6rem;
          transition: transform 0.3s ease;
        }

        .filter-dropdown-btn.open .arrow { transform: rotate(180deg); }

        .filter-dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          background: var(--soft-white);
          border: 1.5px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow-lg);
          min-width: 180px;
          max-height: 320px;
          overflow-y: auto;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
        }

        .filter-dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .filter-dropdown-item {
          padding: 0.65rem 1rem;
          cursor: pointer;
          font-size: 0.75rem;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
          border-bottom: 1px solid var(--border);
        }

        .filter-dropdown-item:last-child { border-bottom: none; }
        .filter-dropdown-item:hover { background: rgba(249, 115, 22, 0.06); color: #f97316; }
        .filter-dropdown-item.selected {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.12), rgba(251, 146, 60, 0.08));
          color: #f97316;
          font-weight: 600;
        }

        .filter-dropdown-item.selected::before {
          content: '✓ ';
          color: #f97316;
          font-weight: 700;
        }

        .main-container {
          padding: calc(var(--header-h-desktop) + 1.5rem) 2rem 2.5rem;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        .category-page-header {
          margin-bottom: 1.75rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border);
        }

        .category-page-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
          letter-spacing: -0.02em;
        }

        .category-page-description {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .products-count {
          font-size: 0.8125rem;
          color: var(--text-muted);
          margin-top: 0.6rem;
          font-weight: 500;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.25rem;
          align-content: start;
        }

        .product-card {
          background: var(--soft-white);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
          display: flex;
          flex-direction: column;
        }

        @keyframes fadeInUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(168, 181, 160, 0.2);
        }

        .product-image-container {
          position: relative;
          height: 130px;
          overflow: hidden;
          background: var(--warm-gray);
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover .product-image { transform: scale(1.05); }

        .product-info {
          padding: 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-category {
          color: var(--text-muted);
          font-size: 0.6875rem;
          font-weight: 600;
          margin-bottom: 0.35rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .product-name {
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
          color: var(--text-primary);
          line-height: 1.3;
          letter-spacing: -0.01em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-description {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
          line-height: 1.5;
          flex-grow: 1;
        }

        .product-footer {
          margin-top: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .details-btn {
          position: static;
          padding: 0.55rem 1.25rem;
          border: 1.5px solid var(--border);
          border-radius: 50px;
          background: transparent;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.8125rem;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
        }

        .details-btn:hover {
          background: #f97316;
          border-color: #f97316;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }

        .no-products {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem 1.5rem;
          color: var(--text-muted);
          font-size: 0.9375rem;
          font-weight: 500;
        }

        /* ===== Responsive breakpoints ===== */

        /* Large desktops */
        @media (max-width: 1400px) {
          .main-container { max-width: 100%; }
        }

        /* Small laptops / large tablets */
        @media (max-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1rem;
          }

          .search-container { width: 220px; }
        }

        /* Tablets */
        @media (max-width: 900px) {
          .header {
            padding: 0.85rem 1.25rem;
            gap: 0.6rem;
            flex-direction: column;
            align-items: stretch;
          }

          .header-left {
            width: 100%;
            justify-content: flex-start;
          }

          .header-right {
            width: 100%;
            flex-direction: column;
            align-items: stretch;
            gap: 0.6rem;
          }

          .search-container {
            width: 100%;
            order: 2;
          }

          .filter-row {
            width: 100%;
            gap: 0.5rem;
            order: 1;
          }

          .filter-dropdown-wrapper { flex: 1; }
          .filter-dropdown-btn { width: 100%; justify-content: space-between; }

          .main-container {
            padding: calc(var(--header-h-tablet) + 1rem) 1.25rem 2rem;
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
            gap: 1rem;
          }

          .category-page-title { font-size: 1.5rem; }
        }

        /* Mobile phones */
        @media (max-width: 640px) {
          .header { padding: 0.75rem 1rem; }

          .back-btn {
            width: 36px;
            height: 36px;
            font-size: 1rem;
          }

          .logo-img { width: 32px; height: 32px; }
          .brand-name { font-size: 0.9rem; }

          /* Reorder: search bar first, then filter, on mobile */
          .search-container {
            order: 1;
          }

          .filter-row {
            order: 2;
          }

          /* Make the filter dropdown span full width and open cleanly under the button */
          .filter-dropdown-wrapper {
            width: 100%;
          }

          .filter-dropdown-btn {
            width: 100%;
            padding: 0.7rem 1.1rem;
            font-size: 0.8125rem;
          }

          .filter-dropdown-menu {
            left: 0;
            right: 0;
            width: 100%;
            min-width: 0;
          }

          .main-container {
            padding: calc(var(--header-h-mobile) + 0.75rem) 1rem 1.5rem;
          }

          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .product-image-container { height: 100px; }
          .product-info { padding: 0.75rem; }
          .product-name { font-size: 0.8125rem; }
          .product-description {
            font-size: 0.6875rem;
            margin-bottom: 0.75rem;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .details-btn { padding: 0.5rem 1rem; font-size: 0.75rem; }

          .category-page-title { font-size: 1.25rem; }
          .category-page-description { font-size: 0.8125rem; }
        }

        /* Very small phones */
        @media (max-width: 380px) {
          .products-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.6rem;
          }

          .product-image-container { height: 90px; }
          .brand-name { display: none; }
        }
      `}</style>

      <header className="header">
        <div className="header-left">
         <button
  className="back-btn"
  onClick={() => navigate(-1)}
  aria-label="Go back"
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>
          <div className="header-logo">
            <img src={companyLogo} alt="Helios Logo" className="logo-img" />
            <h1 className="brand-name">HELIOS MEDICAL SYSTEMS</h1>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-box"
            placeholder="Search equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="header-right">
          <div className="filter-row">
            <div className="filter-dropdown-wrapper">
              <button
                className={`filter-dropdown-btn ${productFilterOpen || selectedProductType !== 'All Brands' ? 'active' : ''} ${productFilterOpen ? 'open' : ''}`}
                onClick={() => setProductFilterOpen(!productFilterOpen)}
              >
                {selectedProductType === 'All Brands' ? 'Brand Type' : selectedProductType}
                <span className="arrow">▼</span>
              </button>
              <div className={`filter-dropdown-menu ${productFilterOpen ? 'open' : ''}`}>
                {productTypes.map(type => (
                  <div
                    key={type}
                    className={`filter-dropdown-item ${selectedProductType === type ? 'selected' : ''}`}
                    onClick={() => { setSelectedProductType(type); setProductFilterOpen(false); }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main-container">
        <div className="category-page-header">
          <h1 className="category-page-title">{activeCategory}</h1>
          <p className="category-page-description">
            Explore our premium selection of {activeCategory.toLowerCase() === 'all categories' ? 'medical equipment' : activeCategory.toLowerCase()} designed for modern healthcare facilities.
          </p>
          <div className="products-count">
            Showing {filteredProducts.length} results
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                  <div className="product-category">{product.brand}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <button
                      className="details-btn"
                      onClick={() => setOpenForm(true)}
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </main>

      {/* Contact Form Modal */}
      {openForm && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setOpenForm(false);
        }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Request Callback</h2>
              <button
                className="modal-close"
                onClick={() => setOpenForm(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <Form
              formData={formData}
              onFormDataChange={handleFormDataChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>

  );
};

export default ProductDisclose;