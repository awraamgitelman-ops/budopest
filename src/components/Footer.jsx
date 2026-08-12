import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Phone, Mail, MapPin, Clock, Building2, FileText, Shield, CheckCircle2 } from 'lucide-react';

export const Footer = ({ onOpenLegalModal }) => {
  const { navigate } = useRouter();

  return (
    <footer id="contacts" className="site-footer">
      <div className="container">
        <div className="footer-main-grid">
          {/* Col 1: Brand & Contacts */}
          <div className="footer-col footer-brand-col">
            <div
              className="footer-logo clickable"
              onClick={() => navigate('#/')}
            >
              <svg width="36" height="30" viewBox="0 0 45 38" fill="none">
                <path d="M33.7105 19.777C34.0088 19.26 34.7544 19.26 35.0527 19.777L44.895 36.8368C45.1933 37.3538 44.8205 38 44.224 38H24.5392C23.9427 38 23.5699 37.3538 23.8681 36.8368L33.7105 19.777Z" fill="#80A541"/>
                <path d="M9.94734 19.777C10.2456 19.26 10.9912 19.26 11.2895 19.777L21.1319 36.8368C21.4301 37.3538 21.0573 38 20.4608 38H0.776042C0.179535 38 -0.193283 37.3538 0.104971 36.8368L9.94734 19.777Z" fill="#80A541"/>
                <path d="M21.7901 0.387724C22.0879 -0.12856 22.8323 -0.129411 23.1313 0.386193L32.5662 16.654C32.7055 16.8941 32.7059 17.1905 32.5671 17.431L23.1289 33.7903C22.831 34.3066 22.0867 34.3075 21.7876 33.7919L12.3527 17.524C12.2134 17.2839 12.2131 16.9875 12.3518 16.7471L21.7901 0.387724Z" fill="#80A541"/>
              </svg>
              <div className="brand-text">
                <span className="footer-brand-title">БЕНГС</span>
                <span className="footer-brand-sub">НЕРУДНІ МАТЕРІАЛИ • ДНІПРО</span>
              </div>
            </div>

            <p className="footer-company-desc">
              Прямі поставки щебеню, піску та ґрунтів з кар'єрів і перевалок Дніпра власними самоскидами 10–40 т.
            </p>

            <div className="footer-contact-list">
              <a href="tel:+380676863186" className="footer-contact-item phone">
                <Phone size={15} />
                <span>+380 (67) 686-31-86</span>
              </a>

              <a href="mailto:bengs.zakaz@gmail.com" className="footer-contact-item mail">
                <Mail size={15} />
                <span>bengs.zakaz@gmail.com</span>
              </a>

              <div
                className="footer-contact-item clickable"
                onClick={() => navigate('#/warehouses')}
              >
                <MapPin size={15} />
                <span>м. Дніпро, вул. Журналістів, 9</span>
              </div>

              <div className="footer-contact-item">
                <Clock size={15} />
                <span>09:00 — 20:00 (щоденно)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Каталог продукції */}
          <div className="footer-col">
            <h4 className="footer-heading">Каталог матеріалів</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => navigate('#/catalog/sheben')} className="footer-nav-btn">
                  Гранітний щебінь (5-20, 20-40)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/catalog/sheben')} className="footer-nav-btn">
                  Шлаковий щебінь (доменний)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/catalog/pesok')} className="footer-nav-btn">
                  Річковий пісок (Дніпро, митий)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/catalog/shps')} className="footer-nav-btn">
                  ЩПС (С4, С5, С7) для доріг
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/catalog/pgs')} className="footer-nav-btn">
                  ПГС та ОПГС для бетону
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/catalog/grunty')} className="footer-nav-btn">
                  Чорнозем та родючий ґрунт
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/catalog/keramzit')} className="footer-nav-btn">
                  Керамзит та гравій
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/catalog/galka')} className="footer-nav-btn">
                  Річкова галька та бутовий камінь
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Клієнтам та партнерам */}
          <div className="footer-col">
            <h4 className="footer-heading">Клієнтам</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => navigate('#/prices')} className="footer-nav-btn">
                  Прайс-лист за тонну та м³
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/calculator')} className="footer-nav-btn">
                  Калькулятор об'єму та доставки
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/delivery')} className="footer-nav-btn">
                  Доставка самоскидами 10–40 т
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/services')} className="footer-nav-btn">
                  Послуги спецтехніки
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/warehouses')} className="footer-nav-btn">
                  Перевалки та автоваги у Дніпрі
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/certificates')} className="footer-nav-btn">
                  Відповідність нормам ДСТУ
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/articles')} className="footer-nav-btn">
                  Статті та база знань
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Правова інформація */}
          <div className="footer-col">
            <h4 className="footer-heading">Інформація</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => onOpenLegalModal && onOpenLegalModal('requisites')} className="footer-nav-btn">
                  <Building2 size={14} className="f-icon" />
                  <span>Реквізити компанії</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalModal && onOpenLegalModal('offer')} className="footer-nav-btn">
                  <FileText size={14} className="f-icon" />
                  <span>Публічна оферта (Договір)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalModal && onOpenLegalModal('delivery')} className="footer-nav-btn">
                  <CheckCircle2 size={14} className="f-icon" />
                  <span>Правила відвантаження та ТТН</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalModal && onOpenLegalModal('privacy')} className="footer-nav-btn">
                  <Shield size={14} className="f-icon" />
                  <span>Політика конфіденційності</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('#/contacts')} className="footer-nav-btn">
                  <span>Контакти та офіс</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="fb-copyright">
            © 2018–2026 ТОВ «БЕНГС». Всі права захищені.
          </div>
          <div className="fb-privacy-links">
            <button onClick={() => onOpenLegalModal && onOpenLegalModal('offer')} className="footer-mini-btn">
              Публічна оферта
            </button>
            <span className="sep">•</span>
            <button onClick={() => onOpenLegalModal && onOpenLegalModal('privacy')} className="footer-mini-btn">
              Конфіденційність
            </button>
            <span className="sep">•</span>
            <button onClick={() => onOpenLegalModal && onOpenLegalModal('requisites')} className="footer-mini-btn">
              Реквізити
            </button>
          </div>
        </div>

        <div className="footer-disclaimer">
          Постачання нерудних будівельних матеріалів з дотриманням нормативів ДСТУ Б В.2.7-75-98 по Дніпру та Дніпропетровській області.
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #181716;
          color: #9ca3af;
          padding: 54px 0 24px;
          border-top: 3px solid var(--c-green);
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.3fr 1.1fr 1fr 1fr;
          gap: 36px;
          margin-bottom: 36px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .footer-logo.clickable {
          cursor: pointer;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .footer-brand-title {
          font-size: 1.3rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.5px;
          line-height: 1;
        }

        .footer-brand-sub {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--c-green);
          letter-spacing: 0.8px;
          margin-top: 3px;
        }

        .footer-company-desc {
          font-size: 0.82rem;
          line-height: 1.5;
          color: #94a3b8;
          margin-bottom: 16px;
        }

        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 0.84rem;
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.15s;
        }

        .footer-contact-item.clickable {
          cursor: pointer;
        }

        .footer-contact-item.clickable:hover {
          color: var(--c-green);
        }

        .footer-contact-item.phone {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
        }

        .footer-contact-item.phone:hover,
        .footer-contact-item.mail:hover {
          color: var(--c-green);
        }

        .footer-contact-item svg {
          color: var(--c-green);
          flex-shrink: 0;
        }

        .footer-heading {
          font-size: 0.88rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
          position: relative;
          padding-bottom: 6px;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 24px;
          height: 2px;
          background-color: var(--c-green);
        }

        .footer-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .footer-nav-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.84rem;
          padding: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: all 0.15s;
          text-align: left;
        }

        .footer-nav-btn:hover {
          color: #ffffff;
          transform: translateX(2px);
        }

        .f-icon {
          color: var(--c-green);
          flex-shrink: 0;
        }

        .footer-bottom-bar {
          padding-top: 20px;
          border-top: 1px solid #292826;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #64748b;
          flex-wrap: wrap;
          gap: 12px;
        }

        .fb-copyright {
          font-weight: 500;
          color: #94a3b8;
        }

        .fb-privacy-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-mini-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.8rem;
          cursor: pointer;
          padding: 0;
          transition: color 0.15s;
        }

        .footer-mini-btn:hover {
          color: var(--c-green);
        }

        .sep {
          color: #475569;
        }

        .footer-disclaimer {
          margin-top: 12px;
          font-size: 0.74rem;
          color: #52525b;
          text-align: center;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
        }

        @media (max-width: 640px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
};
