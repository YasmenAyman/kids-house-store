import { useParams, Navigate, Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { categoriesData } from '@/data/categoryData';
import PageLayout from '@/components/PageLayout';
import BreadcrumbNav from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { Star } from 'lucide-react';

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
  const { lang } = useLanguage();

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

  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = allProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

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

            <h3 className="text-base font-semibold text-foreground mb-4">
              {lang === 'ar' ? 'فلتر المنتجات' : 'Filter Products'}
            </h3>

            {/* Category Filter */}
            <div className="mb-4 border-b border-border pb-4">
              <button
                onClick={() => setCategoryFilterOpen(!categoryFilterOpen)}
                className="flex items-center justify-between w-full text-sm font-semibold text-foreground"
              >
                {lang === 'ar' ? 'القسم' : 'Category'}
                {categoryFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {categoryFilterOpen && (
                <div className="mt-3 space-y-1">
                  {categoriesData.map(cat => {
                    const catName = lang === 'ar' ? cat.ar : cat.en;
                    const isExpanded = expandedCategories.includes(cat.slug);
                    return (
                      <div key={cat.id}>
                        <button
                          onClick={() => toggleCategoryExpand(cat.slug)}
                          className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground py-1.5 transition-colors"
                        >
                          <span>{catName}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        {isExpanded && cat.children && (
                          <div className="ms-3 space-y-1 mt-1">
                            {cat.children.map(sub => {
                              const sName = lang === 'ar' ? sub.ar : sub.en;
                              const isSubExpanded = expandedCategories.includes(sub.slug);
                              return (
                                <div key={sub.id}>
                                  <button
                                    onClick={() => toggleCategoryExpand(sub.slug)}
                                    className="flex items-center justify-between w-full text-xs text-muted-foreground hover:text-foreground py-1 transition-colors"
                                  >
                                    <span className="flex items-center gap-1.5">
                                      <span className="w-3.5 h-3.5 border border-border rounded flex items-center justify-center">
                                        {selectedFilters.includes(sub.slug) && <span className="w-2 h-2 bg-foreground rounded-sm" />}
                                      </span>
                                      {sName} ({sub.children?.length || 0})
                                    </span>
                                    {sub.children && sub.children.length > 0 && (
                                      <ChevronDown className={`w-3 h-3 transition-transform ${isSubExpanded ? 'rotate-180' : ''}`} />
                                    )}
                                  </button>
                                  {isSubExpanded && sub.children && (
                                    <div className="ms-4 space-y-0.5 mt-1">
                                      {sub.children.map(subsub => {
                                        const ssName = lang === 'ar' ? subsub.ar : subsub.en;
                                        return (
                                          <button
                                            key={subsub.id}
                                            onClick={() => {
                                              setSelectedFilters(prev =>
                                                prev.includes(subsub.slug) ? prev.filter(f => f !== subsub.slug) : [...prev, subsub.slug]
                                              );
                                            }}
                                            className="flex items-center gap-1.5 w-full text-xs text-muted-foreground hover:text-foreground py-0.5"
                                          >
                                            <span className="w-3.5 h-3.5 border border-border rounded flex items-center justify-center">
                                              {selectedFilters.includes(subsub.slug) && <span className="w-2 h-2 bg-foreground rounded-sm" />}
                                            </span>
                                            {ssName}
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
            <div className="mb-4 border-b border-border pb-4">
              <button
                onClick={() => setPriceFilterOpen(!priceFilterOpen)}
                className="flex items-center justify-between w-full text-sm font-semibold text-foreground"
              >
                {lang === 'ar' ? 'السعر' : 'Price'}
                {priceFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {priceFilterOpen && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-3 py-1.5 border border-border rounded-full bg-card text-muted-foreground">
                      {priceRange[0]}{lang === 'ar' ? ' ج.م' : ' Egp'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-foreground"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0{lang === 'ar' ? ' ج.م' : ' Egp'}</span>
                    <span>10000{lang === 'ar' ? ' ج.م' : ' Egp'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Show & Clear */}
            <button className="w-full py-2.5 rounded-full bg-foreground text-background text-sm font-medium mb-2 hover:opacity-90 transition-opacity">
              {lang === 'ar' ? `عرض (${totalProducts})` : `show (${totalProducts})`}
            </button>
            <button
              onClick={() => {
                setSelectedFilters([]);
                setPriceRange([0, 10000]);
              }}
              className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {lang === 'ar' ? 'مسح الكل' : 'Clear All'}
            </button>
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
              {currentProducts.map((product) => (
                <div key={product.id} className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-md transition-shadow p-4 flex flex-col">
                  {/* Image */}
                  <div className="aspect-square w-full bg-background rounded-xl flex items-center justify-center mb-3 overflow-hidden">
                    <img
                      src={product.image}
                      alt={lang === 'ar' ? product.titleAr : product.title}
                      className="w-full h-full object-contain mix-blend-multiply p-4"
                    />
                  </div>
                  {/* Info */}
                  <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-2 leading-snug">
                    {lang === 'ar' ? product.titleAr : product.title}
                  </h3>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base font-bold text-foreground">
                      {product.price.toFixed(2)}<span className="text-xs font-normal text-muted-foreground ms-0.5">{lang === 'ar' ? 'ج.م' : 'Egp'}</span>
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {product.rating} ({product.reviews})
                    </div>
                  </div>
                  {product.oldPrice > product.price && (
                    <span className="text-xs text-muted-foreground line-through mb-1">
                      {product.oldPrice.toFixed(2)} {lang === 'ar' ? 'ج.م' : 'Egp'}
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-xs text-destructive mt-1">
                    <span className="w-3.5 h-3.5 rounded-full border border-destructive flex items-center justify-center text-[8px]">%</span>
                    {lang === 'ar' ? `وفر ${product.discount}% حتى نفاد الكمية` : `Save ${product.discount}% till out of stock`}
                  </div>
                </div>
              ))}
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
    </PageLayout>
  );
};

export default ProductsPage;
