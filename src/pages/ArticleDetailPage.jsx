import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ARTICLES_DATA } from '../data/articlesData';
import { ArrowLeft, Clock, User, Calendar, Share2, ArrowRight } from 'lucide-react';

export const ArticleDetailPage = ({ onOpenOrderModal }) => {
  const { routeParams, navigate } = useRouter();
  const articleId = routeParams.articleId;

  const article = ARTICLES_DATA.find((a) => a.id === articleId || a.slug === articleId) || ARTICLES_DATA[0];
  const otherArticles = ARTICLES_DATA.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="article-detail-page">
      <div className="container py-8">
        <button
          onClick={() => navigate('#/articles')}
          className="back-btn mb-6"
        >
          <ArrowLeft size={16} />
          <span>Назад до бази знань та статей</span>
        </button>

        <div className="art-detail-grid">
          {/* Article Main Content */}
          <article className="art-main-content">
            <div className="badge badge-green mb-3">{article.category}</div>
            <h1 className="art-single-title">{article.title}</h1>

            <div className="art-single-meta">
              <span><Calendar size={14} className="icon-green" /> {article.date}</span>
              <span>•</span>
              <span><Clock size={14} className="icon-green" /> {article.readTime}</span>
              <span>•</span>
              <span><User size={14} className="icon-green" /> {article.author}</span>
            </div>

            <div className="art-featured-img-wrap">
              <img src={article.image} alt={article.title} className="art-featured-img" />
            </div>

            <div className="art-body-text">
              {article.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return <h3 key={idx} className="art-h3">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote key={idx} className="art-quote">
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }
                return <p key={idx} className="art-p">{paragraph}</p>;
              })}
            </div>

            {/* In-article CTA block */}
            <div className="art-cta-card mt-8">
              <h3>Потрібна консультація інженера ТОВ «БЕНГС»?</h3>
              <p>Допоможемо розрахувати точну кількість матеріалів та підберемо правильну фракцію під ваш проект у Дніпрі.</p>
              <button
                onClick={() => onOpenOrderModal({ name: `Консультація за статтею: ${article.title}` })}
                className="btn btn-primary"
              >
                Отримати консультацію та розрахунок
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="art-sidebar">
            <div className="art-sidebar-card">
              <h3 className="sidebar-heading">Інші корисні статті:</h3>
              <div className="sidebar-art-list">
                {otherArticles.map((other) => (
                  <div
                    key={other.id}
                    className="side-art-item"
                    onClick={() => navigate(`#/articles/${other.id}`)}
                  >
                    <img src={other.image} alt={other.title} className="side-art-img" />
                    <div>
                      <span className="side-art-cat">{other.category}</span>
                      <h4 className="side-art-title">{other.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="art-sidebar-calc-promo">
              <h4>Швидкий калькулятор</h4>
              <p>Розрахуйте точну кубатуру та вагу партії за 1 хвилину.</p>
              <button
                onClick={() => navigate('#/calculator')}
                className="btn btn-outline btn-block btn-sm"
              >
                Перейти до калькулятора ↗
              </button>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .article-detail-page {
          background: #ffffff;
          padding-bottom: 60px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.15s;
          padding: 0;
        }

        .back-btn:hover {
          color: var(--c-green-dark);
        }

        .art-detail-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 40px;
          align-items: start;
        }

        .art-single-title {
          font-size: 2.2rem;
          font-weight: 900;
          color: #0f172a;
          line-height: 1.25;
          margin-bottom: 14px;
        }

        .art-single-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .art-single-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .art-featured-img-wrap {
          height: 380px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 28px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
        }

        .art-featured-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .art-body-text {
          font-size: 1.02rem;
          line-height: 1.7;
          color: #334155;
        }

        .art-h3 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0f172a;
          margin: 28px 0 12px;
        }

        .art-p {
          margin-bottom: 16px;
        }

        .art-quote {
          background: #f8fafc;
          border-left: 4px solid var(--c-green);
          padding: 16px 20px;
          border-radius: 0 8px 8px 0;
          font-size: 0.95rem;
          font-style: italic;
          color: #1e293b;
          margin: 20px 0;
        }

        .art-cta-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-radius: var(--radius-md);
          padding: 28px;
          color: #ffffff;
        }

        .art-cta-card h3 {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0 0 6px;
        }

        .art-cta-card p {
          font-size: 0.88rem;
          color: #cbd5e1;
          margin: 0 0 16px;
        }

        .art-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: sticky;
          top: 80px;
        }

        .art-sidebar-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          padding: 24px;
        }

        .sidebar-heading {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 16px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 10px;
        }

        .sidebar-art-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .side-art-item {
          display: flex;
          gap: 12px;
          cursor: pointer;
          transition: transform 0.15s;
        }

        .side-art-item:hover {
          transform: translateX(4px);
        }

        .side-art-img {
          width: 80px;
          height: 64px;
          border-radius: 6px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .side-art-cat {
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--c-green-dark);
          text-transform: uppercase;
        }

        .side-art-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f172a;
          margin: 2px 0 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .art-sidebar-calc-promo {
          background: var(--c-green-light);
          border: 1px solid rgba(133, 180, 42, 0.3);
          border-radius: var(--radius-md);
          padding: 20px;
        }

        .art-sidebar-calc-promo h4 {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 4px;
        }

        .art-sidebar-calc-promo p {
          font-size: 0.82rem;
          color: #475569;
          margin: 0 0 12px;
        }

        @media (max-width: 900px) {
          .art-detail-grid {
            grid-template-columns: 1fr;
          }
          .art-sidebar {
            position: static;
          }
        }
      `}</style>
    </div>
  );
};
