'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-surface/80 backdrop-blur-xl border-b-[0.5px] border-primary/10 py-4 shadow-sm' 
        : 'bg-transparent py-6'
    }`}>
      <div className="flex justify-between items-center px-6 md:px-margin-desktop max-w-container-max mx-auto relative">
        <a className={`font-headline-sm text-headline-sm tracking-[0.2em] transition-colors duration-500 ${
          isScrolled ? 'text-primary font-medium' : 'text-white'
        }`} href="#">INSKY</a>
        
        <div className="hidden md:flex gap-8">
          <a className={`font-body-md text-body-md uppercase tracking-wider transition-colors duration-500 ${
            isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/80 hover:text-white'
          }`} href="#collections">Collections</a>
          <a className={`font-body-md text-body-md uppercase tracking-wider transition-colors duration-500 ${
            isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/80 hover:text-white'
          }`} href="#science">Science</a>
          <a className={`font-body-md text-body-md uppercase tracking-wider transition-colors duration-500 ${
            isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/80 hover:text-white'
          }`} href="#why-insky">Philosophy</a>
          <a className={`font-body-md text-body-md uppercase tracking-wider transition-colors duration-500 ${
            isScrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/80 hover:text-white'
          }`} href="#business">Partnership</a>
        </div>

        <a className={`px-8 py-2 border font-button text-button uppercase tracking-widest transition-all duration-300 ${
          isScrolled 
            ? 'border-primary text-primary hover:bg-primary hover:text-white' 
            : 'border-white text-white hover:bg-white hover:text-primary'
        }`} href="#contact">Contact</a>
      </div>
    </nav>
  );
}
