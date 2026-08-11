import React, { useState } from 'react';
import { Phone, Gift, ArrowRight, Check } from 'lucide-react';

export const PromoBanner = ({ onOpenOrderModal }) => {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    setSubmitted(true);
    setTimeout(() => {
      onOpenOrderModal({
        name: "Скидка 10% на первую машину",
        phone: phone
      });
    }, 400);
  };

  return (
    <section className="promo-banner-section">
      <div className="container">
        <div className="promo-card">
          <div className="promo-content">
            <h2 className="promo-title">Поможем сделать выгодную покупку</h2>
            <p className="promo-desc">
              Получите <strong>скидку 10%</strong> на первую пробную машину, чтобы оценить качество щебня и точность веса уже сейчас.
            </p>

            <div className="promo-actions">
              <a href="tel:+74996863186" className="promo-phone-btn">
                <Phone size={18} />
                <span>+7 (499) 686-31-86</span>
              </a>

              <form onSubmit={handleSubmit} className="promo-inline-form">
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="promo-input"
                  required
                />
                <button type="submit" className="btn btn-primary promo-submit-btn">
                  <span>Получить скидку</span>
                  <ArrowRight size={16} />
                </button>
              </form>
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
          padding: 44px 50px;
          position: relative;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .promo-title {
          font-size: 2.1rem;
          font-weight: 900;
          color: #80A541;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .promo-desc {
          font-size: 1.1rem;
          color: #334155;
          margin-bottom: 28px;
          max-width: 650px;
          line-height: 1.5;
        }

        .promo-desc strong {
          color: #0f172a;
          font-weight: 800;
        }

        .promo-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .promo-phone-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--c-green);
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 800;
          padding: 14px 28px;
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
          padding: 6px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
        }

        .promo-input {
          padding: 10px 14px;
          border: none;
          font-size: 0.95rem;
          outline: none;
          min-width: 200px;
        }

        .promo-submit-btn {
          padding: 10px 20px;
        }

        @media (max-width: 860px) {
          .promo-card {
            padding: 30px 24px;
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
