import React, { useState, useRef, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { services } from '../data/services';
import { X } from 'lucide-react';
import axios from 'axios';

interface ContactFormProps {
  onClose: () => void;
  selectedService?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose, selectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country_code: 'US',
    company: '',
    service: selectedService ? [selectedService] : [] as string[],
    promotion: true,
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  // Closing when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (formData.service.length === 0) newErrors.service = 'Please select at least one service';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        phone_no: formData.phone.replace(/\D/g, ''),
        country_code: formData.phone.substring(0, 1) === '+' ? 
                     formData.phone.substring(1, 3) : 'US'
      };

      await axios.post('https://test.ezworks.ai/form-api', payload);
      setSubmitSuccess(true);
      setTimeout(onClose, 2000);
    } catch (error) {
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-xs sm:max-w-md w-full p-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Thank You!</h2>
          <p className="text-base sm:text-lg">We'll contact you within 10 minutes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div 
        ref={formRef}
        className="bg-white rounded-xl w-full max-w-md mx-auto my-4 shadow-xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 rounded-t-xl p-5 sm:p-6 border-b flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Get in Touch
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-1"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Body*/}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[80vh]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                Name*
              </label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full p-3 text-base border rounded-lg ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                Email*
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full p-3 text-base border rounded-lg ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                Phone*
              </label>
              <PhoneInput
                country={'us'}
                value={formData.phone}
                onChange={(phone) => setFormData({...formData, phone})}
                inputClass={`w-full !p-3 !text-base border rounded-lg ${
                  errors.phone ? '!border-red-500' : '!border-gray-300'
                }`}
                buttonClass="!rounded-l-lg !bg-gray-100 !border-r-0"
                containerClass="!w-full"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Company Field */}
            <div>
              <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                Company*
              </label>
              <input
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className={`w-full p-3 text-base border rounded-lg ${
                  errors.company ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your company name"
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.company}
                </p>
              )}
            </div>

            {/* Services Field */}
            <div>
              <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                Services*
              </label>
              <Select
                isMulti
                value={formData.service.map(s => ({ value: s, label: s }))}
                onChange={(options) => 
                  setFormData({...formData, service: options.map(o => o.value)})
                }
                options={services.map(s => ({ value: s.name, label: s.name }))}
                placeholder="Select services..."
                className="text-base"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '48px',
                    fontSize: '1rem',
                    borderColor: errors.service ? '#ef4444' : '#d1d5db',
                  })
                }}
              />
              {errors.service && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.service}
                </p>
              )}
            </div>

            {/* Promotion Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="promotion"
                checked={formData.promotion}
                onChange={(e) => setFormData({...formData, promotion: e.target.checked})}
                className="w-5 h-5 mt-1 mr-3"
              />
              <label htmlFor="promotion" className="text-sm text-gray-700">
                I agree to receive promotional communications
              </label>
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-base sm:text-lg font-medium text-gray-800 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full p-3 text-base border border-gray-300 rounded-lg h-32"
                placeholder="Your message..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg mt-2 transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};