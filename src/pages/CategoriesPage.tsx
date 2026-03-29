import { useLanguage } from '@/i18n/LanguageContext';
import { categoriesData, type CategoryItem } from '@/data/categoryData';
import PageLayout from '@/components/PageLayout';
import BreadcrumbNav from '@/components/Breadcrumb';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const CategorySection = ({ cat, lang }: { cat: CategoryItem; lang: string }) => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px] md:text-2xl font-bold text-foreground flex items-center gap-2">
          {lang === 'ar' ? cat.ar : cat.en}
          <span className="text-[14px] font-normal text-muted-foreground mt-1">
            ( {cat.children?.length || 0} {lang === 'ar' ? 'أقسام' : 'Categories'} )
          </span>
        </h2>
        <Link 
          to={`/categories/${cat.slug}`} 
          className="text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {lang === 'ar' ? 'عرض الكل' : 'View all'}
        </Link>
      </div>

      <Carousel 
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-4">
          {(cat.children || []).map((sub, idx) => (
            <CarouselItem key={sub.id} className="pl-4 basis-[85%] sm:basis-[45%] md:basis-[30%] lg:basis-[24%]">
              <Link
                to={`/categories/${cat.slug}/${sub.slug}`}
                className="group relative block overflow-hidden rounded-[32px] aspect-square transition-all duration-500 hover:shadow-xl"
              >
                <img
                  src={sub.image}
                  alt={lang === 'ar' ? sub.ar : sub.en}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="text-white text-[20px] md:text-[24px] font-bold text-center leading-tight drop-shadow-md">
                    {lang === 'ar' ? sub.ar : sub.en}
                  </h3>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Arrows - Bottom Right */}
        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={() => api?.scrollPrev()}
            className="w-11 h-11 rounded-full border border-[#ebded3] bg-white text-muted-foreground flex items-center justify-center hover:bg-[#f3eae1] hover:text-foreground transition-all shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => api?.scrollNext()}
            className="w-11 h-11 rounded-full border border-[#ebded3] bg-white text-muted-foreground flex items-center justify-center hover:bg-[#f3eae1] hover:text-foreground transition-all shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </Carousel>
      
      <div className="mt-8 border-b border-[#f3ede7]" />
    </section>
  );
};

const CategoriesPage = () => {
  const { lang } = useLanguage();

  const breadcrumbs = [
    { label: lang === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: lang === 'ar' ? 'الأقسام' : 'Categories' },
  ];

  return (
    <PageLayout>
      <div className="container py-2">
        <BreadcrumbNav items={breadcrumbs} />

        <h1 className="text-3xl font-bold text-foreground mb-10 mt-4 underline underline-offset-8 decoration-[#ebded3]">
          {lang === 'ar' ? 'الأقسام' : 'Categories'}
        </h1>

        {categoriesData.map((cat) => (
          <CategorySection key={cat.id} cat={cat} lang={lang} />
        ))}
      </div>
    </PageLayout>
  );
};

export default CategoriesPage;
