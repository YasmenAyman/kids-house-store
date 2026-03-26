import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import promoProduct from '@/assets/promo-product.jpg';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PromoDealSection = () => {
  const { lang, dir } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  
  // Dummy images array placeholder matching the structure
  const images = [promoProduct, promoProduct, promoProduct, promoProduct];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container">
        <div className="flex flex-col lg:flex-row bg-[#F3E7DB] rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
          
          {/* Left Panel: Main Image Gallery */}
          <div className="lg:w-[45%] bg-white p-6 md:p-10 flex flex-col items-center justify-center relative min-h-[400px]">
            {/* Top Badges */}
            <div className="w-full flex justify-between items-start absolute top-6 left-0 px-6 md:px-10 z-10">
              {/* Brand Logo Placeholder */}
              <div className="w-16 h-16 rounded-full border border-gray-100 flex flex-col items-center justify-center text-[#40C4B6] font-bold text-[10px] uppercase bg-white shadow-xs">
                 <span className="text-xl mb-0.5">👶</span>
                 swaddle
              </div>
              
              <span className="px-4 py-1.5 rounded-full bg-red-50 text-red-400 text-lg md:text-xl font-medium tracking-wide">
                Save 20%
              </span>
            </div>

            {/* Main Image */}
            <div className="w-full max-w-sm mt-16 mb-6 aspect-square flex items-center justify-center">
              <img
                src={images[activeImage]}
                alt="Promo product"
                loading="lazy"
                className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl transition-all duration-500 scale-105"
              />
            </div>
          </div>

          {/* Right Panel: Content Details */}
          <div className="lg:w-[55%] p-8 md:p-14 lg:p-20 flex flex-col justify-center">
            
            {/* Pill Badge */}
            <div className="self-start px-5 py-2 rounded-lg bg-transparent border border-gray-300 text-gray-800 text-sm font-medium mb-8 bg-white/20">
              {lang === 'ar' ? 'صفقات اليوم' : 'Deals of the day'}
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#CAA89A] uppercase tracking-wide leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              {lang === 'ar' ? 'مجموعة الهدايا الأساسية للأطفال' : "BABE'S MINI MUST-HAVES GIFT SET"}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-xl font-medium leading-relaxed mb-8 max-w-lg">
              {lang === 'ar' 
                ? 'تسافر لأول مرة مع طفلك؟ لقد وفرنا لك أساسيات وقت الاستحمام!' 
                : "Traveling for the first time with babe? We've got you covered with the bathtime essentials!"}
            </p>

            {/* Pricing */}
            <div className="mb-10">
              <p className="text-gray-500 text-base mb-1">{lang === 'ar' ? 'السعر:' : 'Price:'}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  400.00 <span className="text-2xl font-light text-gray-700">{lang === 'ar' ? 'ج.م' : 'Egp'}</span>
                </span>
              </div>
              <div className="mt-1">
                <span className="text-lg text-gray-400 line-through">
                  500.00 {lang === 'ar' ? 'ج.م' : 'Egp'}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
              {images.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={`w-32 h-20 rounded-xl bg-white flex-shrink-0 cursor-pointer overflow-hidden transition-all duration-300 flex items-center justify-center p-2 border-2
                    ${activeImage === i ? 'border-white shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105 hover:shadow-sm'}`}
                >
                  <img src={img} alt={`Thumbnail ${i+1}`} loading="lazy" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
              ))}
            </div>

            {/* Controls & Progress Line */}
            <div className="flex items-center gap-6 mb-12">
              <div className="flex-1 h-[2px] bg-gray-300/60 relative rounded-full">
                <div 
                  className="absolute top-0 h-full bg-gray-800 rounded-full transition-all duration-300" 
                  style={{ 
                    width: `${((activeImage + 1) / images.length) * 100}%`,
                    [dir === 'rtl' ? 'right' : 'left']: 0
                  }} 
                />
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setActiveImage(prev => Math.max(0, Math.min(images.length - 1, dir === 'rtl' ? prev + 1 : prev - 1)))}
                  className="w-12 h-12 rounded-full border-2 border-gray-300/40 flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 transition-colors bg-transparent shadow-sm"
                >
                  <ChevronLeft className={`w-6 h-6 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
                <button 
                  onClick={() => setActiveImage(prev => Math.min(images.length - 1, Math.max(0, dir === 'rtl' ? prev - 1 : prev + 1)))}
                  className="w-12 h-12 rounded-full border-0 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-colors shadow-md"
                >
                  <ChevronRight className={`w-6 h-6 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* CTA Button */}
            <button className="self-start px-10 py-3.5 rounded-full bg-transparent border-2 border-white text-gray-800 font-semibold text-base hover:bg-white transition-colors">
              {lang === 'ar' ? 'عرض جميع المنتجات' : 'View all products'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoDealSection;
