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
    <div className="fixed inset-0 z-[100] flex items-start justify-end p-4 md:p-6">
      <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
      <div className="relative w-full max-w-sm bg-background rounded-2xl overflow-hidden shadow-2xl animate-fade-in mt-16 md:mt-20 max-h-[calc(100vh-120px)] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
          <h2 className="text-base font-bold text-foreground">
            {lang === 'ar' ? 'تمت الإضافة للسلة بنجاح!' : 'Successfully Added To Cart!'}
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-auto flex-1">
          {/* Cart Items */}
          <div className="px-5 py-3 space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex gap-3 p-3 bg-card rounded-xl border border-border relative">
                <button onClick={() => removeFromCart(item.id)} className="absolute top-2 end-2 w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
                <div className="w-14 h-14 bg-background rounded-lg overflow-hidden shrink-0">
                  <img src={item.image} alt={lang === 'ar' ? item.titleAr : item.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-muted-foreground">{lang === 'ar' ? 'أطفال' : 'Kinds'}</p>
                  <p className="text-xs font-semibold text-foreground line-clamp-1">{lang === 'ar' ? item.titleAr : item.title}</p>
                  <p className="text-xs font-bold text-foreground mt-0.5">
                    {lang === 'ar' ? 'ج.م' : 'Egp'} {item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Truck className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[9px] text-muted-foreground">
                      {lang === 'ar' ? 'توصيل سريع خلال 3 أيام' : 'Express delivery in 3 days'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 self-center">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-medium w-3 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <p className="text-center text-muted-foreground py-6 text-sm">{lang === 'ar' ? 'السلة فارغة' : 'Your cart is empty'}</p>
            )}
          </div>

          {/* Actions */}
          {items.length > 0 && (
            <div className="px-5 pb-3 flex gap-2">
              <button onClick={() => setIsCartOpen(false)} className="flex-1 h-10 rounded-full border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
                {lang === 'ar' ? 'احفظ لاحقاً' : 'Keep for later'}
              </button>
              <button className="flex-1 h-10 rounded-full bg-destructive text-destructive-foreground text-xs font-medium hover:opacity-90 transition-opacity">
                {lang === 'ar' ? 'اشترِ الآن' : 'Buy Now'}
              </button>
            </div>
          )}

          {/* Related Products */}
          <div className="px-5 py-3 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-foreground">{lang === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}</h3>
              <div className="flex gap-1">
                <button className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted"><ChevronLeft className="w-3 h-3" /></button>
                <button className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted"><ChevronRight className="w-3 h-3" /></button>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {relatedProducts.map(p => (
                <div key={p.id} className="shrink-0 w-[120px] bg-card rounded-xl border border-border p-2">
                  <div className="aspect-square bg-background rounded-lg overflow-hidden mb-1.5">
                    <img src={p.image} alt={lang === 'ar' ? p.titleAr : p.title} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-[10px] font-medium text-foreground line-clamp-2 mb-0.5">{lang === 'ar' ? p.titleAr : p.title}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-foreground">{p.price.toFixed(2)}<span className="text-[9px] text-muted-foreground">{lang === 'ar' ? 'ج.م' : 'Egp'}</span></span>
                    <span className="text-[9px] text-muted-foreground line-through">{p.oldPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <span className="text-[9px] text-amber-500">★</span>
                    <span className="text-[9px] text-muted-foreground">{p.rating} ({p.reviews})</span>
                  </div>
                  <p className="text-[8px] text-destructive mt-0.5">
                    {lang === 'ar' ? `وفر ${p.discount}% حتى نفاد الكمية` : `Save ${p.discount}% till out of stock`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
