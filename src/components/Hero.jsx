import React from 'react';
import { Truck, ShieldCheck, Clock, Calculator, Scale } from 'lucide-react';

export const Hero = ({ onOpenOrderModal }) => {
  return (
    <section className="hero-section">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <a href="#">Головна</a>
          <span className="bc-sep">•</span>
          <a href="#catalog">Каталог</a>
          <span className="bc-sep">•</span>
          <span className="bc-current">Щебінь</span>
        </div>

        <div className="hero-grid">
          {/* Left Column: Text & Actions */}
          <div className="hero-content">
            <div className="hero-price-badge">
              <span>від 240 грн/т</span>
            </div>

            <h1 className="hero-title">
              Щебінь з доставкою по Дніпру та області
            </h1>

            <p className="hero-desc">
              Продаж гранітного, гравійного та шлакового щебеню всіх фракцій. 
              Прямі поставки з кар'єрів і перевалочних баз Дніпра власними самоскидами від 10 до 40 тонн.
            </p>

            <div className="hero-actions">
              <button
                onClick={() => onOpenOrderModal({ name: "Замовлення щебеню з доставкою по Дніпру" })}
                className="btn btn-primary btn-lg hero-btn-order"
              >
                <span>Зробити замовлення</span>
              </button>

              <a href="#calculator" className="btn btn-secondary btn-lg hero-btn-calc">
                <Calculator size={18} />
                <span>Розрахувати вартість</span>
              </a>
            </div>

            {/* Micro USP list */}
            <div className="hero-usps">
              <div className="h-usp">
                <Truck size={18} className="usp-icon" />
                <span>Доставка від 2 годин</span>
              </div>
              <div className="h-usp">
                <ShieldCheck size={18} className="usp-icon" />
                <span>Відповідність нормам ДСТУ</span>
              </div>
              <div className="h-usp">
                <Scale size={18} className="usp-icon" />
                <span>Точна вага з ТТН</span>
              </div>
              <div className="h-usp">
                <Clock size={18} className="usp-icon" />
                <span>Щоденно 09:00 — 20:00</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1585110587043-36d457f3e803?auto=format&fit=crop&w=1000&q=85"
                alt="Щебінь гранітний будівельний у Дніпрі — ТОВ БЕНГС"
                className="hero-img"
              />
              <div className="hero-img-overlay">
                <div className="overlay-tag">
                  <strong>30+</strong> самоскидів у рейсі по Дніпру
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 24px 0 54px;
          background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
          border-bottom: 1px solid #eef0f2;
        }

        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.84rem;
          color: #9ca3af;
          margin-bottom: 24px;
        }

        .breadcrumbs a {
          color: #6b7280;
          transition: color 0.15s;
        }

        .breadcrumbs a:hover {
          color: var(--c-green-dark);
        }

        .bc-sep {
          color: #d1d5db;
        }

        .bc-current {
          color: #111827;
          font-weight: 500;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }

        .hero-price-badge {
          display: inline-block;
          font-size: 0.95rem;
          font-weight: 800;
          color: #80A541;
          margin-bottom: 12px;
          letter-spacing: 0.3px;
        }

        .hero-title {
          font-size: 2.65rem;
          font-weight: 900;
          line-height: 1.15;
          color: #111827;
          margin-bottom: 18px;
          letter-spacing: -0.5px;
        }

        .hero-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #4b5563;
          margin-bottom: 28px;
          max-width: 580px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .hero-btn-order {
          background-color: #85B42A;
          color: #ffffff;
          padding: 14px 34px;
          font-size: 1.05rem;
        }

        .hero-btn-calc {
          background-color: #f3f4f6;
          color: #1f2937;
          border: 1px solid #e5e7eb;
        }

        .hero-btn-calc:hover {
          background-color: #e5e7eb;
        }

        .hero-usps {
          display: flex;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          flex-wrap: wrap;
        }

        .h-usp {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #374151;
        }

        .usp-icon {
          color: var(--c-green);
        }

        .hero-visual {
          position: relative;
        }

        .hero-image-wrapper {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          aspect-ratio: 4/3;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .hero-image-wrapper:hover .hero-img {
          transform: scale(1.03);
        }

        .hero-img-overlay {
          position: absolute;
          bottom: 16px;
          right: 16px;
        }

        .overlay-tag {
          background: rgba(17, 24, 39, 0.85);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.85rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .overlay-tag strong {
          color: var(--c-green);
          font-size: 1rem;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .hero-title {
            font-size: 2.2rem;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 1.8rem;
          }
          .hero-desc {
            font-size: 0.95rem;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-btn-order, .hero-btn-calc {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
