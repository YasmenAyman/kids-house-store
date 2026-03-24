import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { categoryTabs } from '@/data/mockData';

const categoryProducts: Record<string, { name: string; nameAr: string; emoji: string; color: string }[]> = {
  babySupplies: [
    { name: 'Baby Bottle Set', nameAr: 'طقم رضّاعات', emoji: '🍼', color: 'hsl(var(--warm-beige))' },
    { name: 'Diaper Pack', nameAr: 'حفاضات', emoji: '👶', color: 'hsl(var(--sage-light))' },
    { name: 'Baby Wipes', nameAr: 'مناديل مبللة', emoji: '🧴', color: 'hsl(var(--cream))' },
  ],
  nutritional: [
    { name: 'Baby Formula', nameAr: 'حليب أطفال', emoji: '🥛', color: 'hsl(var(--cream))' },
    { name: 'Baby Cereal', nameAr: 'سيريلاك', emoji: '🥣', color: 'hsl(var(--warm-beige))' },
    { name: 'Vitamin Drops', nameAr: 'قطرات فيتامين', emoji: '💧', color: 'hsl(var(--sage-light))' },
  ],
  bathing: [
    { name: 'Baby Powder', nameAr: 'بودرة أطفال', emoji: '🧴', color: 'hsl(var(--warm-beige))' },
    { name: 'Baby Oil', nameAr: 'زيت أطفال', emoji: '🫧', color: 'hsl(var(--cream))' },
    { name: 'Baby Cream', nameAr: 'كريم أطفال', emoji: '🧼', color: 'hsl(var(--sage-light))' },
  ],
  breastfeeding: [
    { name: 'Breast Pump', nameAr: 'شفاط حليب', emoji: '🤱', color: 'hsl(var(--sage-light))' },
    { name: 'Nursing Pads', nameAr: 'وسادات رضاعة', emoji: '🩹', color: 'hsl(var(--warm-beige))' },
    { name: 'Storage Bags', nameAr: 'أكياس تخزين', emoji: '📦', color: 'hsl(var(--cream))' },
  ],
};

const CircularTextCard = ({
  product,
  categoryLabel,
  index,
  isVisible,
  lang,
}: {
  product: { name: string; nameAr: string; emoji: string; color: string };
  categoryLabel: string;
  index: number;
  isVisible: boolean;
  lang: string;
}) => {
  const textId = `circText-${index}`;
  const repeatedText = `${categoryLabel}  •  `.repeat(4);

  return (
    <div
      className={`group flex flex-col items-center transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 cursor-pointer group-hover:scale-[1.03] transition-transform duration-300">
        {/* Rotating circular text */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin-slow"
          viewBox="0 0 300 300"
        >
          <defs>
            <path
              id={textId}
              d="M 150,150 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
            />
          </defs>
          <text
            className="fill-taupe-light text-[13px] tracking-[3px]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <textPath href={`#${textId}`} startOffset="0%">
              {repeatedText}
            </textPath>
          </text>
        </svg>

        {/* Inner circle with product */}
        <div
          className="absolute inset-[15%] rounded-full border-2 border-border/50 flex items-center justify-center overflow-hidden group-hover:shadow-hover transition-shadow duration-300"
          style={{ backgroundColor: product.color }}
        >
          <span className="text-6xl sm:text-7xl animate-float">{product.emoji}</span>
        </div>

        {/* Decorative dots */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground/40" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-foreground/40" />
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/40" />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/40" />
      </div>
    </div>
  );
};

const CategoryGrid = () => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset animation on tab change
  const handleTabChange = (i: number) => {
    setIsVisible(false);
    setActiveTab(i);
    setTimeout(() => setIsVisible(true), 50);
  };

  const activeKey = categoryTabs[activeTab].key;
  const products = categoryProducts[activeKey] || categoryProducts.babySupplies;
  const activeLabel = lang === 'ar' ? categoryTabs[activeTab].ar : categoryTabs[activeTab].en;

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="py-16 md:py-24"
      style={{ backgroundColor: 'hsl(var(--warm-beige))' }}
    >
      <div className="container">
        {/* Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-600 ${
            isVisible ? 'animate-fade-in-down' : 'opacity-0'
          }`}
        >
          {categoryTabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(i)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === i
                  ? 'bg-foreground text-background shadow-card'
                  : 'bg-background/70 text-foreground border border-border hover:bg-background hover:shadow-soft'
              }`}
            >
              {lang === 'ar' ? tab.ar : tab.en}
            </button>
          ))}
        </div>

        {/* Circular Product Cards */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-16">
          {products.map((product, i) => (
            <CircularTextCard
              key={`${activeKey}-${i}`}
              product={product}
              categoryLabel={activeLabel}
              index={i}
              isVisible={isVisible}
              lang={lang}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div
          className={`text-center mt-12 transition-all duration-500 ${
            isVisible ? 'animate-slide-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.8s' }}
        >
          <button className="h-12 px-10 rounded-full bg-background text-foreground text-sm font-medium border border-border hover:bg-foreground hover:text-background transition-all duration-300 shadow-soft hover:shadow-card">
            {t('viewBabySupplies').replace('Baby Supplies', lang === 'ar' ? categoryTabs[activeTab].ar : categoryTabs[activeTab].en)}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
