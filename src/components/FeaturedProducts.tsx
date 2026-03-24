import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { products } from '@/data/mockData';
import ProductCard from './ProductCard';

const filterKeys = [
  'filterAll', 'filterSkincare', 'filterMedical', 'filterBabyMom',
  'filterLotion', 'filterClothes', 'filterWalker', 'filterStrollers',
] as const;

const filterCategories = [
  'All', 'Skincare', 'Medical care', 'Baby & Mom',
  'Face + Body Lotion', 'Baby Clothes', 'Learning Walker', 'Strollers',
];

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(0);

  const filtered = activeFilter === 0
    ? products
    : products.filter(p => p.category === filterCategories[activeFilter]);

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
          {t('featuredTitle')}
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filterKeys.map((key, i) => (
            <button
              key={key}
              onClick={() => setActiveFilter(i)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                activeFilter === i
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-accent'
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(filtered.length > 0 ? filtered : products.slice(0, 4)).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="h-11 px-8 rounded-full border border-border text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
            {t('browseAll')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
