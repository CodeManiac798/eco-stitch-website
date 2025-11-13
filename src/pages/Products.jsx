import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../../data/products.json';
import { formatPrice } from '../utils/cart';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('name');
  const { addToCart, isInCart } = useCart();

  // Initialize products
  useEffect(() => {
    setProducts(productsData.products);
    setFilteredProducts(productsData.products);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = products.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, sortBy]);

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      'all': 'All Products',
      'jackets': 'Jackets',
      'traditional': 'Traditional Wear',
      'accessories': 'Accessories',
      'students': 'Student Wear',
      'corporate': 'Corporate Gifts'
    };
    return categoryNames[category] || category;
  };

  return (
    <div className="pt-20 min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-text mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-text/70 max-w-2xl mx-auto">
            Discover our range of upcycled, sustainable clothing made with love and care for the environment.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-72 space-y-6">
            <div className="bg-white p-6 rounded-card shadow-sm">
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-serif font-semibold text-lg text-text mb-4">Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                        selectedCategory === category 
                          ? 'border-primary bg-primary' 
                          : 'border-gray-300'
                      }`}>
                        {selectedCategory === category && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className={`${
                        selectedCategory === category ? 'text-primary font-medium' : 'text-text/70'
                      }`}>
                        {getCategoryDisplayName(category)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-serif font-semibold text-lg text-text mb-4">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-text/70">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #2F7A4A 0%, #2F7A4A ${(priceRange[1] / 2000) * 100}%, #e5e7eb ${(priceRange[1] / 2000) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      min="0"
                      max="2000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="input text-sm"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 2000])}
                      className="input text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="font-serif font-semibold text-lg text-text mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input w-full"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Sustainability Info */}
            <div className="bg-primary/5 p-6 rounded-card border border-primary/20">
              <h3 className="font-serif font-semibold text-lg text-primary mb-3">
                🌱 Sustainability Promise
              </h3>
              <ul className="text-sm text-text/70 space-y-2">
                <li>• 100% upcycled materials</li>
                <li>• Biodegradable packaging</li>
                <li>• Fair trade practices</li>
                <li>• Free handkerchief with every order</li>
                <li>• Reusable packaging</li>
              </ul>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-text">
                  {getCategoryDisplayName(selectedCategory)}
                </h2>
                <p className="text-text/70">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>
              
              {/* Quick Sort (Mobile) */}
              <div className="sm:hidden">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="group">
                    <Link 
                      to={`/products/${product.id}`}
                      className="block bg-white rounded-card shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {/* Tags */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          {product.tags.includes('bestseller') && (
                            <span className="bg-accent text-text px-2 py-1 rounded text-xs font-medium">
                              Bestseller
                            </span>
                          )}
                          {product.tags.includes('customizable') && (
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                              Customizable
                            </span>
                          )}
                        </div>
                        
                        {/* Quick Add Button */}
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="absolute bottom-3 right-3 bg-white/90 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                          aria-label={`Quick add ${product.name} to cart`}
                        >
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <h3 className="font-serif font-semibold text-lg text-text mb-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-text/70 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        
                        {/* Sustainability Facts */}
                        <div className="mb-4">
                          <div className="flex items-center text-xs text-primary mb-1">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            {product.sustainability_facts[0]}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(product.price)}
                            </span>
                            <div className="text-xs text-text/60 mt-1">
                              {product.stock} in stock
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isInCart(product.id) 
                              ? 'bg-accent/20 text-accent' 
                              : 'bg-gray-100 text-text/70'
                          }`}>
                            {isInCart(product.id) ? 'In Cart' : 'Available'}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-semibold text-text mb-2">No products found</h3>
                <p className="text-text/70 mb-6">Try adjusting your filters or search criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setPriceRange([0, 2000]);
                    setSortBy('name');
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}