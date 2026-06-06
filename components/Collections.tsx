'use client';

import { useState } from 'react';

export default function Collections() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products = [
    {
      title: 'Hydra Silk',
      subtitle: 'Pure Hydration, Silky Comfort',
      image: '/images/collection/hydra.jpeg',
      particleColor: 'rgba(100, 200, 255, 0.4)', // light blue
    },
    {
      title: 'Berry Velvet',
      subtitle: 'Velvety Freshness, Every Day',
      image: '/images/collection/berry.jpeg',
      particleColor: 'rgba(255, 100, 150, 0.4)', // berry pink
    },
    {
      title: 'Neem Clear',
      subtitle: "Powered by Nature's Care",
      image: '/images/collection/neem.jpeg',
      particleColor: 'rgba(150, 255, 150, 0.25)', // green herbal
    }
  ];

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
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 relative z-0"
              src={product.image}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-6 md:p-10 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
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
    </section>
  );
}
