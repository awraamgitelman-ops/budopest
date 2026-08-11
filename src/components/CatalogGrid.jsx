import React from 'react';
import { ALL_PRODUCTS, MAIN_SECTIONS } from '../data/catalogData';
import { CheckCircle, ShieldCheck, ArrowRight, Truck } from 'lucide-react';

export const CatalogGrid = ({ selectedSection, onSelectSection, onOpenOrderModal }) => {
  // Filter products by selected section (defaults to 'sheben' or all)
  const currentSection = MAIN_SECTIONS.find(s => s.id === selectedSection) || MAIN_SECTIONS[1];
  const filteredProducts = ALL_PRODUCTS.filter(p => p.sectionId === selectedSection);

  return (
    <section id="catalog-items" className="section catalog-grid-section">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-green mb-2">
            <span>Види та різновиди продукції</span>
          </div>
          <h2 className="section-title">
            {selectedSection === 'sheben' ? 'Види щебеню' : `Види продукції: ${currentSection.name}`}
          </h2>
          <p className="section-subtitle">
            Широкий вибір фракцій та марок матеріалу з прямим завантаженням на кар'єрах та перевалочних базах у Дніпрі.
          </p>
        </div>

        {/* Section Tabs Selector */}
        <div className="catalog-tabs-bar">
          {MAIN_SECTIONS.map((sec) => {
            const isActive = sec.id === selectedSection;
            return (
              <button
                key={sec.id}
                className={`catalog-tab-chip ${isActive ? 'active' : ''}`}
                onClick={() => onSelectSection(sec.id)}
              >
                <span>{sec.name}</span>
                <span className="tab-count">({sec.itemsCount})</span>
              </button>
            );
          })}
        </div>

        {/* 4-column Varieties Cards Grid (as in Screenshot 2) */}
        <div className="catalog-products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card-v2">
              <div className="pc-v2-img-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="pc-v2-img"
                  loading="lazy"
                />
                {product.popular && (
                  <span className="pc-v2-pop-badge">Популярне</span>
                )}
              </div>

              <div className="pc-v2-body">
                <h3 className="pc-v2-title">{product.name}</h3>

                <div className="pc-v2-pricing">
                  <span className="pc-v2-price-val">від {product.price} {product.priceUnit}</span>
                  {product.priceM3 && (
                    <span className="pc-v2-price-m3">({product.priceM3} грн/м³)</span>
                  )}
                </div>

                {/* Specs / Fractions preview */}
                <div className="pc-v2-specs">
                  {product.fractions && (
                    <div className="pc-v2-spec-row">
                      <span className="spec-label">Фракції:</span>
                      <span className="spec-val">{product.fractions.slice(0, 3).join(', ')}{product.fractions.length > 3 ? '...' : ''}</span>
                    </div>
                  )}
                  {product.strength && (
                    <div className="pc-v2-spec-row">
                      <span className="spec-label">Міцність:</span>
                      <span className="spec-val">{product.strength}</span>
                    </div>
                  )}
                </div>

                <p className="pc-v2-desc">{product.description}</p>

                <div className="pc-v2-actions">
                  <button
                    type="button"
                    className="pc-v2-order-btn"
                    onClick={() => onOpenOrderModal({
                      id: product.id,
                      name: `${product.name} (${currentSection.name})`,
                      price: product.price,
                      priceUnit: product.priceUnit
                    })}
                  >
                    <span>Замовити / Перейти</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner inside Catalog */}
        <div className="catalog-bottom-note">
          <div className="cbn-left">
            <Truck size={24} className="cbn-icon" />
            <div>
              <strong>Потрібна інша рідкісна фракція чи специфікація?</strong>
              <p>Підберемо будь-який гранулометричний склад під ваш проєкт та доставимо по Дніпру самоскидами від 10 до 40 тонн.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenOrderModal({ name: `Індивідуальний підбір фракції (${currentSection.name})` })}
            className="btn btn-primary"
          >
            <span>Отримати консультацію</span>
          </button>
        </div>
      </div>

      <style>{`
        .catalog-grid-section {
          background-color: #ffffff;
          padding: 40px 0 60px;
        }

        .catalog-tabs-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 16px;
          margin-bottom: 28px;
          scrollbar-width: thin;
        }

        .catalog-tab-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 30px;
          background: #f1f5f9;
          color: #334155;
          font-size: 0.9rem;
          font-weight: 700;
          border: 1px solid #e2e8f0;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.2s;
        }

        .catalog-tab-chip:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .catalog-tab-chip.active {
          background: var(--c-green);
          color: #ffffff;
          border-color: var(--c-green);
          box-shadow: 0 4px 12px rgba(133, 180, 42, 0.35);
        }

        .tab-count {
          font-size: 0.78rem;
          opacity: 0.85;
        }

        /* 4-column Grid matching Screenshot 2 */
        .catalog-products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .product-card-v2 {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.22s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .product-card-v2:hover {
          border-color: var(--c-green);
          transform: translateY(-3px);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
        }

        .pc-v2-img-wrap {
          position: relative;
          width: 100%;
          height: 160px;
          background: #f8fafc;
          overflow: hidden;
        }

        .pc-v2-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card-v2:hover .pc-v2-img {
          transform: scale(1.06);
        }

        .pc-v2-pop-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #80A541;
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 4px;
        }

        .pc-v2-body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .pc-v2-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
          line-height: 1.25;
        }

        .pc-v2-pricing {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 10px;
        }

        .pc-v2-price-val {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--c-green-dark);
        }

        .pc-v2-price-m3 {
          font-size: 0.8rem;
          color: #64748b;
        }

        .pc-v2-specs {
          background: #f8fafc;
          padding: 8px 10px;
          border-radius: 6px;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .pc-v2-spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
        }

        .spec-label {
          color: #64748b;
        }

        .spec-val {
          color: #1e293b;
          font-weight: 600;
        }

        .pc-v2-desc {
          font-size: 0.8rem;
          color: #475569;
          line-height: 1.35;
          margin-bottom: 14px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .pc-v2-actions {
          margin-top: auto;
        }

        .pc-v2-order-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 9px 12px;
          background: #e6f4d0;
          color: #446e16;
          border: 1px solid #cde8a5;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.18s;
        }

        .pc-v2-order-btn:hover {
          background: var(--c-green);
          color: #ffffff;
          border-color: var(--c-green);
        }

        .catalog-bottom-note {
          margin-top: 36px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .cbn-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cbn-icon {
          color: var(--c-green);
          flex-shrink: 0;
        }

        .cbn-left strong {
          display: block;
          font-size: 1rem;
          color: #0f172a;
          margin-bottom: 2px;
        }

        .cbn-left p {
          font-size: 0.85rem;
          color: #475569;
          margin: 0;
        }

        @media (max-width: 1100px) {
          .catalog-products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .catalog-products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .catalog-bottom-note {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
          .cbn-left {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .catalog-products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
