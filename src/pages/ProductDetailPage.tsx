import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/context/CartContext';
import { categoriesData } from '@/data/categoryData';
import PageLayout from '@/components/PageLayout';
import BreadcrumbNav from '@/components/Breadcrumb';
import { useState } from 'react';
import { Star, Minus, Plus, ShieldCheck, Truck, RefreshCw, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const productImages = [
  "https://images.unsplash.com/photo-1522771731475-6a843eb7596c?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1554046556-32d75a1372df?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&q=80&w=600&h=600",
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600&h=600",
];

const styleOptions = [
  { name: "Harvest Pumpkins", image: productImages[0] },
  { name: "Floral Blue", image: productImages[1] },
  { name: "Safari Green", image: productImages[2] },
  { name: "Classic White", image: productImages[3] },
  { name: "Stars Pink", image: productImages[4] },
];

const reviews = [
  { name: "Hasna Atiya", date: "yesterday", rating: 5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu purus ante. Proin ac condimentum magna." },
  { name: "Hasna Atiya", date: "yesterday", rating: 5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu purus ante. Proin ac condimentum magna." },
  { name: "Hasna Atiya", date: "yesterday", rating: 4, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique." },
  { name: "Hasna Atiya", date: "yesterday", rating: 5, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies tellus et nibh maximus." },
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

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [filterBy, setFilterBy] = useState('all');

  const parent = categoriesData.find(c => c.slug === categorySlug);
  const subCategory = parent?.children?.find(c => c.slug === subCategorySlug);
  const subSubCategory = subCategory?.children?.find(c => c.slug === subSubCategorySlug);

  if (!parent || !subCategory) return <Navigate to="/categories" replace />;

  const productName = lang === 'ar' ? 'بيجاما أطفال قطن عضوي بطبعة اليقطين' : 'Baby Organic Cotton Pajamas in Harvest Pumpkins Print';
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
      image: productImages[selectedImage],
    }, qty);
  };

  const features = [
    { icon: ShieldCheck, en: 'Quality Assurance', ar: 'ضمان الجودة' },
    { icon: Truck, en: 'Free Shipping', ar: 'شحن مجاني' },
    { icon: ShieldCheck, en: 'Easy Payments', ar: 'دفع سهل' },
    { icon: RefreshCw, en: 'Quick Return', ar: 'إرجاع سريع' },
  ];

  return (
    <PageLayout>
      <div className="container py-2">
        <BreadcrumbNav items={breadcrumbs} />

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="col-span-1 row-span-2 aspect-[3/4] bg-card rounded-2xl overflow-hidden border border-border">
                <img src={productImages[selectedImage]} alt={productName} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-card rounded-2xl overflow-hidden border border-border">
                <img src={productImages[(selectedImage + 1) % productImages.length]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-card rounded-2xl overflow-hidden border border-border relative">
                <img src={productImages[(selectedImage + 2) % productImages.length]} alt="" className="w-full h-full object-cover" />
                {/* Sustainably Made badge */}
                <div className="absolute inset-0 bg-[hsl(var(--soft-sage))] flex items-center justify-center p-4">
                  <div className="text-white text-center">
                    <p className="text-xl font-bold tracking-wider">SUSTAINABLY</p>
                    <p className="text-xl font-bold tracking-wider">MADE</p>
                    <p className="text-xs mt-2 opacity-80">Mindfully sourced for a more sustainable future</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">{productName}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= 4 ? 'fill-amber-400 text-amber-400' : 'text-border fill-border'}`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">(4.7 {lang === 'ar' ? 'من' : 'from'} 125 {lang === 'ar' ? 'تقييم' : 'Reviews'})</span>
            </div>

            {/* Style Selector */}
            <div className="mb-5">
              <p className="text-sm text-muted-foreground mb-2">
                {lang === 'ar' ? 'اختر الستايل:' : 'Select Style:'} <span className="font-medium text-foreground">{styleOptions[selectedStyle].name}</span>
              </p>
              <div className="flex gap-2">
                {styleOptions.map((style, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedStyle(i); setSelectedImage(i); }}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${selectedStyle === i ? 'border-foreground' : 'border-border hover:border-muted-foreground'}`}
                  >
                    <img src={style.image} alt={style.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-card rounded-2xl border border-border p-5 mb-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{lang === 'ar' ? 'السعر الكلي' : 'Total Price'}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-foreground">{price} {lang === 'ar' ? 'ج.م' : 'Egp'}</span>
                    <span className="text-sm text-muted-foreground line-through">{oldPrice} {lang === 'ar' ? 'ج.م' : 'Egp'}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{lang === 'ar' ? 'الكمية' : 'Quantity'}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setQuantity(q => Math.max(0, q - 1))} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-base font-semibold w-6 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleAddToCart} className="flex-1 h-11 rounded-full border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                  {lang === 'ar' ? 'أضف للسلة' : 'Add To Cart'}
                </button>
                <button onClick={handleAddToCart} className="flex-1 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                  {lang === 'ar' ? 'اشترِ الآن' : 'Buy Now'}
                </button>
              </div>
            </div>

            {/* Features */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">{lang === 'ar' ? 'المميزات' : 'Features'}</p>
              <div className="grid grid-cols-4 gap-3">
                {features.map((f, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-1.5">
                    <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
                      <f.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] text-muted-foreground leading-tight">{lang === 'ar' ? f.ar : f.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="mb-12">
          <h2 className="text-lg font-bold text-foreground mb-4">{lang === 'ar' ? 'تفاصيل المنتج' : 'Product Details'}</h2>
          {/* Main Banner */}
          <div className="relative rounded-2xl overflow-hidden h-[260px] md:h-[320px] mb-4">
            <img src={productImages[1]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <span className="absolute top-4 end-4 px-3 py-1 bg-[hsl(var(--soft-sage))] text-white text-xs font-medium rounded-full">
              {lang === 'ar' ? 'جديد + محسّن' : 'New + Improved'}
            </span>
            <div className="absolute bottom-6 start-6 text-white">
              <p className="text-xs opacity-80 mb-1">97% Polyster</p>
              <p className="text-lg font-bold leading-snug">The best products for cute babies<br />find them and more..</p>
            </div>
          </div>
          {/* Two smaller banners */}
          <div className="grid grid-cols-2 gap-4">
            {[productImages[2], productImages[3]].map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden h-[180px] md:h-[220px]">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 start-4 text-white">
                  <p className="text-[10px] opacity-80 mb-0.5">97% Polyster</p>
                  <p className="text-sm font-bold leading-snug">The best products for cute babies<br />find them and more..</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-foreground">
                {lang === 'ar' ? 'التقييمات والمراجعات' : 'Rating & Reviews'} (234)
              </h2>
              <span className="text-xs text-muted-foreground">
                {lang === 'ar' ? 'يظهر 4 نتائج من إجمالي 20 مراجعة' : 'Showing 4 results from total 20 reviews'}
              </span>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              {lang === 'ar' ? 'فلترة حسب' : 'Filter By'} <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(showAllReviews ? reviews : reviews.slice(0, 4)).map((review, i) => (
              <div key={i} className="p-4 bg-card rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-foreground">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{review.name} <span className="text-xs font-normal text-muted-foreground">{review.date}</span></p>
                    <div className="flex">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-3 h-3 ${s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-border'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              {showAllReviews ? (lang === 'ar' ? 'عرض أقل' : 'View Less') : (lang === 'ar' ? 'عرض المزيد' : 'View More')}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAllReviews ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">{lang === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}</h2>
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <div key={p.id} className="bg-card rounded-2xl border border-border p-3 hover:shadow-md transition-shadow">
                <div className="aspect-square bg-background rounded-xl overflow-hidden mb-3">
                  <img src={p.image} alt={lang === 'ar' ? p.titleAr : p.title} className="w-full h-full object-contain p-4" />
                </div>
                <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1">{lang === 'ar' ? p.titleAr : p.title}</h3>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-base font-bold text-foreground">{p.price.toFixed(2)}<span className="text-[10px] text-muted-foreground">{lang === 'ar' ? 'ج.م' : 'Egp'}</span></span>
                  <span className="text-xs text-muted-foreground line-through">{p.oldPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-muted-foreground">{p.rating} ({p.reviews})</span>
                </div>
                <p className="text-[10px] text-destructive">
                  {lang === 'ar' ? `وفر ${p.discount}% حتى نفاد الكمية` : `Save ${p.discount}% till out of stock`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetailPage;
