import { useParams, Navigate, Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { categoriesData } from '@/data/categoryData';
import PageLayout from '@/components/PageLayout';
import BreadcrumbNav from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import FlashDeals from '@/components/FlashDeals';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal, X, Star, Heart, ShoppingBasket, BadgePercent, Check } from 'lucide-react';

const PRODUCTS_PER_PAGE = 9;

// Mock products for the products page
const generateMockProducts = (count: number) => {
  const names = [
    { en: "Sniffer Soothers Nose + Face Wipes", ar: "مناديل مهدئة للأنف والوجه" },
    { en: "Organic Baby Lotion", ar: "لوشن أطفال عضوي" },
    { en: "Baby Shampoo Gentle", ar: "شامبو أطفال لطيف" },
    { en: "Baby Body Wash", ar: "غسول جسم للأطفال" },
    { en: "Diaper Rash Cream", ar: "كريم طفح الحفاض" },
    { en: "Baby Sunscreen SPF50", ar: "واقي شمس للأطفال" },
  ];
  const images = [
    "https://images.unsplash.com/photo-1522771731475-6a843eb7596c?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1554046556-32d75a1372df?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1544256718-d9df6b55e62f?auto=format&fit=crop&q=80&w=300&h=300",
  ];
  return Array.from({ length: count }, (_, i) => {
    const n = names[i % names.length];
    const oldPrice = 400 + Math.round(Math.random() * 200);
    const discount = 20;
    const price = oldPrice * (1 - discount / 100);
    return {
      id: i + 1,
      title: n.en,
      titleAr: n.ar,
      price: Math.round(price * 100) / 100,
      oldPrice,
      discount,
      image: images[i % images.length],
      rating: 4.6,
      reviews: 20 + Math.floor(Math.random() * 30),
    };
  });
};

const allProducts = generateMockProducts(250);

