import React from 'react';

export default function Partnerships() {
  return (
    <section className="py-24 md:py-32 bg-surface" id="business">
      <div className="px-6 md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 space-y-8">
            <span className="font-label-caps text-label-caps text-primary block">PARTNERSHIPS</span>
            <h2 className="font-headline-md text-3xl md:text-headline-md font-medium text-primary">
              Partner With INSKY
            </h2>
            <p className="font-body-lg text-base md:text-body-lg text-on-surface-variant leading-relaxed">
              Elevate your brand experience. We provide custom amenities for high-end hotels, luxury retailers, and premier wellness centers across the country.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="font-body-md text-sm md:text-body-md text-primary font-medium">
                  Custom Luxury Packaging for Hotels
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="font-body-md text-sm md:text-body-md text-primary font-medium">
                  Bulk Supply for Wellness Resorts
                </span>
              </li>
              <li className="flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <span className="font-body-md text-sm md:text-body-md text-primary font-medium">
                  Authorized Retail Partnerships
                </span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4 pt-6">
              <a
                className="px-8 py-4 bg-primary text-white font-button text-xs md:text-button uppercase flex items-center gap-2 hover:opacity-90 transition-opacity rounded shadow-sm"
                href="https://wa.me/917862999106"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-sm">chat</span> WhatsApp Inquiry
              </a>
              <a
                className="px-8 py-4 border border-primary text-primary font-button text-xs md:text-button uppercase flex items-center gap-2 hover:bg-primary/5 transition-all rounded"
                href="mailto:easchemiindustries@gmail.com"
              >
                <span className="material-symbols-outlined text-sm">mail</span> Email Business
              </a>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 h-[350px] md:h-[500px] w-full">
            <img
              alt="Luxury Spa Tray INSKY Partnership"
              className="w-full h-full object-cover rounded-lg shadow"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXZPRcxiD-t2zlNR_xeBpUnhWoScEhIoSR55q3Eo1R8fi1yNIiMOIDNXsGPdP_s-R1f02aO6tn5yAvs5KuSaZxABPqJwEbBh8WKNbzkH_kPAVHwql2aUemKfpjIOfI7osIAuPRoW11h9Z2p6QaNZ1sxFHundr8Z4vcu6rhVjIC7zPFpP4ih6tNmDLs76SRi2Xt6QVBPswA_Lwb1jxzzal0n6aOt_rmfTQw-jJ1mRuDNqyNQbFcdQG7sWnyIv4G1d5xz1pptcYp5iHy"
            />
            <img
              alt="Cosmetics Boutique Interior Retail Partnership"
              className="w-full h-full object-cover rounded-lg mt-8 md:mt-12 shadow"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEm6yznJZ6o2fVsWIIDCqq0ImKVPHcTYfWxzr8UI_FZIttrQa4NcV7WsBfQUz91N_ZLi9zs8qzU49EAf_86tZj8-BJYallhEPHa-lW3ZhzVaDGHeMI75-cInMDXf4dFAQ_7Z8EeJRH4pdcIx1JAg6VNWzqtJMD6u1f4c5jn7pQKo000vkfvD9wB9z9OhaZXlzr9p-2orDahrfU0KEsUFa4yI0FIH0VG87GNZGQFVFIo_DLKnXcfwabxYK1QHuxFwMZ-paMe53x1FG8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
