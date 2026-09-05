import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const GlobalStyles = () => {
  useEffect(() => {
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.textContent = `
      html { scroll-behavior: smooth; }
      body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

      .font-sans { font-family: 'Inter', sans-serif; }
      .font-serif { font-family: 'Libre Baskerville', serif; }

      .rounded-btn { border-radius: 4px; }
      .rounded-input { border-radius: 4px; }
      .rounded-card { border-radius: 6px; }
      .rounded-img { border-radius: 8px; }
      .rounded-map { border-radius: 8px; }

      .text-brand-brown { color: #614A1B; }
      .text-brand-gold { color: #9A6F28; }
      .text-brand-cta { color: #EFCD36; }
      .text-brand-deep { color: #493611; }
      .text-brand-cream { color: #F5F0EF; }
      .text-brand-charcoal { color: #171512; }
      .text-brand-muted { color: #6F6B64; }

      .bg-brand-brown { background-color: #614A1B; }
      .bg-brand-gold { background-color: #9A6F28; }
      .bg-brand-cta { background-color: #EFCD36; }
      .bg-brand-deep { background-color: #493611; }
      .bg-brand-cream { background-color: #F5F0EF; }
      .bg-brand-charcoal { background-color: #171512; }

      .border-brand-border { border-color: #E9E6E1; }
      .border-brand-cta { border-color: #EFCD36; }

      .text-white\\/70 { color: rgba(255,255,255,0.7); }
      .text-white\\/80 { color: rgba(255,255,255,0.8); }
      .text-white\\/60 { color: rgba(255,255,255,0.6); }
      .text-white\\/50 { color: rgba(255,255,255,0.5); }

      .bg-brand-charcoal\\/80 { background-color: rgba(23,21,18,0.8); }
      .bg-brand-brown\\/90 { background-color: rgba(97,74,27,0.9); }
      .bg-brand-cream\\/50 { background-color: rgba(245,240,239,0.5); }
      .bg-white\\/10 { background-color: rgba(255,255,255,0.1); }

      .border-white\\/50 { border-color: rgba(255,255,255,0.5); }
      .border-white\\/10 { border-color: rgba(255,255,255,0.1); }

      .hover\\:text-brand-gold:hover { color: #9A6F28; }
      .hover\\:text-brand-cta:hover { color: #EFCD36; }
      .hover\\:text-brand-brown:hover { color: #614A1B; }
      .hover\\:text-white:hover { color: #FFFFFF; }

      .hover\\:bg-brand-deep:hover { background-color: #493611; }
      .hover\\:bg-white:hover { background-color: #FFFFFF; }
      .hover\\:bg-\\[\\#D9B92E\\]:hover { background-color: #D9B92E; }
      .hover\\:underline:hover { text-decoration: underline; }

      .group:hover .group-hover\\:bg-brand-deep { background-color: #493611; }
      .group:hover .group-hover\\:scale-110 { transform: scale(1.1); }

      .cursor-ew-resize { cursor: ew-resize; }

      .max-w-\\[1440px\\] { max-width: 1440px; }
      .max-w-\\[1200px\\] { max-width: 1200px; }
      .h-\\[36px\\] { height: 36px; }
      .h-\\[84px\\] { height: 84px; }
      .h-\\[240px\\] { height: 240px; }
      .h-\\[500px\\] { height: 500px; }
      .h-\\[700px\\] { height: 700px; }
      .text-\\[18px\\] { font-size: 18px; }
      .text-\\[11px\\] { font-size: 11px; }
      .text-\\[15px\\] { font-size: 15px; }
      .text-\\[10px\\] { font-size: 10px; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(preconnect1);
      document.head.removeChild(preconnect2);
      document.head.removeChild(fontLink);
      document.head.removeChild(style);
    };
  }, []);
  return null;
};

const ComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateWidth = () => setContainerWidth(el.offsetWidth);
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(el);
    window.addEventListener('resize', updateWidth);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    };
    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-img shadow-2xl border-4 border-white mb-16 h-[500px] md:h-[700px] cursor-ew-resize"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <img
        src="https://images.unsplash.com/photo-1632154939226-f89d380e0c52?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=90"
        alt="After restoration"
        className="block w-full h-full object-cover"
      />
      <div
        className="absolute top-0 left-0 h-full overflow-hidden z-20 border-r-4 border-brand-cta"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src="https://images.unsplash.com/photo-1541604193435-225878996233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1440&q=90"
          alt="Before restoration"
          className="block h-full object-cover"
          style={{ width: containerWidth || '100%', maxWidth: 'none' }}
        />
        <div className="absolute top-8 left-8 bg-brand-charcoal/80 text-white px-4 py-2 rounded font-bold text-sm tracking-widest z-30">
          BEFORE
        </div>
      </div>
      <div className="absolute top-8 right-8 bg-brand-gold text-white px-4 py-2 rounded font-bold text-sm tracking-widest z-30">
        AFTER
      </div>
      <div
        className="absolute top-1/2 z-30 w-12 h-12 bg-brand-cta rounded-full flex items-center justify-center shadow-lg pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translate(-50%, -50%)' }}
      >
        <svg className="w-6 h-6 text-brand-charcoal" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
          <path d="M8.59 16.59L13.17 12 8.61 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </div>
    </div>
  );
};

const TopBar = () => (
  <div className="bg-brand-gold text-white h-[36px] flex items-center px-4 md:px-8 text-sm font-medium">
    <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center">
      <span>Serving Fort Worth & The Surrounding DFW Area</span>
      <div className="flex items-center gap-4">
        <span className="hidden md:inline">License #RC-123456</span>
        <a href="tel:8175550198" className="flex items-center gap-1 hover:text-brand-cta transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          (817) 555-0198
        </a>
      </div>
    </div>
  </div>
);

const Header = () => (
  <header className="bg-white border-b border-brand-border sticky top-0 z-50 h-[84px] shadow-sm flex items-center">
    <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-brand-brown rounded-btn flex items-center justify-center text-brand-cta font-serif font-bold text-xl group-hover:bg-brand-deep transition-colors">
          KC
        </div>
        <div className="flex flex-col">
          <span className="font-serif font-bold text-[18px] leading-tight text-brand-charcoal">KingdomCare</span>
          <span className="text-[11px] font-semibold text-brand-gold uppercase tracking-wider">Roofing & Construction</span>
        </div>
      </Link>
      <nav className="hidden lg:flex items-center gap-8 font-medium text-[15px]">
        <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
        <Link to="/" className="hover:text-brand-gold transition-colors">Services</Link>
        <Link to="/" className="text-brand-brown border-b-2 border-brand-cta pb-1 transition-colors">Projects</Link>
        <Link to="/" className="hover:text-brand-gold transition-colors">Service Areas</Link>
        <Link to="/" className="hover:text-brand-gold transition-colors">About</Link>
        <Link to="/" className="hover:text-brand-gold transition-colors">Contact</Link>
      </nav>
      <Link to="/" className="hidden lg:block bg-brand-cta text-brand-charcoal px-6 py-3 rounded-btn font-bold hover:bg-[#D9B92E] transition-colors shadow-sm">
        Get a Free Estimate
      </Link>
    </div>
  </header>
);

const HeroSection = () => (
  <section className="bg-brand-cream pt-16 pb-24">
    <div className="max-w-[1200px] mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold mb-4">
            <Link to="/" className="hover:underline">Projects</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-brand-muted">Fort Worth</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-charcoal mb-4">Hilltop Estate Restoration</h1>
          <p className="text-lg text-brand-muted">
            A complete high-performance roofing system upgrade and exterior paint restoration for a 5,200 sq. ft. residence in Fort Worth.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="bg-brand-brown text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider">
            Completed Oct 2023
          </div>
          <div className="flex gap-4">
            <div className="text-center border-r border-brand-border pr-4">
              <p className="text-[10px] uppercase font-bold text-brand-muted">Duration</p>
              <p className="font-bold">4 Days</p>
            </div>
            <div className="text-center border-r border-brand-border pr-4">
              <p className="text-[10px] uppercase font-bold text-brand-muted">Project Type</p>
              <p className="font-bold">Full Replacement</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase font-bold text-brand-muted">City</p>
              <p className="font-bold">Fort Worth</p>
            </div>
          </div>
        </div>
      </div>

      <ComparisonSlider />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif text-3xl text-brand-charcoal mb-6">The Challenge</h2>
            <p className="text-brand-muted leading-relaxed mb-4">
              The Hilltop Estate property had suffered significant hail damage during the spring storm season. Beyond the structural compromises, the aged 3nd-tab shingles were failing to provide proper ventilation, leading to increased cooling costs and early shingle degradation.
            </p>
            <p className="text-brand-muted leading-relaxed">
              The homeowners wanted a premium aesthetic that would complement the home's architecture while ensuring maximum protection against North Texas's extreme weather patterns for decades to come.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-brand-charcoal mb-6">The KingdomCare Solution</h2>
            <p className="text-brand-muted leading-relaxed mb-6">
              Our team implemented a complete Class 4 Impact Resistant roofing system. We began with a full tear-off down to the decking, followed by an inspection for any water intrusion. We upgraded the entire ventilation system to ensure consistent airflow and optimal energy efficiency.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-card border border-brand-border flex gap-4">
                <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brand-charcoal mb-1">Impact Resistance</h4>
                  <p className="text-sm text-brand-muted">UL 2218 Class 4 rating to withstand 2-inch hail stones.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-card border border-brand-border flex gap-4">
                <div className="w-12 h-12 bg-brand-cream rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-brand-charcoal mb-1">Energy Efficiency</h4>
                  <p className="text-sm text-brand-muted">Ridge vent installation reduced attic temp by 15°F.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-deep p-8 md:p-12 rounded-card relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.899 14.899 16 16 16H19V10H14.017V6H19V4H12.017V10H11.017V21H14.017ZM5 21L5 18C5 16.899 5.899 16 7 16H10V10H5V6H10V4H3V10H2V21H5Z" />
              </svg>
            </div>
            <div className="relative z-10">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-brand-cta" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-serif text-2xl text-white italic mb-8 leading-relaxed">
                "KingdomCare treated our home like it was their own. The communication was excellent, the crew was incredibly respectful and cleaned up every single nail. Our roof looks stunning and we feel much safer heading into storm season."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center font-bold text-white text-xl border-2 border-brand-cta">
                  M.S
                </div>
                <div>
                  <p className="font-bold text-white text-lg">Margaret Sullivan</p>
                  <p className="text-brand-cta text-sm font-semibold tracking-wide uppercase">Homeowner in Fort Worth</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-brand-border rounded-card overflow-hidden shadow-sm">
            <div className="bg-brand-brown p-4">
              <h3 className="font-bold text-white text-sm uppercase tracking-widest">Materials Used</h3>
            </div>
            <div className="p-6 space-y-6">
              {[
                { title: 'GAF Timberline® HDZ™', desc: 'Charcoal Finish - High-definition architectural shingles.' },
                { title: 'GAF WeatherWatch®', desc: 'Mineral-surfaced leak barrier for valleys and eaves.' },
                { title: 'Tiger Paw™ Roof Deck', desc: 'Synthetic underlayment for superior moisture protection.' },
                { title: 'Lomanco OmniRidge®', desc: 'Ventilation system to prevent attic heat buildup.' },
                { title: 'Sherwin-Williams® Emerald', desc: 'Exterior acrylic latex for trim and siding restoration.' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-cta mt-2 shrink-0" />
                  <div>
                    <p className="font-bold text-brand-charcoal">{item.title}</p>
                    <p className="text-sm text-brand-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-brand-border bg-brand-cream/50">
              <p className="text-xs font-bold text-brand-muted uppercase text-center tracking-widest">Lifetime Warranty Included</p>
            </div>
          </div>

          <div className="bg-brand-gold text-white p-8 rounded-card text-center">
            <h3 className="font-serif text-2xl mb-4">Want these results?</h3>
            <p className="text-white/80 mb-6 text-sm">
              Schedule a free damage inspection or get a quote for your next project.
            </p>
            <Link to="/" className="block bg-brand-cta text-brand-charcoal py-3 rounded font-bold hover:bg-white transition-all shadow-md">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SimilarProjects = () => (
  <section className="py-24 bg-white border-t border-brand-border">
    <div className="max-w-[1200px] mx-auto px-4 md:px-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <span className="text-brand-gold font-bold tracking-wider uppercase text-xs mb-2 block">Recent Work</span>
          <h2 className="font-serif text-3xl text-brand-charcoal">View Similar Projects</h2>
        </div>
        <Link to="/" className="text-brand-brown font-bold border-b-2 border-brand-cta pb-1 hover:text-brand-gold transition-colors">
          See All Projects
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group border border-brand-border rounded-card overflow-hidden">
          <div className="relative h-[240px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Arlington project"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-brand-brown/90 text-white px-3 py-1 rounded-sm text-[10px] font-bold">ARLINGTON</div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-brand-charcoal mb-2">Modern Exterior Refresh</h3>
            <p className="text-sm text-brand-muted mb-4">A complete color transformation and siding repair.</p>
          </div>
        </div>

        <div className="group border border-brand-border rounded-card overflow-hidden">
          <div className="relative h-[240px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Southlake project"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-brand-brown/90 text-white px-3 py-1 rounded-sm text-[10px] font-bold">SOUTHLAKE</div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-brand-charcoal mb-2">Executive Metal Roofing</h3>
            <p className="text-sm text-brand-muted mb-4">Standing seam metal installation for a luxury estate.</p>
          </div>
        </div>

        <div className="group border border-brand-border rounded-card overflow-hidden">
          <div className="relative h-[240px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Keller project"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-brand-brown/90 text-white px-3 py-1 rounded-sm text-[10px] font-bold">KELLER</div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-brand-charcoal mb-2">Storm Damage Restoration</h3>
            <p className="text-sm text-brand-muted mb-4">Full insurance claim management and roof replacement.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-brand-deep text-white pt-20 pb-8">
    <div className="max-w-[1200px] mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="flex flex-col">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-brand-brown rounded-btn flex items-center justify-center text-brand-cta font-serif font-bold text-xl">
              KC
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-[18px] leading-tight text-white">KingdomCare</span>
              <span className="text-[11px] font-semibold text-brand-gold uppercase tracking-wider">Roofing & Construction</span>
            </div>
          </Link>
          <p className="text-sm text-white/70 mb-6 leading-relaxed">
            Providing top-tier roofing and construction services with integrity and craftsmanship built to protect your family.
          </p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block w-max">Services</h3>
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            <li>
              <Link to="/" className="hover:text-brand-cta transition-colors">Residential Roofing</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-brand-cta transition-colors">Exterior Painting</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-brand-cta transition-colors">Storm Restoration</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block w-max">Contact</h3>
          <ul className="flex flex-col gap-3 text-sm text-white/80">
            <li className="flex items-center gap-2">(817) 555-0198</li>
            <li>
              1234 Contractor Way<br />
              Fort Worth, TX 76102
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-lg mb-6 border-b border-white/10 pb-2 inline-block w-max">Accreditations</h3>
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-white/10 rounded-sm flex items-center justify-center text-[10px] text-center p-2 uppercase font-bold">
              GAF Certified
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-sm flex items-center justify-center text-[10px] text-center p-2 uppercase font-bold">
              BBB A+ Rated
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 text-center text-xs text-white/60">
        <p>© 2024 KingdomCare Roofing & Construction LLC. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);

const FloatingButton = () => (
  <div className="fixed bottom-6 right-6 z-50">
    <a
      href="tel:8175550198"
      className="w-14 h-14 bg-brand-cta text-brand-charcoal rounded-full shadow-xl flex items-center justify-center hover:bg-[#D9B92E] transition-colors border border-white/50"
    >
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    </a>
  </div>
);

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <div className="font-sans text-brand-charcoal bg-white antialiased">
        <TopBar />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <HeroSection />
                <SimilarProjects />
              </main>
            }
          />
        </Routes>
        <Footer />
        <FloatingButton />
      </div>
    </Router>
  );
};

export default App;