import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { flashDeals } from '@/data/mockData';
import { ChevronLeft, ChevronRight, Sparkles, Heart, ShoppingBasket, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const FlashDeals = () => {
  const { t, lang } = useLanguage();
  const { addToCart } = useCart();
  const [api, setApi] = useState<CarouselApi>();

  // Countdown - 10 days from now (to match design 10D : 02H : 20M)
  const [timeLeft, setTimeLeft] = useState({ d: 10, h: 2, m: 20, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { d, h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) return { d: 0, h: 0, m: 0, s: 0 };
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  // Group deals into pairs for 2-row layout
  const pairedDeals = [];
  for (let i = 0; i < flashDeals.length; i += 2) {
    pairedDeals.push(flashDeals.slice(i, i + 2));
  }

  return (
    <section className="relative py-12 md:py-20 bg-[#F5ECE4] overflow-hidden">
      {/* Decorative stars / Shapes */}
      <div className="absolute top-10 left-10 md:left-24 opacity-70">
        <Sparkles strokeWidth={1} className="w-16 h-16 text-foreground" />
      </div>
      <div className="absolute top-10 right-10 md:right-24 opacity-70">
        <Sparkles strokeWidth={1} className="w-16 h-16 text-foreground" />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto">
        {/* Header Title and Timer */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-[#111111] mb-4">
            {t('flashTitle')}
          </h2>

          <div className="flex justify-center items-end gap-2 text-2xl md:text-5xl font-black tracking-wider w-max mx-auto px-4 md:px-12 pb-4">
            <span className="text-[#111111]">{pad(timeLeft.d)}<span className="text-[#888888] font-bold text-xl md:text-4xl ms-1">D</span></span>
            <span className="text-[#111111] pb-1 md:pb-2 leading-none">:</span>
            <span className="text-[#111111]">{pad(timeLeft.h)}<span className="text-[#888888] font-bold text-xl md:text-4xl ms-1">H</span></span>
            <span className="text-[#111111] pb-1 md:pb-2 leading-none">:</span>
            <span className="text-[#111111]">{pad(timeLeft.m)}<span className="text-[#888888] font-bold text-xl md:text-4xl ms-1">M</span></span>
          </div>
          
          <div className="w-4/5 md:w-3/4 mx-auto border-b-[3px] border-white/70"></div>
        </div>

        {/* Nav arrows & Products Container */}
        <Carousel 
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex flex-col">
            {/* Top Right Navigation */}
            <div className="flex justify-end gap-3 mb-6">
              <button 
                onClick={() => api?.scrollPrev()}
                className="w-10 h-10 rounded-full bg-transparent border border-[#b8ab9f] text-[#8c8278] flex items-center justify-center hover:bg-white hover:border-white hover:text-foreground transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => api?.scrollNext()}
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-foreground hover:bg-[#111] hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Product Cards Slider (2 rows) */}
            <CarouselContent className="-ml-8">
              {pairedDeals.map((pair, index) => (
                <CarouselItem key={index} className="pl-8 basis-full sm:basis-1/2 lg:basis-[40%]">
                  <div className="flex flex-col gap-6 h-full">
                    {pair.map((deal) => (
                      <div key={deal.id} className="bg-white rounded-3xl flex flex-row overflow-hidden shadow-sm hover:shadow-md transition-shadow min-h-[220px]">
                        
                        {/* Left: Image Box */}
                        <div className="w-[45%] bg-white flex items-center justify-center p-4 border-e border-border/60">
                          {deal.image ? (
                            <img src={deal.image} alt={deal.title} className="w-full h-full object-contain mix-blend-multiply" />
                          ) : (
                            <div className="text-6xl opacity-30">🎁</div>
                          )}
                        </div>

                        {/* Right: Details Box */}
                        <div className="w-[55%] p-5 md:p-6 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex justify-between items-start gap-4">
                              <h3 className="text-base md:text-lg font-light text-foreground line-clamp-2 leading-tight flex-1">
                                {lang === 'ar' ? deal.titleAr : deal.title}
                              </h3>
                              {deal.discount && (
                                <span className="px-3 py-1 rounded-full bg-[#fae8db] text-[#d65a5a] text-xs font-semibold shrink-0">
                                  Save {deal.discount}%
                                </span>
                              )}
                            </div>
                            
                            <div className="space-y-0.5">
                              <p className="text-xs font-medium text-muted-foreground uppercase">{t('priceLabel')}</p>
                              <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="text-xl md:text-2xl font-bold text-foreground">
                                  {deal.price.toFixed(2)}{lang === 'ar' ? ' ج.م' : 'Egp'}
                                </span>
                                {deal.oldPrice > deal.price && (
                                  <span className="text-sm font-medium text-muted-foreground/60 line-through">
                                    {deal.oldPrice.toFixed(2)} {lang === 'ar' ? 'ج.م' : 'Egp'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={() => addToCart({
                              id: deal.id,
                              title: deal.title,
                              titleAr: deal.titleAr,
                              price: deal.price,
                              oldPrice: deal.oldPrice,
                              discount: deal.discount,
                              image: deal.image
                            })}
                            className="w-full mt-5 py-3 rounded-full bg-[#F4EBE3] text-sm font-semibold text-foreground hover:bg-[#e6dcd4] transition-colors flex items-center justify-center"
                          >
                            {t('purchaseNow')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FlashDeals;
