import React, { useState } from 'react';
import { WAREHOUSES } from '../data/catalogData';
import { MapPin, Clock, Scale, Phone, CheckCircle2 } from 'lucide-react';

export const WarehouseMap = ({ onOpenOrderModal }) => {
  const [activeWarehouse, setActiveWarehouse] = useState(WAREHOUSES[0]);

  return (
    <section id="warehouses" className="section warehouses-section">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-green mb-2">Логістика та самовивіз</div>
          <h2 className="section-title">Перевалочні бази та кар'єри у Дніпрі</h2>
          <p className="section-subtitle">
            Власні перевалки та кар'єрні майданчики нерудних матеріалів зі зручним виїздом на ключові магістралі Дніпра та області.
          </p>
        </div>

        <div className="wh-grid">
          {/* List of Warehouses */}
          <div className="wh-list">
            {WAREHOUSES.map((wh) => {
              const isSelected = activeWarehouse.id === wh.id;
              return (
                <div
                  key={wh.id}
                  className={`wh-item-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setActiveWarehouse(wh)}
                >
                  <div className="wh-item-header">
                    <div className="wh-title-box">
                      <MapPin size={18} className="wh-pin-icon" />
                      <span className="wh-name">{wh.name}</span>
                    </div>
                    <span className="wh-zone-tag">{wh.zone}</span>
                  </div>

                  <div className="wh-address">{wh.address}</div>

                  <div className="wh-meta-row">
                    <span className="wh-meta">
                      <Clock size={14} />
                      {wh.hours}
                    </span>
                    <span className="wh-meta">
                      <Scale size={14} />
                      {wh.scales}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Warehouse Details & Map Preview */}
          <div className="wh-details-card">
            <div className="wh-details-header">
              <div>
                <span className="wh-detail-zone">{activeWarehouse.zone}</span>
                <h3 className="wh-detail-name">{activeWarehouse.name}</h3>
                <p className="wh-detail-address">{activeWarehouse.address}</p>
              </div>
              <a href={`tel:${activeWarehouse.phone}`} className="wh-call-btn">
                <Phone size={16} />
                <span>Зателефонувати</span>
              </a>
            </div>

            {/* Interactive Mock Map View */}
            <div className="wh-map-preview">
              <div className="map-grid-bg">
                <div className="map-marker-pin">
                  <div className="pin-head">
                    <MapPin size={24} color="#ffffff" />
                  </div>
                  <div className="pin-tooltip">
                    <strong>{activeWarehouse.name}</strong>
                    <span>{activeWarehouse.address}</span>
                  </div>
                </div>
              </div>

              <div className="map-badge-bottom">
                <span>Відвантаження від 1 тонни на самовивіз</span>
              </div>
            </div>

            <div className="wh-features-list">
              <div className="wh-feature">
                <CheckCircle2 size={16} className="feat-icon" />
                <span>{activeWarehouse.volume}</span>
              </div>
              <div className="wh-feature">
                <CheckCircle2 size={16} className="feat-icon" />
                <span>{activeWarehouse.tracks}</span>
              </div>
              <div className="wh-feature">
                <CheckCircle2 size={16} className="feat-icon" />
                <span>{activeWarehouse.scales}</span>
              </div>
              <div className="wh-feature">
                <CheckCircle2 size={16} className="feat-icon" />
                <span>Режим роботи: {activeWarehouse.hours}</span>
              </div>
            </div>

            <div className="wh-fleet-preview">
              <img src="/images/truck-fleet.jpg" alt="Автопарк самоскидів ТОВ БЕНГС" className="wh-fleet-img" />
              <span className="wh-fleet-tag">Власний автопарк самоскидів 10–40 т</span>
            </div>

            <button
              onClick={() => onOpenOrderModal({ name: `Самовивіз з бази: ${activeWarehouse.name}` })}
              className="btn btn-primary btn-block wh-order-btn"
            >
              <span>Забронювати об'єм на самовивіз</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .warehouses-section {
          background-color: #ffffff;
        }

        .wh-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 32px;
          align-items: start;
        }

        .wh-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .wh-item-card {
          padding: 18px 20px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s;
        }

        .wh-item-card:hover {
          border-color: var(--c-green);
          background: #f8fafc;
        }

        .wh-item-card.active {
          border-color: var(--c-green);
          background: var(--c-green-light);
          box-shadow: 0 4px 12px rgba(133, 180, 42, 0.18);
        }

        .wh-item-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .wh-title-box {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .wh-pin-icon {
          color: var(--c-green);
        }

        .wh-name {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
        }

        .wh-zone-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--c-green-dark);
          background: rgba(133, 180, 42, 0.2);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .wh-address {
          font-size: 0.88rem;
          color: #475569;
          margin-bottom: 10px;
        }

        .wh-meta-row {
          display: flex;
          gap: 16px;
          font-size: 0.8rem;
          color: #64748b;
        }

        .wh-meta {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Detail Card */
        .wh-details-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-lg);
          padding: 30px;
          display: flex;
          flex-direction: column;
        }

        .wh-details-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .wh-detail-zone {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--c-green-dark);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .wh-detail-name {
          font-size: 1.35rem;
          font-weight: 900;
          color: #0f172a;
          margin: 2px 0 4px;
        }

        .wh-detail-address {
          font-size: 0.95rem;
          color: #475569;
        }

        .wh-call-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #1e293b;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 6px;
          transition: all 0.15s;
        }

        .wh-call-btn:hover {
          border-color: var(--c-green);
          color: var(--c-green-dark);
        }

        .wh-map-preview {
          position: relative;
          height: 220px;
          border-radius: var(--radius-md);
          overflow: hidden;
          margin-bottom: 20px;
          border: 1px solid #cbd5e1;
          background: #e2e8f0;
        }

        .map-grid-bg {
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(90deg, rgba(203, 213, 225, 0.4) 1px, transparent 1px),
            linear-gradient(rgba(203, 213, 225, 0.4) 1px, #f1f5f9 1px);
          background-size: 24px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .map-marker-pin {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pin-head {
          width: 44px;
          height: 44px;
          border-radius: 50% 50% 50% 0;
          background: var(--c-green);
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(133, 180, 42, 0.5);
        }

        .pin-head svg {
          transform: rotate(45deg);
        }

        .pin-tooltip {
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(4px);
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.78rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 8px;
          white-space: nowrap;
        }

        .map-badge-bottom {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(255, 255, 255, 0.95);
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #334155;
        }

        .wh-features-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .wh-feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: #334155;
        }

        .feat-icon {
          color: var(--c-green);
          flex-shrink: 0;
        }

        .wh-fleet-preview {
          position: relative;
          height: 140px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .wh-fleet-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wh-fleet-tag {
          position: absolute;
          bottom: 8px;
          left: 8px;
          background: rgba(15, 23, 42, 0.85);
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 600;
        }

        .wh-order-btn {
          padding: 12px;
          font-size: 0.95rem;
        }

        @media (max-width: 900px) {
          .wh-grid {
            grid-template-columns: 1fr;
          }
          .wh-features-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
