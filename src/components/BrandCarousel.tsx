import { useLanguage } from '@/i18n/LanguageContext';
import { brands } from '@/data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

const BrandCarousel = () => {
  const { t, lang, dir } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = dir === 'rtl'
      ? (direction === 'left' ? 200 : -200)
      : (direction === 'left' ? -200 : 200);
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section id="brands" className="py-12 md:py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t('brandsTitle')}</h2>
          <div className="flex items-center gap-2">
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
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex-shrink-0 w-36 h-36 rounded-2xl flex flex-col items-center justify-center gap-3 shadow-soft hover:shadow-card transition-shadow cursor-pointer"
              style={{ backgroundColor: brand.color }}
            >
              <div className="w-16 h-16 rounded-full bg-background/80 flex items-center justify-center">
                <span className="text-xs font-bold text-foreground">{brand.name.slice(0, 2)}</span>
              </div>
              <span className="text-xs font-medium text-foreground/80">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
