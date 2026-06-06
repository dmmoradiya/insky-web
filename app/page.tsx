'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Collections from '@/components/Collections';
import Science from '@/components/Science';
import WhyChoose from '@/components/WhyChoose';
import Testimonials from '@/components/Testimonials';
import Philosophy from '@/components/Philosophy';
import Partnerships from '@/components/Partnerships';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);

  // Narrative slide refs
  const slideRef0 = useRef<HTMLDivElement>(null);
  const slideRef1 = useRef<HTMLDivElement>(null);
  const slideRef2 = useRef<HTMLDivElement>(null);

  // Preload images on mount
  useEffect(() => {
    let isMounted = true;
    const totalFrames = 241;
    let count = 0;

    // Detect if device is mobile on initial mount
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    const folder = isMobile ? 'ezgif-12d5ca3f45ae1673-jpg' : 'ezgif-57c291c3170ce878-jpg';

    const preload = async () => {
      const promises = Array.from({ length: totalFrames }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          const frameNum = String(i + 1).padStart(3, '0');
          img.src = `/images/${folder}/ezgif-frame-${frameNum}.jpg`;

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

      // The container has h-[400vh], so scrollable range is vh * 3
      const scrollRange = vh * 3;
      const scrollProgress = Math.max(0, Math.min(1, scrollY / scrollRange));

      // Calculate opacities and positions for each slide
      let op0 = 0, op1 = 0, op2 = 0;
      let y0 = 0, y1 = 0, y2 = 0;

      // Slide 0 (Hydra Silk): active [0, 0.33]
      if (scrollProgress <= 0.33) {
        if (scrollProgress < 0.23) {
          op0 = 1;
        } else {
          op0 = (0.33 - scrollProgress) / 0.10;
        }
        y0 = (1 - op0) * -30;
      }

      // Slide 1 (Berry Velvet): active [0.33, 0.66]
      if (scrollProgress >= 0.23 && scrollProgress <= 0.76) {
        if (scrollProgress < 0.33) {
          op1 = 0;
        } else if (scrollProgress < 0.43) {
          op1 = (scrollProgress - 0.33) / 0.10;
        } else if (scrollProgress < 0.56) {
          op1 = 1;
        } else {
          op1 = (0.66 - scrollProgress) / 0.10;
        }
        y1 = (1 - op1) * 30;
      }

      // Slide 2 (Neem Clear): active [0.66, 1.0]
      if (scrollProgress >= 0.56) {
        if (scrollProgress < 0.66) {
          op2 = 0;
        } else if (scrollProgress < 0.76) {
          op2 = (scrollProgress - 0.66) / 0.10;
        } else {
          op2 = 1;
        }
        y2 = (1 - op2) * 30;
      }

      // Canvas wrapper Opacity
      const canvasParent = canvasRef.current?.parentElement;
      if (canvasParent) {
        canvasParent.style.opacity = '1';
        canvasParent.style.visibility = 'visible';
      }

      // Apply styles to the slides directly to prevent React state re-renders at 60fps
      if (slideRef0.current) {
        slideRef0.current.style.opacity = String(op0);
        slideRef0.current.style.transform = `translateY(${y0}px)`;
        slideRef0.current.style.pointerEvents = op0 > 0.1 ? 'auto' : 'none';
      }
      if (slideRef1.current) {
        slideRef1.current.style.opacity = String(op1);
        slideRef1.current.style.transform = `translateY(${y1}px)`;
        slideRef1.current.style.pointerEvents = op1 > 0.1 ? 'auto' : 'none';
      }
      if (slideRef2.current) {
        slideRef2.current.style.opacity = String(op2);
        slideRef2.current.style.transform = `translateY(${y2}px)`;
        slideRef2.current.style.pointerEvents = op2 > 0.1 ? 'auto' : 'none';
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

      // Map scroll from 0 to 3 vh to the 241 animation frames
      const scrollRange = vh * 3;
      const progress = scrollY / scrollRange;
      const clampedProgress = Math.max(0, Math.min(1, progress));

      targetFrameRef.current = 1 + clampedProgress * 240;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

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
      {isLoaded && <Navbar />}

      {/* Hero Scroll Section */}
      <div className="relative h-[400vh] w-full bg-[#06070B] overflow-visible select-none">
        {/* Sticky Canvas & Text container */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
          <canvas ref={canvasRef} className="w-full h-full block" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,7,11,0)_20%,rgba(6,7,11,0.6)_80%)] pointer-events-none" />

          {/* Three Narrative Slides */}

          {/* Slide 0: Hydra Silk */}
          <div
            ref={slideRef0}
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-margin-desktop text-left text-white max-w-2xl z-10 transition-all duration-100"
            style={{ opacity: 1, pointerEvents: 'auto' }}
          >
            <span className="font-label-caps text-label-caps text-white/60 mb-4 block">HYDRA SILK COLLECTION</span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight tracking-tight text-white font-medium">
              REFRESH YOUR SKIN. <br className="hidden md:inline" />REFRESH YOUR DAY.
            </h1>
            <p className="font-body text-base md:text-lg text-slate-300 mb-8 max-w-md leading-relaxed font-light">
              Aqua-inspired freshness with rich foam and a silky-soft feel. Designed to leave your skin refreshed after every shower.
            </p>
            <div className="flex flex-wrap gap-4">
              <a className="px-8 py-3 bg-white text-primary font-button text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors duration-300 rounded shadow" href="#collections">
                Explore Collection
              </a>
              <a className="px-8 py-3 border border-white text-white font-button text-xs uppercase tracking-widest hover:bg-white/10 transition-colors duration-300 rounded" href="#contact">
                Contact Us
              </a>
            </div>
          </div>

          {/* Slide 1: Berry Velvet */}
          <div
            ref={slideRef1}
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-margin-desktop text-left text-white max-w-2xl z-10 transition-all duration-100"
            style={{ opacity: 0, pointerEvents: 'none' }}
          >
            <span className="font-label-caps text-label-caps text-white/60 mb-4 block">BERRY VELVET COLLECTION</span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight tracking-tight text-white font-medium">
              NATURE'S LUSCIOUS <br className="hidden md:inline" />VELVET TOUCH.
            </h1>
            <p className="font-body text-base md:text-lg text-slate-300 mb-8 max-w-md leading-relaxed font-light">
              A delightful berry fragrance paired with effective cleansing for a smooth and refreshing bathing experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <a className="px-8 py-3 bg-white text-primary font-button text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors duration-300 rounded shadow" href="#collections">
                Explore Collection
              </a>
              <a className="px-8 py-3 border border-white text-white font-button text-xs uppercase tracking-widest hover:bg-white/10 transition-colors duration-300 rounded" href="#contact">
                Contact Us
              </a>
            </div>
          </div>

          {/* Slide 2: Neem Clear */}
          <div
            ref={slideRef2}
            className="absolute inset-0 flex flex-col justify-center px-6 md:px-margin-desktop text-left text-white max-w-2xl z-10 transition-all duration-100"
            style={{ opacity: 0, pointerEvents: 'none' }}
          >
            <span className="font-label-caps text-label-caps text-white/60 mb-4 block">NEEM CLEAR SERIES</span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight tracking-tight text-white font-medium">
              POWERED BY <br className="hidden md:inline" />NATURE'S CARE.
            </h1>
            <p className="font-body text-base md:text-lg text-slate-300 mb-8 max-w-md leading-relaxed font-light">
              Enriched with Neem, Tulsi, and Aloe Vera, this herbal pack helps cleanse, absorb oil, and leave your face naturally refreshed.
            </p>
            <div className="flex flex-wrap gap-4">
              <a className="px-8 py-3 bg-white text-primary font-button text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors duration-300 rounded shadow" href="#collections">
                Explore Collection
              </a>
              <a className="px-8 py-3 border border-white text-white font-button text-xs uppercase tracking-widest hover:bg-white/10 transition-colors duration-300 rounded" href="#contact">
                Contact Us
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
            <span className="font-label-caps text-xxs text-slate-400 uppercase tracking-widest">Scroll to Discover</span>
            <div className="w-px h-8 bg-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-white origin-top animate-bounce"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Light-themed brand content */}
      {isLoaded && (
        <div className="relative z-10 bg-[#f9f9f7] text-[#1a1c1b] border-t border-black/5 shadow-[0_-20px_40px_rgba(0,0,0,0.03)] pb-0 animate-fade-in">
          <Collections />
          <Science />
          <WhyChoose />
          <Testimonials />
          <Philosophy />
          <Partnerships />
          <Contact />
          <Footer />
        </div>
      )}
    </main>
  );
}
