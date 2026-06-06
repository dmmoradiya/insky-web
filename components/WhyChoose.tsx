import React from 'react';

export default function WhyChoose() {
  const reasons = [
    {
      icon: 'verified_user',
      title: 'Selected Ingredients',
      desc: 'Only the purest botanical and clinical compounds make the grade.',
    },
    {
      icon: 'science',
      title: 'Thoughtful Formulations',
      desc: 'Balanced pH levels designed for the diverse needs of modern skin.',
    },
    {
      icon: 'spa',
      title: 'Refreshing Experience',
      desc: 'Sensory-driven textures that turn routines into rituals.',
    },
    {
      icon: 'auto_awesome',
      title: 'Herbal & Modern',
      desc: 'The perfect equilibrium between nature and technology.',
    },
    {
      icon: 'analytics',
      title: 'Quality Development',
      desc: 'Every batch is tested to meet international safety standards.',
    },
    {
      icon: 'temp_preferences_custom',
      title: 'Self-Care Solutions',
      desc: 'Daily luxury designed for the busy, affluent lifestyle.',
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-margin-desktop max-w-container-max mx-auto text-center" id="why-insky">
      <h2 className="font-headline-md text-3xl md:text-headline-md font-medium text-primary mb-24">
        Why Discerning Users <br />Choose INSKY
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-20 md:gap-y-32">
        {reasons.map((item, idx) => (
          <div key={idx} className="space-y-6 flex flex-col items-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl border-[0.5px] border-primary/10 bg-white/40 group-hover:border-primary/30 transition-all duration-500 shadow-sm">
              <span className="material-symbols-outlined text-primary opacity-80 text-10xl md:text-[60px]" style={{ fontVariationSettings: "'wght' 500" }}>
                {item.icon}
              </span>
            </div>
            <div>
              <h3 className="font-label-caps text-xs md:text-label-caps tracking-[0.2em] text-primary font-semibold">
                {item.title}
              </h3>
              <p className="font-body-md text-xs md:text-body-md text-on-surface-variant max-w-xs mx-auto leading-relaxed mt-4">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
