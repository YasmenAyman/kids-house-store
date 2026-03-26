import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { categoriesData } from '@/data/categoryData';
import PageLayout from '@/components/PageLayout';
import BreadcrumbNav from '@/components/Breadcrumb';
import CategoryCard from '@/components/CategoryCard';

const SubCategoriesPage = () => {
  const { categorySlug } = useParams();
  const { lang } = useLanguage();

  const category = categoriesData.find((c) => c.slug === categorySlug);
  if (!category) return <Navigate to="/categories" replace />;

  const name = lang === 'ar' ? category.ar : category.en;
  const children = category.children || [];

  const breadcrumbs = [
    { label: lang === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: lang === 'ar' ? 'الأقسام' : 'Categories', to: '/categories' },
    { label: name },
  ];

  return (
    <PageLayout>
      <div className="container py-2">
        <BreadcrumbNav items={breadcrumbs} />

        <h1 className="text-2xl font-bold text-foreground mb-6">
          {name}
          <span className="text-sm font-normal text-muted-foreground ms-2">
            ( {children.length} {lang === 'ar' ? 'أقسام' : 'Categories'} )
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {children.map((sub, idx) => (
            <CategoryCard
              key={sub.id}
              slug={sub.slug}
              en={sub.en}
              ar={sub.ar}
              image={sub.image}
              linkTo={`/categories/${categorySlug}/${sub.slug}`}
              index={idx}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default SubCategoriesPage;
