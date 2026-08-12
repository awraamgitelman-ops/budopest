import React from 'react';
import { Hero } from '../components/Hero';
import { CategoryGrid } from '../components/CategoryGrid';
import { CatalogGrid } from '../components/CatalogGrid';
import { Calculator } from '../components/Calculator';
import { PriceTables } from '../components/PriceTables';
import { PromoBanner } from '../components/PromoBanner';
import { Advantages } from '../components/Advantages';
import { Description } from '../components/Description';
import { WarehouseMap } from '../components/WarehouseMap';
import { Certificates } from '../components/Certificates';
import { FAQ } from '../components/FAQ';

export const HomePage = ({ selectedSection, onSelectSection, onOpenOrderModal }) => {
  return (
    <>
      <Hero onOpenOrderModal={handleOpenOrderWithFallback} />

      {/* 8 Main Catalog Sections */}
      <CategoryGrid
        selectedSection={selectedSection}
        onSelectSection={onSelectSection}
      />

      {/* Catalog items of the selected category */}
      <CatalogGrid
        selectedSection={selectedSection}
        onSelectSection={onSelectSection}
        onOpenOrderModal={onOpenOrderModal}
      />

      <Calculator onOpenOrderModal={onOpenOrderModal} />
      <PriceTables onOpenOrderModal={onOpenOrderModal} />
      <PromoBanner onOpenOrderModal={onOpenOrderModal} />
      <Advantages />
      <Description />
      <WarehouseMap onOpenOrderModal={onOpenOrderModal} />
      <Certificates />
      <FAQ />
    </>
  );

  function handleOpenOrderWithFallback(data) {
    if (onOpenOrderModal) {
      onOpenOrderModal(data);
    }
  }
};
