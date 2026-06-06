import React from 'react';

export default function Footer() {
  return (
    <>
      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-primary text-white text-center px-6 md:px-margin-desktop">
        <h2 className="font-display-lg text-3xl md:text-display-lg mb-12 leading-tight">
          Ready to Experience INSKY?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8">
          <a
            className="w-full sm:w-auto px-12 py-5 border border-white text-white font-button text-button uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300 rounded"
            href="https://wa.me/917862999106"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Concierge
          </a>
          <a
            className="w-full sm:w-auto px-12 py-5 bg-white text-primary font-button text-button uppercase tracking-widest hover:bg-transparent hover:text-white border border-white transition-all duration-300 rounded"
            href="#contact"
          >
            Direct Contact
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t-[0.5px] border-primary/10">
        <div className="flex flex-col items-center gap-8 px-6 md:px-margin-desktop py-16 md:py-24 max-w-container-max mx-auto">
          <h2 className="font-headline-md text-2xl md:text-headline-md text-primary tracking-[0.3em] font-medium">
            INSKY
          </h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-on-surface-variant text-sm font-body-md">
            <a
              className="hover:text-primary transition-colors underline decoration-[0.5px]"
              href="https://www.instagram.com/insky_co?igsh=YmVrM3p4Ymdtbmc="
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              className="hover:text-primary transition-colors underline decoration-[0.5px]"
              href="https://wa.me/917862999106"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a className="hover:text-primary transition-colors underline decoration-[0.5px]" href="#contact">
              Contact Us
            </a>
            <a className="hover:text-primary transition-colors underline decoration-[0.5px]" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors underline decoration-[0.5px]" href="#">
              Terms of Service
            </a>
          </div>
          <p className="font-body-md text-xs md:text-body-md text-center text-on-surface-variant/70 max-w-xl mt-4 leading-relaxed">
            © 2026 INSKY Cosmetics. Quality Without Compromise. Care Without Compromise. Confidence Every Day.
          </p>
        </div>
      </footer>
    </>
  );
}
