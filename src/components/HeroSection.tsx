import { useLanguage } from '@/i18n/LanguageContext';
import heroBaby from '@/assets/hero-baby.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[500px] md:h-[600px] lg:h-[680px]">
        <img
          src={heroBaby}
          alt="Happy baby"
          width={1920}
          height={900}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent rtl:bg-gradient-to-l" />
        <div className="relative container h-full flex flex-col justify-center">
          <div className="max-w-lg space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wide uppercase">
              {t('heroBadge')}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-cream">
              {t('heroTitle')}
            </h1>
            <p className="text-base md:text-lg text-cream/80">
              {t('heroSubtitle')}
            </p>
            <button className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-card">
              {t('heroBtn')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
