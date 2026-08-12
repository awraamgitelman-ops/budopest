import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { CatalogGrid } from './components/CatalogGrid';
import { Calculator } from './components/Calculator';
import { PriceTables } from './components/PriceTables';
import { PromoBanner } from './components/PromoBanner';
import { Advantages } from './components/Advantages';
import { Description } from './components/Description';
import { WarehouseMap } from './components/WarehouseMap';
import { Certificates } from './components/Certificates';
import { FAQ } from './components/FAQ';
import { OrderForm } from './components/OrderForm';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { SearchModal } from './components/SearchModal';
import { LegalModal } from './components/LegalModal';
import { MobileNav } from './components/MobileNav';

export function App() {
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
    handleOpenOrder(product);
  };

  return (
    <div className="app-wrapper">
      <Header
        onOpenOrderModal={handleOpenOrder}
        onOpenSearchModal={handleOpenSearch}
        onOpenLegalModal={handleOpenLegal}
      />

      <main>
        <Hero onOpenOrderModal={handleOpenOrder} />
        
        {/* Розділи продукції (Screenshot 1) */}
        <CategoryGrid
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
        />

        {/* Види та різновиди обраного розділу (Screenshot 2) */}
        <CatalogGrid
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
          onOpenOrderModal={handleOpenOrder}
        />

        <Calculator onOpenOrderModal={handleOpenOrder} />
        <PriceTables onOpenOrderModal={handleOpenOrder} />
        <PromoBanner onOpenOrderModal={handleOpenOrder} />
        <Advantages />
        <Description />
        <WarehouseMap onOpenOrderModal={handleOpenOrder} />
        <Certificates />
        <FAQ />
        <OrderForm />
      </main>

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

export default App;
