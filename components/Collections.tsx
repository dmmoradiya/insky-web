'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  particleColor: string;
  benefits: string[];
}

export default function Collections() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lock background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const products: Product[] = [
    {
      id: 'hydra-silk',
      title: 'Hydra Silk',
      subtitle: 'Pure Hydration, Silky Comfort',
      tagline: 'PURE HYDRATION, SILKY COMFORT',
      description: 'Infused with Aloe Vera and inspired by refreshing aquatic notes, Hydra Silk washes away weekly stress and environmental buildup. Every shower leaves your skin feeling clean, cool, and deeply revitalized, bringing premium freshness to your daily self-care routine.',
      image: '/images/collection/hydra.jpeg',
      particleColor: 'rgba(100, 200, 255, 0.4)', // light blue
      benefits: [
        'Invigorating Daily Refreshment',
        'Clean & Revitalized Skin Feel',
        'Long-Lasting Freshness Experience',
        'Comfortable Everyday Self-Care'
      ]
    },
    {
      id: 'berry-velvet',
      title: 'Berry Velvet',
      subtitle: 'Velvety Freshness, Every Day',
      tagline: 'VELVETY FRESHNESS, EVERY DAY',
      description: 'Enriched with natural fruit extracts and skin-conditioning ingredients, Berry Velvet lifts away daily environmental buildup. It leaves your skin feeling soft, smooth, and refreshed, while restoring a natural, healthy-looking glow with every wash.',
      image: '/images/collection/berry.jpeg',
      particleColor: 'rgba(255, 100, 150, 0.4)', // berry pink
      benefits: [
        'Delightful Fruity Shower Experience',
        'Soft & Smooth Skin Feel',
        'Luxurious Everyday Indulgence',
        'Naturally Refreshed Appearance'
      ]
    },
    {
      id: 'neem-clear',
      title: 'Neem Clear',
      subtitle: "Powered by Nature's Care",
      tagline: "POWERED BY NATURE'S CARE",
      description: 'Crafted with Multani Mitti, Kaolin Clay, Neem, and Tulsi, Neem Clear removes excess oil, surface impurities, and daily pollution buildup. This herbal blend leaves your skin feeling fresh, balanced, and naturally clean.',
      image: '/images/collection/neem.jpeg',
      particleColor: 'rgba(150, 255, 150, 0.25)', // green herbal
      benefits: [
        'Inspired by Traditional Herbal Care',
        'Deeply Refreshing Skin Experience',
        'Balanced & Clean-Looking Appearance',
        'Weekly Self-Care Essential'
      ]
    }
  ];

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300); // Wait for transition out
  };

  return (
    <section className="py-24 md:py-32 px-6 md:px-margin-desktop max-w-container-max mx-auto" id="collections">
      <div className="text-center mb-20 md:mb-24">
        <span className="font-label-caps text-label-caps text-on-surface-variant block mb-4">SIGNATURE PRODUCT LINES</span>
        <h2 className="font-headline-md text-3xl md:text-headline-md font-medium text-primary">The INSKY Selection</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-gutter">
        {products.map((product, idx) => (
          <div
            key={idx}
            className="group relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer ambient-shadow"
            onMouseEnter={() => setHoveredProduct(idx)}
            onMouseLeave={() => setHoveredProduct(null)}
            onClick={() => handleOpenModal(product)}
          >
            {/* Hover Particle Effects layer */}
            {hoveredProduct === idx && (
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {Array.from({ length: 10 }).map((_, pIdx) => {
                  const size = Math.random() * 8 + 4;
                  const left = Math.random() * 100;
                  return (
                    <div
                      key={pIdx}
                      className={`particle rise-particle-${(pIdx % 8) + 1}`}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: product.particleColor,
                        left: `${left}%`,
                        bottom: '0',
                      }}
                    />
                  );
                })}
              </div>
            )}

            <img
              alt={product.title}
              className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 relative z-0"
              src={product.image}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-6 md:p-10 text-white translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
              <h3 className="font-headline-sm text-xl md:text-headline-sm font-medium">{product.title}</h3>
              <p className="font-body-md text-sm md:text-body-md opacity-85 mt-2">{product.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Marketplace Links */}
      <div className="mt-16 md:mt-20 border-t border-primary/5 pt-12 flex flex-wrap justify-center gap-12 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
        <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">Available On</span>
        <span className="font-headline-sm italic text-xl md:text-2xl">Amazon</span>
        <span className="font-headline-sm italic text-xl md:text-2xl">Flipkart</span>
        <span className="font-headline-sm italic text-xl md:text-2xl">Meesho</span>
      </div>

      {/* Premium Product Modal */}
      {selectedProduct && (
        <div
          className={`fixed top-10 inset-0 z-[100] flex items-center justify-center p-4 md:p-10 transition-opacity duration-300 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xl transition-all duration-300"
            onClick={handleCloseModal}
          />

          {/* Modal Container */}
          <div
            className={`relative bg-[#f9f9f7] w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col md:flex-row transition-all duration-500 ease-out z-10 ${isModalOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'
              }`}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/80 backdrop-blur-sm text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined !text-[24px]">close</span>
            </button>

            {/* Left Image Section */}
            <div className="bg-surface-container-low flex items-center justify-center p-6 md:p-12 min-h-[180px] md:min-h-0 relative flex-shrink-0">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
              <img
                alt={selectedProduct.title}
                className="max-h-[160px] md:max-h-[420px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 relative z-10"
                src={selectedProduct.image}
              />
            </div>

            {/* Right Copy Section */}
            <div className="flex-1 min-h-0 p-6 md:p-16 flex flex-col justify-center space-y-6 md:space-y-8 overflow-y-auto">
              <div>
                <span className="font-label-caps text-[10px] md:text-label-caps text-primary/70 block mb-2 tracking-[0.2em]">
                  {selectedProduct.tagline}
                </span>
                <h2 className="font-headline-sm text-3xl md:text-headline-md font-medium text-primary leading-tight">
                  {selectedProduct.title}
                </h2>
              </div>

              <p className="font-body-md text-sm md:text-body-lg text-on-surface-variant leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Benefits */}
              <div className="space-y-3">
                <span className="font-label-caps text-[10px] tracking-widest text-primary/40 uppercase block mb-1">
                  Key Benefits
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProduct.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary !text-[18px]">check_circle</span>
                      <span className="font-body-md text-xs md:text-sm text-on-surface-variant">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 md:pt-6">
                <a
                  href="https://www.amazon.in/s?k=INSKY&ref=bl_dp_s_web_0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-center px-12 py-5 bg-primary text-white font-button text-button uppercase tracking-widest hover:opacity-90 transition-opacity w-full sm:w-auto"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
