import React from 'react';
import { CERTIFICATES_DATA, REVIEWS_DATA } from '../data/reviewsData';
import { Star, CheckCircle, FileCheck } from 'lucide-react';

export const Certificates = () => {
  return (
    <section id="certificates" className="section cert-reviews-section">
      <div className="container">
        {/* Certificates Row */}
        <div className="section-header text-center">
          <div className="badge badge-green mb-2">Якість та гарантії</div>
          <h2 className="section-title">Сертифікати та паспорти якості ДСТУ</h2>
          <p className="section-subtitle mx-auto">
            Уся продукція ТОВ «БЕНГС» регулярно проходить лабораторні випробування та відповідає суворим вимогам ДСТУ Б В.2.7-75-98.
          </p>
        </div>

        <div className="grid-4 certs-grid">
          {CERTIFICATES_DATA.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div className="cert-icon-wrapper">
                <FileCheck size={28} className="cert-icon" />
              </div>
              <div className="cert-badge">{cert.number}</div>
              <h4 className="cert-title">{cert.title}</h4>
              <p className="cert-sub">{cert.subtitle}</p>
              <div className="cert-issuer">{cert.issuer}</div>
            </div>
          ))}
        </div>

        {/* Client Reviews Section */}
        <div id="reviews" className="reviews-block">
          <div className="section-header text-center">
            <h2 className="section-title">Відгуки наших замовників у Дніпрі</h2>
            <p className="section-subtitle mx-auto">
              Понад 400 будівельних підприємств, виробників бетону та приватних забудовників довіряють постачання нерудних матеріалів компанії «БЕНГС».
            </p>
          </div>

          <div className="grid-2 reviews-grid">
            {REVIEWS_DATA.map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="rev-header">
                  <div>
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
                  <div className="rev-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
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

        .certs-grid {
          margin-bottom: 64px;
        }

        .cert-card {
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

        .cert-card:hover {
          border-color: var(--c-green);
          background: #ffffff;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        }

        .cert-icon-wrapper {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--c-green-light);
          color: var(--c-green-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .cert-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--c-green-dark);
          background: rgba(133, 180, 42, 0.15);
          padding: 2px 8px;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .cert-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .cert-sub {
          font-size: 0.82rem;
          color: #475569;
          margin-bottom: 10px;
          flex: 1;
        }

        .cert-issuer {
          font-size: 0.72rem;
          color: #94a3b8;
          border-top: 1px solid #e2e8f0;
          padding-top: 8px;
          width: 100%;
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
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
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

        .rev-stars {
          display: flex;
          gap: 2px;
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
