import { useLanguage } from '@/i18n/LanguageContext';
import { brands } from '@/data/mockData';
import useEmblaCarousel from 'embla-carousel-react';
import { useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

const BrandCarousel = () => {
  const { t, dir } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    direction: dir as 'ltr' | 'rtl',
    align: 'start',
    dragFree: true
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Autoplay functionality safely
  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    startAutoplay();
    
    // Resume autoplay when user interaction ends
    emblaApi.on('pointerUp', startAutoplay);
    emblaApi.on('pointerDown', stopAutoplay);

    return () => {
      stopAutoplay();
      emblaApi.off('pointerUp', startAutoplay);
      emblaApi.off('pointerDown', stopAutoplay);
    };
  }, [emblaApi, startAutoplay, stopAutoplay]);

  return (
    <section ref={sectionRef} id="brands" className="py-12 md:py-16 overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2
            className={`text-2xl md:text-3xl font-bold text-foreground transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {t('brandsTitle')}
          </h2>
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <Link to="/brands" className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              {t('viewAll')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={dir === 'rtl' ? 'rotate-180' : ''}>
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div 
          className="overflow-hidden" 
          ref={emblaRef}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
            {brands.map((brand, i) => (
              <div
                key={brand.id}
                className={`flex-none w-[280px] md:w-[320px] px-3 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transition: 'opacity 0.5s ease-out, transform 0.5s ease-out', transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative w-full h-40 rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm bg-gray-100">
                  {/* Background Image with Scale Animation */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(/src/assets/${brand.bgImage})`,
                    }}
                  />
                  
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 group-hover:bg-black/30" />

                  {/* Centered Logo Circle with Scale Animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110 p-4">
                      <img 
                        src={`/src/assets/${brand.logo}`} 
                        alt={brand.name} 
                        className="max-w-full max-h-full object-contain" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
