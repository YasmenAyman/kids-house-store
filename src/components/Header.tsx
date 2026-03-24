import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';

const Header = () => {
  const { t, lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { key: 'home' as const, href: '#' },
    { key: 'brands' as const, href: '#brands' },
    { key: 'downloadProducts' as const, href: '#' },
    { key: 'categories' as const, href: '#categories' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="container flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">K</span>
          </div>
          <span className="font-display text-xl font-semibold text-foreground hidden sm:block">
            Kids House
          </span>
        </a>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('search')}
              className="w-full h-11 ps-11 pe-4 rounded-full bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Lang switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="h-9 px-3 rounded-full bg-muted text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>

          <button className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-full hover:bg-muted transition-colors text-sm text-foreground">
            <Heart className="w-4 h-4" />
            <span className="hidden lg:inline">{t('wishlist')}</span>
          </button>

          <button className="relative flex items-center gap-1.5 h-9 px-3 rounded-full hover:bg-muted transition-colors text-sm text-foreground">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-0.5 -end-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">3</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            <button className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              {t('signIn')}
            </button>
            <button className="h-9 px-4 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
              {t('signUp')}
            </button>
          </div>

          <button
            className="md:hidden h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Nav links - desktop */}
      <nav className="hidden md:block border-t border-border">
        <div className="container flex items-center gap-1 py-2">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container py-4 space-y-3">
            <div className="relative w-full">
              <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('search')}
                className="w-full h-11 ps-11 pe-4 rounded-full bg-muted border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {t(link.key)}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 h-10 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {t('signIn')}
              </button>
              <button className="flex-1 h-10 rounded-full border border-border text-sm font-medium text-foreground">
                {t('signUp')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
