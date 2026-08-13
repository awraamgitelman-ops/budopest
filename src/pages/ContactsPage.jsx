import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Phone, Mail, MapPin, Clock, FileText, MessageSquare } from 'lucide-react';
import { OrderForm } from '../components/OrderForm';

export const ContactsPage = ({ onOpenLegalModal }) => {
  const { navigate } = useRouter();

  return (
    <div className="contacts-page-wrapper">
      <div className="contacts-hero">
        <div className="container">
          <div className="badge badge-green mb-2">Зв'яжіться з нами</div>
          <h1 className="contacts-hero-title">Контакти «РУД МОНОЛІТ» у Дніпрі</h1>
          <p className="contacts-hero-subtitle">
            Офіс оптових продажів, відділ логістики, контакти диспетчерів перевалок та чергового вагового контролю підприємства ТОВ «БЕНГС».
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="contacts-main-grid">
          {/* Left Column: Direct Contacts */}
          <div className="contacts-cards-col">
            <div className="contact-info-card">
              <h3 className="cic-title">Відділ продажів та логістики</h3>

              <div className="cic-item">
                <Phone size={18} className="icon-green" />
                <div>
                  <span className="cic-label">Багатоканальний телефон:</span>
                  <a href="tel:+380988612938" className="cic-link phone">
                    +380 (98) 861-29-38
                  </a>
                  <span className="cic-sub">Щоденно з 09:00 до 20:00</span>
                </div>
              </div>

              <div className="cic-item">
                <MessageSquare size={18} className="icon-green" />
                <div>
                  <span className="cic-label">Месенджери для швидкого замовлення:</span>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
                    <a
                      href="https://t.me/rudmonolit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cic-link"
                      style={{ color: '#0284c7', fontWeight: 600 }}
                    >
                      Telegram (@rudmonolit)
                    </a>
                    <span>•</span>
                    <a
                      href="viber://chat?number=%2B380988612938"
                      className="cic-link"
                      style={{ color: '#7360f2', fontWeight: 600 }}
                    >
                      Viber (+380988612938)
                    </a>
                    <span>•</span>
                    <a
                      href="https://wa.me/380988612938"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cic-link"
                      style={{ color: '#16a34a', fontWeight: 600 }}
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="cic-item">
                <Mail size={18} className="icon-green" />
                <div>
                  <span className="cic-label">Електронна пошта для заявок та рахунків:</span>
                  <a href="mailto:rudmonolit@gmail.com" className="cic-link">
                    rudmonolit@gmail.com
                  </a>
                </div>
              </div>

              <div className="cic-item">
                <Clock size={18} className="icon-green" />
                <div>
                  <span className="cic-label">Графік роботи:</span>
                  <strong>09:00 — 20:00 (Щоденно без вихідних)</strong>
                </div>
              </div>
            </div>

            {/* Addresses Card */}
            <div className="contact-info-card">
              <h3 className="cic-title">Адреса офісу та майданчиків відвантаження</h3>

              <div className="cic-item">
                <MapPin size={18} className="icon-green" />
                <div>
                  <strong>Головний офіс «РУД МОНОЛІТ» (ТОВ «БЕНГС»):</strong>
                  <p className="cic-addr">м. Дніпро, вул. Журналістів, 3 (відділ продажів, договори)</p>
                </div>
              </div>

              <div className="cic-item">
                <MapPin size={18} className="icon-green" />
                <div>
                  <strong>Термінал «Правий берег» (автоваги 80т, самовивіз):</strong>
                  <p className="cic-addr">м. Дніпро, вул. Набережна Заводська, 82 (стоянка самоскидів)</p>
                </div>
              </div>

              <div className="cic-item">
                <MapPin size={18} className="icon-green" />
                <div>
                  <strong>Любимівський гранітний кар'єр:</strong>
                  <p className="cic-addr">Дніпропетровська обл., с. Любимівка (пряме кар'єрне навантаження)</p>
                </div>
              </div>

              <div className="cic-item">
                <FileText size={18} className="icon-green" />
                <div>
                  <strong>Юридична адреса:</strong>
                  <p className="cic-addr">Україна, 49051, м. Дніпро, вул. Калинова, буд. 1</p>
                  <button
                    onClick={() => {
                      if (navigate) navigate('#/legal/requisites');
                      else if (onOpenLegalModal) onOpenLegalModal('requisites');
                    }}
                    className="btn btn-outline btn-sm mt-2"
                  >
                    Повні реквізити (ЄДРПОУ 41963896)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Order & Callback Form */}
          <div className="contacts-form-col">
            <OrderForm compact={true} />
          </div>
        </div>
      </div>

      <style>{`
        .contacts-page-wrapper {
          background: #ffffff;
          padding-bottom: 60px;
        }

        .contacts-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 50px 0 40px;
        }

        .contacts-hero-title {
          font-size: 2.3rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 12px;
          line-height: 1.2;
        }

        .contacts-hero-subtitle {
          font-size: 1.05rem;
          color: #cbd5e1;
          max-width: 800px;
          line-height: 1.5;
        }

        .contacts-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .contacts-cards-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-info-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-lg);
          padding: 28px;
        }

        .cic-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 20px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 12px;
        }

        .cic-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 18px;
        }

        .cic-item:last-child {
          margin-bottom: 0;
        }

        .cic-label {
          display: block;
          font-size: 0.78rem;
          color: #64748b;
          margin-bottom: 2px;
        }

        .cic-link {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0f172a;
          text-decoration: none;
          transition: color 0.15s;
        }

        .cic-link.phone {
          font-size: 1.25rem;
          font-weight: 900;
          color: var(--c-green-dark);
        }

        .cic-link:hover {
          color: var(--c-green);
        }

        .cic-sub {
          display: block;
          font-size: 0.75rem;
          color: #94a3b8;
          margin-top: 2px;
        }

        .cic-addr {
          font-size: 0.88rem;
          color: #475569;
          margin: 2px 0 0;
        }

        @media (max-width: 900px) {
          .contacts-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
