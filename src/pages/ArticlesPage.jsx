import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { ARTICLES_DATA } from '../data/articlesData';
import { Clock, User, ArrowRight, BookOpen, Search } from 'lucide-react';

export const ArticlesPage = () => {
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'Практичні поради', 'Технічний аналіз', 'Дорожнє будівництво', 'Ландшафт та ґрунти', 'Контроль та безпека'];

  const filteredArticles = ARTICLES_DATA.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'all' || art.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="articles-page-wrapper">
      <div className="articles-hero">
        <div className="container">
          <div className="badge badge-green mb-2">База знань та експертиза</div>
          <h1 className="articles-hero-title">Статті та практичні поради щодо щебеню, піску та ґрунтів</h1>
          <p className="articles-hero-subtitle">
            Інженерні інструкції, розрахунки пропорцій бетону, стандарти ДСТУ, аналітика ринку нерудних матеріалів та поради забудовникам Дніпра.
          </p>

          {/* Search bar */}
          <div className="articles-search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Пошук статей за темою (фундамент, фракція 5-20, ЩПС, чорнозем, ТТН)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="art-search-input"
            />
          </div>
        </div>
      </div>

      <div className="container py-10">
        {/* Category Filters */}
        <div className="art-cat-filters">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`art-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'Всі теми' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="articles-main-grid">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="article-full-card"
              onClick={() => navigate(`#/articles/${art.id}`)}
            >
              <div className="afc-img-wrap">
                <img src={art.image} alt={art.title} className="afc-img" loading="lazy" />
                <span className="afc-category">{art.category}</span>
              </div>

              <div className="afc-body">
                <div className="afc-meta">
                  <span>{art.date}</span>
                  <span>•</span>
                  <span><Clock size={12} /> {art.readTime}</span>
                </div>

                <h3 className="afc-title">{art.title}</h3>
                <p className="afc-summary">{art.summary}</p>

                <div className="afc-footer">
                  <span className="afc-author">{art.author}</span>
                  <span className="afc-read-btn">
                    <span>Читати</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .articles-page-wrapper {
          background: #ffffff;
          padding-bottom: 60px;
        }

        .articles-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 50px 0 40px;
        }

        .articles-hero-title {
          font-size: 2.3rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 12px;
          line-height: 1.2;
        }

        .articles-hero-subtitle {
          font-size: 1.05rem;
          color: #cbd5e1;
          max-width: 820px;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .articles-search-bar {
          position: relative;
          max-width: 620px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .art-search-input {
          width: 100%;
          height: 48px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 0 16px 0 44px;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s;
        }

        .art-search-input:focus {
          background: #ffffff;
          color: #0f172a;
          border-color: var(--c-green);
        }

        .art-search-input::placeholder {
          color: #94a3b8;
        }

        .art-cat-filters {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          margin-bottom: 32px;
          padding-bottom: 4px;
        }

        .art-cat-btn {
          padding: 8px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #475569;
          background: #f8fafc;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }

        .art-cat-btn:hover {
          border-color: var(--c-green);
          color: #0f172a;
        }

        .art-cat-btn.active {
          background: var(--c-green);
          color: #ffffff;
          border-color: var(--c-green);
        }

        .articles-main-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
        }

        .article-full-card {
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
        }

        .article-full-card:hover {
          border-color: var(--c-green);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .afc-img-wrap {
          position: relative;
          height: 200px;
        }

        .afc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .afc-category {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(15, 23, 42, 0.85);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .afc-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .afc-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          color: #94a3b8;
          margin-bottom: 8px;
        }

        .afc-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .afc-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 10px;
          line-height: 1.35;
        }

        .afc-summary {
          font-size: 0.86rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 18px;
          flex: 1;
        }

        .afc-footer {
          border-top: 1px solid #f1f5f9;
          padding-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
        }

        .afc-author {
          color: #64748b;
          font-weight: 600;
        }

        .afc-read-btn {
          color: var(--c-green);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (max-width: 640px) {
          .articles-main-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
