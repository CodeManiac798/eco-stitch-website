import { useState } from 'react';

export default function Gifting() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    giftType: '',
    quantity: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const giftOptions = [
    {
      id: 'executive',
      name: 'Executive Gift Set',
      price: '₹1,500 - ₹2,500',
      description: 'Premium upcycled shirt, tote bag, and accessories in elegant packaging',
      items: ['Custom embroidered shirt', 'Handcrafted tote bag', 'Eco-friendly notebook', 'Seed paper cards'],
      image: '/assets/gift-executive.jpg'
    },
    {
      id: 'employee',
      name: 'Employee Appreciation Set',
      price: '₹800 - ₹1,200',
      description: 'Thoughtful collection of sustainable accessories for everyday use',
      items: ['Upcycled fabric pouch', 'Reusable tote bag', 'Handkerchief set', 'Thank-you note'],
      image: '/assets/gift-employee.jpg'
    },
    {
      id: 'client',
      name: 'Client Appreciation Set',
      price: '₹2,000 - ₹3,500',
      description: 'Luxury sustainable gifts that reflect your company\'s values',
      items: ['Premium garment', 'Artisan-made accessories', 'Company-branded packaging', 'Sustainability certificate'],
      image: '/assets/gift-client.jpg'
    },
    {
      id: 'custom',
      name: 'Custom Corporate Set',
      price: 'Quote on request',
      description: 'Fully customized gifts tailored to your specific requirements',
      items: ['Bespoke items', 'Custom branding', 'Unique packaging', 'Volume discounts'],
      image: '/assets/gift-custom.jpg'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.giftType) newErrors.giftType = 'Please select a gift type';
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';
    if (!formData.timeline) newErrors.timeline = 'Please select a timeline';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Save inquiry to localStorage
    const inquiries = JSON.parse(localStorage.getItem('gifting_inquiries') || '[]');
    const inquiry = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    inquiries.push(inquiry);
    localStorage.setItem('gifting_inquiries', JSON.stringify(inquiries));

    // If API URL exists, also send to backend
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/gifting/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      }).catch(() => {
        // Silently fail - already saved to localStorage
      });
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-20 min-h-screen bg-muted flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white p-8 rounded-card shadow-sm">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-text mb-4">Inquiry Submitted!</h2>
            <p className="text-text/70 mb-6">
              Thank you for your interest in our corporate gifting solutions. Our team will 
              contact you within 24 hours with a detailed proposal and quote.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-text mb-4">
            Corporate Gifting Solutions
          </h1>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            Sustainable, thoughtful corporate gifts that reflect your company's values. 
            Beautiful reusable packaging with handwritten thank-you notes and a sustainability story.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-text mb-2">Sustainable Impact</h3>
            <p className="text-text/70">
              Every gift prevents textile waste and supports rural artisan communities, 
              creating a positive social and environmental impact.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-text mb-2">Unique Packaging</h3>
            <p className="text-text/70">
              Beautiful, reusable packaging that recipients will treasure. Each box becomes 
              a keepsake, extending the life of your gift.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
              </svg>
            </div>
            <h3 className="text-xl font-serif font-bold text-text mb-2">Personal Touch</h3>
            <p className="text-text/70">
              Handwritten thank-you notes and customization options make each gift 
              feel personal and thoughtful.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Gift Options */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-serif font-bold text-text mb-8">Gift Options</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {giftOptions.map(option => (
                <div key={option.id} className="bg-white rounded-card shadow-sm overflow-hidden">
                  <img
                    src={option.image}
                    alt={option.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-serif font-bold text-text">{option.name}</h3>
                      <span className="text-primary font-medium text-sm">{option.price}</span>
                    </div>
                    <p className="text-text/70 text-sm mb-4">{option.description}</p>
                    <div>
                      <h4 className="font-medium text-text mb-2 text-sm">Includes:</h4>
                      <ul className="text-xs text-text/60 space-y-1">
                        {option.items.map(item => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Customization Options */}
            <div className="bg-white rounded-card shadow-sm p-6">
              <h3 className="text-2xl font-serif font-bold text-text mb-4">
                Customization Options
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-text mb-3">Branding & Personalization</h4>
                  <ul className="text-text/70 text-sm space-y-2">
                    <li>• Company logo embroidery</li>
                    <li>• Custom color schemes</li>
                    <li>• Personalized messages</li>
                    <li>• Employee names on items</li>
                    <li>• Custom packaging design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-text mb-3">Packaging & Delivery</h4>
                  <ul className="text-text/70 text-sm space-y-2">
                    <li>• Reusable wooden boxes</li>
                    <li>• Handwritten thank-you notes</li>
                    <li>• Sustainability certificates</li>
                    <li>• Bulk delivery options</li>
                    <li>• Individual shipping available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-card shadow-sm sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-text mb-6">Get a Quote</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="companyName" className="block text-sm font-medium text-text mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className={`input ${errors.companyName ? 'border-red-500' : ''}`}
                      placeholder="Enter company name"
                      required
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-text mb-1">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className={`input ${errors.contactName ? 'border-red-500' : ''}`}
                      placeholder="Your name"
                      required
                    />
                    {errors.contactName && (
                      <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`input ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="Phone number"
                      required
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter email address"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="giftType" className="block text-sm font-medium text-text mb-1">
                      Gift Type *
                    </label>
                    <select
                      id="giftType"
                      name="giftType"
                      value={formData.giftType}
                      onChange={handleInputChange}
                      className={`input ${errors.giftType ? 'border-red-500' : ''}`}
                      required
                    >
                      <option value="">Select gift type</option>
                      {giftOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                      ))}
                    </select>
                    {errors.giftType && (
                      <p className="text-red-500 text-sm mt-1">{errors.giftType}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-text mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className={`input ${errors.quantity ? 'border-red-500' : ''}`}
                      placeholder="Number of gifts"
                      min="1"
                      required
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-text mb-1">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="">Select budget</option>
                      <option value="under-1000">Under ₹1,000 per gift</option>
                      <option value="1000-2000">₹1,000 - ₹2,000 per gift</option>
                      <option value="2000-5000">₹2,000 - ₹5,000 per gift</option>
                      <option value="above-5000">Above ₹5,000 per gift</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-text mb-1">
                      Timeline *
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className={`input ${errors.timeline ? 'border-red-500' : ''}`}
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="1-2-weeks">1-2 weeks</option>
                      <option value="3-4-weeks">3-4 weeks</option>
                      <option value="1-2-months">1-2 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                    {errors.timeline && (
                      <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
                      Additional Requirements
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      className="input"
                      placeholder="Any specific requirements, customization needs, or questions..."
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Request Quote
                </button>
              </form>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-medium text-primary mb-2">Why Choose Eco-Stitch?</h3>
                <ul className="text-sm text-text/70 space-y-1">
                  <li>• Minimum order: 10 pieces</li>
                  <li>• Volume discounts available</li>
                  <li>• 2-4 week lead time</li>
                  <li>• Sustainability certificates included</li>
                  <li>• Dedicated account manager</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}