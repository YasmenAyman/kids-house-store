import { Heart, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useState } from 'react';

interface ProductCardProps {
  title: string;
  titleAr: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
}

const ProductCard = ({ title, titleAr, price, oldPrice, discount, image }: ProductCardProps) => {
  const { t, lang } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 hover:shadow-md transition-shadow flex flex-col p-4 relative w-full aspect-[4/5] min-h-[380px]">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4 z-10 w-full">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-white text-xs font-medium text-muted-foreground whitespace-nowrap">
          <ShieldCheck className="w-3.5 h-3.5" />
          {t('trustedByParents')}
        </div>
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="w-8 h-8 rounded-full border border-border bg-white flex items-center justify-center hover:bg-black/5 transition-colors shrink-0"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${isFavorite ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`} 
          />
        </button>
      </div>

      {/* Image Area */}
      <div className="flex-1 w-full bg-white flex items-center justify-center mb-4 min-h-[140px]">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-contain mix-blend-multiply max-h-[140px]" />
        ) : (
          <div className="text-5xl opacity-40">🧴</div>
        )}
      </div>

      {/* Info Area */}
      <div className="space-y-3 shrink-0">
        <h3 className="text-base font-semibold text-foreground line-clamp-2 leading-snug">
          {lang === 'ar' ? titleAr : title}
        </h3>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{t('priceLabel')}</span>
            {discount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#fae8db] text-[#d65a5a] text-xs font-semibold">
                Save {discount}%
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-lg font-bold text-foreground">
              {price.toFixed(2)}{lang === 'ar' ? ' ج.م' : 'Egp'}
            </span>
            {oldPrice > price && (
              <span className="text-xs text-muted-foreground line-through shrink-0">
                {oldPrice.toFixed(2)} {lang === 'ar' ? 'ج.م' : 'Egp'}
              </span>
            )}
          </div>
        </div>

        <button className="w-full h-10 mt-1 rounded-full border border-[#e5d4c3] text-sm font-medium text-foreground hover:bg-[#F4EBE3] transition-colors flex items-center justify-center">
          {t('viewProduct')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
