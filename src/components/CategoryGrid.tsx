import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { categoryTabs } from '@/data/mockData';
import useEmblaCarousel from 'embla-carousel-react';

import p1 from '@/assets/product_1.png';
import p2 from '@/assets/product_2.png';
import p3 from '@/assets/product_3.png';
import p4 from '@/assets/product_4.png';
import p5 from '@/assets/product_5.png';
import p6 from '@/assets/product_6.png';
import p7 from '@/assets/product_7.png';

const categoryProducts: Record<string, { id: number; name: string; nameAr: string; image: string }[]> = {
  babySupplies: [
    { id: 1, name: 'Silicone Bib', nameAr: 'مريلة سيليكون', image: p1 },
    { id: 2, name: 'Car Seat', nameAr: 'مقعد سيارة', image: p2 },
    { id: 3, name: 'Baby Stroller', nameAr: 'عربة أطفال', image: p3 },
    { id: 4, name: 'Honest Wipes', nameAr: 'مناديل مبللة', image: p4 },
    { id: 5, name: 'Baby Carrier', nameAr: 'حمالة أطفال', image: p5 },
    { id: 6, name: 'Baby Bottle', nameAr: 'رضاعة', image: p6 },
    { id: 7, name: 'Carrycot', nameAr: 'سرير محمول', image: p7 },
  ],
  nutritional: [
    { id: 8, name: 'Baby Formula', nameAr: 'حليب أطفال', image: 'https://images.unsplash.com/photo-1522771731475-6a843eb7596c?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 9, name: 'Baby Cereal', nameAr: 'سيريلاك', image: 'https://images.unsplash.com/photo-1554046556-32d75a1372df?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 10, name: 'Vitamin Drops', nameAr: 'قطرات فيتامين', image: 'https://images.unsplash.com/photo-1544256718-d9df6b55e62f?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 11, name: 'Feeding Bottles', nameAr: 'رضاعات', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400&h=400' },
  ],
  bathing: [
    { id: 12, name: 'Baby Powder', nameAr: 'بودرة أطفال', image: 'https://images.unsplash.com/photo-1522771731475-6a843eb7596c?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 13, name: 'Baby Wash', nameAr: 'غسول أطفال', image: 'https://images.unsplash.com/photo-1554046556-32d75a1372df?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 14, name: 'Baby Oil', nameAr: 'زيت أطفال', image: 'https://images.unsplash.com/photo-1544256718-d9df6b55e62f?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 15, name: 'Shampoo', nameAr: 'شامبو', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400&h=400' },
  ],
  breastfeeding: [
    { id: 16, name: 'Breast Pump', nameAr: 'شفاط حليب', image: 'https://images.unsplash.com/photo-1522771731475-6a843eb7596c?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 17, name: 'Nursing Pads', nameAr: 'وسادات', image: 'https://images.unsplash.com/photo-1554046556-32d75a1372df?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 18, name: 'Storage Bags', nameAr: 'أكياس', image: 'https://images.unsplash.com/photo-1544256718-d9df6b55e62f?auto=format&fit=crop&q=80&w=400&h=400' },
    { id: 19, name: 'Pillow', nameAr: 'وسادة', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400&h=400' },
  ],
};

const getWavyPath = (count: number) => {
  let path = "M 0 400 ";
  for (let i = 0; i < count; i++) {
    const startX = i * 100;
    if (i === 0) {
      // First curve goes UP (peak near y=0)
      path += `Q ${startX + 50} -400, ${startX + 100} 400 `;
    } else {
      // Alternates naturally: DOWN, UP, DOWN, UP...
      path += `T ${startX + 100} 400 `;
    }
  }
  return path;
};

const CategoryGrid = () => {
  const { t, lang, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    direction: dir as 'ltr' | 'rtl',
    align: 'start',
    dragFree: true
  });

  const activeKey = categoryTabs[activeTab].key;
  const products = categoryProducts[activeKey] || categoryProducts.babySupplies;

  // React on tab change to slide to start
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0);
    }
  }, [activeTab, emblaApi]);

  const wavyText = "Clothes  •  Baby Stroller  •  Baby Chair  •  Baby Bed  •  Car Seat  •  Baby Walker  •  Pooty  •  Baby Bouncer  •  Baby Bag  •  Summer Collection  •  ";

  return (
    <section id="categories" className="py-20 md:py-28  relative overflow-hidden flex flex-col items-center">
      {/* Header Container */}
      <div className="container relative z-20 flex flex-col items-center text-center space-y-6 md:space-y-8 mb-12 px-4">
        <div className="inline-block px-6 py-2 rounded-full border border-gray-300 bg-white/50 text-gray-500 font-medium text-sm backdrop-blur-sm shadow-sm">
          Babies Categories
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight md:leading-snug max-w-2xl whitespace-pre-line">
          {t('heroTitle')}
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 pt-6">
          {categoryTabs.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${activeTab === i
                ? 'bg-[#F3E7DB] text-gray-900 border-[#F3E7DB] shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:shadow-sm'
                }`}
            >
              {lang === 'ar' ? tab.ar : tab.en}
            </button>
          ))}
        </div>
      </div>

      {/* Draggable Slider Viewport - full width */}
      <div className="w-full relative z-10 flex justify-center bg-[#F3E7DB] border-4 border-white border-r-0 border-l-0">
        <div className="overflow-hidden w-full max-w-[1920px]" ref={emblaRef}>
          <div className="flex touch-pan-y relative will-change-transform items-center">

            {/* SVG Wavy Background Text inside the slider track so it scrolls with it */}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 h-[300px] md:h-[500px] pointer-events-none opacity-20 z-0 select-none"
              style={{ width: `${products.length * 80}%` }}
              // CSS custom property to adjust width responsively matching slide width
              ref={(el) => {
                if (el) {
                  const mediaQuery = window.matchMedia('(min-width: 768px)');
                  el.style.width = mediaQuery.matches ? `${products.length * 28.5}%` : `${products.length * 80}%`;
                  mediaQuery.onchange = (e) => {
                    el.style.width = e.matches ? `${products.length * 28.5}%` : `${products.length * 80}%`;
                  }
                }
              }}
            >
              <svg viewBox={`0 0 ${products.length * 100} 800`} preserveAspectRatio="none" width="100%" height="100%" className="text-gray-500">
                <path id={`curve-${activeTab}`} d={getWavyPath(products.length)} fill="transparent" />
                <text fontSize="25" letterSpacing="4">
                  <textPath href={`#curve-${activeTab}`} startOffset="0%">{wavyText.repeat(products.length)}</textPath>
                </text>
              </svg>
            </div>

            {/* Slides 3.5 items visible on screens */}
            {products.map((product, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={product.id}
                  className="flex-[0_0_80%] md:flex-[0_0_28.5%] group relative cursor-grab active:cursor-grabbing px-4"
                >
                  <div className={`h-[400px] md:h-[550px] flex ${isEven ? 'items-end' : 'items-start'} justify-center relative z-10`}>
                    {/* Arch Card Container */}
                    <div
                      className={`w-full max-w-[280px] md:max-w-[320px] h-[300px] md:h-[420px] transition-all duration-300 border-4 border-white overflow-hidden relative flex-shrink-0 bg-transparent`}
                      style={{
                        borderRadius: isEven ? '200px 200px 0 0' : '0 0 200px 200px',
                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)'
                      }}
                    >
                      {/* Fill Animation Background */}
                      <div className={`absolute inset-x-0 h-full bg-white transition-transform duration-700 ease-in-out z-0
                        ${isEven
                          ? 'bottom-0 translate-y-full group-hover:translate-y-0 origin-bottom'
                          : 'top-0 -translate-y-full group-hover:translate-y-0 origin-top'
                        }`}
                      />

                      {/* Product Image */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
                        <img
                          src={product.image}
                          alt={lang === 'ar' ? product.nameAr : product.name}
                          className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* View Supplies Button */}
      <div className="relative z-20 mt-4 pb-10 border-b-2 border-primary w-full flex justify-center">
        <button className="h-12 px-10 rounded-full bg-[#F3E7DB] text-gray-900 font-medium text-base hover:brightness-95 transition-all mt-4">
          {t('viewBabySupplies').replace('Baby Supplies', lang === 'ar' ? categoryTabs[activeTab].ar : categoryTabs[activeTab].en)}
        </button>
      </div>
    </section>
  );
};

export default CategoryGrid;
