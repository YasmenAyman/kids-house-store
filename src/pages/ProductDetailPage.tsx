import { useParams, Navigate, Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { categoriesData } from '@/data/categoryData';
import PageLayout from '@/components/PageLayout';
import BreadcrumbNav from '@/components/Breadcrumb';
import { useState, useCallback, useEffect } from 'react';
import { Star, Minus, Plus, ThumbsUp, Truck, CreditCard, RefreshCw, ChevronLeft, ChevronRight, ChevronDown, ShoppingBasket, Heart, BadgePercent } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// Import Assets
import mainImg from '@/assets/mail_img.png';
import bannerImg from '@/assets/Banner.png';
import pattern1 from '@/assets/pattern_1.png';
import pattern2 from '@/assets/pattern_2.png';
import pattern3 from '@/assets/pattern_3.png';
import pattern4 from '@/assets/pattern_4.png';
import pattern5 from '@/assets/pattern_5.png';
import pattern6 from '@/assets/pattern_6.png';
import pattern7 from '@/assets/pattern_7.png';

const productImages = [mainImg, mainImg, mainImg];

const styleOptions = [
  { name: "Harvest Pumpkins", image: pattern1, fullImage: mainImg },
  { name: "Floral Blue", image: pattern2 },
  { name: "Safari Green", image: pattern3 },
  { name: "Classic White", image: pattern4 },
  { name: "Stars Pink", image: pattern5 },
  { name: "Bear Grey", image: pattern6 },
  { name: "Hearts Red", image: pattern7 },
];

const reviews = [
  { name: "Hasna Atiya", date: "yesterday", rating: 5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu purus ante. Proin ac condimentum magna. Nunc eu purus ante. Proin ac condimentum magna." },
  { name: "Hasna Atiya", date: "yesterday", rating: 5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu purus ante. Proin ac condimentum magna. Nunc eu purus ante. Proin ac condimentum magna." },
  { name: "Hasna Atiya", date: "yesterday", rating: 4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Nunc eu purus ante. Proin ac condimentum magna." },
  { name: "Hasna Atiya", date: "yesterday", rating: 5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies tellus et nibh maximus. Nunc eu purus ante. Proin ac condimentum magna." },
  { name: "Hasna Atiya", date: "2 days ago", rating: 3, text: "The size was a bit smaller than expected but the quality is great. Kids love the pattern!" },
  { name: "Hasna Atiya", date: "3 days ago", rating: 5, text: "Perfect for winter nights. Very soft and warm. Will definitely buy more styles soon." },
  { name: "Hasna Atiya", date: "1 week ago", rating: 2, text: "Shipping took too long, although the product itself is fine." },
  { name: "Hasna Atiya", date: "1 week ago", rating: 5, text: "Best pajamas ever! My daughter doesn't want to take it off." },
];

const relatedProducts = [
  { id: 201, title: "Get-A-Grip Teether", titleAr: "عضاضة سهلة الإمساك", price: 400, oldPrice: 500, discount: 20, image: "https://images.unsplash.com/photo-1554046556-32d75a1372df?auto=format&fit=crop&q=80&w=300&h=300", rating: 4.6, reviews: 25 },
  { id: 202, title: "Push Pop Feeder", titleAr: "وحدة تغذية بالدفع", price: 400, oldPrice: 500, discount: 25, image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=300&h=300", rating: 4.6, reviews: 30 },
  { id: 203, title: "Training Toothbrush for Babies", titleAr: "فرشاة أسنان تدريبية", price: 400, oldPrice: 500, discount: 20, image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&q=80&w=300&h=300", rating: 4.6, reviews: 25 },
  { id: 204, title: "Nose Frida Saline Rinse", titleAr: "غسول أنف فريدا", price: 400, oldPrice: 500, discount: 20, image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=300&h=300", rating: 4.6, reviews: 20 },
];

const ProductDetailPage = () => {
  const { categorySlug, subCategorySlug, subSubCategorySlug, productId } = useParams();
  const { lang } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedStyle, setSelectedStyle] = useState(0);
  const [mainProductImage, setMainProductImage] = useState(styleOptions[0].fullImage || styleOptions[0].image);
  const [quantity, setQuantity] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [visibleCount, setVisibleCount] = useState(4);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const parent = categoriesData.find(c => c.slug === categorySlug);
  const subCategory = parent?.children?.find(c => c.slug === subCategorySlug);
  const subSubCategory = subCategory?.children?.find(c => c.slug === subSubCategorySlug);

  if (!parent || !subCategory) return <Navigate to="/categories" replace />;

  const productName = lang === 'ar' ? 'بيجاما أطفال قطن عضوي بطبعة اليقطين' : 'Baby Organic Cotton Pajamas in Harvest Pumpkins Print.';
  const parentName = lang === 'ar' ? parent.ar : parent.en;
  const subName = lang === 'ar' ? subCategory.ar : subCategory.en;
  const subSubName = subSubCategory ? (lang === 'ar' ? subSubCategory.ar : subSubCategory.en) : null;

  const breadcrumbs = [
    { label: lang === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: lang === 'ar' ? 'الأقسام' : 'Categories', to: '/categories' },
    { label: parentName, to: `/categories/${categorySlug}` },
    { label: subName, to: `/categories/${categorySlug}/${subCategorySlug}` },
    ...(subSubName ? [{ label: subSubName, to: `/categories/${categorySlug}/${subCategorySlug}/${subSubCategorySlug}` }] : []),
    { label: lang === 'ar' ? 'بيجاما' : 'Pajamas' },
  ];

  const price = 500;
  const oldPrice = 800;

  const handleAddToCart = () => {
    const qty = quantity > 0 ? quantity : 1;
    addToCart({
      id: Number(productId) || Date.now(),
      title: 'Baby Organic Cotton Pajamas',
      titleAr: 'بيجاما أطفال قطن عضوي',
      price,
      oldPrice,
      discount: 20,
      image: mainImg,
    }, qty);
  };

  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === filterRating);
  const visibleReviews = filteredReviews.slice(0, visibleCount);

  return (
    <PageLayout>
      <div className="container py-2 pb-20">
        <BreadcrumbNav items={breadcrumbs} />

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 mt-6">
          {/* Main Product Image */}
          <div className="rounded-[40px] overflow-hidden bg-[#F8F9FB] aspect-square flex items-center justify-center p-8 md:p-12 relative group shadow-sm border border-[#F2EDE7]">
            <img 
              src={mainProductImage} 
              alt={productName} 
              className="w-full h-full object-contain mix-blend-multiply transition-all duration-700 group-hover:scale-110" 
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight tracking-tight">
              {productName}
            </h1>
            
            <p className="text-[15px] text-muted-foreground mb-6 leading-relaxed max-w-xl font-medium">
              <span className="font-bold text-foreground">{lang === 'ar' ? 'الوصف:' : 'Description:'}</span> {lang === 'ar' ? 'بيجاما قطن عضوي ناعمة ومريحة للأطفال بطبعة اليقطين الحصاد. مثالية لنوم هادئ ومريح.' : 'Baby Organic Cotton Pajamas in Harvest Pumpkins Print. Soft, breathable organic cotton for a perfect night\'s sleep. Mindfully sourced for a more sustainable future.'}
            </p>

            <div className="flex items-center gap-3 mb-8">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-semibold mt-0.5">
                (4.7 {lang === 'ar' ? 'من' : 'from'} 125 {lang === 'ar' ? 'تقييم' : 'Reviews'})
              </span>
            </div>

            {/* Style Selector */}
            <div className="mb-8">
              <p className="text-[15px] text-muted-foreground mb-4 font-bold">
                {lang === 'ar' ? 'اختر الستايل:' : 'Select Style:'} <span className="text-foreground font-normal opacity-60">({styleOptions[selectedStyle].name})</span>
              </p>
              <div className="flex flex-wrap gap-3">
                {styleOptions.map((style, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedStyle(i);
                      setMainProductImage(styleOptions[i].fullImage || styleOptions[i].image);
                    }}
                    className={`group relative w-[60px] h-[60px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedStyle === i 
                        ? 'border-[#111] shadow-md' 
                        : 'border-[#F2EDE7] hover:border-muted-foreground/30'
                    }`}
                  >
                    <img src={style.image} alt={style.name} className="w-full h-full object-cover" />
                  </button>
                ))}
                <button className="w-10 h-10 rounded-full border border-[#ebded3] flex items-center justify-center text-muted-foreground self-center hover:bg-[#F2EDE7] transition-all ms-1">
                  <ChevronDown className="w-5 h-5 opacity-40 ml-0.5" />
                </button>
              </div>
            </div>

            {/* Pricing Area */}
            <div className="bg-white rounded-[24px] border border-[#F2EDE7] p-6 mb-8 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
                <div className="space-y-1">
                  <p className="text-[13px] font-bold text-muted-foreground opacity-60 uppercase tracking-wide">{lang === 'ar' ? 'السعر الكلي' : 'Total Price'}</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-foreground">
                      {lang === 'ar' ? 'ج.م' : 'Egp'} {price}
                    </span>
                    <span className="text-xl text-muted-foreground line-through opacity-30">
                      {lang === 'ar' ? 'ج.م' : 'Egp'} {oldPrice}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-1 text-right">
                  <p className="text-[13px] font-bold text-muted-foreground opacity-60 uppercase tracking-wide">
                    {lang === 'ar' ? 'الكمية' : 'Quantity'}
                  </p>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setQuantity(q => Math.max(0, q - 1))} 
                      className="w-9 h-9 rounded-full bg-[#F3E7DB] flex items-center justify-center text-foreground hover:brightness-95 transition-all font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-[18px] font-bold w-4 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)} 
                      className="w-9 h-9 rounded-full bg-[#F3E7DB] text-foreground flex items-center justify-center hover:brightness-95 transition-all font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <button 
                  onClick={handleAddToCart} 
                  className="h-[56px] rounded-full border border-[#F2EDE7] bg-white text-[15px] font-medium text-[#111] hover:bg-[#FAF7F4] transition-all flex items-center justify-center shadow-sm"
                >
                  {lang === 'ar' ? 'أضف للسلة' : 'Add To Cart'}
                </button>
                <button 
                  onClick={handleAddToCart} 
                  className="h-[56px] rounded-full bg-[#F3E7DB] text-[15px] font-medium text-[#111] hover:brightness-95 transition-all flex items-center justify-center"
                >
                  {lang === 'ar' ? 'اشترِ الآن' : 'Buy Now'}
                </button>
              </div>
            </div>

            {/* Features Row - 4 columns */}
            <div>
              <p className="text-[13px] font-bold text-muted-foreground opacity-60 mb-6">{lang === 'ar' ? 'المميزات:' : 'Features:'}</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: ThumbsUp, en: 'QUALITY ASSURANCE', ar: 'ضمان الجودة' },
                  { icon: Truck, en: 'FREE SHIPPING', ar: 'شحن مجاني', label: 'FREE' },
                  { icon: CreditCard, en: 'EASY PAYMENTS', ar: 'دفع سهل' },
                  { icon: RefreshCw, en: 'QUICK RETURN', ar: 'إرجاع سريع' },
                ].map((f, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 text-center">
                    <div className="relative">
                      <f.icon className="w-8 h-8 text-foreground opacity-80" strokeWidth={1} />
                      {f.label && <span className="absolute -top-1 -right-1 text-[8px] font-bold bg-white px-1 border border-foreground/20 rounded leading-tight">{f.label}</span>}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground opacity-80 tracking-tight leading-tight max-w-[80px]">
                      {lang === 'ar' ? f.ar : f.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Closer View Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-black text-foreground mb-10">{lang === 'ar' ? 'نظرة عن قرب' : 'Closer View'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Large Banner */}
            <div className="md:col-span-2 relative h-[500px] md:h-[700px] rounded-[40px] overflow-hidden group shadow-lg border border-[#F2EDE7]">
              <img src={bannerImg} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-10 end-10">
                <span className="px-10 py-4 bg-[#A34A4A] text-white text-[15px] font-black rounded-sm shadow-2xl border border-white/10 uppercase tracking-widest">
                  {lang === 'ar' ? 'جديد + محسّن' : 'New + Improved'}
                </span>
              </div>
              <div className="absolute bottom-16 start-16 text-white max-w-2xl">
                <p className="text-[15px] font-black opacity-60 mb-4 tracking-[0.2em] uppercase">97% Polyster</p>
                <h3 className="text-4xl md:text-[3.5rem] font-bold leading-[1.1] drop-shadow-2xl">
                  {lang === 'ar' ? 'أفضل المنتجات للأطفال اللطيفين، ابحث عنها والمزيد..' : 'The best products for cute babies \n find them and more..'}
                </h3>
              </div>
            </div>

            {/* Bottom Two Half-Width Images */}
            {[pattern1, pattern7].map((img, i) => (
              <div key={i} className="relative h-[400px] md:h-[550px] rounded-[40px] overflow-hidden group shadow-md border border-[#F2EDE7]">
                <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-12 start-12 text-white max-w-sm">
                  <p className="text-[13px] font-black opacity-60 mb-3 tracking-[0.15em] uppercase">97% Polyster</p>
                  <p className="text-2xl md:text-3xl font-bold leading-tight">
                    {lang === 'ar' ? 'أفضل المنتجات للأطفال اللطيفين' : 'The best products for cute babies find them and more..'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rating & Reviews Section */}
        <div className="mb-24" id="reviews">
          <div className="flex flex-wrap items-center justify-between gap-8 mb-12 border-b border-[#F2EDE7] pb-8">
            <div>
              <h2 className="text-3xl font-black text-foreground mb-2">
                {lang === 'ar' ? 'التقييمات والمراجعات' : 'Rating & Reviews'} <span className="text-[#A34A4A] font-light">({reviews.length})</span>
              </h2>
              <p className="text-[14px] font-bold text-muted-foreground/40">
                {lang === 'ar' 
                  ? `يظهر ${visibleReviews.length} نتائج من إجمالي ${filteredReviews.length} مراجعة` 
                  : `Showing ${visibleReviews.length} results from total ${filteredReviews.length} reviews`}
              </p>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-4 bg-[#FAF7F4] px-6 py-3 rounded-full border border-[#F2EDE7] hover:bg-[#F2EDE7] transition-all"
              >
                <span className="text-sm font-black text-muted-foreground/30 uppercase tracking-widest">{lang === 'ar' ? 'فلترة حسب' : 'Filter By'}</span>
                <div className="flex items-center gap-2 text-foreground font-black text-[15px]">
                  {filterRating === 'all' ? (lang === 'ar' ? 'الكل' : 'All') : filterRating} 
                  {filterRating !== 'all' && <Star className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />}
                  <ChevronDown className={`w-5 h-5 opacity-20 transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {showFilterDropdown && (
                <div className="absolute top-full mt-2 end-0 bg-white border border-[#F2EDE7] rounded-2xl shadow-xl z-20 min-w-[150px] overflow-hidden">
                  {['all', 5, 4, 3, 2, 1].map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setFilterRating(r as any);
                        setVisibleCount(4);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full px-6 py-3 text-start hover:bg-[#FAF7F4] transition-colors flex items-center justify-between font-bold text-[14px] ${filterRating === r ? 'text-[#A34A4A] bg-[#FAF7F4]' : 'text-muted-foreground'}`}
                    >
                      {r === 'all' ? (lang === 'ar' ? 'الكل' : 'All Reviews') : `${r} ${lang === 'ar' ? 'نجوم' : 'Stars'}`}
                      {r !== 'all' && <Star className={`w-3.5 h-3.5 ${filterRating === r ? 'fill-[#A34A4A] text-[#A34A4A]' : 'fill-gray-300 text-gray-300'}`} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleReviews.map((review, i) => (
              <div key={i} className="p-10 bg-white rounded-[32px] border border-[#F2EDE7] shadow-xs hover:shadow-xl transition-all duration-500 group relative">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-4 border-[#FAF7F4] shadow-sm">
                    <img src={`https://i.pravatar.cc/150?u=${i + (filterRating !== 'all' ? (filterRating as number) * 10 : 0)}`} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 mt-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[17px] font-black text-foreground tracking-tight">{review.name}</p>
                      <span className="text-[13px] font-bold text-muted-foreground/40 italic">{review.date}</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'fill-[#FFB800] text-[#FFB800]' : 'text-gray-100 fill-gray-50'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[15px] text-muted-foreground/70 leading-relaxed font-semibold italic">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
          
          {visibleCount < filteredReviews.length && (
            <div className="flex justify-center mt-16">
              <button 
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="flex items-center gap-4 px-12 py-4 rounded-full bg-[#FAF7F4] text-[15px] font-black text-foreground hover:bg-[#F2EDE7] transition-all border border-[#F2EDE7] uppercase tracking-widest active:scale-95 shadow-sm"
              >
                {lang === 'ar' ? 'مشاهدة المزيد' : 'View more'}
                <ChevronDown className="w-5 h-5 opacity-30" />
              </button>
            </div>
          )}
        </div>

        {/* Related Products slider */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">{lang === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}</h2>
          </div>
          
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {relatedProducts.map(p => {
                const productUrl = `/categories/${categorySlug}/${subCategorySlug}/${subSubCategorySlug}/product/${p.id}`;
                return (
                  <CarouselItem key={p.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group border border-border h-full">
                      {/* Top Area (Image + Floating Buttons) */}
                      <div className="relative aspect-[4/5] bg-white w-full">
                        {/* Floating Buttons: Heart & Cart */}
                        <div className="absolute top-4 end-4 flex gap-2 z-10 flex-row">
                          <button
                            onClick={(e) => { 
                              e.preventDefault(); 
                              toggleWishlist({ ...p, titleAr: p.titleAr || p.title, discount: p.discount || 0 });
                            }}
                            className={`w-[42px] h-[42px] rounded-full bg-white border flex items-center justify-center transition-colors shadow-sm ${
                              isInWishlist(p.id) 
                                ? 'text-red-500 border-red-500 bg-red-50' 
                                : 'text-[#c2b5a5] border-[#e8dccf] hover:text-red-500 hover:border-red-500'
                            }`}
                          >
                            <Heart 
                              strokeWidth={1.5} 
                              className={`w-[22px] h-[22px] ${isInWishlist(p.id) ? 'fill-red-500' : ''}`} 
                            />
                          </button>
                          <button
                            onClick={(e) => { 
                              e.preventDefault(); 
                              addToCart({ ...p, titleAr: p.titleAr || p.title, discount: p.discount || 0 });
                            }}
                            className="w-[42px] h-[42px] rounded-full bg-white border border-[#e8dccf] flex items-center justify-center text-[#c2b5a5] hover:text-foreground hover:border-foreground transition-colors shadow-sm"
                          >
                            <ShoppingBasket strokeWidth={1.5} className="w-[22px] h-[22px]" />
                          </button>
                        </div>

                        {/* Image Link */}
                        <Link to={productUrl} className="block w-full h-full p-8 pb-4">
                          <img 
                            src={p.image} 
                            alt={lang === 'ar' ? p.titleAr : p.title} 
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
                          />
                        </Link>
                      </div>

                      {/* Separator */}
                      <div className="w-full h-[2px] bg-[#f8f1eb]" />

                      {/* Info Area */}
                      <div className="p-5 flex flex-col gap-3 flex-1">
                        {/* Title */}
                        <Link to={productUrl}>
                          <h3 className="text-[17px] font-medium text-foreground line-clamp-2 leading-snug hover:text-primary transition-colors">
                            {lang === 'ar' ? p.titleAr : p.title}
                          </h3>
                        </Link>
                        
                        {/* Price & Rating Row */}
                        <div className="flex items-start justify-between mt-auto pt-2">
                          {/* Prices */}
                          <div className="flex flex-col">
                            <div className="flex items-baseline gap-1">
                              <span className="text-[24px] font-bold text-foreground leading-none">
                                {p.price.toFixed(2)}
                              </span>
                              <span className="text-[14px] text-muted-foreground font-normal">
                                {lang === 'ar' ? 'ج.م' : 'Egp'}
                              </span>
                            </div>
                            {p.oldPrice > p.price && (
                              <span className="text-[14px] text-[#a09a93] line-through mt-0.5">
                                {p.oldPrice.toFixed(2)} {lang === 'ar' ? 'ج.م' : 'Egp'}
                              </span>
                            )}
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mt-1 shrink-0">
                            <Star className="w-[16px] h-[16px] text-foreground fill-none" strokeWidth={1.5} />
                            <span className="text-[14px] font-bold text-foreground">{p.rating}</span>
                            <span className="text-[14px] text-muted-foreground">({p.reviews})</span>
                          </div>
                        </div>

                        {/* Discount Badge */}
                        <div className="mt-2 w-full">
                          <div className="w-full bg-[#faebeb] rounded-full py-2 px-3 flex items-center justify-center gap-2">
                            <BadgePercent className="w-4 h-4 text-[#d44c4c]" strokeWidth={2} />
                            <span className="text-[#d44c4c] font-semibold text-[13px]">
                              {lang === 'ar' ? `وفر ${p.discount}% حتى نفاد الكمية` : `Save ${p.discount}% till out of stock`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            <div className="flex justify-end gap-4 mt-8">
              <button 
                className="w-12 h-12 rounded-full border border-[#ebded3] bg-white text-muted-foreground/40 flex items-center justify-center hover:bg-[#F2EDE7] hover:text-foreground transition-all shadow-xl active:scale-95"
                onClick={() => api?.scrollPrev()}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                className="w-12 h-12 rounded-full border border-[#ebded3] bg-white text-muted-foreground/40 flex items-center justify-center hover:bg-[#F2EDE7] hover:text-foreground transition-all shadow-xl active:scale-95"
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </Carousel>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetailPage;
