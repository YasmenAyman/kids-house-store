import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { categoriesData } from '@/data/categoryData';
import PageLayout from '@/components/PageLayout';
import BreadcrumbNav from '@/components/Breadcrumb';
import CategoryCard from '@/components/CategoryCard';

const SubSubCategoriesPage = () => {
  const { categorySlug, subCategorySlug } = useParams();
  const { lang } = useLanguage();

  const parent = categoriesData.find((c) => c.slug === categorySlug);
  if (!parent) return <Navigate to="/categories" replace />;

  const subCategory = parent.children?.find((c) => c.slug === subCategorySlug);
  if (!subCategory) return <Navigate to={`/categories/${categorySlug}`} replace />;

  const parentName = lang === 'ar' ? parent.ar : parent.en;
  const subName = lang === 'ar' ? subCategory.ar : subCategory.en;
  const children = subCategory.children || [];

  const breadcrumbs = [
    { label: lang === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: lang === 'ar' ? 'الأقسام' : 'Categories', to: '/categories' },
    { label: parentName, to: `/categories/${categorySlug}` },
    { label: subName },
  ];

  return (
    <PageLayout>
      <div className="container py-2">
        <BreadcrumbNav items={breadcrumbs} />

        <h1 className="text-2xl font-bold text-foreground mb-6">
          {subName}
          <span className="text-sm font-normal text-muted-foreground ms-2">
            ( {children.length} {lang === 'ar' ? 'أقسام' : 'Categories'} )
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {children.map((item, idx) => (
            <CategoryCard
              key={item.id}
              slug={item.slug}
              en={item.en}
              ar={item.ar}
              image={item.image}
              linkTo={`/categories/${categorySlug}/${subCategorySlug}/${item.slug}`}
              index={idx}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default SubSubCategoriesPage;
