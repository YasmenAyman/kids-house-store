import { useLanguage } from '@/i18n/LanguageContext';
import promoProduct from '@/assets/promo-product.jpg';

const PromoDealSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6 bg-card rounded-3xl overflow-hidden shadow-card">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto">
            <img
              src={promoProduct}
              alt="Promo product"
              loading="lazy"
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
                {t('promoSave')}
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {t('promoDeal')}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {t('promoTitle')}
            </h2>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('promoDesc')}
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">{t('promoPrice')}</span>
              <span className="text-lg text-muted-foreground line-through">{t('promoOldPrice')}</span>
            </div>

            {/* Mini gallery */}
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-16 rounded-xl bg-muted border-2 border-transparent hover:border-primary transition-colors cursor-pointer overflow-hidden">
                  <img src={promoProduct} alt="" loading="lazy" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <button className="self-start h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              {t('promoBtn')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoDealSection;
