import React, { useState } from 'react';
import { PRICE_TABLES_DATA } from '../data/catalogData';
import { ShoppingBag } from 'lucide-react';

export const PriceTables = ({ onOpenOrderModal }) => {
  const [activeTab, setActiveTab] = useState('granitnyj');

  const tabs = [
    { id: 'granitnyj', label: 'Гранітний' },
    { id: 'shlakovyj', label: 'Шлаковий (Дніпро)' },
    { id: 'gravijnyj', label: 'Гравійний' },
    { id: 'vtorichnyj', label: 'Вторинний' }
  ];

  const currentCategory = PRICE_TABLES_DATA[activeTab] || PRICE_TABLES_DATA.granitnyj;

  return (
    <section id="prices" className="section price-tables-section">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-green mb-2">Прайс-лист 2026 (Дніпро)</div>
          <h2 className="section-title">Ціни на щебінь за куб і тонну у гривнях</h2>
          <p className="section-subtitle">
            Актуальні оптові та роздрібні ціни з урахуванням ПДВ 20%. Доставка розраховується з найближчого кар'єру або перевалочної бази.
          </p>
        </div>

        {/* Category Switcher */}
        <div className="price-tabs-bar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`price-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Price Table Card */}
        <div className="table-card">
          <div className="table-card-header">
            <h3 className="tch-title">{currentCategory.title}</h3>
            <span className="tch-badge">{currentCategory.badge}</span>
          </div>

          <div className="table-responsive">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Найменування</th>
                  <th>Міцність</th>
                  <th>Морозостійкість</th>
                  <th>Ціна за м³</th>
                  <th>Ціна за тонну</th>
                  <th className="text-right">Замовлення</th>
                </tr>
              </thead>
              <tbody>
                {currentCategory.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="item-name-cell">
                      <strong>{item.name}</strong>
                    </td>
                    <td><span className="spec-tag">{item.strength}</span></td>
                    <td><span className="spec-tag">{item.frost}</span></td>
                    <td className="price-cell">
                      <span className="price-val">від {item.priceM3.toLocaleString('uk-UA')} грн/м³</span>
                    </td>
                    <td className="price-cell">
                      <span className="price-val green">від {item.priceTon.toLocaleString('uk-UA')} грн/т</span>
                    </td>
                    <td className="action-cell text-right">
                      <button
                        onClick={() => onOpenOrderModal({
                          name: item.name,
                          priceStr: `від ${item.priceTon} грн/т`
                        })}
                        className="btn-table-order"
                        title="Оформити замовлення"
                      >
                        <ShoppingBag size={15} />
                        <span>Замовити</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .price-tables-section {
          background-color: #ffffff;
        }

        .price-tabs-bar {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .price-tab-btn {
          padding: 10px 22px;
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          font-weight: 700;
          color: #475569;
          background: #f1f5f9;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .price-tab-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .price-tab-btn.active {
          background: var(--c-green);
          color: #ffffff;
        }

        .table-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .table-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .tch-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
        }

        .tch-badge {
          font-size: 0.78rem;
          font-weight: 700;
          color: #475569;
          background: #e2e8f0;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .price-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.92rem;
        }

        .price-table th {
          background: #f8fafc;
          padding: 14px 20px;
          font-weight: 700;
          color: #64748b;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e2e8f0;
        }

        .price-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
          vertical-align: middle;
        }

        .price-table tr:hover td {
          background-color: #f8fafc;
        }

        .item-name-cell {
          font-size: 0.95rem;
          color: #0f172a;
          max-width: 320px;
        }

        .spec-tag {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .price-cell .price-val {
          font-weight: 700;
          color: #1e293b;
        }

        .price-cell .price-val.green {
          color: var(--c-green-dark);
          font-size: 1rem;
        }

        .text-right {
          text-align: right;
        }

        .btn-table-order {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          background: var(--c-green-light);
          color: var(--c-green-dark);
          border: 1px solid rgba(133, 180, 42, 0.4);
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 700;
          transition: all 0.15s;
        }

        .btn-table-order:hover {
          background: var(--c-green);
          color: #ffffff;
          border-color: var(--c-green);
        }

        @media (max-width: 768px) {
          .table-card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          .price-table th, .price-table td {
            padding: 12px 14px;
          }
        }
      `}</style>
    </section>
  );
};
