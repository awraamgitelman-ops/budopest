import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { MAIN_SECTIONS, ALL_PRODUCTS } from '../data/catalogData';
import { ARTICLES_DATA } from '../data/articlesData';
import { CheckCircle2, Truck, Scale, ShieldCheck, ArrowRight, Phone, FileText } from 'lucide-react';

export const CatalogSectionPage = ({ onOpenOrderModal }) => {
  const { routeParams, navigate } = useRouter();
  const sectionId = routeParams.sectionId || 'sheben';
  const [activeFractionFilter, setActiveFractionFilter] = useState('all');

  const currentSection = MAIN_SECTIONS.find((s) => s.id === sectionId) || MAIN_SECTIONS[0];
  const sectionProducts = ALL_PRODUCTS.filter((p) => p.sectionId === currentSection.id);

  // Extract all unique fractions in this section
  const allFractions = Array.from(
    new Set(sectionProducts.flatMap((p) => p.fractions || []))
  );

  const filteredProducts = activeFractionFilter === 'all'
    ? sectionProducts
    : sectionProducts.filter((p) => (p.fractions || []).includes(activeFractionFilter));

  const relevantArticles = ARTICLES_DATA.slice(0, 2);

  return (
    <div className="section-page-wrapper">
      <div className="section-hero">
        <div className="container">
          <div className="sec-hero-grid">
            <div className="sec-hero-text">
              <div className="badge badge-green mb-2">Каталог нерудних матеріалів</div>
              <h1 className="sec-page-title">{currentSection.name} у Дніпрі</h1>
              <p className="sec-page-subtitle">{currentSection.description}</p>

              <div className="sec-quick-stats">
                <div className="sq-stat">
                  <span className="sq-label">Ціна:</span>
                  <span className="sq-val">{currentSection.price}</span>
                </div>
                <div className="sq-stat">
                  <span className="sq-label">В наявності на базах:</span>
                  <span className="sq-val">~2 400 тонн</span>
                </div>
                <div className="sq-stat">
                  <span className="sq-label">Доставка:</span>
                  <span className="sq-val">від 2 годин самоскидами</span>
                </div>
              </div>

              <div className="sec-hero-actions">
                <button
                  onClick={() => onOpenOrderModal({ name: `Замовлення: ${currentSection.name}` })}
                  className="btn btn-primary btn-lg"
                >
                  <span>Замовити розрахунок з доставкою</span>
                </button>
                <a href="tel:+380676863186" className="btn btn-outline btn-lg">
                  <Phone size={16} />
                  <span>+380 (67) 686-31-86</span>
                </a>
              </div>
            </div>

            <div className="sec-hero-img-box">
              <img src={currentSection.image} alt={currentSection.name} className="sec-hero-img" />
              <div className="sec-badge-overlay">
                <ShieldCheck size={18} />
                <span>Сертифіковано ДСТУ • 1-й клас радіації</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections switcher tabs */}
      <div className="category-switcher-bar">
        <div className="container">
          <div className="cat-switch-scroll">
            {MAIN_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                className={`cat-switch-btn ${sec.id === currentSection.id ? 'active' : ''}`}
                onClick={() => {
                  navigate(`#/catalog/${sec.id}`);
                  setActiveFractionFilter('all');
                }}
              >
                <span>{sec.name}</span>
                <span className="count-pill">{sec.itemsCount}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Fraction filters */}
        {allFractions.length > 0 && (
          <div className="fraction-filters-row">
            <span className="ff-title">Фільтр за фракцією:</span>
            <div className="ff-chips">
              <button
                className={`ff-chip ${activeFractionFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFractionFilter('all')}
              >
                Всі різновиди ({sectionProducts.length})
              </button>
              {allFractions.map((frac, idx) => (
                <button
                  key={idx}
                  className={`ff-chip ${activeFractionFilter === frac ? 'active' : ''}`}
                  onClick={() => setActiveFractionFilter(frac)}
                >
                  {frac}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="catalog-products-grid">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="cat-product-card">
              <div
                className="cpc-image-wrap"
                onClick={() => navigate(`#/product/${prod.id}`)}
              >
                <img src={prod.image} alt={prod.name} className="cpc-img" loading="lazy" />
                <div className="cpc-stock-tag">В наявності</div>
              </div>

              <div className="cpc-body">
                <h3
                  className="cpc-title"
                  onClick={() => navigate(`#/product/${prod.id}`)}
                >
                  {prod.name}
                </h3>
                <p className="cpc-desc">{prod.description}</p>

                <div className="cpc-specs-row">
                  <div className="cpc-spec">
                    <span className="spec-l">Міцність:</span>
                    <span className="spec-v">{prod.strength || 'М1200'}</span>
                  </div>
                  <div className="cpc-spec">
                    <span className="spec-l">Щільність:</span>
                    <span className="spec-v">{prod.density || '1.40 т/м³'}</span>
                  </div>
                </div>

                <div className="cpc-price-box">
                  <div className="price-ton-block">
                    <span className="p-num">{prod.price}</span>
                    <span className="p-unit">{prod.priceUnit || 'грн/т'}</span>
                  </div>
                  {prod.priceM3 && (
                    <div className="price-m3-block">
                      <span>{prod.priceM3} грн/м³</span>
                    </div>
                  )}
                </div>

                <div className="cpc-actions">
                  <button
                    onClick={() => onOpenOrderModal({ name: prod.name, priceStr: `${prod.price} ${prod.priceUnit}` })}
                    className="btn btn-primary btn-sm cpc-btn"
                  >
                    <span>Замовити</span>
                  </button>
                  <button
                    onClick={() => navigate(`#/product/${prod.id}`)}
                    className="btn btn-outline btn-sm"
                  >
                    <span>Детальніше</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Technical Noise / Standard specs */}
        <div className="sec-tech-specs-card mt-12">
          <div className="stc-header">
            <FileText size={20} className="icon-green" />
            <div>
              <h3>Технічні норми та стандарти ДСТУ для {currentSection.name}</h3>
              <p>Офіційні випробування Любимівського кар'єру та металургійних перевалок Дніпра</p>
            </div>
          </div>

          <div className="stc-grid">
            <div className="stc-item">
              <CheckCircle2 size={16} className="icon-green" />
              <div>
                <strong>Радіаційна безпека:</strong> 1-й клас будівельних матеріалів (АЕФ &lt; 370 Бк/кг), дозволено без обмежень для житлових будинків та дитячих закладів.
              </div>
            </div>
            <div className="stc-item">
              <Truck size={16} className="icon-green" />
              <div>
                <strong>Логістика:</strong> Відвантаження з 4 баз у Дніпрі та Кам'янському. Подача самоскидів 10, 15, 25, 30 та 40 тонн.
              </div>
            </div>
            <div className="stc-item">
              <Scale size={16} className="icon-green" />
              <div>
                <strong>Ваговий контроль:</strong> 100% електронне тарування вантажівок та видача ТТН з фіксацією нетто до кілограма.
              </div>
            </div>
          </div>
        </div>

        {/* Useful Articles Block */}
        <div className="sec-articles-section mt-12">
          <div className="sec-art-header">
            <h3 className="section-title">Корисні статті та інженерні поради</h3>
            <button onClick={() => navigate('#/articles')} className="btn btn-outline btn-sm">
              <span>Всі статті</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="sec-art-grid">
            {relevantArticles.map((art) => (
              <div
                key={art.id}
                className="sec-art-card"
                onClick={() => navigate(`#/articles/${art.id}`)}
              >
                <img src={art.image} alt={art.title} className="sec-art-img" />
                <div className="sec-art-content">
                  <span className="sec-art-tag">{art.category}</span>
                  <h4 className="sec-art-title">{art.title}</h4>
                  <p className="sec-art-sum">{art.summary}</p>
                  <span className="sec-art-more">Читати інструкцію ↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .section-page-wrapper {
          background: #ffffff;
        }

        .section-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 48px 0;
        }

        .sec-hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 36px;
          align-items: center;
        }

        .sec-page-title {
          font-size: 2.3rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 12px;
          line-height: 1.2;
        }

        .sec-page-subtitle {
          font-size: 1.05rem;
          color: #cbd5e1;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .sec-quick-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .sq-stat {
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 10px 16px;
          border-radius: 8px;
        }

        .sq-label {
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .sq-val {
          font-size: 1rem;
          font-weight: 800;
          color: var(--c-green);
        }

        .sec-hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .sec-hero-img-box {
          position: relative;
          height: 320px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .sec-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .sec-badge-overlay {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(6px);
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-switcher-bar {
          background: #f1f5f9;
          border-bottom: 1px solid #e2e8f0;
          padding: 10px 0;
          position: sticky;
          top: 60px;
          z-index: 100;
        }

        .cat-switch-scroll {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 2px 0;
        }

        .cat-switch-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 700;
          color: #475569;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }

        .cat-switch-btn:hover {
          border-color: var(--c-green);
          color: #0f172a;
        }

        .cat-switch-btn.active {
          background: var(--c-green);
          color: #ffffff;
          border-color: var(--c-green);
        }

        .count-pill {
          background: rgba(0, 0, 0, 0.1);
          padding: 1px 6px;
          border-radius: 10px;
          font-size: 0.75rem;
        }

        .fraction-filters-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .ff-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #334155;
        }

        .ff-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .ff-chip {
          padding: 6px 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          font-size: 0.84rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s;
        }

        .ff-chip:hover {
          border-color: var(--c-green);
        }

        .ff-chip.active {
          background: var(--c-green-light);
          color: var(--c-green-dark);
          border-color: var(--c-green);
        }

        .catalog-products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .cat-product-card {
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #ffffff;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
        }

        .cat-product-card:hover {
          border-color: var(--c-green);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .cpc-image-wrap {
          position: relative;
          height: 190px;
          cursor: pointer;
        }

        .cpc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cpc-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #dc2626;
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .cpc-stock-tag {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(15, 23, 42, 0.85);
          color: #4ade80;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .cpc-body {
          padding: 18px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .cpc-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
          cursor: pointer;
          line-height: 1.3;
        }

        .cpc-title:hover {
          color: var(--c-green-dark);
        }

        .cpc-desc {
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.4;
          margin-bottom: 14px;
          flex: 1;
        }

        .cpc-specs-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          background: #f8fafc;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 0.78rem;
          margin-bottom: 14px;
        }

        .spec-l {
          color: #94a3b8;
          display: block;
        }

        .spec-v {
          font-weight: 700;
          color: #0f172a;
        }

        .cpc-price-box {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .price-ton-block {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .p-num {
          font-size: 1.35rem;
          font-weight: 900;
          color: var(--c-green-dark);
        }

        .p-unit {
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 700;
        }

        .price-m3-block {
          font-size: 0.82rem;
          color: #64748b;
          font-weight: 600;
        }

        .cpc-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .sec-tech-specs-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-lg);
          padding: 28px;
        }

        .stc-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 14px;
        }

        .stc-header h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .stc-header p {
          font-size: 0.85rem;
          color: #64748b;
          margin: 2px 0 0;
        }

        .stc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .stc-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.86rem;
          line-height: 1.5;
          color: #334155;
        }

        .sec-articles-section {
          margin-top: 48px;
        }

        .sec-art-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .sec-art-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .sec-art-card {
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sec-art-card:hover {
          border-color: var(--c-green);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
        }

        .sec-art-img {
          width: 160px;
          object-fit: cover;
        }

        .sec-art-content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .sec-art-tag {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--c-green-dark);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .sec-art-title {
          font-size: 0.98rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px;
          line-height: 1.3;
        }

        .sec-art-sum {
          font-size: 0.8rem;
          color: #64748b;
          line-height: 1.4;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .sec-art-more {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--c-green);
          margin-top: auto;
        }

        @media (max-width: 900px) {
          .sec-hero-grid {
            grid-template-columns: 1fr;
          }
          .stc-grid {
            grid-template-columns: 1fr;
          }
          .sec-art-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
