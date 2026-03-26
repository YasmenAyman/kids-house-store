import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
  const { lang } = useLanguage();

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground py-4 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && (
            <ChevronRight className={`w-4 h-4 opacity-40 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          )}
          {item.to ? (
            <Link to={item.to} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-semibold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;