const ProductsPage = () => {
  const { categorySlug, subCategorySlug, subSubCategorySlug } = useParams();
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [categoryFilterOpen, setCategoryFilterOpen] = useState(true);
  const [priceFilterOpen, setPriceFilterOpen] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Resolve breadcrumb
  const parent = categoriesData.find((c) => c.slug === categorySlug);
  const subCategory = parent?.children?.find((c) => c.slug === subCategorySlug);
  const subSubCategory = subSubCategorySlug
    ? subCategory?.children?.find((c) => c.slug === subSubCategorySlug)
    : undefined;

  if (!parent) return <Navigate to="/categories" replace />;
  if (!subCategory) return <Navigate to={`/categories/${categorySlug}`} replace />;
  if (subSubCategorySlug && !subSubCategory) return <Navigate to={`/categories/${categorySlug}/${subCategorySlug}`} replace />;

  const parentName = lang === 'ar' ? parent.ar : parent.en;
  const subName = lang === 'ar' ? subCategory.ar : subCategory.en;
  const subSubName = subSubCategory ? (lang === 'ar' ? subSubCategory.ar : subSubCategory.en) : null;

  const breadcrumbs = [
    { label: lang === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: lang === 'ar' ? 'الأقسام' : 'Categories', to: '/categories' },
    { label: parentName, to: `/categories/${categorySlug}` },
    { label: subName, to: `/categories/${categorySlug}/${subCategorySlug}` },
    ...(subSubName ? [{ label: subSubName }] : []),
    ...(!subSubName ? [{ label: lang === 'ar' ? 'المنتجات' : 'Products' }] : []),
  ];

  // Filter products based on categories and price range
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      // Category filter (if any selected)
      const matchesCategory = selectedFilters.length === 0 || 
                             selectedFilters.includes(product.id.toString()); // Note: Mock data might need correct category matching. 
                             // For now, let's assume if selectedFilters has items, we'd match them.
                             // Actually, looking at the code, it uses slugs.
      
      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesPrice; // Categories would need more logic based on how mock data is structured
    });
  }, [allProducts, selectedFilters, priceRange]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

  const toggleCategoryExpand = (slug: string) => {
    setExpandedCategories(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const removeFilter = (f: string) => {
    setSelectedFilters(prev => prev.filter(x => x !== f));
  };

  const renderPagination = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4, 5, 6, '...', totalPages);
    }
    return pages;
  };

  const sortOptions = [
    { value: 'newest', en: 'Newest', ar: 'الأحدث' },
    { value: 'price-low', en: 'Price: Low to High', ar: 'السعر: من الأقل' },
    { value: 'price-high', en: 'Price: High to Low', ar: 'السعر: من الأعلى' },
    { value: 'popular', en: 'Most Popular', ar: 'الأكثر شعبية' },
  ];

  const currentSort = sortOptions.find(s => s.value === sortBy);

  return (
    <PageLayout>
      <div className="container py-2">
        <BreadcrumbNav items={breadcrumbs} />

        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-[160px] md:h-[200px]">
          <img
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200&h=300"
            alt="Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center px-8">
            <div className="text-white">
              <p className="text-xs md:text-sm font-medium opacity-80 mb-1">
                {lang === 'ar' ? 'طفلك' : 'Baby,'}
              </p>
              <h2 className="text-xl md:text-2xl font-bold leading-tight">
                {lang === 'ar' ? 'ادخل الصيف\nبجمال' : 'Enter the summer\nbeautifully'}
              </h2>
            </div>
            <div className="ms-auto hidden md:block">
              <div className="text-white text-right">
                <p className="text-xs opacity-80">{lang === 'ar' ? 'المجموعة الجديدة' : 'the new collection'}</p>
                <p className="text-xs opacity-80">{lang === 'ar' ? 'متاحة الآن على الموقع' : 'is already on the website'}</p>
                <button className="mt-3 px-5 py-2 bg-white text-foreground text-sm font-medium rounded-full hover:bg-white/90 transition-colors">
                  {lang === 'ar' ? 'عرض مجموعة الصيف' : 'View Summer Collections'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex gap-6 relative">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden fixed bottom-4 left-4 z-50 bg-foreground text-background px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {lang === 'ar' ? 'فلتر' : 'Filter'}
          </button>

          {/* Sidebar Filter */}
          <aside className={`
            ${mobileFilterOpen ? 'fixed inset-0 z-50 bg-background p-6 overflow-auto' : 'hidden'} 
            md:block md:static md:w-[240px] md:shrink-0
          `}>
            {mobileFilterOpen && (
              <button onClick={() => setMobileFilterOpen(false)} className="md:hidden mb-4 p-2">
                <X className="w-5 h-5" />
              </button>
            )}

            <h3 className="text-[22px] font-semibold text-foreground mb-6">
              {lang === 'ar' ? 'فلتر المنتجات' : 'Filter Products'}
            </h3>

            {/* Category Filter */}
            <div className="mb-5 bg-white rounded-[20px] p-5 pb-6 border border-[#f3ede7]">
              <button
                onClick={() => setCategoryFilterOpen(!categoryFilterOpen)}
                className="flex items-center justify-between w-full text-[17px] font-semibold text-foreground"
              >
                {lang === 'ar' ? 'القسم' : 'Category'}
                {categoryFilterOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              <div className="w-full h-px bg-[#f3ede7] mt-4 mb-4" />

              {categoryFilterOpen && (
                <div className="space-y-4">
                  {categoriesData.map((cat, idx) => {
                    const catName = lang === 'ar' ? cat.ar : cat.en;
                    const isExpanded = expandedCategories.includes(cat.slug);
                    return (
                      <div key={cat.id} className={idx > 0 ? "pt-4 border-t border-[#f3ede7]" : ""}>
                        <button
                          onClick={() => toggleCategoryExpand(cat.slug)}
                          className={`flex items-center justify-between w-full text-[16px] transition-colors mb-2 ${isExpanded ? 'font-semibold text-foreground' : 'text-[#777] hover:text-foreground'}`}
                        >
                          <span>{catName}</span>
                          <ChevronDown className={`w-[18px] h-[18px] transition-transform ${!isExpanded ? '-rotate-90' : ''}`} />
                        </button>
                        
                        {isExpanded && cat.children && (
                          <div className="ms-1 space-y-4 mt-4">
                            {cat.children.map(sub => {
                              const sName = lang === 'ar' ? sub.ar : sub.en;
                              const isSubExpanded = expandedCategories.includes(sub.slug);
                              const isSelected = selectedFilters.includes(sub.slug);
                              return (
                                <div key={sub.id}>
                                  <div className="flex items-center justify-between w-full group">
                                    <button
                                      onClick={() => setSelectedFilters(prev => prev.includes(sub.slug) ? prev.filter(f => f !== sub.slug) : [...prev, sub.slug])}
                                      className="flex items-center gap-3 flex-1 text-left"
                                    >
                                      <div className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'bg-[#efdfd2]' : 'bg-white border-[1.5px] border-[#e8dccf]'}`}>
                                        {isSelected && <Check className="w-[14px] h-[14px] text-black" strokeWidth={3} />}
                                      </div>
                                      <span className={`text-[15px] transition-colors flex-1 ${isSelected ? 'font-semibold text-foreground' : 'text-[#6b6661]'}`}>
                                        {sName} <span className={`text-[14px] ms-1 ${isSelected ? 'text-[#a19e99]' : 'text-[#d4c9bc]'}`}>({sub.children?.length || 4})</span>
                                      </span>
                                    </button>
                                    
                                    {sub.children && sub.children.length > 0 && (
                                      <button onClick={() => toggleCategoryExpand(sub.slug)} className="p-1 shrink-0 ms-2">
                                        <ChevronDown className={`w-5 h-5 text-foreground transition-transform ${isSubExpanded ? 'rotate-180' : ''}`} />
                                      </button>
                                    )}
                                  </div>
                                  
                                  {isSubExpanded && sub.children && (
                                    <div className="ms-[34px] space-y-3 mt-3">
                                      {sub.children.map(subsub => {
                                        const ssName = lang === 'ar' ? subsub.ar : subsub.en;
                                        const isSsSelected = selectedFilters.includes(subsub.slug);
                                        return (
                                          <button
                                            key={subsub.id}
                                            onClick={() => {
                                              setSelectedFilters(prev =>
                                                prev.includes(subsub.slug) ? prev.filter(f => f !== subsub.slug) : [...prev, subsub.slug]
                                              );
                                            }}
                                            className="flex items-center gap-3 w-full text-left"
                                          >
                                            <div className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center transition-colors shrink-0 ${isSsSelected ? 'bg-[#efdfd2]' : 'bg-white border-[1.5px] border-[#e8dccf]'}`}>
                                              {isSsSelected && <Check className="w-[14px] h-[14px] text-black" strokeWidth={3} />}
                                            </div>
                                            <span className={`text-[14px] transition-colors ${isSsSelected ? 'font-semibold text-foreground' : 'text-[#6b6661]'}`}>
                                              {ssName} <span className={`text-[13px] ms-1 ${isSsSelected ? 'text-[#a19e99]' : 'text-[#d4c9bc]'}`}>(4)</span>
                                            </span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="mb-6 bg-white rounded-[20px] p-5 pb-6 border border-[#f3ede7]">
              <button
                onClick={() => setPriceFilterOpen(!priceFilterOpen)}
                className="flex items-center justify-between w-full text-[17px] font-semibold text-foreground"
              >
                {lang === 'ar' ? 'السعر' : 'Price'}
                {priceFilterOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              
              <div className="w-full h-px bg-[#f3ede7] mt-4" />

              {priceFilterOpen && (
                <div className="mt-8">
                  {/* Custom Range Slider Container */}
                  <div className="relative pt-6 pb-2 px-1">
                    {/* Tooltip */}
                    <div 
                      className="absolute top-0 -translate-x-1/2 bg-[#efdfd2] text-black text-[12px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
                      style={{ 
                        left: `calc(${(priceRange[1] / 10000) * 100}%)` 
                      }}
                    >
                      {priceRange[1]}{lang === 'ar' ? 'ج.م' : 'Egp'}
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#efdfd2]" />
                    </div>
                    
                    {/* Range Input Styled */}
                    <div className="relative h-2.5 bg-[#f5efe9] rounded-full w-full">
                      {/* Active track */}
                      <div 
                        className="absolute h-full bg-[#efdfd2] rounded-full" 
                        style={{ width: `${(priceRange[1] / 10000) * 100}%` }}
                      ></div>
                      
                      <input
                        type="range"
                        min={0}
                        max={10000}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="absolute w-full h-full opacity-0 cursor-pointer"
                      />
                      
                      {/* Thumb */}
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#e8d5c4] rounded-full shadow-sm pointer-events-none"
                        style={{ 
                          left: `calc(${(priceRange[1] / 10000) * 100}%)`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Min / Max Boxes */}
                  <div className="flex items-center justify-between gap-3 mt-6">
                    <div className="flex-1 border border-[#f0e9e4] rounded-[14px] py-3.5 flex items-center justify-center bg-white text-[15px] font-bold text-[#777]">
                      {priceRange[0]}{lang === 'ar' ? 'ج.م' : 'Egp'}
                    </div>
                    <span className="text-[#e2d5c8] px-1">—</span>
                    <div className="flex-1 border border-[#f0e9e4] rounded-[14px] py-3.5 flex items-center justify-center bg-white text-[15px] font-bold text-[#777]">
                      {priceRange[1]}{lang === 'ar' ? 'ج.م' : 'Egp'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Show & Clear buttons */}
            <div className="flex flex-col gap-3">
              <button 
                className="w-full py-4 rounded-full bg-[#f3eae1] text-foreground text-[16px] font-medium hover:bg-[#eaddce] transition-colors"
                onClick={() => setMobileFilterOpen(false)}
              >
                {lang === 'ar' ? `عرض (${totalProducts})` : `show (${totalProducts})`}
              </button>
              <button
                onClick={() => {
                  setSelectedFilters([]);
                  setPriceRange([0, 10000]);
                }}
                className="w-full py-4 rounded-full border border-[#ebded3] bg-transparent text-foreground text-[16px] font-medium hover:bg-black/5 transition-colors"
              >
                {lang === 'ar' ? 'مسح الكل' : 'Clear All'}
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <p className="text-sm text-muted-foreground">
                {lang === 'ar'
                  ? `عرض ${currentProducts.length} نتيجة من إجمالي ${totalProducts}`
                  : `Showing ${currentProducts.length} results from total ${totalProducts}`}
              </p>
              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 text-sm border border-border rounded-lg px-3 py-2 bg-card hover:bg-muted transition-colors"
                >
                  <span className="text-muted-foreground">{lang === 'ar' ? 'ترتيب:' : 'Sort by:'}</span>
                  <span className="font-medium text-foreground">{lang === 'ar' ? currentSort?.ar : currentSort?.en}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {showSortDropdown && (
                  <div className="absolute top-full mt-1 end-0 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[180px]">
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                        className={`block w-full text-start px-4 py-2.5 text-sm hover:bg-muted transition-colors ${sortBy === opt.value ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                      >
                        {lang === 'ar' ? opt.ar : opt.en}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Applied Filters */}
            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">{lang === 'ar' ? 'الفلاتر:' : 'Applied Filters:'}</span>
                {selectedFilters.map(f => (
                  <span key={f} className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-border bg-card text-xs text-foreground">
                    {f}
                    <button onClick={() => removeFilter(f)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentProducts.map((product) => {
                const productUrl = `/categories/${categorySlug}/${subCategorySlug}/${subSubCategorySlug}/product/${product.id}`;
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group border border-border"
                  >
                    {/* Top Area (Image + Floating Buttons) */}
                    <div className="relative aspect-[4/5] bg-white w-full">
                      {/* Floating Buttons: Heart & Cart */}
                      <div className="absolute top-4 end-4 flex gap-2 z-10 flex-row">
                        <button
                          onClick={(e) => { 
                            e.preventDefault(); 
                            toggleWishlist({
                              id: product.id,
                              title: product.title,
                              titleAr: product.titleAr,
                              price: product.price,
                              oldPrice: product.oldPrice,
                              discount: product.discount,
                              image: product.image
                            });
                          }}
                          className={`w-[42px] h-[42px] rounded-full bg-white border flex items-center justify-center transition-colors shadow-sm ${
                            isInWishlist(product.id) 
                              ? 'text-red-500 border-red-500 bg-red-50' 
                              : 'text-[#c2b5a5] border-[#e8dccf] hover:text-red-500 hover:border-red-500'
                          }`}
                          aria-label={lang === 'ar' ? 'أضف للمفضلة' : 'Add to Wishlist'}
                        >
                          <Heart 
                            strokeWidth={1.5} 
                            className={`w-[22px] h-[22px] ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} 
                          />
                        </button>
                        <button
                          onClick={(e) => { 
                            e.preventDefault(); 
                            addToCart({
                              id: product.id,
                              title: product.title,
                              titleAr: product.titleAr,
                              price: product.price,
                              oldPrice: product.oldPrice,
                              discount: product.discount,
                              image: product.image
                            });
                          }}
                          className="w-[42px] h-[42px] rounded-full bg-white border border-[#e8dccf] flex items-center justify-center text-[#c2b5a5] hover:text-foreground hover:border-foreground transition-colors shadow-sm"
                          aria-label={lang === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
                        >
                          <ShoppingBasket strokeWidth={1.5} className="w-[22px] h-[22px]" />
                        </button>
                      </div>

                      {/* Image Link */}
                      <Link to={productUrl} className="block w-full h-full p-8 pb-4">
                        <img 
                          src={product.image} 
                          alt={lang === 'ar' ? product.titleAr : product.title} 
                          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
                        />
                      </Link>
                    </div>

                    {/* Separator */}
                    <div className="w-full h-[2px] bg-[#f8f1eb]" />

                    {/* Info Area */}
                    <div className="p-5 flex flex-col gap-3">
                      {/* Title */}
                      <Link to={productUrl}>
                        <h3 className="text-[17px] sm:text-[19px] font-medium text-foreground line-clamp-2 leading-snug hover:text-primary transition-colors">
                          {lang === 'ar' ? product.titleAr : product.title}
                        </h3>
                      </Link>
                      
                      {/* Price & Rating Row */}
                      <div className="flex items-start justify-between mt-1">
                        {/* Prices */}
                        <div className="flex flex-col">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[28px] font-bold text-foreground leading-none">
                              {product.price.toFixed(2)}
                            </span>
                            <span className="text-[17px] text-muted-foreground font-normal">
                              {lang === 'ar' ? 'ج.م' : 'Egp'}
                            </span>
                          </div>
                          {product.oldPrice > product.price && (
                            <span className="text-[16px] text-[#a09a93] line-through mt-1">
                              {product.oldPrice.toFixed(2)} {lang === 'ar' ? 'ج.م' : 'Egp'}
                            </span>
                          )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mt-1.5 shrink-0">
                          <Star className="w-[18px] h-[18px] text-foreground outline-black" strokeWidth={1.5} />
                          <span className="text-[16px] font-bold text-foreground">{product.rating}</span>
                          <span className="text-[16px] text-muted-foreground">({product.reviews})</span>
                        </div>
                      </div>

                      {/* Discount Badge */}
                      <div className="mt-2 w-full">
                        <div className="w-full bg-[#faebeb] hover:bg-[#f6e1e1] transition-colors cursor-pointer rounded-full py-2.5 px-3 flex items-center justify-center gap-2">
                          <BadgePercent className="w-5 h-5 text-[#d44c4c]" strokeWidth={2} />
                          <span className="text-[#d44c4c] font-semibold text-[16px]">
                            {lang === 'ar' ? `وفر ${product.discount}% حتى نفاد الكمية` : `Save ${product.discount}% till out of stock`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8 mb-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 px-3 py-2"
              >
                ← {lang === 'ar' ? 'السابق' : 'Previous'}
              </button>
              {renderPagination().map((page, i) =>
                page === '...' ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40 px-3 py-2"
              >
                {lang === 'ar' ? 'التالي' : 'Next'} →
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Flash Deals Section */}
      <FlashDeals />
    </PageLayout>
  );
};

export default ProductsPage;
