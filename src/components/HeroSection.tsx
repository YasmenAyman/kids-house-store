import { useLanguage } from '@/i18n/LanguageContext';
import heroVideo from '@/assets/hero_bg.mp4';

const HeroSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="relative overflow-hidden w-full h-[500px] md:h-[600px] lg:h-[700px]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Ribbon / Badge */}
      <div 
        className={`absolute top-0 ${
          lang === 'ar' ? 'left-8 md:left-24' : 'right-8 md:right-24'
        } bg-[#A33B42] text-white/90 px-6 py-4 md:px-8 md:py-5 rounded-b-2xl shadow-lg z-10 font-bold tracking-wide text-sm md:text-base whitespace-nowrap`}
      >
        {t('heroBadge')}
      </div>

      {/* Content */}
      <div className="relative container h-full flex flex-col items-center justify-center text-center z-10 px-4">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight text-white drop-shadow-md max-w-3xl mx-auto whitespace-pre-line">
            {t('heroTitle')}
          </h1>
          <p className="text-base md:text-lg text-white/90 drop-shadow-sm max-w-2xl mx-auto font-light whitespace-pre-line">
            {t('heroSubtitle')}
          </p>
          <div className="pt-6">
            <button className="h-12 px-10 rounded-full bg-[#F3E7DB] text-gray-900 font-medium text-base hover:brightness-95 transition-all shadow-lg">
              {t('heroBtn')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
