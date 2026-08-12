import React, { useState } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { OrderModal } from './components/OrderModal';
import { SearchModal } from './components/SearchModal';
import { LegalModal } from './components/LegalModal';

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

function AppContent() {
  const { pageType, navigate } = useRouter();
  const [selectedSection, setSelectedSection] = useState('sheben');
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState('requisites');
  const [modalInitialData, setModalInitialData] = useState(null);

  const handleOpenOrder = (productData = {}) => {
    setModalInitialData(productData);
    setOrderModalOpen(true);
  };

  const handleOpenSearch = () => {
    setSearchModalOpen(true);
  };

  const handleOpenLegal = (tab = 'requisites') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
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

      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />
    </div>
  );
}

export function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
