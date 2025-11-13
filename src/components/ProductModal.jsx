import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/cart';

export default function ProductModal() {
  const { selectedProduct, isProductModalOpen, closeProductModal, addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    if (isProductModalOpen && selectedProduct) {
      setSelectedImage(0);
      setQuantity(1);
      setCustomization({});
      setActiveTab('details');
    }
  }, [isProductModalOpen, selectedProduct]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeProductModal();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeProductModal();
      }
    };

    if (isProductModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isProductModalOpen, closeProductModal]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity, customization);
      closeProductModal();
    }
  };

  const handleCustomizationChange = (key, value) => {
    setCustomization(prev => ({ ...prev, [key]: value }));
  };

  if (!isProductModalOpen || !selectedProduct) return null;

  const tabs = [
    { id: 'details', label: 'Details', icon: '📋' },
    { id: 'sustainability', label: 'Sustainability', icon: '🌱' },
    { id: 'sizing', label: 'Size Guide', icon: '📏' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-serif font-bold text-text">{selectedProduct.name}</h2>
          <button
            onClick={closeProductModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={selectedProduct.images[selectedImage]}
                alt={`${selectedProduct.name} - Image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {selectedProduct.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {selectedProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${selectedProduct.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-text">{formatPrice(selectedProduct.price)}</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {selectedProduct.category}
                </span>
              </div>
              <p className="text-text/70 text-lg">{selectedProduct.description}</p>
            </div>

            {/* Customization Options */}
            {selectedProduct.customization_options && Object.keys(selectedProduct.customization_options).length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-text">Customize Your Product</h3>
                {Object.entries(selectedProduct.customization_options).map(([key, options]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-text mb-2 capitalize">
                      {key.replace('_', ' ')}
                    </label>
                    <select
                      value={customization[key] || ''}
                      onChange={(e) => handleCustomizationChange(key, e.target.value)}
                      className="input w-full"
                    >
                      <option value="">Select {key.replace('_', ' ')}</option>
                      {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="font-semibold text-lg w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="btn-primary w-full text-lg py-4"
            >
              Add to Cart - {formatPrice(selectedProduct.price * quantity)}
            </button>

            {/* Product Tabs */}
            <div>
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-text/60 hover:text-text hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                {activeTab === 'details' && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-text">Product Details</h4>
                    <div className="space-y-2 text-text/70">
                      <p><strong>Fabric:</strong> {selectedProduct.fabric_details?.material || 'Organic Cotton Blend'}</p>
                      <p><strong>Weight:</strong> {selectedProduct.fabric_details?.weight || '180 GSM'}</p>
                      <p><strong>Care:</strong> {selectedProduct.fabric_details?.care_instructions || 'Machine wash cold, tumble dry low'}</p>
                      <p><strong>Origin:</strong> {selectedProduct.fabric_details?.origin || 'Ethically sourced'}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'sustainability' && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-text">Sustainability Impact</h4>
                    <div className="space-y-2 text-text/70">
                      {selectedProduct.sustainability_facts?.map((fact, index) => (
                        <p key={index}>• {fact}</p>
                      )) || [
                        '• Made from 100% organic cotton',
                        '• Zero harmful chemicals used in production',
                        '• Fair trade certified manufacturing',
                        '• Carbon neutral shipping'
                      ].map((fact, index) => (
                        <p key={index}>{fact}</p>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'sizing' && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-text">Size Guide</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium">Size</th>
                            <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium">Chest (inches)</th>
                            <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium">Length (inches)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size, index) => (
                            <tr key={size}>
                              <td className="border border-gray-200 px-3 py-2 text-sm">{size}</td>
                              <td className="border border-gray-200 px-3 py-2 text-sm">{34 + index * 2}-{36 + index * 2}</td>
                              <td className="border border-gray-200 px-3 py-2 text-sm">{26 + index}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-text">Customer Reviews</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-text/70">4.8 out of 5 (124 reviews)</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="border-b border-gray-200 pb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-text">Sarah M.</span>
                            <div className="flex text-yellow-400">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-text/70 text-sm">Amazing quality and super soft fabric. Love the sustainable aspect!</p>
                        </div>
                        
                        <div className="border-b border-gray-200 pb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-text">Ravi K.</span>
                            <div className="flex text-yellow-400">
                              {[1, 2, 3, 4].map((star) => (
                                <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                </svg>
                              ))}
                              <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                              </svg>
                            </div>
                          </div>
                          <p className="text-text/70 text-sm">Good fit and comfortable. Delivery was quick too.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}