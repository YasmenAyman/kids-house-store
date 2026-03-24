import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { flashDeals } from '@/data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FlashDeals = () => {
  const { t, lang } = useLanguage();

  // Countdown - 2 days from now
  const [timeLeft, setTimeLeft] = useState({ d: 2, h: 14, m: 35, s: 22 });

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

  return (
    <section className="py-12 md:py-16 bg-warm-beige/50">
      <div className="container">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-wide">
            {t('flashTitle')}
          </h2>

          {/* Timer */}
          <div className="flex justify-center gap-3">
            {[
              { val: timeLeft.d, label: t('days') },
              { val: timeLeft.h, label: t('hours') },
              { val: timeLeft.m, label: t('mins') },
              { val: timeLeft.s, label: t('secs') },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-background shadow-soft flex items-center justify-center">
                  <span className="text-xl font-bold text-foreground">{pad(item.val)}</span>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flashDeals.map((deal) => (
            <div key={deal.id} className="bg-background rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all group">
              <div className="relative aspect-square bg-muted">
                <div className="w-full h-full bg-gradient-to-br from-cream to-sage-light/20 flex items-center justify-center">
                  <span className="text-4xl opacity-30">🎁</span>
                </div>
                <span className="absolute top-3 start-3 px-2.5 py-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
                  {t('flashSave')}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                  {lang === 'ar' ? deal.titleAr : deal.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-primary">${deal.price.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground line-through">${deal.oldPrice.toFixed(2)}</span>
                </div>
                <button className="w-full h-9 rounded-full border border-border text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                  {t('viewProduct')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nav arrows */}
        <div className="flex justify-center gap-2 mt-6">
          <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-background transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;
