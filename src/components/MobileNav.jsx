import React from 'react';
import { Layers, Calculator, Phone, ShoppingBag, Search } from 'lucide-react';

export const MobileNav = ({ onOpenOrderModal, onOpenSearchModal }) => {
  return (
    <div className="mobile-bottom-nav">
      <a href="#catalog" className="mbn-item">
        <Layers size={20} />
        <span>Каталог</span>
      </a>

      <a href="#calculator" className="mbn-item">
        <Calculator size={20} />
        <span>Розрахунок</span>
      </a>

      <a href="tel:+380676863186" className="mbn-item call-btn">
        <div className="call-btn-circle">
          <Phone size={20} />
        </div>
        <span>Дзвінок</span>
      </a>

      <button onClick={onOpenSearchModal} className="mbn-item">
        <Search size={20} />
        <span>Пошук</span>
      </button>

      <button
        onClick={() => onOpenOrderModal({ name: "Замовлення з мобільного (Дніпро)" })}
        className="mbn-item"
      >
        <ShoppingBag size={20} />
        <span>Замовити</span>
      </button>

      <style>{`
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
          z-index: 1500;
          padding: 6px 12px;
          justify-content: space-around;
          align-items: center;
        }

        .mbn-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          color: #64748b;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px;
        }

        .mbn-item:hover, .mbn-item:active {
          color: var(--c-green-dark);
        }

        .call-btn-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--c-green);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -16px;
          box-shadow: 0 4px 12px rgba(133, 180, 42, 0.4);
        }

        @media (max-width: 768px) {
          .mobile-bottom-nav {
            display: flex;
          }
          body {
            padding-bottom: 60px;
          }
        }
      `}</style>
    </div>
  );
};
