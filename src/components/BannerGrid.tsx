import { useLanguage } from '@/i18n/LanguageContext';
import banner1 from '@/assets/banner-1.jpg';
import banner2 from '@/assets/banner-2.jpg';

const BannerGrid = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16">
      <div className="container space-y-4">
        {/* Top row - 2 banners */}
        <div className="grid md:grid-cols-2 gap-4">
          {[banner1, banner2].map((img, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden aspect-[2/1] group cursor-pointer">
              <img src={img} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center p-6">
                <p className="text-cream text-center text-lg md:text-xl font-semibold max-w-xs leading-relaxed">
                  {t('bannerText')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full width banner */}
        <div className="relative rounded-2xl overflow-hidden aspect-[3/1] group cursor-pointer">
          <img src={banner1} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center p-6">
            <p className="text-cream text-center text-xl md:text-2xl font-semibold max-w-lg leading-relaxed">
              {t('bannerText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerGrid;
