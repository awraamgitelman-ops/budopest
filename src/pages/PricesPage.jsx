import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { PRICE_TABLES_DATA } from '../data/catalogData';
import { FileText, Download, Phone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const PricesPage = ({ onOpenOrderModal }) => {
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState('granit');
  const [vatMode, setVatMode] = useState('with-vat'); // 'with-vat' or 'no-vat'

  const activeTable = PRICE_TABLES_DATA.find((t) => t.category === activeCategory) || PRICE_TABLES_DATA[0];

  return (
    <div className="prices-page-wrapper">
      {/* Header */}
      <div className="prices-hero">
        <div className="container">
          <div className="badge badge-green mb-2">Офіційний прайс-лист 2026</div>
          <h1 className="prices-hero-title">Ціни на щебінь, пісок та сипучі матеріали у Дніпрі</h1>
          <p className="prices-hero-subtitle">
            Гуртові та роздрібні ціни за тонну і кубічний метр з ПДВ та без ПДВ. Прямі поставки з Любимівського кар'єру та металургійних перевалок.
          </p>

          <div className="prices-vat-switcher">
            <span className="pvs-label">Форма розрахунку:</span>
            <div className="pvs-buttons">
              <button
                className={`pvs-btn ${vatMode === 'with-vat' ? 'active' : ''}`}
                onClick={() => setVatMode('with-vat')}
              >
                Безготівковий розрахунок з ПДВ 20% (ТОВ «БЕНГС»)
              </button>
              <button
                className={`pvs-btn ${vatMode === 'no-vat' ? 'active' : ''}`}
                onClick={() => setVatMode('no-vat')}
              >
                Без ПДВ / Готівковий розрахунок на ваговій
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        {/* Category Tabs */}
        <div className="price-cat-tabs">
          {PRICE_TABLES_DATA.map((t) => (
            <button
              key={t.category}
              className={`price-tab-btn ${t.category === activeCategory ? 'active' : ''}`}
              onClick={() => setActiveCategory(t.category)}
            >
              {t.title.replace('Ціни на категорію: ', '')}
            </button>
          ))}
        </div>

        {/* Active Price Table Card */}
        <div className="price-table-card">
          <div className="ptc-header">
            <div>
              <h2 className="ptc-title">{activeTable.title}</h2>
              <p className="ptc-subtitle">
                Відвантаження від 1 т на самовивіз або від 10 т самоскидами 10–40 т по Дніпру
              </p>
            </div>

            <button
              onClick={() => onOpenOrderModal({ name: `Запит офіційного прайсу: ${activeTable.title}` })}
              className="btn btn-primary"
            >
              <FileText size={16} />
              <span>Отримати комерційну пропозицію</span>
            </button>
          </div>

          <div className="table-responsive">
            <table className="custom-price-table">
              <thead>
                <tr>
                  <th>Найменування фракції</th>
                  <th>Марка міцності</th>
                  <th>Морозостійкість</th>
                  <th>Ціна за 1 тонну</th>
                  <th>Ціна за 1 м³</th>
                  <th>Дія</th>
                </tr>
              </thead>
              <tbody>
                {activeTable.items.map((row, idx) => {
                  const priceTonAdj = vatMode === 'with-vat' ? row.priceTon : Math.round(row.priceTon * 0.95);
                  const priceM3Adj = vatMode === 'with-vat' ? row.priceM3 : Math.round(row.priceM3 * 0.95);

                  return (
                    <tr key={idx}>
                      <td className="col-name">
                        <strong>{row.name}</strong>
                      </td>
                      <td>
                        <span className="spec-badge strength">{row.strength}</span>
                      </td>
                      <td>
                        <span className="spec-badge frost">{row.frost}</span>
                      </td>
                      <td className="col-price-ton">
                        <span className="price-val">{priceTonAdj}</span>
                        <span className="price-curr">грн/т</span>
                      </td>
                      <td className="col-price-m3">
                        <span className="price-val">{priceM3Adj}</span>
                        <span className="price-curr">грн/м³</span>
                      </td>
                      <td>
                        <button
                          onClick={() => onOpenOrderModal({ name: row.name, priceStr: `${priceTonAdj} грн/т` })}
                          className="btn btn-primary btn-sm"
                        >
                          Замовити
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="ptc-footer">
            <div className="ptc-disclaimer">
              <CheckCircle2 size={16} className="icon-green" />
              <span>
                Усі ціни вказані з урахуванням навантаження на автотранспорт. Вартість доставки самоскидом розраховується відповідно до кілометражу об'єкта.
              </span>
            </div>
          </div>
        </div>

        {/* Volume Discounts Noise / Grid */}
        <div className="volume-discount-grid mt-12">
          <div className="vd-card">
            <div className="vd-tier">Роздріб (10–30 тонн)</div>
            <div className="vd-desc">Базова ціна прайсу для приватного будівництва та невеликих об'єктів</div>
            <div className="vd-benefit">Доставка у день замовлення від 2 годин</div>
          </div>
          <div className="vd-card highlight">
            <div className="vd-tier">Опт (30–150 тонн)</div>
            <div className="vd-desc">Знижка до 5–7% від обсягу для будівельних підрядників</div>
            <div className="vd-benefit">Пріоритетне вікно навантаження на вагах</div>
          </div>
          <div className="vd-card">
            <div className="vd-tier">Великий Опт (від 150 тонн)</div>
            <div className="vd-desc">Індивідуальний розрахунок тарифу з фіксацією ціни в договорі поставки</div>
            <div className="vd-benefit">Персональний менеджер логістики 24/7</div>
          </div>
        </div>
      </div>

      <style>{`
        .prices-page-wrapper {
          background: #ffffff;
        }

        .prices-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 50px 0 40px;
        }

        .prices-hero-title {
          font-size: 2.3rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 12px;
          line-height: 1.2;
        }

        .prices-hero-subtitle {
          font-size: 1.05rem;
          color: #cbd5e1;
          max-width: 800px;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .prices-vat-switcher {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255, 255, 255, 0.08);
          padding: 10px 16px;
          border-radius: 8px;
          width: fit-content;
          border: 1px solid rgba(255, 255, 255, 0.12);
          flex-wrap: wrap;
        }

        .pvs-label {
          font-size: 0.82rem;
          color: #94a3b8;
          font-weight: 600;
        }

        .pvs-buttons {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pvs-btn {
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #cbd5e1;
          cursor: pointer;
          transition: all 0.15s;
        }

        .pvs-btn.active {
          background: var(--c-green);
          color: #ffffff;
          border-color: var(--c-green);
        }

        .price-cat-tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          margin-bottom: 24px;
          padding-bottom: 4px;
        }

        .price-tab-btn {
          padding: 10px 20px;
          border: 1.5px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.92rem;
          font-weight: 700;
          color: #334155;
          background: #ffffff;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }

        .price-tab-btn:hover {
          border-color: var(--c-green);
          color: #0f172a;
        }

        .price-tab-btn.active {
          background: var(--c-green);
          color: #ffffff;
          border-color: var(--c-green);
          box-shadow: 0 4px 12px rgba(133, 180, 42, 0.2);
        }

        .price-table-card {
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-lg);
          background: #ffffff;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }

        .ptc-header {
          padding: 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fafc;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ptc-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 4px;
        }

        .ptc-subtitle {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .custom-price-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .custom-price-table th {
          background: #f1f5f9;
          padding: 12px 18px;
          font-size: 0.82rem;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1.5px solid #e2e8f0;
        }

        .custom-price-table td {
          padding: 14px 18px;
          border-bottom: 1px solid #f1f5f9;
          font-size: 0.92rem;
          color: #334155;
        }

        .custom-price-table tr:hover td {
          background: #f8fafc;
        }

        .spec-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.78rem;
          font-weight: 700;
        }

        .spec-badge.strength {
          background: #e0f2fe;
          color: #0369a1;
        }

        .spec-badge.frost {
          background: #f1f5f9;
          color: #475569;
        }

        .col-price-ton, .col-price-m3 {
          white-space: nowrap;
        }

        .price-val {
          font-size: 1.15rem;
          font-weight: 900;
          color: var(--c-green-dark);
        }

        .price-curr {
          font-size: 0.8rem;
          color: #64748b;
          margin-left: 4px;
        }

        .ptc-footer {
          padding: 16px 24px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .ptc-disclaimer {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #64748b;
        }

        .volume-discount-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .vd-card {
          border: 1.5px solid #e2e8f0;
          border-radius: var(--radius-md);
          padding: 24px;
          background: #ffffff;
        }

        .vd-card.highlight {
          border-color: var(--c-green);
          background: var(--c-green-light);
        }

        .vd-tier {
          font-size: 1.1rem;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .vd-desc {
          font-size: 0.85rem;
          color: #475569;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        .vd-benefit {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--c-green-dark);
        }

        @media (max-width: 900px) {
          .volume-discount-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
