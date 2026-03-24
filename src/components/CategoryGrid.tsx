import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { categoryTabs, mainCategories } from '@/data/mockData';

const CategoryGrid = () => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="categories" className="py-12 md:py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t('catTitle')}</h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">{t('catSubtitle')}</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryTabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground border border-border hover:bg-accent'
              }`}
            >
              {lang === 'ar' ? tab.ar : tab.en}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mainCategories.map((cat, i) => (
            <div
              key={i}
              className="group relative bg-background rounded-2xl p-6 shadow-soft hover:shadow-card transition-all cursor-pointer overflow-hidden"
            >
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                {lang === 'ar' ? cat.ar : cat.en}
              </h3>
              <div className="absolute top-2 end-2 w-8 h-8 rounded-full bg-sage-light/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="h-11 px-8 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            {t('viewBabySupplies')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
