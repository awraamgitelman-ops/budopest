import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, PhoneCall, Clock } from 'lucide-react';

export const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: 'Гранітний щебінь 5-20 мм',
    volume: '25 тонн',
    address: '',
    comment: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <section id="order-form-section" className="section order-form-section">
      <div className="container">
        <div className="order-form-wrapper">
          <div className="of-grid">
            {/* Left Info Column */}
            <div className="of-info">
              <div className="badge badge-green mb-2">Оперативний розрахунок</div>
              <h2 className="of-title">Замовте щебінь за вигідною ціною з доставкою по Дніпру</h2>
              <p className="of-desc">
                Заповніть форму — наш фахівець зателефонує вам протягом <strong>5 хвилин</strong>, уточнить деталі об'єкта та розрахує персональну оптову знижку.
              </p>

              <div className="of-perks">
                <div className="of-perk">
                  <div className="op-icon"><Clock size={20} /></div>
                  <div>
                    <strong>Розрахунок за 5 хвилин:</strong> оперативно підберемо найближчий кар'єр і потрібний тоннаж самоскида.
                  </div>
                </div>
                <div className="of-perk">
                  <div className="op-icon"><ShieldCheck size={20} /></div>
                  <div>
                    <strong>Фіксація ціни:</strong> гарантуємо незмінність вартості після підтвердження замовлення.
                  </div>
                </div>
                <div className="of-perk">
                  <div className="op-icon"><PhoneCall size={20} /></div>
                  <div>
                    <strong>Прямий зв'язок:</strong> або телефонуйте щоденно з 09:00 до 20:00 за номером <a href="tel:+380676863186">+380 (67) 686-31-86</a>.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="of-form-card">
              {isSuccess ? (
                <div className="of-success-state animate-fade">
                  <div className="success-icon-circle">
                    <CheckCircle2 size={44} color="#16a34a" />
                  </div>
                  <h3 className="success-title">Дякуємо за заявку!</h3>
                  <p className="success-desc">
                    Ми отримали ваш запит на <strong>{formData.product}</strong> ({formData.volume}). Менеджер зв'яжеться з вами за номером <strong>{formData.phone}</strong> протягом 5 хвилин.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        phone: '',
                        product: 'Гранітний щебінь 5-20 мм',
                        volume: '25 тонн',
                        address: '',
                        comment: ''
                      });
                    }}
                    className="btn btn-outline"
                  >
                    Надіслати ще одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="of-form">
                  <h3 className="form-card-title">Форма швидкого замовлення</h3>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Ваше ім'я</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Олександр"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Телефон <span className="req">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+380 (__) ___-__-__"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Тип і фракція матеріалу</label>
                      <input
                        type="text"
                        name="product"
                        placeholder="Наприклад: Гранітний 5-20 мм"
                        value={formData.product}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label>Об'єм (т або м³)</label>
                      <input
                        type="text"
                        name="volume"
                        placeholder="Наприклад: 30 тонн"
                        value={formData.volume}
                        onChange={handleChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Адреса об'єкта / Район доставки</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="м. Дніпро, Набережна Перемоги або район"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Коментар до замовлення (необов'язково)</label>
                    <textarea
                      name="comment"
                      rows="2"
                      placeholder="Вкажіть особливості під'їзду, форму оплати (з ПДВ/без) або бажаний час..."
                      value={formData.comment}
                      onChange={handleChange}
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg btn-block of-submit-btn"
                  >
                    <Send size={18} />
                    <span>{isSubmitting ? 'Відправка...' : 'Розрахувати вартість зі знижкою'}</span>
                  </button>

                  <div className="form-privacy-note">
                    Натискаючи кнопку, ви погоджуєтесь з Політикою обробки персональних даних.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .order-form-section {
          background-color: #ffffff;
        }

        .order-form-wrapper {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-radius: var(--radius-xl);
          padding: 50px;
          color: #ffffff;
          box-shadow: 0 20px 45px rgba(15, 23, 42, 0.2);
        }

        .of-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .of-title {
          font-size: 2.2rem;
          font-weight: 900;
          line-height: 1.2;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .of-desc {
          font-size: 1.05rem;
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .of-desc strong {
          color: var(--c-green);
        }

        .of-perks {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .of-perk {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 0.92rem;
          color: #94a3b8;
          line-height: 1.5;
        }

        .of-perk strong {
          color: #f1f5f9;
        }

        .of-perk a {
          color: var(--c-green);
          font-weight: 700;
        }

        .op-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(133, 180, 42, 0.15);
          color: var(--c-green);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .of-form-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 36px;
          color: #1f2937;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }

        .form-card-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 20px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .form-group {
          margin-bottom: 14px;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: #374151;
          margin-bottom: 6px;
        }

        .req {
          color: #ef4444;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: inherit;
          color: #111827;
          outline: none;
          transition: border-color 0.15s;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: var(--c-green);
        }

        .of-submit-btn {
          margin-top: 8px;
          padding: 14px;
        }

        .form-privacy-note {
          font-size: 0.75rem;
          color: #9ca3af;
          text-align: center;
          margin-top: 12px;
        }

        .of-success-state {
          text-align: center;
          padding: 20px 0;
        }

        .success-icon-circle {
          display: inline-flex;
          margin-bottom: 16px;
        }

        .success-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 10px;
        }

        .success-desc {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        @media (max-width: 1024px) {
          .order-form-wrapper {
            padding: 36px 24px;
          }
          .of-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .of-title {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 640px) {
          .form-row-2 {
            grid-template-columns: 1fr;
          }
          .of-form-card {
            padding: 24px 18px;
          }
        }
      `}</style>
    </section>
  );
};
