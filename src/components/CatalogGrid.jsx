import React, { useState } from 'react';
import { SHCHEDEN_PRODUCTS } from '../data/catalogData';
import { Check, ShoppingBag, ArrowRight, Info } from 'lucide-react';

export const CatalogGrid = ({ onOpenOrderModal }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Все виды' },
    { id: 'gravijnyj', label: 'Гравийный' },
    { id: 'granitnyj', label: 'Гранитный' },
    { id: 'izvestnyakovyj', label: 'Известняковый' },
    { id: 'vtorichnyj', label: 'Вторичный' },
    { id: 'promyshlennyj', label: 'Шлаковый / Доменный' },
    { id: 'kamen', label: 'Бутовый / Габионы' },
    { id: 'fasovka', label: 'В Биг-бегах' }
  ];

  const filteredProducts = selectedFilter === 'all'
    ? SHCHEDEN_PRODUCTS
    : SHCHEDEN_PRODUCTS.filter(p => p.category === selectedFilter);

  return (
    <section id="catalog" className="section catalog-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Виды щебня</h2>
          <p className="section-subtitle">
            В наличии все фракции и марки прочности по ГОСТ 8267-93. 
            Прямые поставки с перевалок Москвы и карьеров Московской области.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="filter-pills-bar">
          {filters.map(f => (
            <button
              key={f.id}
              className={`filter-pill ${selectedFilter === f.id ? 'active' : ''}`}
              onClick={() => setSelectedFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="pc-image-holder">
                <img src={product.image} alt={product.name} className="pc-img" loading="lazy" />
                {product.popular && (
                  <span className="pc-popular-badge">Популярное</span>
                )}
              </div>

              <div className="pc-body">
                <h3 className="pc-title">{product.name}</h3>

                <div className="pc-price-tag">
                  <span className="price-prefix">от</span>
                  <span className="price-num">{product.price.toLocaleString('ru-RU')}</span>
                  <span className="price-unit">{product.priceUnit}</span>
                  <span className="price-m3">({product.priceM3} руб/м³)</span>
                </div>

                <div className="pc-specs">
                  <div className="spec-row">
                    <span className="spec-label">Прочность:</span>
                    <span className="spec-val">{product.strength}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Морозостойкость:</span>
                    <span className="spec-val">{product.frost}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">Фракции:</span>
                    <span className="spec-val">{product.fractions.slice(0, 2).join(', ')}...</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenOrderModal(product)}
                  className="btn btn-primary btn-block pc-btn"
                >
                  <span>Заказать</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .catalog-section {
          background-color: #ffffff;
        }

        .filter-pills-bar {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 36px;
          scrollbar-width: thin;
        }

        .filter-pill {
          padding: 8px 18px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #4b5563;
          background: #f3f4f6;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .filter-pill:hover {
          background: #e5e7eb;
          color: #111827;
        }

        .filter-pill.active {
          background: var(--c-green);
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(133, 180, 42, 0.35);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        .product-card {
          background: #ffffff;
          border: 1px solid #eef0f2;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.09);
          border-color: #d1d5db;
        }

        .pc-image-holder {
          position: relative;
          height: 180px;
          background: #f8fafc;
          overflow: hidden;
        }

        .pc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .pc-img {
          transform: scale(1.06);
        }

        .pc-popular-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #e11d48;
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .pc-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .pc-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .pc-price-tag {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }

        .price-prefix {
          font-size: 0.85rem;
          color: #6b7280;
        }

        .price-num {
          font-size: 1.35rem;
          font-weight: 800;
          color: #80A541;
        }

        .price-unit {
          font-size: 0.85rem;
          font-weight: 600;
          color: #80A541;
        }

        .price-m3 {
          font-size: 0.78rem;
          color: #9ca3af;
          margin-left: 4px;
        }

        .pc-specs {
          border-top: 1px dashed #e5e7eb;
          padding-top: 12px;
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.82rem;
          flex: 1;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          color: #4b5563;
        }

        .spec-val {
          font-weight: 600;
          color: #1f2937;
        }

        .pc-btn {
          margin-top: auto;
          font-size: 0.92rem;
          padding: 10px 16px;
        }

        @media (max-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 860px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 520px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
