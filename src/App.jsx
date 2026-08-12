import React, { useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { OrderModal } from './components/OrderModal';
import { SearchModal } from './components/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CatalogSectionPage } from './pages/CatalogSectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PricesPage } from './pages/PricesPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { AboutPage } from './pages/AboutPage';
import { WarehousesPage } from './pages/WarehousesPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactsPage } from './pages/ContactsPage';
import { OrderPage } from './pages/OrderPage';
import { LegalPage } from './pages/LegalPage';

function AppContent() {
  const { pageType, navigate } = useRouter();
  const [selectedSection, setSelectedSection] = useState('sheben');
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState(null);

  const handleOpenOrder = (productData = {}) => {
    setModalInitialData(productData);
    setOrderModalOpen(true);
  };

  const handleOpenSearch = () => {
    setSearchModalOpen(true);
  };

  const handleOpenLegal = (tab = 'requisites') => {
    navigate(`#/legal/${tab}`);
  };

  const handleSelectProductFromSearch = (product) => {
    setSearchModalOpen(false);
    if (product && product.id) {
      navigate(`#/product/${product.id}`);
    } else {
      handleOpenOrder(product);
    }
  };

  const renderActivePage = () => {
    switch (pageType) {
      case 'catalog-section':
        return <CatalogSectionPage onOpenOrderModal={handleOpenOrder} />;
      case 'product-detail':
        return <ProductDetailPage onOpenOrderModal={handleOpenOrder} />;
      case 'prices':
        return <PricesPage onOpenOrderModal={handleOpenOrder} />;
      case 'calculator':
        return <CalculatorPage onOpenOrderModal={handleOpenOrder} />;
      case 'delivery':
        return <DeliveryPage onOpenOrderModal={handleOpenOrder} />;
      case 'services':
        return <ServicesPage onOpenOrderModal={handleOpenOrder} />;
      case 'service-detail':
        return <ServiceDetailPage onOpenOrderModal={handleOpenOrder} />;
      case 'about':
      case 'certificates':
        return <AboutPage onOpenOrderModal={handleOpenOrder} onOpenLegalModal={handleOpenLegal} />;
      case 'warehouses':
        return <WarehousesPage onOpenOrderModal={handleOpenOrder} />;
      case 'articles':
        return <ArticlesPage />;
      case 'article-detail':
        return <ArticleDetailPage onOpenOrderModal={handleOpenOrder} />;
      case 'contacts':
        return <ContactsPage onOpenLegalModal={handleOpenLegal} />;
      case 'order':
      case 'checkout':
        return <OrderPage onOpenLegalModal={handleOpenLegal} />;
      case 'legal':
        return <LegalPage onOpenOrderModal={handleOpenOrder} />;
      case 'home':
      default:
        return (
          <HomePage
            selectedSection={selectedSection}
            onSelectSection={setSelectedSection}
            onOpenOrderModal={handleOpenOrder}
          />
        );
    }
  };

  return (
    <div className="app-wrapper">
      <Header
        onOpenOrderModal={handleOpenOrder}
        onOpenSearchModal={handleOpenSearch}
        onOpenLegalModal={handleOpenLegal}
      />

      <Breadcrumbs />

      <main>{renderActivePage()}</main>

      <Footer
        onOpenLegalModal={handleOpenLegal}
      />

      <MobileNav
        onOpenOrderModal={handleOpenOrder}
        onOpenSearchModal={handleOpenSearch}
      />

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        initialData={modalInitialData}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={handleSelectProductFromSearch}
      />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
