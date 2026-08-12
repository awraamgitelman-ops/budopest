import React from 'react';
import { WarehouseMap } from '../components/WarehouseMap';
import { WAREHOUSES } from '../data/catalogData';
import { MapPin, Clock, Scale, Phone, CheckCircle2, Navigation, Zap } from 'lucide-react';

export const WarehousesPage = ({ onOpenOrderModal }) => {
  return (
    <div className="warehouses-page-wrapper">
      <div className="wh-hero">
        <div className="container">
          <div className="badge badge-green mb-2">Логістичні термінали та кар'єри</div>
          <h1 className="wh-hero-title">Перевалочні бази та кар'єри у Дніпрі</h1>
          <p className="wh-hero-subtitle">
            4 власні майданчики відвантаження нерудних матеріалів у Дніпрі та Кам'янському. Повірені 80-тонні електронні автоваги, резервне генераторне живлення та зручні виїзди на траси М-30, Н-08 та Т-0401.
          </p>

          <div className="wh-hero-features">
            <div className="wh-hf-item">
              <Zap size={18} className="icon-green" />
              <span>Генератори на базах — зважуємо без світла</span>
            </div>
            <div className="wh-hf-item">
              <Clock size={18} className="icon-green" />
              <span>Графік: щоденно 09:00 — 20:00</span>
            </div>
            <div className="wh-hf-item">
              <Scale size={18} className="icon-green" />
              <span>Самовивіз від 1 тонни або в біг-бегах</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <WarehouseMap onOpenOrderModal={onOpenOrderModal} />

        {/* Detailed Addresses List Cards */}
        <div className="wh-full-list-grid mt-12">
          {WAREHOUSES.map((wh) => (
            <div key={wh.id} className="wh-full-card">
              <div className="wfc-header">
                <span className="wfc-zone">{wh.zone}</span>
                <h3 className="wfc-name">{wh.name}</h3>
                <p className="wfc-addr">{wh.address}</p>
              </div>

              <div className="wfc-details">
                <div className="wfc-item">
                  <strong>Графік роботи:</strong>
                  <span>{wh.hours}</span>
                </div>
                <div className="wfc-item">
                  <strong>Ваговий контроль:</strong>
                  <span>{wh.scales}</span>
                </div>
                <div className="wfc-item">
                  <strong>Запас на складі:</strong>
                  <span>{wh.volume}</span>
                </div>
                <div className="wfc-item">
                  <strong>Логістична перевага:</strong>
                  <span>{wh.tracks}</span>
                </div>
              </div>

              <div className="wfc-footer">
                <a
                  href={wh.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  <Navigation size={14} />
                  <span>Прокласти маршрут Google Maps</span>
                </a>
                <a href={`tel:${wh.phone}`} className="btn btn-primary btn-sm">
                  <Phone size={14} />
                  <span>Зателефонувати</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .warehouses-page-wrapper {
          background: #ffffff;
          padding-bottom: 60px;
        }

        .wh-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 50px 0 40px;
        }

        .wh-hero-title {
          font-size: 2.3rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 12px;
          line-height: 1.2;
        }

        .wh-hero-subtitle {
          font-size: 1.05rem;
          color: #cbd5e1;
          max-width: 840px;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .wh-hero-features {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .wh-hf-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .wh-full-list-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .wh-full-card {
          border: 1.5px solid #e2e8f0;
          border-radius: var(--radius-lg);
          padding: 24px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          transition: all 0.2s;
        }

        .wh-full-card:hover {
          border-color: var(--c-green);
          box-shadow: 0 10px 24px rgba(0,0,0,0.06);
        }

        .wfc-zone {
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--c-green-dark);
          text-transform: uppercase;
        }

        .wfc-name {
          font-size: 1.2rem;
          font-weight: 900;
          color: #0f172a;
          margin: 2px 0 4px;
        }

        .wfc-addr {
          font-size: 0.88rem;
          color: #64748b;
          margin-bottom: 16px;
        }

        .wfc-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
          background: #f8fafc;
          padding: 14px;
          border-radius: 8px;
          flex: 1;
        }

        .wfc-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          gap: 8px;
        }

        .wfc-item strong {
          color: #64748b;
        }

        .wfc-item span {
          color: #0f172a;
          font-weight: 600;
          text-align: right;
        }

        .wfc-footer {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        @media (max-width: 900px) {
          .wh-full-list-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
