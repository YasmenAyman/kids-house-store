import { useLanguage } from '@/i18n/LanguageContext';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import logo from '@/assets/logo.svg';

const Footer = () => {
  const { t, lang } = useLanguage();

  const footerLinks = [
    { title: "Kids House Store", links: [t('aboutUs'), t('businessIdentity')] },
    { title: "Kids House Store", links: [t('aboutUs'), t('businessIdentity')] },
    { title: "Kids House Store", links: [t('aboutUs'), t('businessIdentity')] },
    { title: "Kids House Store", links: [t('aboutUs'), t('businessIdentity')] },
  ];

  return (
    <footer className="bg-[#f5f5f5] text-foreground border-t border-border/20">
      <div className="container py-12 md:py-16">
        
        {/* Top Section: 5 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-sm">
              <img src={logo} alt="Kids House" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-semibold text-[#555555]">Kids House Store</span>
          </div>

          {/* Links Columns */}
          {footerLinks.map((col, i) => (
            <div key={i} className="space-y-4">
              <h3 className="font-bold text-sm text-[#333333] uppercase tracking-wide">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-[#666666] hover:text-foreground transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-[#dddddd] mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          
          {/* Socials & Store Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
            
            {/* Socials */}
            <div className="space-y-3 text-center md:text-start">
              <p className="text-sm font-semibold text-[#888888]">{t('connectWithUs')}</p>
              <div className="flex gap-4">
                {[Instagram, Linkedin, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white border border-border shadow-sm flex items-center justify-center text-[#111] hover:bg-black hover:text-white transition-all transform hover:-translate-y-1">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* App Store Buttons */}
            <div className="space-y-3 text-center md:text-start">
              <p className="text-sm font-semibold text-[#888888]">{t('downloadOurApp')}</p>
              <div className="flex items-center gap-3">
                <a href="#" className="inline-flex items-center gap-2 h-10 px-4 bg-black text-white rounded-md text-xs font-medium transition-transform hover:scale-105">
                  <span className="text-lg">▶</span>
                  <span className="flex flex-col leading-tight"><span className="text-[9px] opacity-70">GET IT ON</span><span className="text-sm font-semibold">Google Play</span></span>
                </a>
                <a href="#" className="inline-flex items-center gap-2 h-10 px-4 bg-black text-white rounded-md text-xs font-medium transition-transform hover:scale-105">
                  <span className="text-lg"></span>
                  <span className="flex flex-col leading-tight"><span className="text-[9px] opacity-70">Download on the</span><span className="text-sm font-semibold">App Store</span></span>
                </a>
              </div>
            </div>

          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-[#888888] font-medium">
            <span>@{t('allRightsReserved')}</span>
              <span className="font-black text-foreground uppercase tracking-tighter">
                TQNIA
              </span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
