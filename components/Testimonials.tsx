import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      initial: 'A',
      name: 'Ananya V.',
      text: '"The Hydra Silk foam is unlike anything else. It feels like washing your face with liquid clouds. Truly premium quality."',
    },
    {
      initial: 'R',
      name: 'Rohan M.',
      text: '"Finally found a Neem pack that doesn\'t strip my skin. It\'s refreshing and effective. I use it every Sunday ritual."',
    },
    {
      initial: 'S',
      name: 'Sara J.',
      text: '"The Berry Velvet fragrance is sophisticated—not too sweet. My skin feels incredibly smooth all day long."',
    },
  ];

  return (
    <section className="bg-surface-container py-24 md:py-32 px-6 md:px-margin-desktop">
      <div className="max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <span className="font-label-caps text-label-caps text-primary block">TESTIMONIALS</span>
            <h2 className="font-headline-md text-3xl md:text-headline-md font-medium text-primary mt-4">
              Loved by Our Customers
            </h2>
          </div>
          <div className="md:text-right">
            <div className="flex items-center gap-2 mb-2 md:justify-end">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="font-headline-sm text-xl md:text-headline-sm font-semibold">4.8/5</span>
            </div>
            <p className="font-body-md text-sm md:text-body-md text-on-surface-variant">
              Based on 100+ verified luxury reviews
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-gutter">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 md:p-10 flex flex-col justify-between border border-primary/5 rounded-xl ambient-shadow"
            >
              <p className="font-body-lg italic text-base md:text-body-lg text-primary leading-relaxed">
                {t.text}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {t.initial}
                </div>
                <div>
                  <p className="font-label-caps text-xs tracking-wider uppercase font-semibold text-primary">
                    {t.name}
                  </p>
                  <p className="text-xxs md:text-xs text-on-surface-variant uppercase tracking-widest mt-0.5">
                    Verified Customer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            className="font-button text-button uppercase tracking-widest border-b border-primary pb-1 hover:opacity-60 transition-opacity"
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leave A Review
          </a>
        </div>
      </div>
    </section>
  );
}
