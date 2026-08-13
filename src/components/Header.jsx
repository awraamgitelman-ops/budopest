import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../context/RouterContext';
import { Phone, Mail, MapPin, Clock, Search, ChevronDown, Menu, X, FileText, MessageCircle, ChevronRight, Layers, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { MAIN_SECTIONS } from '../data/catalogData';
import { SERVICES_DATA } from '../data/servicesData';

export const Header = ({ onOpenOrderModal, onOpenSearchModal, onOpenLegalModal }) => {
  const { navigate } = useRouter();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState({
    catalog: true,
    services: false,
    about: false
  });
  const megaMenuTimerRef = useRef(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleAccordion = (key) => {
    setExpandedAccordion(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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

  const handleViberClick = (e) => {
    e.preventDefault();
    const phone = '380988612938';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `viber://chat?number=${phone}`;
      setTimeout(() => {
        window.location.href = `https://viber.click/${phone}`;
      }, 500);
    } else {
      window.location.href = `viber://chat?number=%2B${phone}`;
      setTimeout(() => {
        window.open(`https://viber.click/${phone}`, '_blank');
      }, 500);
    }
  };

  return (
    <header className="site-header">
      {/* Top Info Bar */}
      <div className="header-top">
        <div className="container header-top-inner">
          <div className="ht-left">
            <a href="tel:+380988612938" className="ht-phone">
              <Phone size={15} className="icon-green" />
              <span>+380 (98) 861-29-38</span>
            </a>
            
            {/* Messengers Row: WhatsApp, Telegram, Viber */}
            <div className="ht-messengers">
              <a
                href="https://wa.me/380988612938?text=%D0%94%D0%BE%D0%B1%D1%80%D0%BE%D0%B3%D0%BE%20%D0%B4%D0%BD%D1%8F!%20%D0%A6%D1%96%D0%BA%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%20%D1%89%D0%B5%D0%B1%D1%96%D0%BD%D1%8C%20%D0%B2%D1%96%D0%B4%20%D0%A0%D0%A3%D0%94%20%D0%9C%D0%9E%D0%9D%D0%9E%D0%9B%D0%86%D0%A2%20%D0%B7%20%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%BE%D1%8E%20%D0%BF%D0%BE%20%D0%94%D0%BD%D1%96%D0%BF%D1%80%D1%83."
                target="_blank"
                rel="noopener noreferrer"
                className="msg-btn msg-whatsapp"
                title="Написати у WhatsApp"
              >
                <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
                  <path d="M16 0C7.16 0 0 7.16 0 16C0 18.84 0.74 21.57 2.14 23.97L0 32L8.23 29.84C10.56 31.14 13.23 31.84 16 31.84C24.84 31.84 32 24.68 32 15.84C32 7 24.84 0 16 0Z" fill="#25D366"/>
                  <path d="M23.9 19.6C23.5 19.4 21.6 18.4 21.2 18.3C20.8 18.1 20.6 18.1 20.3 18.5C20 18.9 19.3 19.8 19 20.1C18.8 20.3 18.5 20.4 18.1 20.2C17.7 20 16.5 19.6 15 18.3C13.8 17.2 13 15.9 12.8 15.5C12.6 15.1 12.8 14.9 13 14.7C13.2 14.5 13.4 14.2 13.6 14C13.8 13.8 13.9 13.6 14 13.4C14.1 13.2 14.1 13 14 12.8C13.9 12.6 13.1 10.7 12.8 9.9C12.5 9.1 12.2 9.2 12 9.2H11.3C11 9.2 10.6 9.3 10.2 9.7C9.8 10.1 8.8 11 8.8 13C8.8 15 10.2 16.9 10.4 17.2C10.6 17.5 13.2 21.6 17.2 23.3C20.6 24.7 21.3 24.4 22 24.3C23.1 24.2 25.3 23 25.8 21.6C26.3 20.2 26.3 19 26.1 18.8C25.9 18.6 25.6 18.5 25.2 18.3L23.9 19.6Z" fill="#FFFFFF"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              <a
                href="https://t.me/rudmonolit"
                target="_blank"
                rel="noopener noreferrer"
                className="msg-btn msg-telegram"
                title="Написати у Telegram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#29B6F6"/>
                  <path d="M5.4 11.9L16.8 7.3C17.3 7.1 17.8 7.4 17.7 8L15.7 17.2C15.6 17.7 15.1 17.9 14.7 17.6L11.5 15.2L9.9 16.7C9.7 16.9 9.4 16.8 9.4 16.5V14.1L15.3 8.7C15.5 8.5 15.3 8.2 15 8.4L7.8 13L5.4 11.9Z" fill="#FFFFFF"/>
                </svg>
                <span>Telegram</span>
              </a>

              <a
                href="https://viber.click/380988612938"
                onClick={handleViberClick}
                target="_blank"
                rel="noopener noreferrer"
                className="msg-btn msg-viber"
                title="Написати у Viber"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="12" fill="#7360F2"/>
                  <path d="M17.5 13.8C16.9 13.5 15.7 12.9 15.4 12.8C15.1 12.7 14.9 12.7 14.7 13C14.4 13.3 13.9 13.9 13.7 14.2C13.5 14.4 13.3 14.5 13 14.3C12.7 14.2 11.7 13.8 10.6 12.7C9.7 11.9 9.1 10.9 8.9 10.6C8.7 10.3 8.9 10.1 9 10C9.1 9.9 9.3 9.7 9.4 9.5C9.6 9.3 9.6 9.2 9.7 9C9.8 8.8 9.8 8.7 9.7 8.5C9.6 8.3 9 6.8 8.7 6.2C8.5 5.6 8.2 5.7 8 5.7H7.4C7.2 5.7 6.9 5.8 6.6 6.1C6.3 6.4 5.6 7.1 5.6 8.6C5.6 10.1 6.7 11.5 6.9 11.7C7.1 12 9.1 15.2 12.2 16.5C14.8 17.6 15.3 17.4 15.9 17.3C16.7 17.2 18.4 16.3 18.8 15.2C19.2 14.1 19.2 13.2 19 13C18.9 12.8 18.6 12.7 17.5 13.8Z" fill="#FFFFFF"/>
                </svg>
                <span>Viber</span>
              </a>
            </div>

            <a href="mailto:rudmonolit@gmail.com" className="ht-email">
              <Mail size={14} className="icon-muted" />
              <span>rudmonolit@gmail.com</span>
            </a>
          </div>

          <div className="ht-right">
            <div className="ht-item">
              <MapPin size={15} className="icon-green" />
              <span>м. Дніпро, вул. Журналістів, 3</span>
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
            <img
              src="/images/logo_rud_monolit.png"
              alt="РУД МОНОЛІТ"
              className="header-logo-img"
            />
            <div className="brand-text">
              <span className="brand-title">РУД МОНОЛІТ</span>
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
                <button onClick={() => navigate('#/legal/requisites')} className="submenu-btn-item">
                  Реєстраційні дані (ЄДРПОУ 41963896)
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
              onClick={() => onOpenOrderModal({ name: "Запит безкоштовної консультації фахівця" })}
              className="btn btn-outline btn-kp"
            >
              <MessageCircle size={16} />
              <span>Консультація</span>
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

      {/* Mobile Navigation Side Drawer with Backdrop */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay animate-fade" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            {/* Drawer Header */}
            <div className="mobile-drawer-header">
              <div className="md-brand">
                <img src="/images/logo_rud_monolit.png" alt="РУД МОНОЛІТ" className="md-logo" />
                <div>
                  <div className="md-title">РУД МОНОЛІТ</div>
                  <div className="md-sub">ТОВ «БЕНГС» • м. Дніпро</div>
                </div>
              </div>
              <button
                className="md-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Закрити меню"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Contact & Messengers Card */}
            <div className="md-contact-card">
              <a href="tel:+380988612938" className="md-phone-link">
                <div className="md-phone-icon">
                  <Phone size={17} />
                </div>
                <div>
                  <span className="md-phone-num">+380 (98) 861-29-38</span>
                  <span className="md-phone-hint">09:00 — 20:00 (Щоденно)</span>
                </div>
              </a>

              <div className="md-messengers-row">
                <a
                  href="https://t.me/rudmonolit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md-msg-item md-msg-tg"
                  title="Telegram"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="12" fill="#29B6F6"/>
                    <path d="M5.4 11.9L16.8 7.3C17.3 7.1 17.8 7.4 17.7 8L15.7 17.2C15.6 17.7 15.1 17.9 14.7 17.6L11.5 15.2L9.9 16.7C9.7 16.9 9.4 16.8 9.4 16.5V14.1L15.3 8.7C15.5 8.5 15.3 8.2 15 8.4L7.8 13L5.4 11.9Z" fill="#FFFFFF"/>
                  </svg>
                  <span>Telegram</span>
                </a>
                <a
                  href="https://viber.click/380988612938"
                  onClick={handleViberClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md-msg-item md-msg-vb"
                  title="Viber"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="12" fill="#7360F2"/>
                    <path d="M17.5 13.8C16.9 13.5 15.7 12.9 15.4 12.8C15.1 12.7 14.9 12.7 14.7 13C14.4 13.3 13.9 13.9 13.7 14.2C13.5 14.4 13.3 14.5 13 14.3C12.7 14.2 11.7 13.8 10.6 12.7C9.7 11.9 9.1 10.9 8.9 10.6C8.7 10.3 8.9 10.1 9 10C9.1 9.9 9.3 9.7 9.4 9.5C9.6 9.3 9.6 9.2 9.7 9C9.8 8.8 9.8 8.7 9.7 8.5C9.6 8.3 9 6.8 8.7 6.2C8.5 5.6 8.2 5.7 8 5.7H7.4C7.2 5.7 6.9 5.8 6.6 6.1C6.3 6.4 5.6 7.1 5.6 8.6C5.6 10.1 6.7 11.5 6.9 11.7C7.1 12 9.1 15.2 12.2 16.5C14.8 17.6 15.3 17.4 15.9 17.3C16.7 17.2 18.4 16.3 18.8 15.2C19.2 14.1 19.2 13.2 19 13C18.9 12.8 18.6 12.7 17.5 13.8Z" fill="#FFFFFF"/>
                  </svg>
                  <span>Viber</span>
                </a>
                <a
                  href="https://wa.me/380988612938?text=%D0%94%D0%BE%D0%B1%D1%80%D0%BE%D0%B3%D0%BE%20%D0%B4%D0%BD%D1%8F!%20%D0%A6%D1%96%D0%BA%D0%B0%D0%B2%D0%B8%D1%82%D1%8C%20%D1%89%D0%B5%D0%B1%D1%96%D0%BD%D1%8C%20%D0%B2%D1%96%D0%B4%20%D0%A0%D0%A3%D0%94%20%D0%9C%D0%9E%D0%9D%D0%9E%D0%9B%D0%86%D0%A2%20%D0%B7%20%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%BE%D1%8E%20%D0%BF%D0%BE%20%D0%94%D0%BD%D1%96%D0%BF%D1%80%D1%83."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md-msg-item md-msg-wa"
                  title="WhatsApp"
                >
                  <svg width="15" height="15" viewBox="0 0 32 32" fill="none">
                    <path d="M16 0C7.16 0 0 7.16 0 16C0 18.84 0.74 21.57 2.14 23.97L0 32L8.23 29.84C10.56 31.14 13.23 31.84 16 31.84C24.84 31.84 32 24.68 32 15.84C32 7 24.84 0 16 0Z" fill="#25D366"/>
                    <path d="M23.9 19.6C23.5 19.4 21.6 18.4 21.2 18.3C20.8 18.1 20.6 18.1 20.3 18.5C20 18.9 19.3 19.8 19 20.1C18.8 20.3 18.5 20.4 18.1 20.2C17.7 20 16.5 19.6 15 18.3C13.8 17.2 13 15.9 12.8 15.5C12.6 15.1 12.8 14.9 13 14.7C13.2 14.5 13.4 14.2 13.6 14C13.8 13.8 13.9 13.6 14 13.4C14.1 13.2 14.1 13 14 12.8C13.9 12.6 13.1 10.7 12.8 9.9C12.5 9.1 12.2 9.2 12 9.2H11.3C11 9.2 10.6 9.3 10.2 9.7C9.8 10.1 8.8 11 8.8 13C8.8 15 10.2 16.9 10.4 17.2C10.6 17.5 13.2 21.6 17.2 23.3C20.6 24.7 21.3 24.4 22 24.3C23.1 24.2 25.3 23 25.8 21.6C26.3 20.2 26.3 19 26.1 18.8C25.9 18.6 25.6 18.5 25.2 18.3L23.9 19.6Z" fill="#FFFFFF"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Accordion Nav List */}
            <div className="md-nav-scroll">
              <div className="md-nav-group">
                {/* Accordion 1: Каталог */}
                <div className={`md-accordion ${expandedAccordion.catalog ? 'open' : ''}`}>
                  <button
                    className="md-accordion-btn"
                    onClick={() => toggleAccordion('catalog')}
                  >
                    <span className="md-acc-title">
                      <span>Каталог матеріалів</span>
                    </span>
                    <ChevronDown size={18} className={`md-acc-chevron ${expandedAccordion.catalog ? 'rotate' : ''}`} />
                  </button>
                  {expandedAccordion.catalog && (
                    <div className="md-accordion-content">
                      {MAIN_SECTIONS.map((sec) => (
                        <button
                          key={sec.id}
                          className="md-sub-link"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate(`#/catalog/${sec.id}`);
                          }}
                        >
                          <span>{sec.name}</span>
                          <span className="md-sub-price">{sec.price}</span>
                        </button>
                      ))}
                      <button
                        className="md-sub-link-all"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('#/catalog/sheben');
                        }}
                      >
                        <span>Весь каталог товарів →</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct Link: Прайс-лист */}
                <button
                  className="md-nav-link"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('#/prices');
                  }}
                >
                  <span className="md-link-left">
                    <span>Прайс-лист</span>
                  </span>
                  <ChevronRight size={16} className="md-link-arrow" />
                </button>

                {/* Direct Link: Калькулятор */}
                <button
                  className="md-nav-link"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('#/calculator');
                  }}
                >
                  <span className="md-link-left">
                    <span>Калькулятор доставки</span>
                  </span>
                  <ChevronRight size={16} className="md-link-arrow" />
                </button>

                {/* Direct Link: Доставка */}
                <button
                  className="md-nav-link"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('#/delivery');
                  }}
                >
                  <span className="md-link-left">
                    <span>Доставка самоскидами 10–40 т</span>
                  </span>
                  <ChevronRight size={16} className="md-link-arrow" />
                </button>

                {/* Accordion 2: Послуги */}
                <div className={`md-accordion ${expandedAccordion.services ? 'open' : ''}`}>
                  <button
                    className="md-accordion-btn"
                    onClick={() => toggleAccordion('services')}
                  >
                    <span className="md-acc-title">
                      <span>Послуги спецтехніки</span>
                    </span>
                    <ChevronDown size={18} className={`md-acc-chevron ${expandedAccordion.services ? 'rotate' : ''}`} />
                  </button>
                  {expandedAccordion.services && (
                    <div className="md-accordion-content">
                      <button
                        className="md-sub-link"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('#/services/samoskydy');
                        }}
                      >
                        <span>Оренда самоскидів 10–40 т</span>
                      </button>
                      <button
                        className="md-sub-link"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('#/services/zemlyani-roboty');
                        }}
                      >
                        <span>Земляні роботи та котловани</span>
                      </button>
                      <button
                        className="md-sub-link"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('#/services/vyviz-gruntu');
                        }}
                      >
                        <span>Вивіз ґрунту з утилізацією</span>
                      </button>
                      <button
                        className="md-sub-link-all"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('#/services');
                        }}
                      >
                        <span>Всі послуги спецтехніки →</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Accordion 3: Про компанію */}
                <div className={`md-accordion ${expandedAccordion.about ? 'open' : ''}`}>
                  <button
                    className="md-accordion-btn"
                    onClick={() => toggleAccordion('about')}
                  >
                    <span className="md-acc-title">
                      <span>Про компанію</span>
                    </span>
                    <ChevronDown size={18} className={`md-acc-chevron ${expandedAccordion.about ? 'rotate' : ''}`} />
                  </button>
                  {expandedAccordion.about && (
                    <div className="md-accordion-content">
                      <button
                        className="md-sub-link"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('#/about');
                        }}
                      >
                        <span>Про ТОВ «БЕНГС»</span>
                      </button>
                      <button
                        className="md-sub-link"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('#/legal/requisites');
                        }}
                      >
                        <span>Реєстраційні дані (ЄДРПОУ 41963896)</span>
                      </button>
                      <button
                        className="md-sub-link"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('#/certificates');
                        }}
                      >
                        <span>Якість та ДСТУ</span>
                      </button>
                      <button
                        className="md-sub-link"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          navigate('#/warehouses');
                        }}
                      >
                        <span>Бази та кар'єри у Дніпрі</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct Link: Статті */}
                <button
                  className="md-nav-link"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('#/articles');
                  }}
                >
                  <span className="md-link-left">
                    <span>Статті та база знань</span>
                  </span>
                  <ChevronRight size={16} className="md-link-arrow" />
                </button>

                {/* Direct Link: Контакти */}
                <button
                  className="md-nav-link"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('#/contacts');
                  }}
                >
                  <span className="md-link-left">
                    <span>Контакти та адреси</span>
                  </span>
                  <ChevronRight size={16} className="md-link-arrow" />
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="md-drawer-bottom">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenOrderModal({ name: "Запит розрахунку вартості щебеню" });
                }}
                className="btn btn-primary btn-block md-cta-btn"
              >
                <span>Розрахувати вартість з доставкою</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 990;
          box-shadow: 0 2px 14px rgba(0, 0, 0, 0.06);
          background-color: #ffffff;
          width: 100%;
          max-width: 100vw;
          overflow-x: clip;
        }

        .header-top {
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          font-size: 0.83rem;
          color: #475569;
          padding: 8px 0;
          width: 100%;
          max-width: 100vw;
          overflow: hidden;
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
          gap: 7px;
          font-size: 0.88rem;
          font-weight: 700;
          color: #0f172a;
          text-decoration: none;
          white-space: nowrap !important;
          flex-shrink: 0;
          transition: color 0.15s;
        }

        .ht-phone span {
          white-space: nowrap !important;
        }

        .ht-phone:hover {
          color: var(--c-green-dark);
        }

        .ht-messengers {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .msg-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.12s ease, opacity 0.15s;
        }

        .msg-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .msg-whatsapp {
          background-color: #dcfce7;
          color: #15803d;
        }

        .msg-telegram {
          background-color: #e0f2fe;
          color: #0369a1;
        }

        .msg-viber {
          background-color: #ede9fe;
          color: #6d28d9;
        }

        .ht-email, .ht-info-item, .ht-item {
          display: flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          color: inherit;
          font-size: 0.83rem;
          line-height: 1.2;
          white-space: nowrap;
          transition: color 0.15s;
        }

        .ht-item svg,
        .ht-info-item svg,
        .ht-email svg,
        .ht-phone svg {
          flex-shrink: 0;
          display: inline-block;
          vertical-align: middle;
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
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s;
        }

        .ht-search-btn:hover {
          background: var(--c-green-light);
          border-color: var(--c-green);
          color: var(--c-green-dark);
        }

        .header-main {
          padding: 12px 0;
          background: #ffffff;
          transition: padding 0.2s ease, box-shadow 0.2s ease;
        }

        .header-scrolled {
          padding: 8px 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .header-main-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: inherit;
          flex-shrink: 0;
          margin-right: 32px;
        }

        .header-logo-img {
          height: 48px;
          width: auto;
          max-width: 150px;
          object-fit: contain;
          display: block;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }

        .brand-title {
          font-size: 1.32rem;
          font-weight: 900;
          letter-spacing: -0.5px;
          color: #0f172a;
          white-space: nowrap;
        }

        .brand-sub {
          font-size: 0.65rem;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.6px;
          margin-top: 2px;
          white-space: nowrap;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          font-size: 0.92rem;
          font-weight: 600;
          color: #334155;
          border-radius: var(--radius-sm);
          transition: all 0.15s ease;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .nav-link:hover {
          color: var(--c-green-dark);
          background-color: #f1f5f9;
        }

        .catalog-trigger {
          background-color: var(--c-green-light);
          color: var(--c-green-dark);
          font-weight: 700;
          padding: 8px 16px;
        }

        .catalog-trigger:hover, .catalog-trigger.active {
          background-color: var(--c-green);
          color: #ffffff;
        }

        .catalog-trigger:hover .chevron, .catalog-trigger.active .chevron {
          color: #ffffff;
        }

        .chevron {
          transition: transform 0.2s ease;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        .has-dropdown {
          position: relative;
          padding-top: 4px;
          padding-bottom: 8px;
        }

        .submenu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 250px;
          background: #ffffff;
          border-radius: var(--radius-sm);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
          border: 1px solid #e2e8f0;
          padding: 8px 0;
          display: none;
          z-index: 1000;
          animation: slideDown 0.15s ease;
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
          display: block;
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
          margin-left: 24px;
        }

        .btn-kp {
          padding: 10px 20px;
          font-size: 0.92rem;
          font-weight: 700;
          border-radius: 8px;
        }

        .mobile-menu-toggle {
          display: none;
          color: #1e293b;
          padding: 8px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .mobile-menu-toggle:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        /* Mobile Side Drawer & Accordion Styles */
        .mobile-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          z-index: 10000;
          display: flex;
          justify-content: flex-end;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .mobile-drawer-panel {
          width: 88vw;
          max-width: 380px;
          height: 100vh;
          height: 100dvh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 30px rgba(0, 0, 0, 0.2);
          animation: slideFromRight 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        @keyframes slideFromRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .md-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .md-logo {
          height: 36px;
          width: auto;
          object-fit: contain;
        }

        .md-title {
          font-size: 1.15rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
          letter-spacing: 0.3px;
        }

        .md-sub {
          font-size: 0.68rem;
          color: #64748b;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .md-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s;
        }

        .md-close-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        /* Contact & Messengers */
        .md-contact-card {
          padding: 14px 16px;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
        }

        .md-phone-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 10px;
          transition: background 0.15s;
        }

        .md-phone-link:hover {
          background: #dcfce7;
        }

        .md-phone-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #16a34a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .md-phone-num {
          display: block;
          font-size: 1.02rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
        }

        .md-phone-hint {
          display: block;
          font-size: 0.75rem;
          color: #16a34a;
          font-weight: 600;
        }

        .md-messengers-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .md-msg-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 6px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          text-decoration: none;
          transition: transform 0.1s, opacity 0.15s;
        }

        .md-msg-item:active {
          transform: scale(0.97);
        }

        .md-msg-tg {
          background: #e0f2fe;
          color: #0369a1;
        }

        .md-msg-vb {
          background: #ede9fe;
          color: #6d28d9;
        }

        .md-msg-wa {
          background: #dcfce7;
          color: #15803d;
        }

        /* Nav Scroll & Accordions */
        .md-nav-scroll {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 12px 14px;
        }

        .md-nav-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .md-accordion {
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          overflow: hidden;
          background: #ffffff;
          transition: border-color 0.15s;
        }

        .md-accordion.open {
          border-color: #cbd5e1;
          background: #f8fafc;
        }

        .md-accordion-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 0.94rem;
          font-weight: 700;
          color: #1e293b;
          text-align: left;
          transition: color 0.15s;
        }

        .md-accordion-btn:hover {
          color: var(--c-green);
        }

        .md-acc-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .md-acc-icon {
          font-size: 1.1rem;
          line-height: 1;
        }

        .md-acc-chevron {
          color: #64748b;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .md-acc-chevron.rotate {
          transform: rotate(180deg);
          color: var(--c-green-dark);
        }

        .md-accordion-content {
          padding: 6px 12px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-top: 1px solid #e2e8f0;
          background: #ffffff;
        }

        .md-sub-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          border-radius: 6px;
          background: transparent;
          border: none;
          text-align: left;
          font-size: 0.88rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          text-decoration: none;
          width: 100%;
        }

        .md-sub-link:hover, .md-sub-link:active {
          background: #f1f5f9;
          color: var(--c-green-dark);
        }

        .md-sub-price {
          font-size: 0.75rem;
          color: #16a34a;
          font-weight: 700;
          background: #dcfce7;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .md-sub-link-all {
          margin-top: 6px;
          padding: 8px 12px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--c-green-dark);
          background: #f0fdf4;
          border: 1px dashed #86efac;
          border-radius: 6px;
          text-align: center;
          cursor: pointer;
          width: 100%;
        }

        .md-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.94rem;
          font-weight: 700;
          color: #1e293b;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s;
          text-decoration: none;
          width: 100%;
        }

        .md-nav-link:hover, .md-nav-link:active {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: var(--c-green);
        }

        .md-link-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .md-link-arrow {
          color: #94a3b8;
        }

        .md-drawer-bottom {
          padding: 14px 18px;
          border-top: 1px solid #e2e8f0;
          background: #ffffff;
        }

        .md-cta-btn {
          padding: 14px;
          font-size: 0.95rem;
          font-weight: 800;
          border-radius: 10px;
        }

        .btn-block {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .brand-logo {
            margin-right: 0;
          }
          .ht-right {
            display: none !important;
          }
          .ht-email {
            display: none !important;
          }
          .ht-left {
            width: 100%;
            justify-content: space-between;
            gap: 8px;
          }
          .desktop-nav {
            display: none;
          }
          .mobile-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .header-top {
            padding: 6px 0;
          }
          .ht-phone {
            font-size: 0.82rem;
            gap: 5px;
          }
          .ht-messengers {
            gap: 6px;
          }
          .msg-btn {
            padding: 0;
            width: 28px;
            height: 28px;
            border-radius: 6px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .msg-btn span {
            display: none !important;
          }
          .msg-btn svg {
            width: 15px;
            height: 15px;
          }
          .btn-kp {
            display: none;
          }
          .header-logo-img {
            height: 38px;
            max-width: 95px;
          }
          .brand-title {
            font-size: 1.12rem;
            white-space: nowrap;
          }
          .brand-sub {
            font-size: 0.58rem;
            white-space: nowrap;
          }
        }

        @media (max-width: 380px) {
          .ht-phone {
            font-size: 0.76rem;
            gap: 4px;
          }
          .ht-messengers {
            gap: 4px;
          }
          .msg-btn {
            width: 26px;
            height: 26px;
          }
          .brand-title {
            font-size: 1.02rem;
          }
          .brand-sub {
            font-size: 0.52rem;
          }
        }
      `}</style>
    </header>
  );
};
