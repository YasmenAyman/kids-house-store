import { useLanguage } from '@/i18n/LanguageContext';
import { categoriesData } from '@/data/categoryData';
import PageLayout from '@/components/PageLayout';
import BreadcrumbNav from '@/components/Breadcrumb';
import CategoryCard from '@/components/CategoryCard';

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

        <h1 className="text-2xl font-bold text-foreground mb-2">
          {lang === 'ar' ? 'الأقسام' : 'Categories'}
          <span className="text-sm font-normal text-muted-foreground ms-2">
            ( {categoriesData.length} {lang === 'ar' ? 'أقسام' : 'Categories'} )
          </span>
        </h1>

        {categoriesData.map((cat) => (
          <section key={cat.id} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">
                {lang === 'ar' ? cat.ar : cat.en}
                <span className="text-sm font-normal text-muted-foreground ms-2">
                  ( {cat.children?.length || 0} {lang === 'ar' ? 'أقسام' : 'Categories'} )
                </span>
              </h2>
              <a href={`/categories/${cat.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors underline">
                {lang === 'ar' ? 'عرض الكل' : 'View all'}
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(cat.children || []).slice(0, 4).map((sub, idx) => (
                <CategoryCard
                  key={sub.id}
                  slug={sub.slug}
                  en={sub.en}
                  ar={sub.ar}
                  image={sub.image}
                  linkTo={`/categories/${cat.slug}/${sub.slug}`}
                  index={idx}
                />
              ))}
            </div>

            <div className="mt-4 border-b border-border" />
          </section>
        ))}
      </div>
    </PageLayout>
  );
};

export default CategoriesPage;
