'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Counter states for standard section
  const [hasCounted, setHasCounted] = useState(false);
  const [naturalOrigin, setNaturalOrigin] = useState(0);
  const [syntheticFragrance, setSyntheticFragrance] = useState(0);
  const [crueltyFree, setCrueltyFree] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);

  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Preload images on mount
  useEffect(() => {
    let isMounted = true;
    const totalFrames = 241;
    let count = 0;

    const preload = async () => {
      const promises = Array.from({ length: totalFrames }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          const frameNum = String(i + 1).padStart(3, '0');
          img.src = `/images/ezgif-57c291c3170ce878-jpg/ezgif-frame-${frameNum}.jpg`;

          img.onload = () => {
            if (isMounted) {
              count++;
              setProgress(Math.round((count / totalFrames) * 100));
            }
            resolve(img);
          };

          img.onerror = () => {
            console.error(`Error loading frame ${frameNum}`);
            resolve(img);
          };
        });
      });

      const loadedImages = await Promise.all(promises);
      if (isMounted) {
        imagesRef.current = loadedImages;
        setIsLoaded(true);
      }
    };

    preload();

    return () => {
      isMounted = false;
    };
  }, []);

  // Responsive drawing helper
  const drawFrame = (frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clampedFrame = Math.max(1, Math.min(241, Math.round(frame)));
    const img = imagesRef.current[clampedFrame - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Handle Resize
  useEffect(() => {
    if (!isLoaded) return;

    const handleResize = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded]);

  // RequestAnimationFrame loop for lerped scroll updates & direct style mutations
  useEffect(() => {
    if (!isLoaded) return;
    let animationFrameId: number;

    const update = () => {
      const lerpFactor = 0.08;
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * lerpFactor;
        drawFrame(currentFrameRef.current);
      } else {
        currentFrameRef.current = targetFrameRef.current;
        drawFrame(currentFrameRef.current);
      }

      // Mutate Hero overlay and Canvas wrapper opacity directly
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Hero Opacity and Transform
      if (heroRef.current) {
        const heroOpacity = Math.max(0, 1 - scrollY / (vh * 0.6));
        heroRef.current.style.opacity = String(heroOpacity);
        heroRef.current.style.transform = `translateY(${scrollY * -0.4}px)`;
        heroRef.current.style.pointerEvents = heroOpacity > 0.1 ? 'auto' : 'none';
      }

      // Canvas wrapper Opacity
      const canvasParent = canvasRef.current?.parentElement;
      if (canvasParent) {
        const canvasOpacity = 1 - Math.max(0, Math.min(1, (scrollY - vh * 0.7) / (vh * 0.6)));
        canvasParent.style.opacity = String(canvasOpacity);
        canvasParent.style.visibility = canvasOpacity > 0 ? 'visible' : 'hidden';
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isLoaded]);

  // Map Scroll Y to target animation frame
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Map scroll from 0 to 1.3 vh to the 300 animation frames
      const scrollRange = vh * 1.3;
      const progress = scrollY / scrollRange;
      const clampedProgress = Math.max(0, Math.min(1, progress));

      targetFrameRef.current = 1 + clampedProgress * 240;

      // Update scrolled navigation state
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  // Setup intersection observer for stats counter incrementation
  useEffect(() => {
    if (!isLoaded) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
          setHasCounted(true);
          let start = 0;
          const duration = 1200;
          const intervalTime = 20;
          const steps = duration / intervalTime;
          const naturalStep = 100 / steps;
          const crueltyStep = 100 / steps;

          let currentStep = 0;
          const timer = setInterval(() => {
            currentStep++;
            if (currentStep >= steps) {
              setNaturalOrigin(100);
              setCrueltyFree(100);
              setSyntheticFragrance(0);
              clearInterval(timer);
            } else {
              setNaturalOrigin(Math.min(100, Math.round(currentStep * naturalStep)));
              setCrueltyFree(Math.min(100, Math.round(currentStep * crueltyStep)));
            }
          }, intervalTime);
        }
      });
    }, { threshold: 0.15 });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [isLoaded, hasCounted]);

  const products = [
    {
      title: 'Berry Velvet',
      desc: 'Illuminating Body Wash',
      actionText: 'Discover Velvet',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHDWoujU_aHKFHSZPnmym9LiltA-CMft7QODkAa8hNRR8aeVUr_KbeKx8lHFBW612Guyut3lVSvFL2pPeEB2uzlnU92vlA4CQIBaXnDmSA0nCjxvlTN8tTL8caMnAb6IHGbdD1aLqmWopcZ3YvR-4B93P9Vm9XoF4c3k1qFQpwZ99DjUQHiYTLM3ia956cIT2aOweyCgHLqbp_A_S2fnhqJEEyz2oc1cy3co1JHsYkxLsiB6zjuA1blyVayRYwFsIcAO8ceL4jDWdj'
    },
    {
      title: 'Hydra Silk',
      desc: 'Deep Hydration Wash',
      actionText: 'Discover Hydration',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb89weiWidx9_pyzYs40URdVSBo_3Zog4GFK3HB2YBtYUSnt1NTe-42DtWCKvzrZMI1dLlx1alLXfowRXg1wkHT0t3FhU8So4b_iBSOpuqgMesmZ71Igb-lj2s6o5pSWCSlAbJcXl72A0Bv2_72fqPGrhCftmF8BSdz0Uf-xCbG3NGVsIZZYRrWRtjXjPPI8GW3ChlLx1o8q3EiqRSzjxi8UCanQBsPO4ENTCDcsO9t5r51Tf7R6pr2ZGP0BLW3X1c7GeyDy-yEbtJ'
    },
    {
      title: 'Neem Clear',
      desc: 'Purifying Face Pack',
      actionText: 'Discover Clarity',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL8IxBysvqWHB_8AFAUYI1qOF6DYPPrmtebqhiGHK9RnsSbDrSv4t9kbzfki7N6LspyDKTgG6T-0fqiVeC00XqfGpk6x64PXiSS3QySfL6t8K4kDkFVOoWZgD8BvkZysUQTitcBL9xs6Gwq5rlPV26krOKPW2B_3R8NgPsQYL-X3F2E91bkoYcg9Z253g9vI3FF5ysOFDEYELIjPzRg8CCuOh4zg9cQ9hPt4oC0TOF0MG3THMKpeadt36nWcdGfpGvDdTGaAIJN2Vm'
    }
  ];

  return (
    <main ref={containerRef} className="relative w-full bg-[#f9f9f7] text-[#1a1c1b]">
      {/* Preloader Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06070B] px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="inline-flex items-center space-x-2 text-2xl font-bold tracking-widest text-[#ffffff] font-display">
              <svg className="w-8 h-8 animate-pulse text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>INSKY</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-medium text-slate-200">Loading Interactive Experience</h2>
              <p className="text-sm text-slate-400">Preloading high-fidelity animation frames...</p>
            </div>

            {/* Progress bar */}
            <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-white transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-right text-xs font-semibold text-white tracking-wider">
              {progress}%
            </div>
          </div>
        </div>
      )}

      {/* Floating Header */}
      {isLoaded && (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#f9f9f7]/85 backdrop-blur-md shadow-sm border-b border-black/5 py-4' : 'bg-transparent py-6'}`}>
          <div className="flex justify-between items-center px-6 md:px-12 w-full max-w-6xl mx-auto relative">
            <div className="hidden md:flex gap-8">
              <a className={`font-label-caps text-xs uppercase tracking-widest transition-colors duration-500 ${isScrolled ? 'text-primary font-bold border-b border-primary pb-1' : 'text-white hover:text-slate-300'}`} href="#collections">Collections</a>
              <a className={`font-label-caps text-xs uppercase tracking-widest transition-colors duration-500 ${isScrolled ? 'text-[#444748]/80 hover:text-primary' : 'text-white/80 hover:text-white'}`} href="#science">Science</a>
              <a className={`font-label-caps text-xs uppercase tracking-widest transition-colors duration-500 ${isScrolled ? 'text-[#444748]/80 hover:text-primary' : 'text-white/80 hover:text-white'}`} href="#rituals">Rituals</a>
              <a className={`font-label-caps text-xs uppercase tracking-widest transition-colors duration-500 ${isScrolled ? 'text-[#444748]/80 hover:text-primary' : 'text-white/80 hover:text-white'}`} href="#philosophy">Philosophy</a>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
              <a className={`font-display text-2xl tracking-tighter transition-colors duration-500 ${isScrolled ? 'text-primary' : 'text-white'}`} href="#">INSKY</a>
            </div>
            <div className="flex items-center gap-6">
              <a className={`hidden md:block font-label-caps text-xs uppercase tracking-widest transition-colors duration-500 ${isScrolled ? 'text-[#444748]/80 hover:text-primary' : 'text-white/80 hover:text-white'}`} href="#contact">Bespoke Consultation</a>
            </div>
          </div>
        </nav>
      )}

      {/* Hero Scroll Section */}
      <div className="relative h-[180vh] w-full bg-[#06070B] overflow-visible select-none">
        {/* Sticky Canvas background */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 transition-opacity duration-300">
          <canvas ref={canvasRef} className="w-full h-full block" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,7,11,0)_20%,rgba(6,7,11,0.6)_80%)] pointer-events-none" />
        </div>

        {/* Hero text overlay - absolute over the canvas */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-10 flex flex-col justify-between items-center py-32 px-4 text-center pointer-events-none"
        >
          {/* Spacing top */}
          <div />

          {/* Core title and buttons */}
          <div className="relative z-10 text-center px-4 flex flex-col items-center max-w-4xl mx-auto mt-20 pointer-events-auto">
            <h1 className="font-display text-5xl md:text-8xl text-white mb-6 font-display-lg-mobile md:font-display-lg leading-tight tracking-tight">
              Nature Meets <br />Everyday Luxury
            </h1>
            <p className="font-body text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Premium skincare inspired by nature and crafted for healthy radiant skin.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                className="px-12 py-4 bg-white text-[#1a1c1b] font-button text-sm uppercase tracking-widest hover:bg-slate-200 transition-colors duration-300 cursor-pointer pointer-events-auto shadow-lg"
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
              <a
                className="px-12 py-4 border border-white text-white font-button text-sm uppercase tracking-widest hover:bg-white/15 transition-colors duration-300 cursor-pointer pointer-events-auto"
                href="#contact"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-4">
            <span className="font-label-caps text-xs text-slate-400 uppercase tracking-widest">Scroll to Discover</span>
            <div className="w-px h-12 bg-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white origin-top animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Light-themed brand content */}
      {isLoaded && (
        <div className="relative z-10 bg-[#f9f9f7] text-[#1a1c1b] border-t border-black/5 shadow-[0_-20px_40px_rgba(0,0,0,0.03)] pb-20">

          {/* Section 2: Brand Story */}
          <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto" id="philosophy">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="col-span-1 md:col-span-5">
                <h2 className="font-display text-4xl md:text-5xl text-[#000000] mb-8 font-headline-md leading-tight">The INSKY Philosophy</h2>
                <div className="hairline-divider w-24 mb-8"></div>
              </div>
              <div className="col-span-1 md:col-span-7 md:pl-12">
                <p className="font-body text-lg text-[#444748] mb-6 font-body-lg leading-relaxed">
                  We believe that true luxury lies in the purity of ingredients and the efficacy of mindful formulations. Our approach marries natural potency with scientific precision to cultivate skincare confidence.
                </p>
                <p className="font-body text-base text-[#444748]/80 font-body-md leading-relaxed">
                  Every drop is a testament to modern self-care—premium, transparent, and devoted to revealing your skin's inherent radiance.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Product Collection Overview */}
          <section className="py-32 px-6 md:px-12 bg-[#f4f4f2]" id="collections">
            <div className="max-w-6xl mx-auto text-center mb-24">
              <span className="font-label-caps text-xs text-secondary uppercase tracking-widest mb-4 block font-medium">The Collection</span>
              <h2 className="font-display text-4xl md:text-5xl text-[#000000] font-headline-md leading-tight">A Symphony of Botanicals</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="group cursor-pointer relative"
                  onMouseEnter={() => setHoveredProduct(idx)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative aspect-[3/4] bg-secondary-container rounded-xl overflow-hidden mb-6 ambient-shadow">
                    {/* Hover Particle Effects layer */}
                    {hoveredProduct === idx && (
                      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                        {Array.from({ length: idx === 2 ? 12 : 8 }).map((_, pIdx) => {
                          const size = Math.random() * 8 + 4;
                          const left = Math.random() * 100;
                          return (
                            <div
                              key={pIdx}
                              className={`particle rise-particle-${(pIdx % 8) + 1}`}
                              style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                backgroundColor: idx === 0
                                  ? 'rgba(255, 100, 150, 0.4)'
                                  : idx === 1
                                    ? 'rgba(100, 200, 255, 0.4)'
                                    : 'rgba(150, 255, 150, 0.2)',
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
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 relative z-0"
                      src={product.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 z-20">
                      <span className="text-white font-label-caps text-xs tracking-widest uppercase">{product.actionText}</span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl text-[#000000] mb-2 font-headline-sm">{product.title}</h3>
                  <p className="font-body text-base text-slate-600 font-body-md">{product.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Ingredients / Science */}
          <section className="py-32 px-6 md:px-12 bg-white" id="science">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <span className="font-label-caps text-xs text-[#695b5b] uppercase tracking-widest mb-4 block font-medium">Potent Actives</span>
                <h2 className="font-display text-4xl md:text-5xl text-[#000000] font-headline-md leading-tight">Nature's Best, Distilled.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="ingredient-card bg-[#f4f4f2] p-10 rounded-2xl relative overflow-hidden">
                  <h3 className="font-display text-2xl text-[#000000] mb-4 relative z-10 font-headline-sm">Wild Raspberry</h3>
                  <p className="font-body text-base text-[#444748] relative z-10 font-body-md leading-relaxed">
                    Rich in antioxidants to protect against environmental stressors and illuminate the skin.
                  </p>
                </div>
                <div className="ingredient-card bg-[#f4f4f2] p-10 rounded-2xl relative overflow-hidden">
                  <h3 className="font-display text-2xl text-[#000000] mb-4 relative z-10 font-headline-sm">Aloe Barbadensis</h3>
                  <p className="font-body text-base text-[#444748] relative z-10 font-body-md leading-relaxed">
                    Deeply hydrating botanical extracts that bind moisture and soothe irritation.
                  </p>
                </div>
                <div className="ingredient-card bg-[#f4f4f2] p-10 rounded-2xl relative overflow-hidden">
                  <h3 className="font-display text-2xl text-[#000000] mb-4 relative z-10 font-headline-sm">Sacred Neem</h3>
                  <p className="font-body text-base text-[#444748] relative z-10 font-body-md leading-relaxed">
                    Ancient purifying properties that clarify the complexion and balance natural oils.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: The INSKY Standard */}
          <section ref={statsRef} className="py-32 px-6 md:px-12 bg-[#f4f4f2]" id="rituals">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-4xl md:text-5xl text-[#000000] mb-16 font-headline-md leading-tight">The INSKY Standard</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-[#000000] mb-4 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <div className="flex items-baseline">
                    <span className="font-display text-5xl md:text-6xl text-[#000000] font-normal">{naturalOrigin}</span>
                    <span className="text-[#000000] font-display text-2xl font-medium ml-0.5">%</span>
                  </div>
                  <p className="font-label-caps text-xs tracking-widest text-[#444748] mt-2 uppercase font-medium">Natural Origin</p>
                </div>
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-[#000000] mb-4 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4.5 16.5c-1.5 1.25-2.5 3-2.5 4.5h20c0-1.5-1-3.25-2.5-4.5M12 3v13.5M7.5 12h9" />
                  </svg>
                  <div className="flex items-baseline">
                    <span className="font-display text-5xl md:text-6xl text-[#000000] font-normal">{syntheticFragrance}</span>
                    <span className="text-[#000000] font-display text-2xl font-medium ml-0.5">%</span>
                  </div>
                  <p className="font-label-caps text-xs tracking-widest text-[#444748] mt-2 uppercase font-medium">Synthetic Fragrance</p>
                </div>
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-[#000000] mb-4 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <div className="flex items-baseline">
                    <span className="font-display text-5xl md:text-6xl text-[#000000] font-normal">{crueltyFree}</span>
                    <span className="text-[#000000] font-display text-2xl font-medium ml-0.5">%</span>
                  </div>
                  <p className="font-label-caps text-xs tracking-widest text-[#444748] mt-2 uppercase font-medium">Cruelty Free</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Contact */}
          <section className="py-32 px-6 md:px-12 bg-white" id="contact">
            <div className="max-w-4xl mx-auto glass-panel p-8 md:p-16 rounded-2xl border border-slate-900/5 shadow-xl">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl text-[#000000] mb-4 font-headline-md leading-tight">Ready To Experience INSKY?</h2>
                <p className="font-body text-base text-[#444748] font-body-md">Reach out for bespoke consultations or inquiries.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h3 className="font-display text-xl text-[#000000] mb-8 font-headline-sm tracking-wide">Connect</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[#444748]">
                      <svg className="w-5 h-5 text-[#747878]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className="font-body text-base font-body-md">+1 (800) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-4 text-[#444748]">
                      <svg className="w-5 h-5 text-[#747878]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      <span className="font-body text-base font-body-md">WhatsApp Us</span>
                    </div>
                    <div className="flex items-center gap-4 text-[#444748]">
                      <svg className="w-5 h-5 text-[#747878]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span className="font-body text-base font-body-md font-medium">concierge@insky.com</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      className="block w-full bg-transparent border-0 border-b border-[#c4c7c7] py-2 focus:ring-0 focus:border-[#000000] text-base font-body-md peer placeholder-transparent focus:outline-none transition-colors"
                      placeholder="Name"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-4 font-label-caps text-xs text-[#444748] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#000000]"
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      className="block w-full bg-transparent border-0 border-b border-[#c4c7c7] py-2 focus:ring-0 focus:border-[#000000] text-base font-body-md peer placeholder-transparent focus:outline-none transition-colors"
                      placeholder="Phone"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-0 -top-4 font-label-caps text-xs text-[#444748] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#000000]"
                    >
                      Phone
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      className="block w-full bg-transparent border-0 border-b border-[#c4c7c7] py-2 focus:ring-0 focus:border-[#000000] text-base font-body-md peer placeholder-transparent focus:outline-none transition-colors"
                      placeholder="Email"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-4 font-label-caps text-xs text-[#444748] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#000000]"
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={3}
                      className="block w-full bg-transparent border-0 border-b border-[#c4c7c7] py-2 focus:ring-0 focus:border-[#000000] text-base font-body-md peer placeholder-transparent focus:outline-none resize-none transition-colors"
                      placeholder="Message"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-0 -top-4 font-label-caps text-xs text-[#444748] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#000000]"
                    >
                      Message
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-12 py-4 bg-[#000000] text-white font-button text-sm uppercase tracking-widest hover:bg-[#5f5e5e] transition-colors duration-300 shadow-md cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="w-full py-24 bg-[#f9f9f7] border-t border-[#000000]/5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-12 max-w-6xl mx-auto">
              <div className="col-span-1 md:col-span-2">
                <div className="font-display text-4xl text-[#000000] mb-6 font-headline-md leading-tight">INSKY</div>
                <p className="font-body text-base text-[#444748] font-body-md max-w-sm leading-relaxed">
                  Nature Meets Everyday Luxury. Premium skincare inspired by nature and crafted for healthy radiant skin.
                </p>
              </div>
              <div className="col-span-1">
                <span className="font-label-caps text-xs text-[#000000] tracking-widest uppercase mb-6 block font-semibold">Contact</span>
                <ul className="space-y-4">
                  <li><a className="font-body text-base text-[#444748] opacity-80 hover:opacity-100 hover:text-[#000000] transition-opacity" href="#">Phone</a></li>
                  <li><a className="font-body text-base text-[#444748] opacity-80 hover:opacity-100 hover:text-[#000000] transition-opacity" href="#">WhatsApp</a></li>
                  <li><a className="font-body text-base text-[#444748] opacity-80 hover:opacity-100 hover:text-[#000000] transition-opacity" href="#">Email</a></li>
                </ul>
              </div>
              <div className="col-span-1">
                <span className="font-label-caps text-xs text-[#000000] tracking-widest uppercase mb-6 block font-semibold">Social</span>
                <ul className="space-y-4">
                  <li><a className="font-body text-base text-[#444748] opacity-80 hover:opacity-100 hover:text-[#000000] transition-opacity" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                </ul>
              </div>
            </div>
            <div className="px-6 md:px-12 max-w-6xl mx-auto mt-16">
              <div className="hairline-divider mb-8"></div>
              <p className="font-body text-sm text-[#444748] opacity-60">© 2026 INSKY LABORATORIES. ALL RIGHTS RESERVED.</p>
            </div>
          </footer>

        </div>
      )}
    </main>
  );
}
