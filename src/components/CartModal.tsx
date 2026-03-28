import { X, Minus, Plus, ChevronLeft, ChevronRight, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { Link } from 'react-router-dom';

const CartModal = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { lang } = useLanguage();

  if (!isCartOpen) return null;

  const relatedProducts = [
    { id: 101, title: "Sniffer Soothers Nose + Face Wipes", titleAr: "مناديل مهدئة للأنف والوجه", price: 400, oldPrice: 500, discount: 20, image: "https://images.unsplash.com/photo-1522771731475-6a843eb7596c?auto=format&fit=crop&q=80&w=200&h=200", rating: 4.6, reviews: 25 },
    { id: 102, title: "Sniffer Soothers Nose + Face Wipes", titleAr: "مناديل مهدئة للأنف والوجه", price: 400, oldPrice: 500, discount: 20, image: "https://images.unsplash.com/photo-1554046556-32d75a1372df?auto=format&fit=crop&q=80&w=200&h=200", rating: 4.6, reviews: 25 },
    { id: 103, title: "Sniffer Soothers Nose + Face Wipes", titleAr: "مناديل مهدئة للأنف والوجه", price: 400, oldPrice: 500, discount: 25, image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=200&h=200", rating: 4.6, reviews: 20 },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
      <div className="relative w-full max-w-md bg-background h-full overflow-auto animate-slide-in-right shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-background z-10 px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            {lang === 'ar' ? 'تمت الإضافة للسلة بنجاح!' : 'Successfully Added To Cart!'}
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="px-6 py-4 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-3 p-3 bg-card rounded-xl border border-border relative">
              <button onClick={() => removeFromCart(item.id)} className="absolute top-2 end-2 w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="w-16 h-16 bg-background rounded-lg overflow-hidden shrink-0">
                <img src={item.image} alt={lang === 'ar' ? item.titleAr : item.title} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground">{lang === 'ar' ? 'أطفال' : 'Kinds'}</p>
                <p className="text-sm font-semibold text-foreground line-clamp-1">{lang === 'ar' ? item.titleAr : item.title}</p>
                <p className="text-sm font-bold text-foreground mt-0.5">
                  {lang === 'ar' ? 'ج.م' : 'Egp'} {item.price.toFixed(2)}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Truck className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">
                    {lang === 'ar' ? 'توصيل سريع خلال 3 أيام' : 'Express delivery in 3 days'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-center text-muted-foreground py-8">{lang === 'ar' ? 'السلة فارغة' : 'Your cart is empty'}</p>
          )}
        </div>

        {/* Actions */}
        {items.length > 0 && (
          <div className="px-6 pb-4 flex gap-3">
            <button onClick={() => setIsCartOpen(false)} className="flex-1 h-11 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
              {lang === 'ar' ? 'احفظ لاحقاً' : 'Keep for later'}
            </button>
            <button className="flex-1 h-11 rounded-full bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              {lang === 'ar' ? 'اشترِ الآن' : 'Buy Now'}
            </button>
          </div>
        )}

        {/* Related Products */}
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-foreground">{lang === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}</h3>
            <div className="flex gap-1">
              <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {relatedProducts.map(p => (
              <div key={p.id} className="shrink-0 w-[140px] bg-card rounded-xl border border-border p-2">
                <div className="aspect-square bg-background rounded-lg overflow-hidden mb-2">
                  <img src={p.image} alt={lang === 'ar' ? p.titleAr : p.title} className="w-full h-full object-contain" />
                </div>
                <p className="text-xs font-medium text-foreground line-clamp-2 mb-1">{lang === 'ar' ? p.titleAr : p.title}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-foreground">{p.price.toFixed(2)}<span className="text-[10px] text-muted-foreground">{lang === 'ar' ? 'ج.م' : 'Egp'}</span></span>
                  <span className="text-[10px] text-muted-foreground line-through">{p.oldPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-0.5 mt-1">
                  <span className="text-[10px] text-amber-500">★</span>
                  <span className="text-[10px] text-muted-foreground">{p.rating} ({p.reviews})</span>
                </div>
                <p className="text-[9px] text-destructive mt-1">
                  {lang === 'ar' ? `وفر ${p.discount}% حتى نفاد الكمية` : `Save ${p.discount}% till out of stock`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
