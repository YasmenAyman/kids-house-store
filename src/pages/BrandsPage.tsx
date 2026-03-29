import { useState, useMemo } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import PageLayout from '@/components/PageLayout';
import BreadcrumbNav from '@/components/Breadcrumb';
import { brands } from '@/data/mockData';
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react';

const BrandsPage = () => {
  const { lang, t } = useLanguage();
  const [sortBy, setSortBy] = useState('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [typeFilterOpen, setTypeFilterOpen] = useState(true);
  const [priceFilterOpen, setPriceFilterOpen] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const breadcrumbs = [
    { label: lang === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: lang === 'ar' ? 'البراندات' : 'Brands' },
  ];

  const sortOptions = [
    { value: 'newest', en: 'Newest', ar: 'الأحدث' },
    { value: 'az', en: 'A-Z', ar: 'أ-ي' },
    { value: 'za', en: 'Z-A', ar: 'ي-أ' },
  ];

  const currentSort = sortOptions.find(s => s.value === sortBy);

  return (
    <PageLayout>
      <div className="container py-2">
        <BreadcrumbNav items={breadcrumbs} />

        {/* Brands Header Bar */}
        <div className="flex items-center gap-2 mb-8 py-4 border-b border-[#f3ede7]">
          <h1 className="text-2xl font-bold text-foreground">
            {lang === 'ar' ? 'البراندات' : 'Brands'}
          </h1>
          <span className="text-muted-foreground text-sm mt-1">
            ({brands.length} {lang === 'ar' ? 'محتوى' : 'Content'})
          </span>
        </div>

        <div className="flex gap-8 relative pb-20">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden fixed bottom-6 left-6 z-50 bg-foreground text-background px-6 py-4 rounded-full shadow-xl flex items-center gap-3 font-semibold"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {lang === 'ar' ? 'فلتر' : 'Filter'}
          </button>

          {/* Sidebar Filter */}
          <aside className={`
            ${mobileFilterOpen ? 'fixed inset-0 z-50 bg-background p-8 overflow-auto' : 'hidden'} 
            md:block md:w-[280px] md:shrink-0
          `}>
            {mobileFilterOpen && (
              <button onClick={() => setMobileFilterOpen(false)} className="md:hidden absolute top-6 end-6 p-2">
                <X className="w-6 h-6" />
              </button>
            )}

            <div className="bg-[#f9f7f5] rounded-[24px] p-6 border border-[#f3ede7]">
              <h3 className="text-xl font-bold text-foreground mb-6">
                {lang === 'ar' ? 'فلتر البراندات' : 'Filter Brands'}
              </h3>

              {/* Type Filter */}
              <div className="mb-4 bg-white rounded-[18px] border border-[#f3ede7] overflow-hidden">
                <button
                  onClick={() => setTypeFilterOpen(!typeFilterOpen)}
                  className="flex items-center justify-between w-full px-5 py-4 text-[16px] font-semibold text-foreground"
                >
                  {lang === 'ar' ? 'النوع' : 'Type'}
                  {typeFilterOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </button>
                {typeFilterOpen && (
                  <div className="px-5 pb-4 space-y-2">
                    {/* Filter options would go here */}
                    <div className="h-4" /> {/* Placeholder */}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="mb-6 bg-white rounded-[18px] border border-[#f3ede7] overflow-hidden">
                <button
                  onClick={() => setPriceFilterOpen(!priceFilterOpen)}
                  className="flex items-center justify-between w-full px-5 py-4 text-[16px] font-semibold text-foreground"
                >
                  {lang === 'ar' ? 'السعر' : 'Price'}
                  {priceFilterOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </button>
                {priceFilterOpen && (
                  <div className="px-5 pb-4">
                    <div className="h-4" /> {/* Placeholder */}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full py-4 rounded-full bg-[#f3eae1] text-foreground text-[16px] font-bold hover:bg-[#eaddce] transition-colors">
                  {lang === 'ar' ? `عرض (${brands.length})` : `show (${brands.length})`}
                </button>
                <button className="w-full py-4 rounded-full border border-[#ebded3] bg-transparent text-foreground text-[16px] font-semibold hover:bg-black/5 transition-colors">
                  {lang === 'ar' ? 'مسح الكل' : 'Clear All'}
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <p className="text-[#888] text-[15px]">
                {lang === 'ar'
                  ? `عرض 0 نتيجة من إجمالي ${brands.length} براند`
                  : `Showing 0 results from total ${brands.length} brands`}
              </p>
              
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-3 text-[15px] border border-[#f3ede7] rounded-xl px-5 py-2.5 bg-white hover:bg-muted transition-colors"
                >
                  <span className="text-[#888]">{lang === 'ar' ? 'ترتيب حسب:' : 'Sort by'}</span>
                  <span className="font-bold text-foreground">{lang === 'ar' ? currentSort?.ar : currentSort?.en}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
                {showSortDropdown && (
                  <div className="absolute top-full mt-2 end-0 bg-white border border-[#f3ede7] rounded-xl shadow-xl z-20 min-w-[200px] overflow-hidden">
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); }}
                        className={`block w-full text-start px-5 py-3.5 text-[15px] hover:bg-[#f9f7f5] transition-colors ${sortBy === opt.value ? 'text-foreground font-bold bg-[#f9f7f5]' : 'text-[#888]'}`}
                      >
                        {lang === 'ar' ? opt.ar : opt.en}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="group relative aspect-[4/3] rounded-[32px] overflow-hidden border border-[#f3ede7] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Background Image */}
                  <img
                    src={`/src/assets/${brand.bgImage}`}
                    alt={brand.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />

                  {/* Centered Logo Circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110 p-4">
                      <img
                        src={`/src/assets/${brand.logo}`}
                        alt={`${brand.name} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BrandsPage;
