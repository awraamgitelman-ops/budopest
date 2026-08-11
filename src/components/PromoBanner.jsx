import React, { useState } from 'react';
import { Phone, ArrowRight, Tag } from 'lucide-react';

export const PromoBanner = ({ onOpenOrderModal }) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    onOpenOrderModal({
      name: "Знижка 10% на першу машину щебеню (Дніпро)",
      phone: phone
    });
  };

  return (
    <section className="promo-banner-section">
      <div className="container">
        <div className="promo-card">
          <div className="promo-grid">
            <div className="promo-content">
              <div className="promo-badge">
                <Tag size={14} />
                <span>Спеціальна пропозиція</span>
              </div>
              <h2 className="promo-title">Допоможемо зробити вигідну покупку</h2>
              <p className="promo-desc">
                Отримайте <strong>знижку 10%</strong> на першу пробну машину щебеню, щоб оцінити високу якість матеріалу та точність ваги вже сьогодні.
              </p>

              <div className="promo-actions">
                <a href="tel:+380676863186" className="promo-phone-btn">
                  <Phone size={18} />
                  <span>+380 (67) 686-31-86</span>
                </a>

                <form onSubmit={handleSubmit} className="promo-inline-form">
                  <input
                    type="tel"
                    placeholder="+380 (__) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="promo-input"
                    required
                  />
                  <button type="submit" className="btn btn-primary promo-submit-btn">
                    <span>Отримати знижку</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              </div>
            </div>

            <div className="promo-image-box">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80"
                alt="Доставка щебеню самоскидом у Дніпрі"
                className="promo-img"
              />
              <div className="promo-img-tag">
                <span>Пряме завантаження з кар'єру</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .promo-banner-section {
          padding: 20px 0 40px;
        }

        .promo-card {
          background: #f1f5f9;
          border-radius: var(--radius-lg);
          padding: 36px 44px;
          position: relative;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .promo-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.85fr;
          gap: 36px;
          align-items: center;
        }

        .promo-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--c-green-dark);
          background: var(--c-green-light);
          padding: 4px 10px;
          border-radius: 4px;
          margin-bottom: 12px;
        }

        .promo-title {
          font-size: 2.1rem;
          font-weight: 900;
          color: #80A541;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .promo-desc {
          font-size: 1.05rem;
          color: #334155;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .promo-desc strong {
          color: #0f172a;
          font-weight: 800;
        }

        .promo-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .promo-phone-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--c-green);
          color: #ffffff;
          font-size: 1.15rem;
          font-weight: 800;
          padding: 12px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(133, 180, 42, 0.4);
          transition: all 0.2s;
        }

        .promo-phone-btn:hover {
          background: var(--c-green-hover);
          transform: translateY(-2px);
        }

        .promo-inline-form {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          padding: 5px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
        }

        .promo-input {
          padding: 9px 12px;
          border: none;
          font-size: 0.92rem;
          outline: none;
          min-width: 170px;
        }

        .promo-submit-btn {
          padding: 9px 18px;
        }

        .promo-image-box {
          position: relative;
          height: 200px;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .promo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .promo-img-tag {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        @media (max-width: 960px) {
          .promo-grid {
            grid-template-columns: 1fr;
          }
          .promo-card {
            padding: 28px 20px;
          }
          .promo-title {
            font-size: 1.65rem;
          }
          .promo-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .promo-phone-btn {
            justify-content: center;
          }
          .promo-inline-form {
            flex-direction: column;
          }
          .promo-input {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};
