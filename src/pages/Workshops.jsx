import { useState } from 'react';

export default function Workshops() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    class: '',
    workshop: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const workshops = [
    {
      id: 'upcycling-basics',
      title: 'Upcycling Basics',
      date: '2024-12-15',
      time: '2:00 PM - 5:00 PM',
      duration: '3 hours',
      description: 'Learn the fundamentals of textile upcycling, from identifying suitable fabrics to basic stitching techniques.',
      skills: ['Fabric selection', 'Basic stitching', 'Pattern making', 'Color coordination'],
      price: 'Free',
      capacity: '20 students',
      image: '/assets/workshop-1.jpg'
    },
    {
      id: 'advanced-techniques',
      title: 'Advanced Upcycling Techniques',
      date: '2024-12-22',
      time: '10:00 AM - 4:00 PM',
      duration: '6 hours',
      description: 'Master advanced techniques including embellishment, restructuring, and creating new garments from multiple pieces.',
      skills: ['Advanced stitching', 'Embellishment', 'Garment restructuring', 'Creative design'],
      price: '₹500',
      capacity: '15 students',
      image: '/assets/workshop-2.jpg'
    },
    {
      id: 'sustainable-design',
      title: 'Sustainable Fashion Design',
      date: '2025-01-05',
      time: '9:00 AM - 3:00 PM',
      duration: '6 hours',
      description: 'Explore sustainable design principles, ethical fashion practices, and building a sustainable wardrobe.',
      skills: ['Design thinking', 'Sustainability principles', 'Wardrobe planning', 'Ethical sourcing'],
      price: '₹300',
      capacity: '25 students',
      image: '/assets/workshop-3.jpg'
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
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.school.trim()) newErrors.school = 'School/College is required';
    if (!formData.class.trim()) newErrors.class = 'Class/Year is required';
    if (!formData.workshop) newErrors.workshop = 'Please select a workshop';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Save RSVP to localStorage
    const rsvps = JSON.parse(localStorage.getItem('workshop_rsvps') || '[]');
    const rsvp = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'confirmed'
    };
    rsvps.push(rsvp);
    localStorage.setItem('workshop_rsvps', JSON.stringify(rsvps));

    // If API URL exists, also send to backend
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/workshops/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rsvp)
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
            <h2 className="text-2xl font-serif font-bold text-text mb-4">RSVP Confirmed!</h2>
            <p className="text-text/70 mb-6">
              Thank you for registering for our workshop. We'll send you a confirmation email with 
              all the details and location information.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
            >
              Register for Another Workshop
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
            Sustainability Workshops
          </h1>
          <p className="text-xl text-text/70 max-w-3xl mx-auto">
            Learn upcycling techniques, sustainable fashion practices, and connect with like-minded 
            individuals in hands-on workshops led by our experienced artisans.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Workshops List */}
          <div className="lg:col-span-2 space-y-6">
            {workshops.map(workshop => (
              <div key={workshop.id} className="bg-white rounded-card shadow-sm overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={workshop.image}
                      alt={workshop.title}
                      className="w-full h-48 md:h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                          <h3 className="text-xl font-serif font-bold text-text mb-2 sm:mb-0">
                            {workshop.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-text/70">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                              {workshop.price}
                            </span>
                            <span>{workshop.capacity}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-text/60">Date:</span>
                            <div className="font-medium text-text">
                              {new Date(workshop.date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                          <div>
                            <span className="text-text/60">Time:</span>
                            <div className="font-medium text-text">{workshop.time}</div>
                          </div>
                          <div>
                            <span className="text-text/60">Duration:</span>
                            <div className="font-medium text-text">{workshop.duration}</div>
                          </div>
                        </div>
                        
                        <p className="text-text/70 mb-4">{workshop.description}</p>
                        
                        <div>
                          <h4 className="font-medium text-text mb-2">What you'll learn:</h4>
                          <div className="flex flex-wrap gap-2">
                            {workshop.skills.map(skill => (
                              <span
                                key={skill}
                                className="bg-accent/10 text-accent px-2 py-1 rounded text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-card shadow-sm sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-text mb-6">Register for Workshop</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
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
                    placeholder="Enter your email"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="school" className="block text-sm font-medium text-text mb-1">
                    School/College *
                  </label>
                  <input
                    type="text"
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    className={`input ${errors.school ? 'border-red-500' : ''}`}
                    placeholder="Enter your school/college name"
                    required
                  />
                  {errors.school && (
                    <p className="text-red-500 text-sm mt-1">{errors.school}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-text mb-1">
                    Class/Year *
                  </label>
                  <input
                    type="text"
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleInputChange}
                    className={`input ${errors.class ? 'border-red-500' : ''}`}
                    placeholder="e.g., 10th Grade, 2nd Year B.Tech"
                    required
                  />
                  {errors.class && (
                    <p className="text-red-500 text-sm mt-1">{errors.class}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="workshop" className="block text-sm font-medium text-text mb-1">
                    Select Workshop *
                  </label>
                  <select
                    id="workshop"
                    name="workshop"
                    value={formData.workshop}
                    onChange={handleInputChange}
                    className={`input ${errors.workshop ? 'border-red-500' : ''}`}
                    required
                  >
                    <option value="">Choose a workshop</option>
                    {workshops.map(workshop => (
                      <option key={workshop.id} value={workshop.id}>
                        {workshop.title} - {new Date(workshop.date).toLocaleDateString('en-IN')}
                      </option>
                    ))}
                  </select>
                  {errors.workshop && (
                    <p className="text-red-500 text-sm mt-1">{errors.workshop}</p>
                  )}
                </div>

                <button type="submit" className="btn-primary w-full">
                  Register Now
                </button>
              </form>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-medium text-primary mb-2">What's Included:</h3>
                <ul className="text-sm text-text/70 space-y-1">
                  <li>• All materials and tools</li>
                  <li>• Expert guidance</li>
                  <li>• Take-home project</li>
                  <li>• Certificate of completion</li>
                  <li>• Refreshments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}