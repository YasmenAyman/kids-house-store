import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { newProductCategories } from '@/data/mockData';
import banner2 from '@/assets/banner-2.jpg';

const NewProductsSection = () => {
  const { t, lang } = useLanguage();
  const [activeChip, setActiveChip] = useState(0);

  const chips = [
    { en: 'New Sale', key: 'newSale' as const },
    { en: 'Top Rated', key: 'topRated' as const },
    { en: 'Newest Products', key: 'newestProducts' as const },
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
          {t('newTitle')}
        </h2>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {chips.map((chip, i) => (
            <button
              key={chip.key}
              onClick={() => setActiveChip(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeChip === i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground border border-border hover:bg-accent'
              }`}
            >
              {t(chip.key)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Category chips - 2 columns */}
          <div className="md:col-span-1 grid grid-cols-2 gap-2 content-start">
            {newProductCategories.map((cat, i) => (
              <button
                key={i}
                className="px-3 py-2 rounded-xl bg-background border border-border text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-start"
              >
                {lang === 'ar' ? cat.ar : cat.en}
              </button>
            ))}
          </div>

          {/* Editorial image collage */}
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer">
            <img src={banner2} alt="New products" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-foreground/20 flex items-end p-8">
              <button className="h-11 px-8 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                {t('exploreAll')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewProductsSection;
