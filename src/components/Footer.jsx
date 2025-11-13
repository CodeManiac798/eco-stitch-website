import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Save to localStorage (simulate newsletter subscription)
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      subscribers.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      
      // If API URL exists, also send to backend
      const apiUrl = import.meta.env.VITE_API_URL;
      if (apiUrl) {
        fetch(`${apiUrl}/newsletter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        }).catch(() => {
          // Silently fail - already saved to localStorage
        });
      }
      
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    'Shop': [
      { name: 'All Products', href: '/products' },
      { name: 'Jackets', href: '/products?category=jackets' },
      { name: 'Traditional Wear', href: '/products?category=traditional' },
      { name: 'Accessories', href: '/products?category=accessories' },
      { name: 'Student Wear', href: '/products?category=students' }
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/about#story' },
      { name: 'Sustainability', href: '/about#sustainability' },
      { name: 'Workshops', href: '/workshops' },
      { name: 'Contact', href: '/contact' }
    ],
    'Services': [
      { name: 'Corporate Gifting', href: '/gifting' },
      { name: 'Custom Orders', href: '/contact' },
      { name: 'Bulk Orders', href: '/gifting' },
      { name: 'Workshops', href: '/workshops' },
      { name: 'Size Guide', href: '/size-guide' }
    ]
  };

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-1">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <span className="font-serif font-bold text-xl">Eco-Stitch</span>
            </Link>
            <p className="text-white/90 mb-4 leading-relaxed">
              Upcycling leftover textile fabrics into stylish, affordable clothing while creating employment 
              in underserved communities and reducing textile waste.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded p-1"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded p-1"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.468 4.467-4.468c2.458 0 4.467 2.01 4.467 4.468s-2.009 4.468-4.467 4.468z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded p-1"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-serif font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded px-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="max-w-md">
            <h3 className="font-serif font-semibold text-lg mb-2">Stay Updated</h3>
            <p className="text-white/90 mb-4">
              Get notified about new collections, workshops, and sustainability initiatives.
            </p>
            
            {isSubscribed ? (
              <div className="bg-accent/20 text-white p-4 rounded-lg">
                <p className="font-medium">Thank you for subscribing!</p>
                <p className="text-sm text-white/80">You'll hear from us soon.</p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  required
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="bg-accent text-text px-6 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Eco-Stitch. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded px-1">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded px-1">
              Terms of Service
            </Link>
            <Link to="/returns" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded px-1">
              Returns & Exchanges
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}