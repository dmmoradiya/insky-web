import React from 'react';

export default function Science() {
  return (
    <section className="bg-surface-container-low py-24 md:py-32 overflow-hidden" id="science">
      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="space-y-8">
          <span className="font-label-caps text-label-caps text-primary block">R&amp;D EXCELLENCE</span>
          <h2 className="font-headline-md text-3xl md:text-5xl lg:text-display-lg leading-tight text-primary">
            The Science <br />Behind INSKY.
          </h2>
          <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant leading-relaxed">
            Our laboratories blend ancient botanical wisdom with modern dermatological breakthroughs. Every formulation undergoes rigorous clinical assessment to ensure maximum efficacy without compromising skin health.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="p-8 border-l border-primary/10 bg-white/50 space-y-4 rounded-r-lg shadow-sm">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                biotech
              </span>
              <h4 className="font-headline-sm text-lg md:text-body-lg font-bold text-primary">Biomimetic Hydration</h4>
              <p className="font-body-md text-sm md:text-body-md text-on-surface-variant leading-relaxed">
                Active molecules that mirror your skin's natural moisture barrier.
              </p>
            </div>
            <div className="p-8 border-l border-primary/10 bg-white/50 space-y-4 rounded-r-lg shadow-sm">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                eco
              </span>
              <h4 className="font-headline-sm text-lg md:text-body-lg font-bold text-primary">Cold-Pressed Extracts</h4>
              <p className="font-body-md text-sm md:text-body-md text-on-surface-variant leading-relaxed">
                Preserving 98% of herbal potency through low-temp extraction.
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-surface-container-highest flex items-center justify-center p-6 md:p-12 relative overflow-hidden rounded-xl shadow-md">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
            <img
              alt="INSKY Scientific R&D Laboratory"
              className="w-full h-full object-cover shadow-2xl relative z-10 rounded-lg"
              src="/images/science/unnamed.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
