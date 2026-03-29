import { useLanguage } from '@/i18n/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';
import PageLayout from '@/components/PageLayout';
import BreadcrumbNav from '@/components/Breadcrumb';
import ProductCard from '@/components/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { lang, t } = useLanguage();
  const { wishlistItems } = useWishlist();

  const breadcrumbs = [
    { label: lang === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: lang === 'ar' ? 'المفضلة' : 'Favorites' },
  ];

  return (
    <PageLayout>
      <div className="container py-2 pb-20">
        <BreadcrumbNav items={breadcrumbs} />

        <div className="flex items-center gap-2 mb-8 mt-4">
          <h1 className="text-3xl font-bold text-foreground">
            {lang === 'ar' ? 'المفضلة' : 'My Favorites'}
          </h1>
          <span className="text-muted-foreground text-sm mt-2">
            ({wishlistItems.length} {lang === 'ar' ? 'منتجات' : 'Products'})
          </span>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {lang === 'ar' ? 'قائمة المفضلة فارغة' : 'Your wishlist is empty'}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              {lang === 'ar' 
                ? 'يبدو أنك لم تضف أي منتج إلى مفضلتك بعد. ابدأ بالتسوق الآن وأضف بعض المنتجات!' 
                : "You haven't added any products to your wishlist yet. Start exploring our categories and find something you love!"}
            </p>
            <Link 
              to="/categories" 
              className="px-10 py-3.5 rounded-full bg-[#F3E7DB] text-gray-900 font-bold hover:brightness-95 transition-all"
            >
              {lang === 'ar' ? 'ابدأ التسوق' : 'Start Shopping'}
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default FavoritesPage;
