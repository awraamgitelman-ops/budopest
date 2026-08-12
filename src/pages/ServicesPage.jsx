import React from 'react';
import { useRouter } from '../context/RouterContext';
import { SERVICES_DATA } from '../data/servicesData';
import { ArrowRight, CheckCircle2, Phone, Truck } from 'lucide-react';

export const ServicesPage = ({ onOpenOrderModal }) => {
  const { navigate } = useRouter();

  return (
    <div className="services-page-wrapper">
      <div className="services-hero">
        <div className="container">
          <div className="badge badge-green mb-2">Спецтехніка та будівельні роботи</div>
          <h1 className="services-hero-title">Послуги спецтехніки та земляні роботи у Дніпрі</h1>
          <p className="services-hero-subtitle">
            Оренда самоскидів 10–40 т, розробка котлованів екскаваторами, вивіз та утилізація ґрунту, матеріали для фортифікацій. Власний парк техніки без посередників.
          </p>
        </div>
      </div>

      <div className="container py-10">
        <div className="services-list-grid">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="service-big-card">
              <div className="sbc-img-wrap">
                <img src={service.image} alt={service.title} className="sbc-img" />
                <div className="sbc-price-badge">{service.price}</div>
              </div>

              <div className="sbc-body">
                <h2
                  className="sbc-title"
                  onClick={() => navigate(`#/services/${service.id}`)}
                >
                  {service.title}
                </h2>
                <p className="sbc-desc">{service.shortDesc}</p>

                <div className="sbc-fleet-tag">
                  <Truck size={15} className="icon-green" />
                  <span>{service.fleetCount}</span>
                </div>

                <div className="sbc-features">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="sbc-feat-item">
                      <CheckCircle2 size={14} className="icon-green" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="sbc-actions">
                  <button
                    onClick={() => onOpenOrderModal({ name: `Послуга: ${service.title}` })}
                    className="btn btn-primary btn-sm"
                  >
                    Замовити послугу
                  </button>
                  <button
                    onClick={() => navigate(`#/services/${service.id}`)}
                    className="btn btn-outline btn-sm"
                  >
                    <span>Детальніше</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-page-wrapper {
          background: #ffffff;
          padding-bottom: 60px;
        }

        .services-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 50px 0 40px;
        }

        .services-hero-title {
          font-size: 2.3rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 12px;
          line-height: 1.2;
        }

        .services-hero-subtitle {
          font-size: 1.05rem;
          color: #cbd5e1;
          max-width: 820px;
          line-height: 1.5;
        }

        .services-list-grid {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .service-big-card {
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #ffffff;
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          transition: all 0.2s;
        }

        .service-big-card:hover {
          border-color: var(--c-green);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        }

        .sbc-img-wrap {
          position: relative;
          min-height: 260px;
        }

        .sbc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sbc-price-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: var(--c-green-dark);
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 800;
        }

        .sbc-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
        }

        .sbc-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 8px;
          cursor: pointer;
          line-height: 1.3;
        }

        .sbc-title:hover {
          color: var(--c-green-dark);
        }

        .sbc-desc {
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .sbc-fleet-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 16px;
          width: fit-content;
        }

        .sbc-features {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }

        .sbc-feat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: #475569;
        }

        .sbc-actions {
          display: flex;
          gap: 12px;
          margin-top: auto;
          flex-wrap: wrap;
        }

        @media (max-width: 800px) {
          .service-big-card {
            grid-template-columns: 1fr;
          }
          .sbc-img-wrap {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};
