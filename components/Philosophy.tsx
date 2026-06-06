import React from 'react';

export default function Philosophy() {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-margin-desktop py-20">
      <div className="absolute inset-0 z-0">
        <img
          alt="Luxury Bathroom Ethos Background"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLYPdZwL8L86l3QAL_j8kMWk_Wjg9JU6WcXlDnpM0YmuSu-0KbZYVcMs1933NXhxT8oW27U-_EJngxScKve5tKmk4dUoQ22rCLW8oIq68MwAIknSMMAMpAHucpnd_PYCB135zwLqFtmPpOPHMbH-5arGiQat3SiLj5qvbBnKl7GvSpLVj-vCSqw60L78Ed3xq7Exz0SWh8q-l2D3rci5B7gOcHwB0K4WL7jf_8aoWB5Q__dtC6izxiBAcfOTLup5qzhCdN8OfuE6gv"
        />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"></div>
      </div>
      <div className="relative z-10 max-w-container-max mx-auto text-white w-full">
        <div className="max-w-3xl space-y-12">
          <span className="font-label-caps text-label-caps text-white/70 block">OUR ETHOS</span>
          <h2 className="font-display-lg text-4xl md:text-5xl lg:text-display-lg leading-tight font-medium text-white">
            The Philosophy Behind INSKY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4">
            <div className="space-y-4">
              <h3 className="font-headline-sm text-lg md:text-xl uppercase tracking-widest text-white font-semibold">
                Our Mission
              </h3>
              <p className="font-body-md text-sm md:text-body-md text-white/80 leading-relaxed">
                To redefine personal care by merging scientific rigor with pure organic essence, creating products that honor both the body and the earth.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-headline-sm text-lg md:text-xl uppercase tracking-widest text-white font-semibold">
                Our Promise
              </h3>
              <p className="font-body-md text-sm md:text-body-md text-white/80 leading-relaxed">
                We promise absolute transparency in ingredients and an unwavering commitment to quality. No compromises, only perfection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
