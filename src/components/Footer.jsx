import React from 'react';
import { Phone, Mail, MapPin, Building2, Briefcase, FileText, Shield, CheckCircle2 } from 'lucide-react';

export const Footer = ({ onOpenLegalModal, onOpenCareerModal }) => {
  return (
    <footer id="contacts" className="site-footer">
      <div className="container">
        <div className="footer-main-grid">
          {/* Col 1: Brand & Contacts */}
          <div className="footer-col footer-brand-col">
            <div className="footer-logo">
              <svg width="40" height="34" viewBox="0 0 45 38" fill="none">
                <path d="M33.7105 19.777C34.0088 19.26 34.7544 19.26 35.0527 19.777L44.895 36.8368C45.1933 37.3538 44.8205 38 44.224 38H24.5392C23.9427 38 23.5699 37.3538 23.8681 36.8368L33.7105 19.777Z" fill="#80A541"/>
                <path d="M9.94734 19.777C10.2456 19.26 10.9912 19.26 11.2895 19.777L21.1319 36.8368C21.4301 37.3538 21.0573 38 20.4608 38H0.776042C0.179535 38 -0.193283 37.3538 0.104971 36.8368L9.94734 19.777Z" fill="#80A541"/>
                <path d="M21.7901 0.387724C22.0879 -0.12856 22.8323 -0.129411 23.1313 0.386193L32.5662 16.654C32.7055 16.8941 32.7059 17.1905 32.5671 17.431L23.1289 33.7903C22.831 34.3066 22.0867 34.3075 21.7876 33.7919L12.3527 17.524C12.2134 17.2839 12.2131 16.9875 12.3518 16.7471L21.7901 0.387724Z" fill="#80A541"/>
              </svg>
              <div className="brand-text">
                <span className="footer-brand-title">БЕНГС</span>
                <span className="footer-brand-sub">НЕРУДНІ МАТЕРІАЛИ • ДНІПРО</span>
              </div>
            </div>

            <div className="footer-contact-list">
              <a href="tel:+380676863186" className="footer-contact-item phone">
                <Phone size={16} />
                <span>+380 (67) 686-31-86</span>
              </a>

              <a href="mailto:bengs.zakaz@gmail.com" className="footer-contact-item mail">
                <Mail size={16} />
                <span>bengs.zakaz@gmail.com</span>
              </a>

              <div className="footer-contact-item address">
                <MapPin size={16} />
                <span>ТОВ "БЕНГС" (ЄДРПОУ 41963896, засн. 2018 р.), м. Дніпро, вул. Журналістів, 9</span>
              </div>
            </div>

            <div className="footer-sub-links">
              <button onClick={() => onOpenLegalModal('requisites')} className="footer-btn-link">
                <Building2 size={13} />
                <span>Реквізити ТОВ "БЕНГС"</span>
              </button>
              <button onClick={() => onOpenCareerModal()} className="footer-btn-link career-highlight">
                <Briefcase size={13} />
                <span>Вакансії (робота у Дніпрі)</span>
              </button>
            </div>
          </div>

          {/* Col 2: Каталог продукції */}
          <div className="footer-col">
            <h4 className="footer-heading">Каталог матеріалів</h4>
            <ul className="footer-nav-list">
              <li><a href="#catalog-items">Гранітний щебінь (5-20, 20-40)</a></li>
              <li><a href="#catalog-items">Шлаковий щебінь (доменний)</a></li>
              <li><a href="#catalog-items">Річковий пісок (Дніпро, митий)</a></li>
              <li><a href="#catalog-items">ЩПС С5, С7 (щебенево-піщана суміш)</a></li>
              <li><a href="#catalog-items">ПГС та ОПГС для бетону</a></li>
              <li><a href="#catalog-items">Чорнозем та родючий ґрунт</a></li>
              <li><a href="#catalog-items">Керамзит утеплювач</a></li>
              <li><a href="#catalog-items">Річкова галька та бутовий камінь</a></li>
            </ul>
          </div>

          {/* Col 3: Послуги та клієнтам */}
          <div className="footer-col">
            <h4 className="footer-heading">Клієнтам та партнерам</h4>
            <ul className="footer-nav-list">
              <li><a href="#prices">Прайс-лист за тонну та м³</a></li>
              <li><a href="#calculator">Калькулятор об'єму та ваги</a></li>
              <li><a href="#delivery">Доставка самоскидами 10–40 т</a></li>
              <li><a href="#warehouses">Перевалки та автоваги у Дніпрі</a></li>
              <li><a href="#faq">Часті запитання (FAQ)</a></li>
              <li>
                <button onClick={() => onOpenCareerModal()} className="footer-nav-btn">
                  Вакансії водіїв та менеджерів
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Юридичний блок & Документи */}
          <div className="footer-col">
            <h4 className="footer-heading">Правова інформація</h4>
            <ul className="footer-nav-list">
              <li>
                <button onClick={() => onOpenLegalModal('requisites')} className="footer-nav-btn">
                  <Building2 size={14} className="f-icon" />
                  <span>Реквізити та код ЄДРПОУ</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalModal('offer')} className="footer-nav-btn">
                  <FileText size={14} className="f-icon" />
                  <span>Публічна оферта (Договір)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalModal('delivery')} className="footer-nav-btn">
                  <CheckCircle2 size={14} className="f-icon" />
                  <span>Правила відвантаження та ТТН</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalModal('privacy')} className="footer-nav-btn">
                  <Shield size={14} className="f-icon" />
                  <span>Політика конфіденційності</span>
                </button>
              </li>
            </ul>

            <div className="portal-badge-card">
              <div className="pb-icon-box">
                <CheckCircle2 size={20} color="#80A541" />
              </div>
              <div className="pb-text">
                ТОВ «БЕНГС» (ЄДРПОУ 41963896) — ОФІЦІЙНИЙ ПЛАТНИК ПОДАТКІВ З 2018 РОКУ
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="fb-copyright">
            © 2018–2026, ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "БЕНГС" (ЄДРПОУ 41963896). Всі права захищені.
          </div>
          <div className="fb-privacy-links">
            <button onClick={() => onOpenLegalModal('offer')} className="footer-mini-btn">
              Публічна оферта
            </button>
            <span className="sep">•</span>
            <button onClick={() => onOpenLegalModal('privacy')} className="footer-mini-btn">
              Політика конфіденційності
            </button>
            <span className="sep">•</span>
            <button onClick={() => onOpenLegalModal('requisites')} className="footer-mini-btn">
              Реквізити
            </button>
          </div>
        </div>

        <div className="footer-disclaimer">
          Офіційне постачання нерудних будівельних матеріалів з дотриманням нормативів ДСТУ Б В.2.7-75-98. Графік роботи перевалок та логістики: 09:00 — 20:00 щоденно.
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #1a1918;
          color: #d1d5db;
          padding: 60px 0 24px;
          border-top: 4px solid var(--c-green);
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.3fr 1.1fr 1fr 1.2fr;
          gap: 36px;
          margin-bottom: 40px;
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .footer-brand-title {
          font-size: 1.4rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.5px;
          line-height: 1;
        }

        .footer-brand-sub {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--c-green);
          letter-spacing: 0.8px;
          margin-top: 3px;
        }

        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: #cbd5e1;
          line-height: 1.4;
          text-decoration: none;
          transition: color 0.15s;
        }

        .footer-contact-item.phone {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
        }

        .footer-contact-item.phone:hover,
        .footer-contact-item.mail:hover {
          color: var(--c-green);
        }

        .footer-contact-item svg {
          color: var(--c-green);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .footer-sub-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: auto;
        }

        .footer-btn-link {
          background: transparent;
          border: 1px solid #334155;
          color: #94a3b8;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.15s;
          text-align: left;
        }

        .footer-btn-link:hover {
          color: #ffffff;
          border-color: var(--c-green);
          background: rgba(133, 180, 42, 0.1);
        }

        .footer-btn-link.career-highlight {
          color: #ffffff;
          border-color: var(--c-green);
          background: rgba(133, 180, 42, 0.15);
        }

        .footer-heading {
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 18px;
          position: relative;
          padding-bottom: 8px;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 30px;
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

        .footer-nav-list a {
          color: #94a3b8;
          font-size: 0.85rem;
          text-decoration: none;
          transition: all 0.15s;
          display: block;
        }

        .footer-nav-list a:hover {
          color: #ffffff;
          transform: translateX(3px);
        }

        .footer-nav-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 0.85rem;
          padding: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.15s;
          text-align: left;
        }

        .footer-nav-btn:hover {
          color: #ffffff;
          transform: translateX(3px);
        }

        .f-icon {
          color: var(--c-green);
          flex-shrink: 0;
        }

        .portal-badge-card {
          margin-top: 20px;
          padding: 12px;
          background: #262422;
          border: 1px solid #383532;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pb-text {
          font-size: 0.72rem;
          font-weight: 700;
          color: #cbd5e1;
          line-height: 1.3;
        }

        .footer-bottom-bar {
          padding-top: 24px;
          border-top: 1px solid #2d2b28;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          color: #64748b;
          flex-wrap: wrap;
          gap: 12px;
        }

        .fb-copyright {
          font-weight: 600;
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
          font-size: 0.82rem;
          cursor: pointer;
          padding: 0;
          transition: color 0.15s;
        }

        .footer-mini-btn:hover {
          color: var(--c-green);
          text-decoration: underline;
        }

        .sep {
          color: #475569;
        }

        .footer-disclaimer {
          margin-top: 14px;
          font-size: 0.76rem;
          color: #475569;
          text-align: center;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 640px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
            gap: 28px;
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
