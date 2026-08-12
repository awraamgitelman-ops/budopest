import React from 'react';
import { QUALITY_STANDARDS } from '../data/reviewsData';
import { CheckCircle, ShieldCheck, Scale, Award } from 'lucide-react';

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
            Уся продукція «РУД МОНОЛІТ» (ТОВ «БЕНГС») проходить суворий вхідний та вихідний контроль якості відповідно до вимог ДСТУ Б В.2.7-75-98.
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
      </div>

      <style>{`
        .cert-reviews-section {
          background-color: #ffffff;
          padding: 40px 0 60px;
        }

        .standards-grid {
          margin-bottom: 0;
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
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .standard-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .standard-sub {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
};
