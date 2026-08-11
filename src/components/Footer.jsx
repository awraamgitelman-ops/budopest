import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
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
                <span>ТОВ "БЕНГС" (ЄДРПОУ 41963896, засн. 2018 р.), Україна, м. Дніпро, вул. Журналістів, 9</span>
              </div>
            </div>

            <div className="footer-sub-links">
              <a href="#warehouses">Схема проїзду</a>
              <a href="#catalog">Карта сайту</a>
            </div>
          </div>

          {/* Col 2: Розділи */}
          <div className="footer-col">
            <h4 className="footer-heading">Розділи</h4>
            <ul className="footer-nav-list">
              <li><a href="#catalog">Каталог щебеню</a></li>
              <li><a href="#prices">Прайс-лист</a></li>
              <li><a href="#services">Послуги спецтехніки</a></li>
              <li><a href="#delivery">Доставка та оплата</a></li>
              <li><a href="#about">Про ТОВ «БЕНГС»</a></li>
              <li><a href="#articles">Статті</a></li>
              <li><a href="#contacts">Контакти</a></li>
            </ul>
          </div>

          {/* Col 3: Нерудні матеріали */}
          <div className="footer-col">
            <h4 className="footer-heading">Нерудні матеріали</h4>
            <ul className="footer-nav-list">
              <li><a href="#catalog">Гранітний щебінь</a></li>
              <li><a href="#catalog">Шлаковий щебінь</a></li>
              <li><a href="#catalog">Гранітний відсів (0-5 мм)</a></li>
              <li><a href="#catalog">Гравійний щебінь</a></li>
              <li><a href="#catalog">Бутовий камінь</a></li>
              <li><a href="#catalog">Пісок річковий</a></li>
              <li><a href="#catalog">ЩПС / ПГС</a></li>
              <li><a href="#catalog">Вторинний щебінь</a></li>
            </ul>
          </div>

          {/* Col 4: Інші матеріали & Badge */}
          <div className="footer-col">
            <h4 className="footer-heading">Інші матеріали</h4>
            <ul className="footer-nav-list">
              <li><a href="#catalog">Протиожеледні реагенти</a></li>
              <li><a href="#catalog">Родючий ґрунт / Чорнозем</a></li>
              <li><a href="#catalog">Кам'яне вугілля</a></li>
            </ul>

            <div className="portal-badge-card">
              <div className="pb-icon-box">
                <div className="pb-square"></div>
              </div>
              <div className="pb-text">
                ТОВ «БЕНГС» (ЄДРПОУ 41963896) — ВЕРИФІКОВАНИЙ ПОСТАЧАЛЬНИК PROZORRO
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="fb-copyright">
            © 2018–2026, ТОВ «БЕНГС» (ЄДРПОУ 41963896). Всі права захищені.
          </div>
          <div className="fb-privacy">
            <a href="#">Політика конфіденційності</a>
          </div>
        </div>

        <div className="footer-disclaimer">
          Інформація та ціни на сайті мають ознайомчий характер та розраховуються індивідуально відповідно до обсягу та відстані доставки.
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #1f1d1b;
          color: #d1d5db;
          padding: 60px 0 24px;
          border-top: 4px solid var(--c-green);
        }

        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr 1.2fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .footer-brand-title {
          font-size: 1.45rem;
          font-weight: 900;
          letter-spacing: 1px;
          color: #80A541;
          display: block;
          line-height: 1;
        }

        .footer-brand-sub {
          font-size: 0.65rem;
          font-weight: 700;
          color: #9ca3af;
          letter-spacing: 1.5px;
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
          font-size: 0.9rem;
          color: #e5e7eb;
          transition: color 0.15s;
        }

        .footer-contact-item.phone {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
        }

        .footer-contact-item.mail {
          color: #80A541;
          font-weight: 600;
        }

        .footer-contact-item:hover {
          color: #80A541;
        }

        .footer-sub-links {
          display: flex;
          gap: 18px;
          font-size: 0.82rem;
        }

        .footer-sub-links a {
          color: #9ca3af;
          text-decoration: underline;
        }

        .footer-sub-links a:hover {
          color: #ffffff;
        }

        .footer-heading {
          font-size: 1.05rem;
          font-weight: 800;
          color: #80A541;
          margin-bottom: 18px;
        }

        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-nav-list a {
          font-size: 0.9rem;
          color: #cbd5e1;
          transition: all 0.15s;
        }

        .footer-nav-list a:hover {
          color: #80A541;
          padding-left: 4px;
        }

        .portal-badge-card {
          margin-top: 24px;
          background: #ffffff;
          color: #0f172a;
          border-radius: 8px;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pb-square {
          width: 34px;
          height: 34px;
          border: 4px solid #0284c7;
          border-radius: 4px;
        }

        .pb-text {
          font-size: 0.72rem;
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: 0.5px;
          color: #1e293b;
        }

        .footer-bottom-bar {
          border-top: 1px solid #332f2c;
          padding-top: 24px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          color: #9ca3af;
        }

        .fb-privacy a {
          color: #9ca3af;
          transition: color 0.15s;
        }

        .fb-privacy a:hover {
          color: #ffffff;
        }

        .footer-disclaimer {
          font-size: 0.72rem;
          color: #6b7280;
          text-align: center;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 640px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom-bar {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </footer>
  );
};
