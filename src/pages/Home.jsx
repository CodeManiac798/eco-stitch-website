import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import productsData from '../../data/products.json';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Get featured products (bestsellers and first 4 items)
    const featured = productsData.products
      .filter(product => product.tags.includes('bestseller'))
      .slice(0, 4);
    
    // If we don't have enough bestsellers, fill with other products
    if (featured.length < 4) {
      const remaining = productsData.products
        .filter(product => !featured.find(f => f.id === product.id))
        .slice(0, 4 - featured.length);
      featured.push(...remaining);
    }
    
    setFeaturedProducts(featured);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (featuredProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % featuredProducts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredProducts.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? featuredProducts.length - 1 : prev - 1);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-muted via-white to-accent/10 py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="max-w-lg">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-text mb-6 leading-tight">
                Eco-Stitch —{' '}
                <span className="text-primary">Fashion from Leftovers</span>
              </h1>
              <p className="text-xl text-text/80 mb-8 leading-relaxed">
                Stylish, durable clothing made from upcycled fabrics. 
                Affordable, sustainable, and locally made with pocket-friendly prices, 
                eco-friendly materials, and unique reusable packaging.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products" 
                  className="btn-primary text-center inline-block"
                  aria-label="Browse our sustainable clothing collection"
                >
                  Shop the Collection
                </Link>
                <Link 
                  to="/workshops" 
                  className="btn-outline text-center inline-block"
                  aria-label="Learn about our sustainability workshops"
                >
                  Join a Workshop
                </Link>
              </div>
              
              {/* Key Features */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="font-serif font-semibold text-primary mb-1">Eco-Friendly</h3>
                  <p className="text-sm text-text/70">Biodegradable materials</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                    </svg>
                  </div>
                  <h3 className="font-serif font-semibold text-accent mb-1">Affordable</h3>
                  <p className="text-sm text-text/70">Pocket-friendly prices</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="font-serif font-semibold text-primary mb-1">Customizable</h3>
                  <p className="text-sm text-text/70">Personalized options</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/src/assets/images/hero-banner.jpg" 
                  alt="Sustainable clothing made from upcycled fabrics"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-card shadow-2xl"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-card"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Slider */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-text mb-4">
              Handcrafted Upcycled Fashion
            </h2>
            <p className="text-xl text-text/70 max-w-2xl mx-auto">
              Each piece is uniquely crafted from upcycled materials by traditional artisans, 
              turning textile waste into treasured fashion with intricate patchwork and embroidery.
            </p>
            <div className="flex justify-center mt-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <span>🌟</span>
                <span>100% Upcycled • Zero Waste • Artisan Made</span>
              </div>
            </div>
          </div>

          {featuredProducts.length > 0 && (
            <div className="relative max-w-6xl mx-auto">
              {/* Product Slider */}
              <div className="overflow-hidden rounded-card">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="w-full flex-shrink-0">
                      <div className="grid md:grid-cols-2 gap-8 p-8">
                        <div className="relative">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-80 md:h-96 object-cover rounded-lg"
                            loading="lazy"
                          />
                          {product.tags.includes('bestseller') && (
                            <span className="absolute top-4 left-4 bg-accent text-text px-3 py-1 rounded-full text-sm font-medium">
                              Bestseller
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <h3 className="text-2xl font-serif font-bold text-text mb-4">
                            {product.name}
                          </h3>
                          <p className="text-text/70 mb-6 leading-relaxed">
                            {product.description}
                          </p>
                          <div className="mb-6">
                            <span className="text-2xl font-bold text-primary">
                              ₹{product.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex space-x-4">
                            <Link 
                              to={`/products/${product.id}`} 
                              className="btn-primary"
                              aria-label={`View details for ${product.name}`}
                            >
                              View Details
                            </Link>
                            <Link 
                              to="/products" 
                              className="btn-outline"
                            >
                              Shop All
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider Navigation */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Previous product"
              >
                <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Next product"
              >
                <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Slider Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Impact Strip */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
              Our Impact So Far
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Every purchase supports rural communities and reduces textile waste
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-serif font-bold mb-2">2,500+</div>
              <div className="text-white/90">Kg Fabric Upcycled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-serif font-bold mb-2">150+</div>
              <div className="text-white/90">Artisans Employed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-serif font-bold mb-2">1,200+</div>
              <div className="text-white/90">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-serif font-bold mb-2">85%</div>
              <div className="text-white/90">Waste Reduction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Sections */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Workshops CTA */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 17.5c-3.04 0-5.5-2.46-5.5-5.5 0-.55.45-1 1-1s1 .45 1 1c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-.55.45-1 1-1s1 .45 1 1c0 3.04-2.46 5.5-5.5 5.5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-text mb-4">
                Learn Sustainable Fashion
              </h3>
              <p className="text-text/70 mb-6">
                Join our workshops to learn upcycling techniques, sustainable fashion practices, 
                and connect with like-minded individuals in your community.
              </p>
              <Link to="/workshops" className="btn-primary">
                Join a Workshop
              </Link>
            </div>

            {/* Corporate Gifting CTA */}
            <div className="card text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-text mb-4">
                Corporate Gifting Solutions
              </h3>
              <p className="text-text/70 mb-6">
                Sustainable, thoughtful corporate gifts that reflect your company's 
                values. Beautiful reusable packaging with handwritten thank-you notes.
              </p>
              <Link to="/gifting" className="btn-secondary">
                Explore Gifting
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}