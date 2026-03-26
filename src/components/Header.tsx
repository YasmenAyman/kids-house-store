import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Search, Heart, ShoppingBag, User, UserPlus, Menu, X, ChevronDown, Languages } from 'lucide-react';
import logo from '@/assets/logo.svg';

const Header = () => {
  const { t, lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { key: 'home' as const, href: '#', hasDropdown: false },
    { key: 'brands' as const, href: '#brands', hasDropdown: true },
    { key: 'downloadProducts' as const, href: '#', hasDropdown: true },
    { key: 'categories' as const, href: '/categories', hasDropdown: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F9F9F9] border-b border-border shadow-sm">
      {/* Top bar */}
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-3">
        {/* Logo and Search Container */}
        <div className="flex items-center justify-between md:justify-start gap-4 md:gap-8 w-full flex-1">
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <img src={logo} alt="Kids House" className="h-[65px] w-auto drop-shadow-sm" />
          </a>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('search')}
                className="w-full h-11 ps-12 pe-4 rounded-full bg-white border border-gray-200 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F3E7DB] transition-all"
              />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors text-foreground">
              <Heart className="w-5 h-5" />
            </button>

            <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors text-foreground">
              <ShoppingBag className="w-5 h-5" />
            </button>

            {/* Vertical Separator */}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {/* Lang switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors text-foreground"
            >
              <div className="flex items-center">
                <span className="text-lg font-medium">文</span>
                <span className="text-[10px] uppercase font-bold self-end mb-1 ml-[1px]">A</span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3 ml-2">
            <button className="flex items-center gap-2 h-10 px-5 rounded-full border border-gray-300 bg-white text-sm font-medium text-foreground hover:bg-gray-50 transition-colors">
              <User className="w-4 h-4" />
              {t('signIn')}
            </button>
            <button className="flex items-center gap-2 h-10 px-5 rounded-full bg-[#F3E7DB] text-gray-900 text-sm font-medium hover:brightness-95 transition-all">
              <UserPlus className="w-4 h-4" />
              {t('signUp')}
            </button>
          </div>
        </div>
      </div>

      {/* Nav links - desktop */}
      <nav className="hidden md:block bg-[#F9F9F9] pb-4">
        <div className="container flex items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.key}
              href={link.href}
              className={`flex items-center gap-1 text-sm transition-colors ${
                index === 0 ? 'text-foreground font-bold' : 'text-gray-500 font-medium hover:text-gray-900'
              }`}
            >
              {t(link.key)}
              {link.hasDropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white animate-fade-in shadow-lg absolute w-full left-0 z-50">
          <div className="container py-4 space-y-4">
            <div className="relative w-full">
              <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('search')}
                className="w-full h-11 ps-12 pe-4 rounded-full bg-gray-50 border border-gray-200 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F3E7DB]"
              />
            </div>
            
            <div className="flex justify-around py-2 border-y border-gray-100">
              <button className="flex items-center justify-center p-2 rounded-full hover:bg-gray-50 text-foreground">
                <Heart className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center p-2 rounded-full hover:bg-gray-50 text-foreground">
                <ShoppingBag className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="flex items-center justify-center p-2 rounded-full hover:bg-gray-50 text-foreground"
              >
                <div className="flex items-center">
                  <span className="text-lg font-medium">文</span>
                  <span className="text-[10px] uppercase font-bold self-end mb-1 ml-[1px]">A</span>
                </div>
              </button>
            </div>

            <nav className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-gray-50 transition-colors"
                >
                  {t(link.key)}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
                </a>
              ))}
            </nav>
            <div className="flex gap-2 pt-2">
              <button className="flex-1 flex items-center justify-center gap-2 h-11 rounded-full border border-gray-300 bg-white text-sm font-medium text-foreground">
                <User className="w-4 h-4" />
                {t('signIn')}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 h-11 rounded-full bg-[#F3E7DB] text-gray-900 text-sm font-medium">
                <UserPlus className="w-4 h-4" />
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
