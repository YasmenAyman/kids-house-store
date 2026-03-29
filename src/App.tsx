import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartModal from "@/components/CartModal";
import Index from "./pages/Index.tsx";
import CategoriesPage from "./pages/CategoriesPage.tsx";
import SubCategoriesPage from "./pages/SubCategoriesPage.tsx";
import SubSubCategoriesPage from "./pages/SubSubCategoriesPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import BrandsPage from "./pages/BrandsPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <WishlistProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <CartModal />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/categories/:categorySlug" element={<SubCategoriesPage />} />
                <Route path="/categories/:categorySlug/:subCategorySlug" element={<SubSubCategoriesPage />} />
                <Route path="/categories/:categorySlug/:subCategorySlug/:subSubCategorySlug" element={<ProductsPage />} />
                <Route path="/categories/:categorySlug/:subCategorySlug/:subSubCategorySlug/product/:productId" element={<ProductDetailPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </WishlistProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
