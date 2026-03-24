import { useLanguage } from '@/i18n/LanguageContext';
import { brands } from '@/data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const BrandCarousel = () => {
  const { t, lang, dir } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

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

  // Auto-scroll
  useEffect(() => {
    if (!scrollRef.current || isPaused) return;
    autoScrollRef.current = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const atEnd = dir === 'rtl'
        ? scrollLeft <= -(scrollWidth - clientWidth) + 10
        : scrollLeft >= scrollWidth - clientWidth - 10;
      if (atEnd) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({
          left: dir === 'rtl' ? -160 : 160,
          behavior: 'smooth',
        });
      }
    }, 3000);
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [dir, isPaused]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = dir === 'rtl'
      ? (direction === 'left' ? 200 : -200)
      : (direction === 'left' ? -200 : 200);
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="brands" className="py-12 md:py-16">
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
            className={`flex items-center gap-2 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <a href="#" className="text-sm font-medium text-primary hover:underline ms-2">
              {t('viewAll')}
            </a>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {brands.map((brand, i) => (
            <div
              key={brand.id}
              className={`flex-shrink-0 w-36 h-36 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-soft cursor-pointer
                transition-all duration-500 hover:scale-105 hover:shadow-hover group
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                backgroundColor: brand.color,
                transitionDelay: isVisible ? `${i * 100}ms` : '0ms',
              }}
            >
              <div className="w-16 h-16 rounded-full bg-background/80 flex items-center justify-center group-hover:bg-background transition-colors">
                <span className="text-xs font-bold text-foreground">{brand.name.slice(0, 2)}</span>
              </div>
              <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
