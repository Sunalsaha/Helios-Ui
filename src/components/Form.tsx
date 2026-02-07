import React from 'react';

const UserIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

interface FormProps {
  formData: {
    name: string;
    countryCode: string;
    phone: string;
    reason: string;
    otherReason: string;
    category: string;
  };
  onFormDataChange: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({ formData, onFormDataChange, onSubmit }) => {
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

  const reasons = ['Services', 'Problem', 'Product Overview', 'Delivery', 'Other'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 10) {
        onFormDataChange({ ...formData, [name]: digitsOnly });
      }
    } else {
      onFormDataChange({ ...formData, [name]: value });
    }
  };

  return (
    <>
      <style>{`
        /* Form Component Styles */
        .form-container {
          --cream: #faf8f6;
          --soft-white: #ffffff;
          --warm-gray: #f5f3f0;
          --text-primary: #2d2a27;
          --text-secondary: #6b6560;
          --text-muted: #9d9690;
          --border: rgba(45, 42, 39, 0.08);
          --shadow-sm: 0 1px 3px rgba(45, 42, 39, 0.04);
          --shadow-md: 0 4px 12px rgba(45, 42, 39, 0.06);
        }

        .form-main {
          space-y-4: display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.375rem;
        }

        .form-label-required {
          color: #ef4444;
        }

        .form-input-wrapper {
          position: relative;
        }

        .form-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0.875rem;
          height: 0.875rem;
          color: #9ca3af;
          pointer-events: none;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.625rem 0.75rem 0.625rem 2.25rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          background: rgba(249, 250, 251, 0.5);
          color: var(--text-primary);
          outline: none;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-select {
          padding-left: 0.5rem;
          padding-right: 1.5rem;
          cursor: pointer;
          appearance: none;
          background-image: none;
        }

        .form-textarea {
          padding: 0.625rem 0.875rem;
          resize: vertical;
          min-height: 4rem;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: #f97316;
          ring: 2px;
          ring-color: #f97316;
          background: #fefefe;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }

        .form-input:hover,
        .form-select:hover,
        .form-textarea:hover {
          border-color: #d1d5db;
        }

        .form-phone-row {
          display: flex;
          gap: 0.5rem;
        }

        .form-country-code {
          flex-shrink: 0;
          width: 6rem;
        }

        .form-country-code .form-select {
          padding-right: 1.5rem;
        }

        .form-chevron {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          width: 0.875rem;
          height: 0.875rem;
          color: #9ca3af;
          pointer-events: none;
        }

        .form-help-text {
          margin-top: 0.25rem;
          font-size: 0.75rem;
          color: #6b7280;
        }

        .form-submit {
          width: 100%;
          background: linear-gradient(135deg, #f97316, #fb923c);
          border: none;
          border-radius: 0.75rem;
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(249, 115, 22, 0.4);
          transition: all 0.2s ease;
          margin-top: 1rem;
        }

        .form-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #ea580c, #f59e0b);
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(249, 115, 22, 0.5);
        }

        .form-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .form-privacy {
          text-align: center;
          font-size: 0.75rem;
          color: #6b7280;
          padding: 0 0.5rem;
          margin-top: 0.5rem;
        }

        .form-conditional {
          animation: slideInFromTop 0.2s ease-out;
        }

        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 640px) {
          .form-phone-row {
            flex-direction: column;
          }
          
          .form-country-code {
            width: 100%;
          }
        }
      `}</style>

      <form onSubmit={onSubmit} className="form-main form-container">
        <div className="space-y-4">
          {/* Name */}
          <div className="form-field">
            <label className="form-label">
              Full Name <span className="form-label-required">*</span>
            </label>
            <div className="form-input-wrapper">
              <UserIcon className="form-icon" />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          {/* Phone with Country Code */}
          <div className="form-field">
            <label className="form-label">
              Phone Number <span className="form-label-required">*</span>
            </label>
            <div className="form-phone-row">
              <div className="form-country-code">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="form-select"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="form-chevron" />
              </div>

              <div className="form-input-wrapper flex-1">
                <PhoneIcon className="form-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="form-input"
                />
              </div>
            </div>
            <p className="form-help-text">Enter 10 digits without country code</p>
          </div>

          {/* Reason */}
          <div className="form-field">
            <label className="form-label">
              Reason <span className="form-label-required">*</span>
            </label>
            <div className="form-input-wrapper">
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select reason for contact</option>
                {reasons.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
              <ChevronDownIcon className="form-chevron" />
            </div>
          </div>

          {/* Other Reason Description */}
          {formData.reason === 'Other' && (
            <div className="form-field form-conditional">
              <label className="form-label">
                Please describe your issue <span className="form-label-required">*</span>
              </label>
              <div className="form-input-wrapper">
                <textarea
                  name="otherReason"
                  placeholder="Please describe your issue in detail..."
                  value={formData.otherReason}
                  onChange={handleChange}
                  required={formData.reason === 'Other'}
                  rows={3}
                  className="form-textarea"
                />
              </div>
              <p className="form-help-text">Provide details so we can assist you better</p>
            </div>
          )}

          {/* Product Category */}
          {formData.reason === 'Product Overview' && (
            <div className="form-field form-conditional">
              <label className="form-label">
                Product Category <span className="form-label-required">*</span>
              </label>
              <div className="form-input-wrapper">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required={formData.reason === 'Product Overview'}
                  className="form-select"
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
                <ChevronDownIcon className="form-chevron" />
              </div>
              <p className="form-help-text">Help us route your inquiry to the right team</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="form-submit"
        >
          Request Callback
        </button>

        <p className="form-privacy">
          We respect your privacy. Your data is secure with us.
        </p>
      </form>
    </>
  );
};

export default Form;
