import React from 'react';
import { useRouter } from '../context/RouterContext';
import { SERVICES_DATA } from '../data/servicesData';
import { ArrowLeft, CheckCircle2, Phone, Truck, ShieldCheck, FileText } from 'lucide-react';

export const ServiceDetailPage = ({ onOpenOrderModal }) => {
  const { routeParams, navigate } = useRouter();
  const serviceId = routeParams.serviceId;

  const service = SERVICES_DATA.find((s) => s.id === serviceId || s.slug === serviceId) || SERVICES_DATA[0];

  return (
    <div className="service-detail-page">
      <div className="container py-8">
        <button
          onClick={() => navigate('#/services')}
          className="back-btn mb-6"
        >
          <ArrowLeft size={16} />
          <span>Назад до переліку послуг спецтехніки</span>
        </button>

        <div className="sd-main-grid">
          {/* Left Column: Image & Order Box */}
          <div className="sd-media-col">
            <div className="sd-img-box">
              <img src={service.image} alt={service.title} className="sd-img" />
              <div className="sd-price-badge">{service.price}</div>
            </div>

            <div className="sd-order-card">
              <h3>Замовити послугу</h3>
              <p>Подача техніки у будь-який район Дніпра протягом 2–3 годин після узгодження заявки.</p>
              
              <div className="sd-btn-stack">
                <button
                  onClick={() => onOpenOrderModal({ name: `Послуга: ${service.title}` })}
                  className="btn btn-primary btn-block btn-lg"
                >
                  Оформити заявку
                </button>
                <a href="tel:+380676863186" className="btn btn-outline btn-block">
                  <Phone size={16} />
                  <span>+380 (67) 686-31-86</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Specs */}
          <div className="sd-info-col">
            <div className="badge badge-green mb-2">Послуги спецтехніки Дніпро</div>
            <h1 className="sd-title">{service.title}</h1>
            <p className="sd-desc">{service.shortDesc}</p>

            <div className="sd-fleet-banner">
              <Truck size={20} className="icon-green" />
              <div>
                <strong>Склад техніки:</strong>
                <span>{service.fleetCount}</span>
              </div>
            </div>

            <div className="sd-specs-section">
              <h3>Види виконуваних робіт та технічні параметри:</h3>
              <div className="sd-specs-list">
                {service.specs.map((spec, idx) => (
                  <div key={idx} className="sd-spec-card">
                    <h4>{spec.name}</h4>
                    <p>{spec.use}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sd-features-section">
              <h3>Переваги замовлення техніки у ТОВ «БЕНГС»:</h3>
              <div className="sd-feats-grid">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="sd-feat-item">
                    <CheckCircle2 size={18} className="icon-green" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sd-legal-note">
              <ShieldCheck size={20} className="icon-green" />
              <div>
                <strong>Офіційний договір та безготівковий розрахунок з ПДВ:</strong>
                <p>Надаємо повний комплект первинних документів (акти виконаних робіт, талони утилізації, ТТН) для юридичних осіб та підприємств.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .service-detail-page {
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

        .sd-main-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 40px;
          align-items: start;
        }

        .sd-media-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: sticky;
          top: 80px;
        }

        .sd-img-box {
          position: relative;
          height: 320px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1);
        }

        .sd-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sd-price-badge {
          position: absolute;
          bottom: 14px;
          left: 14px;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(6px);
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 800;
        }

        .sd-order-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          padding: 24px;
        }

        .sd-order-card h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px;
        }

        .sd-order-card p {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0 0 18px;
          line-height: 1.4;
        }

        .sd-btn-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sd-title {
          font-size: 2.1rem;
          font-weight: 900;
          color: #0f172a;
          margin: 6px 0 12px;
          line-height: 1.25;
        }

        .sd-desc {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .sd-fleet-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          padding: 12px 18px;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .sd-fleet-banner strong {
          display: block;
          font-size: 0.82rem;
          color: #64748b;
        }

        .sd-fleet-banner span {
          font-size: 0.92rem;
          font-weight: 700;
          color: #0f172a;
        }

        .sd-specs-section, .sd-features-section {
          margin-bottom: 28px;
        }

        .sd-specs-section h3, .sd-features-section h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 14px;
        }

        .sd-specs-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sd-spec-card {
          padding: 14px 18px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }

        .sd-spec-card h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 4px;
        }

        .sd-spec-card p {
          font-size: 0.84rem;
          color: #64748b;
          margin: 0;
        }

        .sd-feats-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .sd-feat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: #334155;
        }

        .sd-legal-note {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 18px;
          background: var(--c-green-light);
          border: 1px solid rgba(133, 180, 42, 0.3);
          border-radius: 8px;
        }

        .sd-legal-note strong {
          color: var(--c-green-dark);
          font-size: 0.92rem;
          display: block;
          margin-bottom: 2px;
        }

        .sd-legal-note p {
          color: #334155;
          font-size: 0.82rem;
          margin: 0;
          line-height: 1.4;
        }

        @media (max-width: 900px) {
          .sd-main-grid {
            grid-template-columns: 1fr;
          }
          .sd-media-col {
            position: static;
          }
        }
      `}</style>
    </div>
  );
};
