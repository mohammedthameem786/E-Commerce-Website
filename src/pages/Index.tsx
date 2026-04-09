import { lazy, Suspense } from 'react';
import { StoreProvider, useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toasts from '@/components/Toasts';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import CartPage from '@/pages/CartPage';
import WishlistPage from '@/pages/WishlistPage';
import OrderHistoryPage from '@/pages/OrderHistoryPage';

// Lazy load heavy pages for better performance
const LazyCheckout = lazy(() => import('@/pages/CheckoutPage'));
const LazyProductDetail = lazy(() => import('@/pages/ProductDetailPage'));

const PageLoader = () => <div style={{ padding: '100px 20px', textAlign: 'center', color: '#fff' }}>Loading...</div>;

const AppContent = () => {
  const { currentPage } = useStore();

  const pages: Record<string, JSX.Element> = {
    home: <HomePage />,
    products: <ProductsPage />,
    'product-detail': <Suspense fallback={<PageLoader />}><LazyProductDetail /></Suspense>,
    cart: <CartPage />,
    checkout: <Suspense fallback={<PageLoader />}><LazyCheckout /></Suspense>,
    wishlist: <WishlistPage />,
    'order-history': <OrderHistoryPage />,
  };

  return (
    <>
      <Navbar />
      <main>{pages[currentPage] || <HomePage />}</main>
      <Footer />
      <Toasts />
    </>
  );
};

const Index = () => (
  <StoreProvider>
    <AppContent />
  </StoreProvider>
);

export default Index;
