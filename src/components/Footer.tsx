import { useLanguage } from '@/i18n/LanguageContext';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <span className="font-display text-xl font-semibold">Kids House</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">{t('footerAbout')}</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: t('aboutUs'), links: ['Our Story', 'Team', 'Careers', 'Press'] },
            { title: t('contactUs'), links: ['Support', 'FAQs', 'Returns', 'Shipping'] },
            { title: t('businessInquiry'), links: ['Wholesale', 'Partnership', 'Affiliate', 'Vendors'] },
          ].map((col, i) => (
            <div key={i} className="space-y-4">
              <h3 className="font-semibold text-sm">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Download & Copyright */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-50">{t('footerCopyright')}</p>
          <div className="flex items-center gap-3">
            <span className="text-xs opacity-70">{t('downloadApp')}</span>
            <button className="h-9 px-4 rounded-lg bg-primary-foreground/10 text-xs font-medium hover:bg-primary-foreground/20 transition-colors">
              App Store
            </button>
            <button className="h-9 px-4 rounded-lg bg-primary-foreground/10 text-xs font-medium hover:bg-primary-foreground/20 transition-colors">
              Google Play
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
