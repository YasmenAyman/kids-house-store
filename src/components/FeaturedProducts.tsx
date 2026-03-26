import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { products } from '@/data/mockData';
import ProductCard from './ProductCard';
import { ChevronDown } from 'lucide-react';

const filterKeys = [
  'filterAll', 'filterStrollers', 'filterMedical', 'filterClothes',
  'filterLotion', 'filterSkincare'
] as const;

const filterCategories = [
  'All', 'Strollers', 'Medical care', 'Baby Clothes',
  'Face + Body Lotion', 'Skincare'
];

const FeaturedProducts = () => {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(0);

  const filtered = activeFilter === 0
    ? products
    : products.filter(p => p.category === filterCategories[activeFilter]);

  return (
    <section className="relative py-16 md:py-24 bg-[#f8f9fa] overflow-hidden">
      {/* Background Watermark Texts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col items-center justify-between opacity-[0.03] select-none z-0">
        <div className="w-full flex justify-between px-10 pt-20">
          <span className="text-6xl md:text-8xl font-black uppercase tracking-widest origin-center -rotate-45 -translate-x-12 -translate-y-12">Store</span>
          <span className="text-6xl md:text-8xl font-black uppercase tracking-widest origin-center rotate-45 translate-x-12 -translate-y-12">House Store</span>
        </div>
        <div className="w-full flex justify-between px-10 pb-20">
          <span className="text-6xl md:text-8xl font-black uppercase tracking-widest origin-center -rotate-90 -translate-x-24">Baby Supplies</span>
          <span className="text-6xl md:text-8xl font-black uppercase tracking-widest origin-center rotate-45 translate-x-12 translate-y-12">Baby</span>
        </div>
      </div>

      <div className="container relative z-10 flex flex-col items-center">
        {/* Subtitle Pill */}
        <div className="inline-flex items-center justify-center px-6 py-1.5 rounded-sm border border-border bg-transparent mb-6">
          <span className="text-sm font-medium text-muted-foreground">{t('featuredSubtitle')}</span>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground text-center mb-12 max-w-3xl leading-snug">
          {t('featuredTitle')}
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-10 max-w-4xl mx-auto">
          {filterKeys.map((key, i) => (
            <button
              key={key}
              onClick={() => setActiveFilter(i)}
              className={`px-5 py-2 rounded-xl text-sm transition-colors border ${
                activeFilter === i
                  ? 'bg-[#FAE8D9] border-[#FAE8D9] text-foreground font-medium'
                  : 'bg-transparent border-border text-muted-foreground hover:bg-black/5'
              }`}
            >
              {t(key)}
            </button>
          ))}
          <button className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors">
            <ChevronDown className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {(filtered.length > 0 ? filtered : products.slice(0, 4)).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Browse All Button */}
        <div className="text-center mt-12 w-full flex justify-center">
          <button className="h-12 px-10 rounded-full bg-[#F4EBE3] text-foreground font-medium hover:bg-[#ebdccc] transition-colors">
            {t('browseAll')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
