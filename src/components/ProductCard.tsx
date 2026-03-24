import { Heart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface ProductCardProps {
  title: string;
  titleAr: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
}

const ProductCard = ({ title, titleAr, price, oldPrice, discount }: ProductCardProps) => {
  const { t, lang } = useLanguage();

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all">
      {/* Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-warm-beige to-sage-light/30 flex items-center justify-center">
          <span className="text-5xl opacity-30">🧴</span>
        </div>
        {/* Discount */}
        <span className="absolute top-3 start-3 px-2.5 py-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold">
          -{discount}%
        </span>
        {/* Fav */}
        <button className="absolute top-3 end-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background">
          <Heart className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-foreground line-clamp-1">
          {lang === 'ar' ? titleAr : title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-primary">${price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground line-through">${oldPrice.toFixed(2)}</span>
        </div>
        <button className="w-full h-9 rounded-full border border-border text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
          {t('viewProduct')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
