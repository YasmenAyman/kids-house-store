import Header from '@/components/Header';
import AnnouncementBar from '@/components/AnnouncementBar';
import HeroSection from '@/components/HeroSection';
import BrandCarousel from '@/components/BrandCarousel';
import CategoryGrid from '@/components/CategoryGrid';
import PromoDealSection from '@/components/PromoDealSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import FlashDeals from '@/components/FlashDeals';
import BannerGrid from '@/components/BannerGrid';
import NewProductsSection from '@/components/NewProductsSection';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <AnnouncementBar />
      <HeroSection />
      <BrandCarousel />
      <CategoryGrid />
      <PromoDealSection />
      <FeaturedProducts />
      <FlashDeals />
      <BannerGrid />
      <NewProductsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
