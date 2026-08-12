import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { MEGA_MENU_DATA } from '../data/catalogData';
import { ChevronRight, ArrowRight } from 'lucide-react';

export const MegaMenu = ({ onClose, onSelectProduct }) => {
  const { navigate } = useRouter();
  const [activeCategory, setActiveCategory] = useState(MEGA_MENU_DATA[1] || MEGA_MENU_DATA[0]);

  return (
    <div className="mega-menu-container animate-slide">
      <div className="mega-menu-inner">
        {/* Left Category Sidebar */}
        <div className="mega-categories-list">
          {MEGA_MENU_DATA.map((cat) => {
            const isActive = activeCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                className={`mega-category-btn ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveCategory(cat)}
                onClick={() => {
                  setActiveCategory(cat);
                  navigate(`#/catalog/${cat.id}`);
                  onClose && onClose();
                }}
              >
                <span>{cat.name}</span>
                <ChevronRight size={15} className="cat-arrow" />
              </button>
            );
          })}
        </div>

        {/* Right Content Panel (Subcategories & Items) */}
        <div className="mega-items-content">
          <div className="mega-header">
            <h3 className="mega-cat-title">{activeCategory.name}</h3>
            <button
              onClick={() => {
                navigate(`#/catalog/${activeCategory.id}`);
                onClose && onClose();
              }}
              className="mega-view-all btn-link-reset"
            >
              <span>Переглянути весь розділ ({activeCategory.name})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="mega-subgrid">
            {activeCategory.items.map((item, idx) => (
              <div
                key={idx}
                className="mega-sub-card"
                onClick={() => {
                  onSelectProduct({ name: item.name, priceStr: item.price });
                  onClose();
                }}
              >
                <span className="sub-name">{item.name}</span>
                <span className="sub-price">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .mega-menu-container {
          position: absolute;
          top: 100%;
          left: -40px;
          margin-top: 4px;
          width: 920px;
          background: #ffffff;
          border-radius: var(--radius-md);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          z-index: 1000;
          overflow: visible;
        }

        /* Invisible bridge above menu to keep hover alive when moving cursor */
        .mega-menu-container::before {
          content: '';
          position: absolute;
          top: -16px;
          left: 0;
          right: 0;
          height: 16px;
          background: transparent;
        }

        .mega-menu-inner {
          display: flex;
          min-height: 480px;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .mega-categories-list {
          width: 260px;
          background: #f8fafc;
          border-right: 1px solid #e2e8f0;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .mega-category-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          font-size: 0.92rem;
          font-weight: 600;
          color: #334155;
          border-radius: 6px;
          text-align: left;
          transition: all 0.15s;
          border: none;
          background: transparent;
          cursor: pointer;
        }

        .mega-category-btn:hover, .mega-category-btn.active {
          background-color: var(--c-green);
          color: #ffffff;
        }

        .mega-category-btn.active .cat-arrow {
          transform: translateX(3px);
        }

        .mega-items-content {
          flex: 1;
          padding: 24px 28px;
          overflow-y: auto;
          max-height: 520px;
        }

        .mega-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 16px;
          margin-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
        }

        .mega-cat-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
        }

        .mega-view-all {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--c-green-dark);
          text-decoration: none;
          transition: color 0.15s;
        }

        .mega-view-all:hover {
          color: var(--c-green-hover);
        }

        .mega-subgrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .mega-sub-card {
          padding: 12px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .mega-sub-card:hover {
          border-color: var(--c-green);
          background: var(--c-green-light);
          transform: translateY(-1px);
        }

        .sub-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b;
        }

        .sub-price {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--c-green-dark);
        }
      `}</style>
    </div>
  );
};
