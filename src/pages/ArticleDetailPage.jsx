import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ARTICLES_DATA } from '../data/articlesData';
import { ArrowLeft, Clock, User, Calendar, Share2, ArrowRight } from 'lucide-react';

// Helper to format inline markdown elements (**bold**, `code`, $math$)
const formatInline = (text) => {
  if (!text) return '';

  const parts = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\$[^$]+\$)/g;
  let match;
  let lastIndex = 0;
  let keyIdx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(<strong key={keyIdx++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(<code key={keyIdx++} className="art-inline-code">{token.slice(1, -1)}</code>);
    } else if (token.startsWith('$') && token.endsWith('$')) {
      parts.push(<span key={keyIdx++} className="art-inline-math">{token.slice(1, -1)}</span>);
    } else {
      parts.push(token);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

// Comprehensive Article Body Renderer
const renderArticleContent = (content) => {
  if (!content) return null;

  const blocks = content.split(/\n\s*\n/);

  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // 1. Tables (| col | col |)
    if (trimmed.startsWith('|') && trimmed.includes('|')) {
      const lines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0 && l.startsWith('|'));
      if (lines.length >= 2) {
        const parseRow = (rowStr) => rowStr.split('|').slice(1, -1).map(cell => cell.trim());
        const headers = parseRow(lines[0]);
        const isDivider = (line) => line.includes('---') || line.includes(':---');
        const dataLines = lines.slice(1).filter(l => !isDivider(l));
        const dataRows = dataLines.map(parseRow);

        return (
          <div key={idx} className="art-table-container">
            <table className="art-table">
              <thead>
                <tr>
                  {headers.map((h, i) => (
                    <th key={i}>{formatInline(h)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}>{formatInline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }

    // 2. Math Formula Blocks ($$ ... $$)
    if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
      const formulaText = trimmed.slice(2, -2).trim();
      return (
        <div key={idx} className="art-formula-card">
          <div className="art-formula-header">
            <span className="art-formula-badge">Формула розрахунку</span>
          </div>
          <div className="art-formula-text">
            {formatInline(formulaText)}
          </div>
        </div>
      );
    }

    // 3. Headings
    if (trimmed.startsWith('### ')) {
      return <h3 key={idx} className="art-h3">{formatInline(trimmed.replace('### ', ''))}</h3>;
    }
    if (trimmed.startsWith('## ')) {
      return <h2 key={idx} className="art-h2">{formatInline(trimmed.replace('## ', ''))}</h2>;
    }

    // 4. Horizontal Rules
    if (trimmed === '---') {
      return <hr key={idx} className="art-hr" />;
    }

    // 5. Blockquotes
    if (trimmed.startsWith('> ')) {
      const quoteText = trimmed.replace(/^>\s*/gm, '');
      return (
        <blockquote key={idx} className="art-quote">
          {formatInline(quoteText)}
        </blockquote>
      );
    }

    // 6. Unordered Lists (* or -)
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').map(l => l.replace(/^[\*\-]\s*/, '').trim()).filter(Boolean);
      return (
        <ul key={idx} className="art-ul">
          {items.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      );
    }

    // 7. Ordered Lists (1., 2., etc.)
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split('\n').map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
      return (
        <ol key={idx} className="art-ol">
          {items.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ol>
      );
    }

    // Default Paragraph
    return <p key={idx} className="art-p">{formatInline(trimmed)}</p>;
  });
};

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
              {renderArticleContent(article.content)}
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
    </div>
  );
};
