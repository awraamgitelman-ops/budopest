import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../context/RouterContext';
import { Phone, Mail, MapPin, Clock, Search, ChevronDown, Menu, X, FileText } from 'lucide-react';
import { MegaMenu } from './MegaMenu';

export const Header = ({ onOpenOrderModal, onOpenSearchModal, onOpenLegalModal }) => {
  const { navigate } = useRouter();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const megaMenuTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterMega = () => {
    if (megaMenuTimerRef.current) {
      clearTimeout(megaMenuTimerRef.current);
    }
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeaveMega = () => {
    megaMenuTimerRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 250);
  };

  return (
    <header className="site-header">
      {/* Top Info Bar */}
      <div className="header-top">
        <div className="container header-top-inner">
          <div className="ht-left">
            <a href="tel:+380676863186" className="ht-phone">
              <Phone size={15} className="icon-green" />
              <span>+380 (67) 686-31-86</span>
            </a>
            
            <a
              href="https://wa.me/380676863186?text=%D0%94%D0%BE%D0%B1%D1%80%D0%BE%D0%B3%D0%BE%20%D0%B4%D0%BD%D1%8F!%20%D0%A6%D1%96%D0%BA%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%20%D1%89%D0%B5%D0%B1%D1%96%D0%BD%D1%8C%20%D0%B2%D1%96%D0%B4%20%D0%A2%D0%9E%D0%92%20%D0%91%D0%95%D0%9D%D0%93%D0%A1%20%D0%B7%20%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%BE%D1%8E%20%D0%BF%D0%BE%20%D0%94%D0%BD%D1%96%D0%BF%D1%80%D1%83."
              target="_blank"
              rel="noopener noreferrer"
              className="ht-whatsapp"
              title="Написати у WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <path d="M16 0C7.16 0 0 7.16 0 16C0 18.84 0.74 21.57 2.14 23.97L0 32L8.23 29.84C10.56 31.14 13.23 31.84 16 31.84C24.84 31.84 32 24.68 32 15.84C32 7 24.84 0 16 0Z" fill="#25D366"/>
                <path d="M23.9 19.6C23.5 19.4 21.6 18.4 21.2 18.3C20.8 18.1 20.6 18.1 20.3 18.5C20 18.9 19.3 19.8 19 20.1C18.8 20.3 18.5 20.4 18.1 20.2C17.7 20 16.5 19.6 15 18.3C13.8 17.2 13 15.9 12.8 15.5C12.6 15.1 12.8 14.9 13 14.7C13.2 14.5 13.4 14.2 13.6 14C13.8 13.8 13.9 13.6 14 13.4C14.1 13.2 14.1 13 14 12.8C13.9 12.6 13.1 10.7 12.8 9.9C12.5 9.1 12.2 9.2 12 9.2H11.3C11 9.2 10.6 9.3 10.2 9.7C9.8 10.1 8.8 11 8.8 13C8.8 15 10.2 16.9 10.4 17.2C10.6 17.5 13.2 21.6 17.2 23.3C20.6 24.7 21.3 24.4 22 24.3C23.1 24.2 25.3 23 25.8 21.6C26.3 20.2 26.3 19 26.1 18.8C25.9 18.6 25.6 18.5 25.2 18.3L23.9 19.6Z" fill="#FFFFFF"/>
              </svg>
              <span>WhatsApp / Viber</span>
            </a>

            <a href="mailto:bengs.zakaz@gmail.com" className="ht-email">
              <Mail size={14} className="icon-muted" />
              <span>bengs.zakaz@gmail.com</span>
            </a>
          </div>

          <div className="ht-right">
            <div
              className="ht-info-item clickable"
              onClick={() => navigate('#/warehouses')}
            >
              <MapPin size={14} className="icon-green" />
              <span>м. Дніпро, вул. Журналістів, 9</span>
            </div>
            <div className="ht-info-item">
              <Clock size={14} className="icon-green" />
              <span>Графік: <strong>09:00 — 20:00</strong> (Пн–Нд)</span>
            </div>
            <button
              onClick={onOpenSearchModal}
              className="ht-search-btn"
              title="Пошук по сайту"
            >
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`header-main ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-main-inner">
          {/* Brand Logo */}
          <a
            href="#/"
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              navigate('#/');
            }}
          >
            <svg width="40" height="34" viewBox="0 0 45 38" fill="none" className="logo-svg">
              <path d="M33.7105 19.777C34.0088 19.26 34.7544 19.26 35.0527 19.777L44.895 36.8368C45.1933 37.3538 44.8205 38 44.224 38H24.5392C23.9427 38 23.5699 37.3538 23.8681 36.8368L33.7105 19.777Z" fill="#80A541"/>
              <path d="M9.94734 19.777C10.2456 19.26 10.9912 19.26 11.2895 19.777L21.1319 36.8368C21.4301 37.3538 21.0573 38 20.4608 38H0.776042C0.179535 38 -0.193283 37.3538 0.104971 36.8368L9.94734 19.777Z" fill="#4F2B19"/>
              <path d="M21.7901 0.387724C22.0879 -0.12856 22.8323 -0.129411 23.1313 0.386193L32.5662 16.654C32.7055 16.8941 32.7059 17.1905 32.5671 17.431L23.1289 33.7903C22.831 34.3066 22.0867 34.3075 21.7876 33.7919L12.3527 17.524C12.2134 17.2839 12.2131 16.9875 12.3518 16.7471L21.7901 0.387724Z" fill="#528C36"/>
            </svg>
            <div className="brand-text">
              <span className="brand-title">БЕНГС</span>
              <span className="brand-sub">НЕРУДНІ МАТЕРІАЛИ • ДНІПРО</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <div
              className="nav-item has-dropdown mega-trigger-wrapper"
              onMouseEnter={handleMouseEnterMega}
              onMouseLeave={handleMouseLeaveMega}
            >
              <button
                className={`nav-link catalog-trigger ${isMegaMenuOpen ? 'active' : ''}`}
                onClick={() => navigate('#/catalog/sheben')}
              >
                <span>Каталог</span>
                <ChevronDown size={15} className={`chevron ${isMegaMenuOpen ? 'rotate' : ''}`} />
              </button>

              {isMegaMenuOpen && (
                <MegaMenu
                  onClose={() => setIsMegaMenuOpen(false)}
                  onSelectProduct={(item) => onOpenOrderModal(item)}
                />
              )}
            </div>

            <button onClick={() => navigate('#/prices')} className="nav-link">
              Ціни
            </button>

            <button onClick={() => navigate('#/calculator')} className="nav-link">
              Калькулятор
            </button>
            
            <div className="nav-item has-dropdown">
              <button onClick={() => navigate('#/services')} className="nav-link">
                <span>Послуги</span>
                <ChevronDown size={14} className="chevron" />
              </button>
              <div className="submenu">
                <button onClick={() => navigate('#/services')} className="submenu-btn-item">Всі послуги спецтехніки</button>
                <button onClick={() => navigate('#/services/samoskydy')} className="submenu-btn-item">Оренда самоскидів 10–40 т</button>
                <button onClick={() => navigate('#/services/zemlyani-roboty')} className="submenu-btn-item">Земляні роботи та котловани</button>
                <button onClick={() => navigate('#/services/vyviz-gruntu')} className="submenu-btn-item">Вивіз ґрунту з утилізацією</button>
                <button onClick={() => navigate('#/services/fortyfikaciyi')} className="submenu-btn-item">Матеріали для фортифікацій</button>
              </div>
            </div>

            <button onClick={() => navigate('#/delivery')} className="nav-link">
              Доставка
            </button>
            
            <div className="nav-item has-dropdown">
              <button onClick={() => navigate('#/about')} className="nav-link">
                <span>Про компанію</span>
                <ChevronDown size={14} className="chevron" />
              </button>
              <div className="submenu">
                <button onClick={() => navigate('#/about')} className="submenu-btn-item">Про ТОВ «БЕНГС»</button>
                <button onClick={() => onOpenLegalModal && onOpenLegalModal('requisites')} className="submenu-btn-item">
                  Реквізити (ЄДРПОУ 41963896)
                </button>
                <button onClick={() => navigate('#/certificates')} className="submenu-btn-item">Якість та ДСТУ</button>
                <button onClick={() => navigate('#/warehouses')} className="submenu-btn-item">Кар'єри та перевалки</button>
              </div>
            </div>

            <button onClick={() => navigate('#/articles')} className="nav-link">
              Статті
            </button>

            <button onClick={() => navigate('#/contacts')} className="nav-link">
              Контакти
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="header-actions">
            <button
              onClick={() => onOpenOrderModal({ name: "Запит комерційної пропозиції (КП) від ТОВ БЕНГС" })}
              className="btn btn-outline btn-kp"
            >
              <FileText size={16} />
              <span>Отримати КП</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-toggle"
              aria-label="Меню"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer animate-slide">
          <div className="mobile-phone-block">
            <a href="tel:+380676863186" className="mobile-phone-link">
              <Phone size={18} />
              <span>+380 (67) 686-31-86</span>
            </a>
            <div className="mobile-worktime">09:00 — 20:00 (Щоденно)</div>
          </div>

          <nav className="mobile-nav-links">
            <button
              className="mob-link highlight"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('#/catalog/sheben');
              }}
            >
              📦 Каталог нерудних матеріалів
            </button>
            <button
              className="mob-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('#/prices');
              }}
            >
              💰 Прайс-лист
            </button>
            <button
              className="mob-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('#/calculator');
              }}
            >
              🧮 Калькулятор доставки
            </button>
            <button
              className="mob-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('#/delivery');
              }}
            >
              🚚 Доставка самоскидами 10–40 т
            </button>
            <button
              className="mob-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('#/services');
              }}
            >
              🚜 Послуги спецтехніки
            </button>
            <button
              className="mob-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('#/warehouses');
              }}
            >
              📍 Бази та кар'єри у Дніпрі
            </button>
            <button
              className="mob-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('#/articles');
              }}
            >
              📚 Статті та база знань
            </button>
            <button
              className="mob-link text-left"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLegalModal && onOpenLegalModal('requisites');
              }}
            >
              🏛️ Реквізити ТОВ "БЕНГС"
            </button>
            <button
              className="mob-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('#/contacts');
              }}
            >
              📞 Контакти
            </button>
          </nav>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenOrderModal({ name: "Запит розрахунку вартості щебеню" });
            }}
            className="btn btn-primary btn-block"
          >
            <span>Розрахувати вартість з доставкою</span>
          </button>
        </div>
      )}

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 990;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          background-color: #ffffff;
        }

        .header-top {
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          font-size: 0.8rem;
          color: #475569;
          padding: 6px 0;
        }

        .header-top-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ht-left, .ht-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .ht-phone {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          color: #0f172a;
          text-decoration: none;
        }

        .ht-phone:hover {
          color: var(--c-green-dark);
        }

        .ht-whatsapp {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          color: #15803d;
          background: #dcfce7;
          padding: 2px 8px;
          border-radius: 4px;
          text-decoration: none;
        }

        .ht-whatsapp:hover {
          background: #bbf7d0;
        }

        .ht-email, .ht-info-item {
          display: flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: inherit;
        }

        .ht-info-item.clickable {
          cursor: pointer;
        }

        .ht-info-item.clickable:hover {
          color: var(--c-green-dark);
        }

        .ht-email:hover {
          color: var(--c-green-dark);
        }

        .icon-green {
          color: var(--c-green);
        }

        .icon-muted {
          color: #94a3b8;
        }

        .ht-search-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #e2e8f0;
          border: none;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ht-search-btn:hover {
          background: var(--c-green);
          color: #ffffff;
        }

        .header-main {
          background-color: #ffffff;
          padding: 10px 0;
          transition: all 0.2s ease;
        }

        .header-main-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .logo-svg {
          flex-shrink: 0;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1;
          letter-spacing: -0.5px;
        }

        .brand-sub {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--c-green-dark);
          letter-spacing: 0.6px;
          margin-top: 2px;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-item {
          position: relative;
          padding-bottom: 10px;
          margin-bottom: -10px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 14px;
          font-size: 0.92rem;
          font-weight: 600;
          color: #334155;
          border-radius: var(--radius-sm);
          transition: all 0.15s;
          text-decoration: none;
          border: none;
          background: transparent;
          cursor: pointer;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--c-green-dark);
          background-color: var(--c-green-light);
        }

        .catalog-trigger {
          background-color: #f1f5f9;
          color: #0f172a;
          font-weight: 700;
        }

        .chevron {
          transition: transform 0.2s;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        .submenu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 260px;
          background: #ffffff;
          border-radius: var(--radius-sm);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
          border: 1px solid #e2e8f0;
          padding: 8px 0;
          display: none;
          flex-direction: column;
          z-index: 100;
        }

        .submenu::before {
          content: '';
          position: absolute;
          top: -14px;
          left: 0;
          right: 0;
          height: 14px;
          background: transparent;
        }

        .has-dropdown:hover .submenu {
          display: flex;
          animation: slideDown 0.15s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .submenu-btn-item {
          padding: 10px 18px;
          font-size: 0.88rem;
          color: #334155;
          font-weight: 500;
          transition: all 0.15s;
          text-align: left;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          display: block;
          text-decoration: none;
        }

        .submenu-btn-item:hover {
          background-color: var(--c-green-light);
          color: var(--c-green-dark);
          padding-left: 22px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-kp {
          padding: 9px 18px;
          font-size: 0.9rem;
        }

        .mobile-menu-toggle {
          display: none;
          color: #1f2937;
          padding: 6px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .mobile-drawer {
          background: #ffffff;
          border-top: 1px solid #e5e7eb;
          padding: 20px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .mobile-phone-block {
          background: #f8fafc;
          padding: 14px;
          border-radius: var(--radius-sm);
          margin-bottom: 16px;
          text-align: center;
        }

        .mobile-phone-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--c-green-dark);
          text-decoration: none;
        }

        .mobile-worktime {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 4px;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 20px;
        }

        .mob-link {
          padding: 12px 14px;
          font-size: 0.95rem;
          font-weight: 600;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.15s;
          text-decoration: none;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          width: 100%;
        }

        .mob-link.highlight {
          color: var(--c-green-dark);
          background: var(--c-green-light);
          border-radius: 6px;
          border-bottom: none;
        }

        .mob-link:hover {
          background: #f8fafc;
          color: var(--c-green);
        }

        .btn-block {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .ht-info-item {
            display: none;
          }
          .desktop-nav {
            display: none;
          }
          .mobile-menu-toggle {
            display: block;
          }
        }

        @media (max-width: 640px) {
          .ht-email {
            display: none;
          }
          .btn-kp {
            display: none;
          }
          .brand-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </header>
  );
};
