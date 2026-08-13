import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { ALL_PRODUCTS, MAIN_SECTIONS, WAREHOUSES } from '../data/catalogData';
import { CheckCircle2, Truck, Scale, ShieldCheck, MapPin, Phone, ArrowLeft, ArrowRight, Calculator } from 'lucide-react';

export const ProductDetailPage = ({ onOpenOrderModal }) => {
  const { routeParams, navigate } = useRouter();
  const productId = routeParams.productId;

  const product = ALL_PRODUCTS.find((p) => p.id === productId) || ALL_PRODUCTS[0];
  const section = MAIN_SECTIONS.find((s) => s.id === product.sectionId) || MAIN_SECTIONS[0];
  const relatedProducts = ALL_PRODUCTS.filter((p) => p.sectionId === product.sectionId && p.id !== product.id).slice(0, 3);

  // Mini calculator state
  const [calcVolume, setCalcVolume] = useState(20);
  const [calcUnit, setCalcUnit] = useState('ton'); // 'ton' or 'm3'

  const density = parseFloat(product.density) || 1.4;
  const totalPrice = calcUnit === 'ton'
    ? calcVolume * product.price
    : calcVolume * (product.priceM3 || Math.round(product.price * density));

  return (
    <div className="product-detail-page">
      <div className="container py-8">
        <button
          onClick={() => navigate(`#/catalog/${section.id}`)}
          className="back-btn mb-6"
        >
          <ArrowLeft size={16} />
          <span>Назад до розділу «{section.name}»</span>
        </button>

        <div className="prod-main-grid">
          {/* Left Column: Image & Stock */}
          <div className="prod-gallery-col">
            <div className="prod-img-box">
              <img src={product.image} alt={product.name} className="prod-main-img" />
              <div className="prod-stock-badge">
                <span className="live-dot"></span>
                <span>В наявності на 4 перевалках Дніпра</span>
              </div>
            </div>

            <div className="prod-guarantees-card">
              <div className="pg-item">
                <ShieldCheck size={20} className="icon-green" />
                <div>
                  <strong>100% відповідність ДСТУ Б В.2.7-75-98</strong>
                  <p>Оригінал паспорта якості та випробувань кар'єру з кожною машиною</p>
                </div>
              </div>
              <div className="pg-item">
                <Scale size={20} className="icon-green" />
                <div>
                  <strong>Повірені автоваги до 80 тонн</strong>
                  <p>Точний ваговий контроль (брутто / тара) та виписка ТТН</p>
                </div>
              </div>
              <div className="pg-item">
                <Truck size={20} className="icon-green" />
                <div>
                  <strong>Доставка самоскидами 10–40 т</strong>
                  <p>Доставка власними машинами по Дніпру та області</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Info & Instant Calculator */}
          <div className="prod-info-col">
            <div className="badge badge-green mb-2">{section.name}</div>
            <h1 className="prod-page-title">{product.name}</h1>
            <p className="prod-desc-text">{product.description}</p>

            <div className="prod-price-banner">
              <div className="ppb-main">
                <span className="ppb-label">Оптова ціна:</span>
                <div className="ppb-price">
                  <span className="ppb-num">{product.price}</span>
                  <span className="ppb-unit">{product.priceUnit || 'грн/т'}</span>
                </div>
              </div>
              {product.priceM3 && (
                <div className="ppb-m3">
                  <span className="ppb-m3-label">Ціна за куб:</span>
                  <span className="ppb-m3-val">{product.priceM3} грн/м³</span>
                </div>
              )}
            </div>

            {/* Quick Volume & Cost Estimator Widget */}
            <div className="prod-calc-widget">
              <div className="pcw-header">
                <Calculator size={18} className="icon-green" />
                <strong>Швидкий розрахунок вартості партії</strong>
              </div>

              <div className="pcw-controls">
                <div className="pcw-input-group">
                  <label>Потрібний обсяг:</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={calcVolume}
                    onChange={(e) => setCalcVolume(Math.max(1, Number(e.target.value)))}
                    className="pcw-input"
                  />
                </div>

                <div className="pcw-unit-group">
                  <label>Одиниця виміру:</label>
                  <div className="pcw-radio-tabs">
                    <button
                      className={`pcw-radio-btn ${calcUnit === 'ton' ? 'active' : ''}`}
                      onClick={() => setCalcUnit('ton')}
                    >
                      Тонни (т)
                    </button>
                    <button
                      className={`pcw-radio-btn ${calcUnit === 'm3' ? 'active' : ''}`}
                      onClick={() => setCalcUnit('m3')}
                    >
                      Куби (м³)
                    </button>
                  </div>
                </div>
              </div>

              <div className="pcw-result-row">
                <div>
                  <span className="pcw-res-label">Орієнтовна вартість матеріалу:</span>
                  <div className="pcw-res-val">
                    {totalPrice.toLocaleString('uk-UA')} грн
                  </div>
                  <span className="pcw-res-sub">
                    {calcUnit === 'ton'
                      ? `≈ ${(calcVolume / density).toFixed(1)} м³ за щільністю ${density} т/м³`
                      : `≈ ${(calcVolume * density).toFixed(1)} тонн за щільністю ${density} т/м³`}
                  </span>
                </div>

                <button
                  onClick={() => onOpenOrderModal({
                    name: `${product.name} (${calcVolume} ${calcUnit === 'ton' ? 'т' : 'м³'})`,
                    volume: calcVolume,
                    unit: calcUnit === 'ton' ? 'тонн' : 'м³'
                  })}
                  className="btn btn-primary btn-lg"
                >
                  <span>Оформити заявку</span>
                </button>
              </div>
            </div>

            {/* Technical Specs Sheet Table */}
            <div className="prod-specs-sheet">
              <h3 className="specs-title">Технічні характеристики за паспортом</h3>
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td>Доступні фракції:</td>
                    <td><strong>{(product.fractions || []).join(', ') || 'За запитом'}</strong></td>
                  </tr>
                  <tr>
                    <td>Марка міцності:</td>
                    <td><strong>{product.strength || 'М1200 - М1400'}</strong></td>
                  </tr>
                  <tr>
                    <td>Морозостійкість:</td>
                    <td><strong>{product.frost || 'F300 (понад 300 циклів)'}</strong></td>
                  </tr>
                  <tr>
                    <td>Форма зерен (лещадність):</td>
                    <td><strong>{product.flakiness || 'до 10% (кубоподібна)'}</strong></td>
                  </tr>
                  <tr>
                    <td>Насипна щільність:</td>
                    <td><strong>{product.density || '1.40 т/м³'}</strong></td>
                  </tr>
                  <tr>
                    <td>Клас радіаційної безпеки:</td>
                    <td><strong>1-й клас (АЕФ &lt; 370 Бк/кг, житлове будівництво)</strong></td>
                  </tr>
                  <tr>
                    <td>Кар'єр / Походження:</td>
                    <td><strong>Любимівський кар'єр / Дніпропетровська обл.</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Self pickup points list */}
            <div className="prod-bases-box">
              <h4 className="pbb-title">
                <MapPin size={16} className="icon-green" />
                <span>Самовивіз або відвантаження на доставку:</span>
              </h4>
              <ul className="pbb-list">
                {WAREHOUSES.map((wh) => (
                  <li key={wh.id} className="pbb-item">
                    <strong>{wh.name}:</strong> {wh.address} ({wh.hours})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products in the same category */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section mt-16">
            <h3 className="section-title">Інші різновиди у категорії «{section.name}»</h3>
            <div className="related-grid">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="related-card"
                  onClick={() => navigate(`#/product/${rel.id}`)}
                >
                  <img src={rel.image} alt={rel.name} className="rel-img" />
                  <div className="rel-body">
                    <h4 className="rel-title">{rel.name}</h4>
                    <span className="rel-price">{rel.price} {rel.priceUnit}</span>
                    <span className="rel-link">Переглянути характеристики ↗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .product-detail-page {
          background: #ffffff;
          padding-bottom: 60px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.15s;
          padding: 0;
        }

        .back-btn:hover {
          color: var(--c-green-dark);
        }

        .prod-main-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 40px;
          align-items: start;
        }

        .prod-gallery-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: sticky;
          top: 80px;
        }

        .prod-img-box {
          position: relative;
          height: 380px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }

        .prod-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .prod-badge-top {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #dc2626;
          color: #ffffff;
          font-size: 0.78rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 4px;
        }

        .prod-stock-badge {
          position: absolute;
          bottom: 14px;
          left: 14px;
          right: 14px;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(6px);
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
          animation: pulseDot 2s infinite;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .prod-guarantees-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .pg-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.85rem;
        }

        .pg-item strong {
          color: #0f172a;
          display: block;
          margin-bottom: 2px;
        }

        .pg-item p {
          color: #64748b;
          margin: 0;
          line-height: 1.4;
        }

        .prod-page-title {
          font-size: 2.1rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.2;
          margin: 6px 0 12px;
        }

        .prod-desc-text {
          font-size: 0.96rem;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 20px;
        }

        .prod-price-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f1f5f9;
          padding: 16px 20px;
          border-radius: var(--radius-md);
          margin-bottom: 24px;
          border: 1px solid #e2e8f0;
        }

        .ppb-label {
          font-size: 0.8rem;
          color: #64748b;
          display: block;
        }

        .ppb-num {
          font-size: 1.9rem;
          font-weight: 900;
          color: var(--c-green-dark);
        }

        .ppb-unit {
          font-size: 0.95rem;
          font-weight: 700;
          color: #64748b;
          margin-left: 6px;
        }

        .ppb-m3 {
          text-align: right;
        }

        .ppb-m3-label {
          font-size: 0.75rem;
          color: #64748b;
          display: block;
        }

        .ppb-m3-val {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
        }

        .prod-calc-widget {
          background: #ffffff;
          border: 2px solid var(--c-green);
          border-radius: var(--radius-lg);
          padding: 22px;
          margin-bottom: 28px;
          box-shadow: 0 10px 24px rgba(133, 180, 42, 0.12);
        }

        .pcw-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .pcw-controls {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 16px;
          margin-bottom: 18px;
        }

        .pcw-input-group label,
        .pcw-unit-group label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 6px;
        }

        .pcw-input {
          width: 100%;
          height: 42px;
          border: 1.5px solid #cbd5e1;
          border-radius: 6px;
          padding: 0 12px;
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
        }

        .pcw-radio-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }

        .pcw-radio-btn {
          height: 42px;
          border: 1.5px solid #cbd5e1;
          background: #f8fafc;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s;
        }

        .pcw-radio-btn.active {
          background: var(--c-green);
          color: #ffffff;
          border-color: var(--c-green);
        }

        .pcw-result-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #f1f5f9;
          padding-top: 16px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .pcw-res-label {
          font-size: 0.78rem;
          color: #64748b;
          display: block;
        }

        .pcw-res-val {
          font-size: 1.6rem;
          font-weight: 900;
          color: var(--c-green-dark);
        }

        .pcw-res-sub {
          font-size: 0.75rem;
          color: #94a3b8;
          display: block;
        }

        .prod-specs-sheet {
          margin-bottom: 24px;
        }

        .specs-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
        }

        .specs-table td {
          padding: 10px 14px;
          border-bottom: 1px solid #e2e8f0;
        }

        .specs-table tr:nth-child(even) {
          background: #f8fafc;
        }

        .specs-table td:first-child {
          color: #64748b;
          width: 40%;
        }

        .specs-table td:last-child {
          color: #0f172a;
        }

        .prod-bases-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 18px;
        }

        .pbb-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 10px;
        }

        .pbb-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.82rem;
          color: #475569;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 16px;
        }

        .related-card {
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s;
          background: #ffffff;
        }

        .related-card:hover {
          border-color: var(--c-green);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        }

        .rel-img {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }

        .rel-body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .rel-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .rel-price {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--c-green-dark);
        }

        .rel-link {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--c-green);
          margin-top: 6px;
        }

        @media (max-width: 900px) {
          .prod-main-grid {
            grid-template-columns: 1fr;
          }
          .prod-gallery-col {
            position: static;
          }
          .related-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
