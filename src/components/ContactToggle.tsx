import  { useState, useEffect, useRef } from 'react';

const ContactToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    phone: '',
    reason: '',
    otherReason: '',
    category: ''
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Country codes
  const countryCodes = [
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+44', country: 'GB', flag: '🇬🇧' },
    { code: '+61', country: 'AU', flag: '🇦🇺' },
    { code: '+971', country: 'AE', flag: '🇦🇪' },
    { code: '+65', country: 'SG', flag: '🇸🇬' },
    { code: '+60', country: 'MY', flag: '🇲🇾' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
  ];

  // Professional SVG Icons
  const PhoneIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );

  const XMarkIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );

  const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );

  const UserIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const EnvelopeIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12H2m16 4-6.5-4.5L10 16m6 0h2M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
    </svg>
  );

  const ChatIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  const CheckCircleIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

  const reasons = ['Services', 'Problem', 'Product Overview', 'Delivery', 'Other'];
  const SUPPORT_EMAIL = 'support@helios.com';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleRequestCall = (e:any) => {
    e.stopPropagation();
    setShowModal(true);
    setIsOpen(false);
  };

  const handleEmailClick = (e:any) => {
    e.stopPropagation();
    const subject = `Inquiry: ${formData.reason || formData.otherReason || 'General'}`;
    const body = formData.name ? `Hi, I'm ${formData.name}.` : 'Hello,';
    const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setIsOpen(false);
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    
    // Phone number validation: only allow digits and limit to 10
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        setFormData({ ...formData, [name]: digitsOnly });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    // Validate phone number is exactly 10 digits
    if (formData.phone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    // Validate other reason if "Other" is selected
    if (formData.reason === 'Other' && !formData.otherReason.trim()) {
      alert('Please describe your issue');
      return;
    }
    
    const fullPhoneNumber = `${formData.countryCode}${formData.phone}`;
    console.log('Form submitted:', { ...formData, fullPhoneNumber });
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<div class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Sending...</div>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      setShowModal(false);
      setShowSuccessPopup(true);
      setFormData({ name: '', countryCode: '+91', phone: '', reason: '', otherReason: '', category: '' });
      
      // Auto-hide success popup after 5 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);
    }, 1500);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-50" ref={dropdownRef}>
      {/* Responsive Professional FAB - Now Round */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
        aria-expanded={isOpen}
        className={`
          relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full shadow-xl
          flex items-center justify-center text-white font-medium
          transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:ring-offset-2
          border border-white/20 backdrop-blur-sm
          ${isOpen 
            ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/25 scale-[0.98]' 
            : 'bg-gradient-to-br from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 hover:shadow-2xl hover:shadow-orange-500/30 hover:scale-105'
          }
        `}
      >
        {isOpen ? (
          <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        ) : (
          <ChatIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
        )}
        
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-orange-300/30 animate-ping [animation-duration:2s]"></div>
        )}
      </button>

      {/* Responsive Contact Dropdown */}
      {isOpen && (
        <div className="absolute bottom-16 sm:bottom-20 lg:bottom-24 right-0 w-72 sm:w-80 lg:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100/50 z-50 overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200 max-h-[80vh] sm:max-h-[85vh]">
          {/* Clean Header */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 px-4 sm:px-6 py-3 sm:py-4 border-b border-orange-100">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <ChatIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">Contact Support</h3>
                <p className="text-xs sm:text-sm text-gray-500">How can we assist you today?</p>
              </div>
            </div>
          </div>
          
          {/* Contact Options */}
          <div className="p-3 sm:p-4 space-y-2">
            <button
              onClick={handleRequestCall}
              className="group w-full flex items-center p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-orange-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-xs sm:text-sm leading-tight">Request Callback</div>
                <div className="text-xs text-gray-500">Response within 24 hours</div>
              </div>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-orange-600 ml-2 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={handleEmailClick}
              className="group w-full flex items-center p-3 sm:p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all duration-200 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-orange-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-xs sm:text-sm leading-tight">Email Support</div>
                <div className="text-xs text-gray-500 truncate">{SUPPORT_EMAIL}</div>
              </div>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-orange-600 ml-2 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Compact Responsive Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[99] animate-in fade-in duration-200" aria-hidden="true" onClick={closeModal} />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in zoom-in-95 fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[95vw] sm:max-w-sm lg:max-w-md max-h-[85vh] flex flex-col border border-gray-100 mx-2 overflow-hidden">
              {/* Smaller Header */}
              <div className="bg-gradient-to-r from-orange-400 to-orange-400 px-4 py-3 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold leading-tight">Request a Callback</h2>
                    <p className="text-xs text-orange-100">We'll contact you within 24 hours</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 flex-shrink-0 ml-2"
                  aria-label="Close dialog"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6 pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50/50 hover:border-gray-300"
                        />
                      </div>
                    </div>

                    {/* Phone with Country Code */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        {/* Country Code Dropdown */}
                        <div className="relative w-24 flex-shrink-0">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="w-full pl-2 pr-6 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-gray-50/50 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                          >
                            {countryCodes.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.flag} {country.code}
                              </option>
                            ))}
                          </select>
                          <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Phone Number Input */}
                        <div className="relative flex-1">
                          <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Enter 10-digit number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10}"
                            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50/50 hover:border-gray-300"
                          />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Enter 10 digits without country code</p>
                    </div>

                    {/* Reason */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                        Reason <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          required
                          className="w-full pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-gray-50/50 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                        >
                          <option value="">Select reason for contact</option>
                          {reasons.map((reason) => (
                            <option key={reason} value={reason}>{reason}</option>
                          ))}
                        </select>
                        <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Other Reason Description - Shows when "Other" is selected */}
                    {formData.reason === 'Other' && (
                      <div className="animate-in slide-in-from-top-2 duration-200">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                          Please describe your issue <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <textarea
                            name="otherReason"
                            placeholder="Please describe your issue in detail..."
                            value={formData.otherReason}
                            onChange={handleChange}
                            required={formData.reason === 'Other'}
                            rows={3}
                            className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical bg-gray-50/50 hover:border-gray-300 transition-all duration-200"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Provide details so we can assist you better</p>
                      </div>
                    )}

                    {/* Conditional Category Section */}
                    {formData.reason === 'Product Overview' && (
                      <div className="animate-in slide-in-from-top-2 duration-200">
                        <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5">
                          Product Category <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required={formData.reason === 'Product Overview'}
                            className="w-full pl-9 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-gray-50/50 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                          >
                            <option value="">Select product category</option>
                            <option value="Healthcare Devices">Healthcare Devices</option>
                            <option value="Telemedicine">Telemedicine</option>
                            <option value="Diagnostic Tools">Diagnostic Tools</option>
                            <option value="Wearables">Wearables</option>
                            <option value="Mobile Apps">Mobile Apps</option>
                            <option value="AI Solutions">AI Solutions</option>
                            <option value="Other">Other</option>
                          </select>
                          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Help us route your inquiry to the right team</p>
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-xl text-sm shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 transform hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Request Callback
                  </button>

                  <p className="text-xs text-gray-500 text-center px-2">
                    We respect your privacy. Your data is secure with us.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Success Popup Notification */}
      {showSuccessPopup && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[110] animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border border-green-100 p-4 sm:p-5 max-w-sm flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Request Received!</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Thank you for contacting us. We will call you within working hours (9 AM - 6 PM, Mon-Fri).
              </p>
            </div>
            <button
              onClick={closeSuccessPopup}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close notification"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactToggle;