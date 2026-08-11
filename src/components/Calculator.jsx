import React, { useState } from 'react';
import { SHCHEDEN_PRODUCTS, DELIVERY_ZONES } from '../data/catalogData';
import { Calculator as CalcIcon, Truck, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';

export const Calculator = ({ onOpenOrderModal }) => {
  const [selectedProduct, setSelectedProduct] = useState(SHCHEDEN_PRODUCTS[0]);
  const [selectedFraction, setSelectedFraction] = useState(SHCHEDEN_PRODUCTS[0].fractions[3] || SHCHEDEN_PRODUCTS[0].fractions[0]);
  const [unit, setUnit] = useState('tons'); // 'tons' or 'm3'
  const [volume, setVolume] = useState(30);
  const [selectedZone, setSelectedZone] = useState(DELIVERY_ZONES[0]);

  // Density factor (approx 1.35)
  const density = 1.35;
  const actualTons = unit === 'tons' ? volume : volume * density;
  const actualM3 = unit === 'm3' ? volume : volume / density;

  // Material cost
  const materialPricePerTon = selectedProduct.price;
  const materialTotal = Math.round(actualTons * materialPricePerTon);

  // Delivery cost
  const deliveryPerTon = selectedZone.baseRate;
  const deliveryTotal = Math.max(selectedZone.minDelivery, Math.round(actualTons * deliveryPerTon));

  // Overall Total
  const grandTotal = materialTotal + deliveryTotal;

  // Truck recommendation
  const getTruckRecommendation = (tons) => {
    if (tons <= 12) return { name: "Самоскид КАМАЗ / МАЗ (8-10 м³)", capacity: "до 12 т", count: 1 };
    if (tons <= 25) return { name: "Самоскид 3-вісний MAN / Scania (16-18 м³)", capacity: "до 25 т", count: 1 };
    if (tons <= 35) return { name: "Самоскид 4-вісний Volvo / DAF (20-24 м³)", capacity: "до 35 т", count: 1 };
    const trucksNeeded = Math.ceil(tons / 35);
    return { name: `Тягач напівпричіп самоскидний (30-35 м³)`, capacity: `35-40 т`, count: trucksNeeded };
  };

  const truck = getTruckRecommendation(actualTons);

  const handleProductChange = (prodId) => {
    const prod = SHCHEDEN_PRODUCTS.find(p => p.id === prodId) || SHCHEDEN_PRODUCTS[0];
    setSelectedProduct(prod);
    setSelectedFraction(prod.fractions[0]);
  };

  const handleApplyOrder = () => {
    onOpenOrderModal({
      name: `${selectedProduct.name} (${selectedFraction})`,
      calcDetails: {
        product: selectedProduct.name,
        fraction: selectedFraction,
        volume: `${volume} ${unit === 'tons' ? 'т' : 'м³'}`,
        zone: selectedZone.name,
        materialTotal: `${materialTotal.toLocaleString('uk-UA')} грн`,
        deliveryTotal: `${deliveryTotal.toLocaleString('uk-UA')} грн`,
        grandTotal: `${grandTotal.toLocaleString('uk-UA')} грн`,
        truck: `${truck.name} (${truck.count} маш.)`
      }
    });
  };

  return (
    <section id="calculator" className="section calculator-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge badge-green mb-2">
            <CalcIcon size={14} />
            <span>Онлайн-розрахунок за 10 секунд</span>
          </div>
          <h2 className="section-title">Калькулятор вартості щебеню з доставкою по Дніпру</h2>
          <p className="section-subtitle mx-auto">
            Оберіть тип щебеню, фракцію, об'єм та зону доставки, щоб миттєво дізнатися точну ціну матеріалу і логістики.
          </p>
        </div>

        <div className="calc-card">
          <div className="calc-grid">
            {/* Left Parameters Column */}
            <div className="calc-params">
              {/* Material Select */}
              <div className="calc-group">
                <label className="calc-label">1. Оберіть тип щебеню</label>
                <div className="product-selector-grid">
                  {SHCHEDEN_PRODUCTS.slice(0, 6).map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      className={`prod-select-btn ${selectedProduct.id === prod.id ? 'active' : ''}`}
                      onClick={() => handleProductChange(prod.id)}
                    >
                      <span className="ps-name">{prod.name}</span>
                      <span className="ps-price">від {prod.price} грн/т</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fraction Select */}
              <div className="calc-group">
                <label className="calc-label">2. Оберіть фракцію</label>
                <div className="fraction-chips">
                  {selectedProduct.fractions.map((frac, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`frac-chip ${selectedFraction === frac ? 'active' : ''}`}
                      onClick={() => setSelectedFraction(frac)}
                    >
                      {frac}
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Slider & Units */}
              <div className="calc-group">
                <div className="calc-label-row">
                  <label className="calc-label">3. Потрібний об'єм</label>
                  <div className="unit-switch">
                    <button
                      type="button"
                      className={`unit-btn ${unit === 'tons' ? 'active' : ''}`}
                      onClick={() => setUnit('tons')}
                    >
                      Тонни (т)
                    </button>
                    <button
                      type="button"
                      className={`unit-btn ${unit === 'm3' ? 'active' : ''}`}
                      onClick={() => setUnit('m3')}
                    >
                      Куби (м³)
                    </button>
                  </div>
                </div>

                <div className="volume-slider-box">
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="calc-range"
                  />
                  <div className="volume-display">
                    <input
                      type="number"
                      min="10"
                      max="10000"
                      value={volume}
                      onChange={(e) => setVolume(Math.max(1, Number(e.target.value)))}
                      className="volume-input"
                    />
                    <span className="volume-unit-label">{unit === 'tons' ? 'тонн' : 'м³'}</span>
                  </div>
                </div>
                <div className="volume-hint">
                  {unit === 'tons'
                    ? `≈ ${actualM3.toFixed(1)} м³ за насипної щільності 1.35 т/м³`
                    : `≈ ${actualTons.toFixed(1)} тонн за насипної щільності 1.35 т/м³`}
                </div>
              </div>

              {/* Delivery Zone Select */}
              <div className="calc-group">
                <label className="calc-label">
                  <MapPin size={16} className="inline-icon" />
                  <span>4. Район або зона доставки</span>
                </label>
                <select
                  value={selectedZone.id}
                  onChange={(e) => {
                    const z = DELIVERY_ZONES.find(zone => zone.id === e.target.value);
                    if (z) setSelectedZone(z);
                  }}
                  className="calc-select"
                >
                  {DELIVERY_ZONES.map(z => (
                    <option key={z.id} value={z.id}>
                      {z.name} (від {z.baseRate} грн/т)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Summary Column */}
            <div className="calc-summary">
              <div className="summary-header">
                <span className="summary-title">Підсумок розрахунку</span>
                <span className="summary-status">В наявності</span>
              </div>

              <div className="summary-rows">
                <div className="sum-row">
                  <span className="sr-label">Матеріал:</span>
                  <span className="sr-val">{selectedProduct.name}</span>
                </div>
                <div className="sum-row">
                  <span className="sr-label">Фракція:</span>
                  <span className="sr-val">{selectedFraction}</span>
                </div>
                <div className="sum-row">
                  <span className="sr-label">Об'єм замовлення:</span>
                  <span className="sr-val">{volume} {unit === 'tons' ? 'т' : 'м³'} ({actualTons.toFixed(0)} т / {actualM3.toFixed(0)} м³)</span>
                </div>
                <div className="sum-row">
                  <span className="sr-label">Вартість щебеню:</span>
                  <span className="sr-val">{materialTotal.toLocaleString('uk-UA')} грн</span>
                </div>
                <div className="sum-row">
                  <span className="sr-label">Доставка ({selectedZone.name.split('(')[0]}):</span>
                  <span className="sr-val">{deliveryTotal.toLocaleString('uk-UA')} грн</span>
                </div>
              </div>

              {/* Truck recommendation box */}
              <div className="truck-box">
                <div className="tb-icon">
                  <Truck size={24} />
                </div>
                <div className="tb-info">
                  <div className="tb-title">Рекомендований транспорт:</div>
                  <div className="tb-desc">
                    {truck.count > 1 ? `${truck.count} × ` : ''}{truck.name}
                  </div>
                </div>
              </div>

              {/* Grand Total */}
              <div className="grand-total-box">
                <div className="gt-label">Підсумкова сума:</div>
                <div className="gt-value">
                  {grandTotal.toLocaleString('uk-UA')} <span className="gt-currency">грн</span>
                </div>
                <div className="gt-note">З урахуванням ПДВ 20% та розвантаження на об'єкті</div>
              </div>

              <button
                onClick={handleApplyOrder}
                className="btn btn-primary btn-lg btn-block calc-order-btn"
              >
                <span>Оформити замовлення за розрахунком</span>
                <ArrowRight size={18} />
              </button>

              <div className="calc-guarantee">
                <CheckCircle2 size={16} className="text-green" />
                <span>Фіксація ціни під час відправки заявки</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .calculator-section {
          background-color: var(--c-gray-bg);
        }

        .text-center {
          text-align: center;
        }

        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }

        .mb-2 {
          margin-bottom: 8px;
        }

        .calc-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .calc-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.95fr;
        }

        .calc-params {
          padding: 36px 40px;
          border-right: 1px solid #f1f5f9;
        }

        .calc-group {
          margin-bottom: 24px;
        }

        .calc-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.95rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 10px;
        }

        .calc-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .product-selector-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .prod-select-btn {
          padding: 10px 12px;
          border: 1.5px solid #e2e8f0;
          border-radius: var(--radius-sm);
          background: #f8fafc;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 2px;
          transition: all 0.15s;
        }

        .prod-select-btn:hover {
          border-color: var(--c-green);
          background: #ffffff;
        }

        .prod-select-btn.active {
          border-color: var(--c-green);
          background: var(--c-green-light);
          box-shadow: 0 0 0 1px var(--c-green);
        }

        .ps-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1e293b;
        }

        .ps-price {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--c-green-dark);
        }

        .fraction-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .frac-chip {
          padding: 7px 16px;
          border-radius: 20px;
          border: 1.5px solid #e2e8f0;
          background: #ffffff;
          font-size: 0.88rem;
          font-weight: 600;
          color: #475569;
          transition: all 0.15s;
        }

        .frac-chip:hover {
          border-color: var(--c-green);
          color: var(--c-green-dark);
        }

        .frac-chip.active {
          border-color: var(--c-green);
          background: var(--c-green);
          color: #ffffff;
        }

        .unit-switch {
          display: flex;
          background: #f1f5f9;
          padding: 3px;
          border-radius: 6px;
        }

        .unit-btn {
          padding: 4px 12px;
          font-size: 0.78rem;
          font-weight: 600;
          border-radius: 4px;
          color: #64748b;
          transition: all 0.15s;
        }

        .unit-btn.active {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .volume-slider-box {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .calc-range {
          flex: 1;
          accent-color: var(--c-green);
          height: 6px;
          border-radius: 3px;
          cursor: pointer;
        }

        .volume-display {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          border: 1.5px solid #cbd5e1;
          border-radius: 6px;
          padding: 4px 10px;
        }

        .volume-input {
          width: 70px;
          border: none;
          background: transparent;
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          text-align: right;
          outline: none;
        }

        .volume-unit-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #64748b;
        }

        .volume-hint {
          font-size: 0.78rem;
          color: #94a3b8;
          margin-top: 6px;
        }

        .calc-select {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #cbd5e1;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1e293b;
          background: #ffffff;
          outline: none;
          transition: border-color 0.15s;
        }

        .calc-select:focus {
          border-color: var(--c-green);
        }

        /* Summary Panel */
        .calc-summary {
          background: #f8fafc;
          padding: 36px 40px;
          display: flex;
          flex-direction: column;
        }

        .summary-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          margin-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
        }

        .summary-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
        }

        .summary-status {
          font-size: 0.75rem;
          font-weight: 700;
          color: #16a34a;
          background: #dcfce7;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .summary-rows {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .sum-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .sr-label {
          color: #64748b;
        }

        .sr-val {
          font-weight: 600;
          color: #0f172a;
          text-align: right;
        }

        .truck-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px 14px;
          margin-bottom: 20px;
        }

        .tb-icon {
          color: var(--c-green);
        }

        .tb-title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #94a3b8;
          letter-spacing: 0.5px;
        }

        .tb-desc {
          font-size: 0.92rem;
          font-weight: 700;
          color: #1e293b;
        }

        .grand-total-box {
          background: #ffffff;
          border: 2px solid var(--c-green);
          border-radius: 8px;
          padding: 18px;
          text-align: center;
          margin-bottom: 20px;
        }

        .gt-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .gt-value {
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--c-green-dark);
          line-height: 1.1;
          margin: 4px 0;
        }

        .gt-currency {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .gt-note {
          font-size: 0.78rem;
          color: #94a3b8;
        }

        .calc-order-btn {
          font-size: 1.05rem;
          padding: 14px;
        }

        .calc-guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 14px;
        }

        .text-green {
          color: #16a34a;
        }

        @media (max-width: 1024px) {
          .calc-grid {
            grid-template-columns: 1fr;
          }
          .calc-params {
            border-right: none;
            border-bottom: 1px solid #f1f5f9;
            padding: 24px;
          }
          .calc-summary {
            padding: 24px;
          }
          .product-selector-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};
