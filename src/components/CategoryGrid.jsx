import React from 'react';
import { MAIN_SECTIONS } from '../data/catalogData';
import { ArrowRight, Layers } from 'lucide-react';

export const CategoryGrid = ({ selectedSection, onSelectSection }) => {
  const handleSectionClick = (sectionId) => {
    onSelectSection(sectionId);
    const target = document.getElementById('catalog-items');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="catalog" className="section category-grid-section">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-green mb-2">
            <Layers size={14} />
            <span>Каталог нерудних матеріалів</span>
          </div>
          <h2 className="section-title">Основні розділи продукції</h2>
          <p className="section-subtitle">
            Оберіть необхідну категорію матеріалу для перегляду всіх доступних видів, фракцій та актуальних цін з доставкою по Дніпру та області.
          </p>
        </div>

        {/* 4-column Category Cards Grid (as in Screenshot 1) */}
        <div className="cat-main-grid">
          {MAIN_SECTIONS.map((sec) => {
            const isCurrent = selectedSection === sec.id;
            return (
              <div
                key={sec.id}
                className={`cat-main-card ${isCurrent ? 'is-active' : ''} ${sec.featured ? 'is-featured' : ''}`}
                onClick={() => handleSectionClick(sec.id)}
              >
                <div className="cat-card-img-wrap">
                  <img
                    src={sec.image}
                    alt={sec.name}
                    className="cat-card-img"
                    loading="lazy"
                  />
                  {sec.featured && (
                    <span className="cat-featured-badge">Хіт продажів</span>
                  )}
                  <span className="cat-count-badge">{sec.itemsCount} видів</span>
                </div>

                <div className="cat-card-body">
                  <div className="cat-card-header">
                    <h3 className="cat-card-title">{sec.name}</h3>
                    <div className="cat-card-price">{sec.price}</div>
                  </div>

                  <p className="cat-card-desc">{sec.description}</p>

                  <button
                    type="button"
                    className="cat-card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick(sec.id);
                    }}
                  >
                    <span>Перейти до розділу</span>
                    <ArrowRight size={16} className="btn-arrow" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .category-grid-section {
          background-color: #f8fafc;
          padding: 40px 0 50px;
          border-bottom: 1px solid #e2e8f0;
        }

        .cat-main-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .cat-main-card {
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .cat-main-card:hover {
          border-color: var(--c-green);
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(133, 180, 42, 0.15);
        }

        .cat-main-card.is-active {
          border-color: var(--c-green);
          box-shadow: 0 0 0 2px var(--c-green-light), 0 8px 20px rgba(133, 180, 42, 0.2);
        }

        .cat-card-img-wrap {
          position: relative;
          width: 100%;
          height: 170px;
          overflow: hidden;
          background: #e2e8f0;
        }

        .cat-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .cat-main-card:hover .cat-card-img {
          transform: scale(1.05);
        }

        .cat-featured-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #80A541;
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .cat-count-badge {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .cat-card-body {
          padding: 16px 18px 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .cat-card-header {
          margin-bottom: 8px;
        }

        .cat-card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 4px;
          line-height: 1.25;
        }

        .cat-card-price {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--c-green-dark);
        }

        .cat-card-desc {
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.4;
          margin-bottom: 16px;
          flex: 1;
        }

        .cat-card-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 10px 14px;
          background: #e6f4d0;
          color: #446e16;
          border: 1px solid #cde8a5;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cat-card-btn:hover {
          background: var(--c-green);
          color: #ffffff;
          border-color: var(--c-green);
        }

        .cat-card-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        .btn-arrow {
          transition: transform 0.2s;
        }

        @media (max-width: 1100px) {
          .cat-main-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cat-main-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .cat-card-img-wrap {
            height: 130px;
          }
        }

        @media (max-width: 480px) {
          .cat-main-grid {
            grid-template-columns: 1fr;
          }
          .cat-card-img-wrap {
            height: 160px;
          }
        }
      `}</style>
    </section>
  );
};
