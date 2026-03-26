import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { nestedCategories } from '@/data/mockData';
import { BadgeCheck, TrendingUp, Package, Plus } from 'lucide-react';

const NewProductsSection = () => {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('bestSeller');
  
  // Selection state for 3-level categories
  const [selectedCatId, setSelectedCatId] = useState(nestedCategories[0].id);
  const [selectedSubCatId, setSelectedSubCatId] = useState(nestedCategories[0].subcategories[0].id);
  const [selectedSubSubCat, setSelectedSubSubCat] = useState<string | null>(null);

  const filters = [
    { key: 'bestSeller', icon: BadgeCheck },
    { key: 'topRated', icon: TrendingUp },
    { key: 'newestProducts', icon: Package },
  ];

  const activeCategory = nestedCategories.find(c => c.id === selectedCatId) || nestedCategories[0];
  const activeSubcategory = activeCategory.subcategories.find(s => s.id === selectedSubCatId) || activeCategory.subcategories[0];

  const handleCategoryClick = (id: number) => {
    setSelectedCatId(id);
    const cat = nestedCategories.find(c => c.id === id);
    if (cat && cat.subcategories.length > 0) {
      setSelectedSubCatId(cat.subcategories[0].id);
      setSelectedSubSubCat(null);
    }
  };

  const handleSubCategoryClick = (id: number) => {
    setSelectedSubCatId(id);
    setSelectedSubSubCat(null);
  };

  // Dummy images for the 2x2 grid
  const gridImages = [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1522771731475-6a843eb7596c?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=300&h=300",
    "https://images.unsplash.com/photo-1596464716127-f2a82984bde4?auto=format&fit=crop&q=80&w=300&h=300",
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F4]">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="inline-block px-6 py-1.5 rounded-full border border-border bg-white text-xs font-medium text-foreground mb-6">
            {t('newArrivalsBadge')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#111111] max-w-3xl leading-tight">
            {t('newTitle')}
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#EBDDCC] text-foreground shadow-sm'
                    : 'bg-white text-muted-foreground border border-border hover:bg-accent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`} />
                {t(filter.key as any)}
              </button>
            );
          })}
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[40px] border border-[#F2EDE7] p-8 md:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Columns Navigation */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Column 1: Main Categories */}
              <div className="flex flex-col gap-4">
                {nestedCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all text-start ${
                      selectedCatId === cat.id
                        ? 'bg-[#F2EDE7] text-foreground'
                        : 'bg-transparent text-muted-foreground hover:bg-muted/30'
                    }`}
                  >
                    {lang === 'ar' ? cat.ar : cat.en}
                  </button>
                ))}
              </div>

              {/* Column 2: Subcategories */}
              <div className="flex flex-col gap-3">
                {activeCategory.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubCategoryClick(sub.id)}
                    className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-start ${
                      selectedSubCatId === sub.id
                        ? 'bg-[#F9F7F5] text-foreground border border-[#EBDDCC]'
                        : 'bg-white text-muted-foreground border border-transparent hover:border-border'
                    }`}
                  >
                    {selectedSubCatId !== sub.id && <Plus className="w-3.5 h-3.5 text-muted-foreground/60" />}
                    <span>{lang === 'ar' ? sub.ar : sub.en}</span>
                  </button>
                ))}
              </div>

              {/* Column 3: Sub-subcategories */}
              <div className="flex flex-col gap-3">
                {activeSubcategory.subSubcategories.map((subSub, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSubSubCat(subSub.en)}
                    className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-start ${
                      selectedSubSubCat === subSub.en
                        ? 'bg-[#F9F7F5] text-foreground border border-[#EBDDCC]'
                        : 'bg-white text-muted-foreground border border-transparent hover:border-border'
                    }`}
                  >
                    {selectedSubSubCat !== subSub.en && <Plus className="w-3.5 h-3.5 text-muted-foreground/60" />}
                    <span>{lang === 'ar' ? subSub.ar : subSub.en}</span>
                  </button>
                ))}
              </div>

            </div>

            {/* Right Side: Image Grid and Button */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden group">
                <div className="grid grid-cols-2 grid-rows-2 h-full gap-0.5 bg-border/20">
                  {gridImages.map((img, i) => (
                    <img key={i} src={img} alt="" className="w-full h-full object-cover" />
                  ))}
                </div>
                
                {/* Overlay Button */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 transition-opacity">
                  <button className="bg-[#111] hover:bg-black text-white px-8 py-3 rounded-2xl text-sm font-semibold transition-transform hover:scale-105">
                    {t('viewProducts')}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Explore Button */}
        <div className="mt-12 flex justify-center">
          <button className="px-12 py-4 rounded-full bg-[#EBDDCC] text-[#111] text-base font-semibold hover:bg-[#decbae] transition-colors shadow-sm">
            {t('exploreAll')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewProductsSection;
