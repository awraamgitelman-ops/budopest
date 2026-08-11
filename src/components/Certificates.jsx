import React from 'react';
import { QUALITY_STANDARDS, REVIEWS_DATA } from '../data/reviewsData';
import { CheckCircle, ShieldCheck, Scale, Award, Truck } from 'lucide-react';

export const Certificates = () => {
  const getIcon = (idx) => {
    switch (idx) {
      case 0: return <ShieldCheck size={26} className="qs-icon" />;
      case 1: return <Award size={26} className="qs-icon" />;
      case 2: return <CheckCircle size={26} className="qs-icon" />;
      default: return <Scale size={26} className="qs-icon" />;
    }
  };

  return (
    <section id="quality" className="section cert-reviews-section">
      <div className="container">
        {/* Quality Standards Row */}
        <div className="section-header text-center">
          <div className="badge badge-green mb-2">Стандарти та контроль</div>
          <h2 className="section-title">Відповідність державним нормам ДСТУ</h2>
          <p className="section-subtitle mx-auto">
            Уся продукція ТОВ «БЕНГС» проходить суворий вхідний та вихідний контроль якості відповідно до вимог ДСТУ Б В.2.7-75-98.
          </p>
        </div>

        <div className="grid-4 standards-grid">
          {QUALITY_STANDARDS.map((std, idx) => (
            <div key={std.id} className="standard-card">
              <div className="standard-icon-wrapper">
                {getIcon(idx)}
              </div>
              <div className="standard-tag">{std.tag}</div>
              <h4 className="standard-title">{std.title}</h4>
              <p className="standard-sub">{std.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Client Reviews Section */}
        <div id="reviews" className="reviews-block">
          <div className="section-header text-center">
            <h2 className="section-title">Відгуки наших замовників у Дніпрі</h2>
            <p className="section-subtitle mx-auto">
              Будівельні підприємства, виробники бетону та приватні забудовники обирають ТОВ «БЕНГС» за стабільні та надійні поставки щебеню.
            </p>
          </div>

          <div className="grid-2 reviews-grid">
            {REVIEWS_DATA.map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="rev-header">
                  <div className="rev-author-row">
                    <strong className="rev-author">{rev.author}</strong>
                    {rev.verified && (
                      <span className="rev-verified">
                        <CheckCircle size={14} />
                        <span>Перевірений партнер</span>
                      </span>
                    )}
                  </div>
                  <div className="rev-role">{rev.role}</div>
                </div>

                <p className="rev-text">«{rev.text}»</p>

                <div className="rev-footer">
                  <span className="rev-date">{rev.date}</span>
                  <span className="rev-volume">Обсяг поставок: <strong>{rev.volume}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cert-reviews-section {
          background-color: #ffffff;
        }

        .standards-grid {
          margin-bottom: 64px;
        }

        .standard-card {
          padding: 24px 20px;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.2s;
        }

        .standard-card:hover {
          border-color: var(--c-green);
          background: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        }

        .standard-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--c-green-light);
          color: var(--c-green-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .standard-tag {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--c-green-dark);
          background: rgba(133, 180, 42, 0.15);
          padding: 2px 8px;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .standard-title {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .standard-sub {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.5;
        }

        /* Reviews */
        .reviews-block {
          padding-top: 20px;
        }

        .reviews-grid {
          gap: 24px;
        }

        .review-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.2s;
        }

        .review-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
        }

        .rev-header {
          margin-bottom: 14px;
        }

        .rev-author-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .rev-author {
          font-size: 1.05rem;
          color: #0f172a;
        }

        .rev-verified {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.75rem;
          color: #16a34a;
          background: #dcfce7;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }

        .rev-role {
          font-size: 0.82rem;
          color: #64748b;
          margin-top: 2px;
        }

        .rev-text {
          font-size: 0.95rem;
          color: #334155;
          line-height: 1.6;
          margin-bottom: 20px;
          font-style: italic;
        }

        .rev-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          color: #64748b;
          border-top: 1px solid #e2e8f0;
          padding-top: 12px;
        }

        .rev-volume strong {
          color: #0f172a;
        }
      `}</style>
    </section>
  );
};
