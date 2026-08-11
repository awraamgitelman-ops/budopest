import React, { useState } from 'react';
import { FAQ_DATA } from '../data/reviewsData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge badge-green mb-2">
            <HelpCircle size={14} />
            <span>Часті запитання</span>
          </div>
          <h2 className="section-title">Питання та відповіді</h2>
          <p className="section-subtitle mx-auto">
            Зібрали всю корисну інформацію про умови доставки по Дніпру, форми оплати, паспорти якості ДСТУ та розрахунок щебеню.
          </p>
        </div>

        <div className="faq-accordion">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggle(idx)}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <ChevronDown size={20} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                </button>

                {isOpen && (
                  <div className="faq-answer-box animate-fade">
                    <p className="faq-a-text">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-section {
          background-color: var(--c-gray-bg);
        }

        .faq-accordion {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-item {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .faq-item:hover {
          border-color: #cbd5e1;
        }

        .faq-item.open {
          border-color: var(--c-green);
          box-shadow: 0 6px 18px rgba(133, 180, 42, 0.1);
        }

        .faq-question-btn {
          width: 100%;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          font-size: 1.05rem;
          font-weight: 700;
          color: #0f172a;
          gap: 16px;
        }

        .faq-chevron {
          color: var(--c-green);
          flex-shrink: 0;
          transition: transform 0.2s;
        }

        .faq-chevron.rotate {
          transform: rotate(180deg);
        }

        .faq-answer-box {
          padding: 0 24px 20px;
          border-top: 1px dashed #f1f5f9;
          margin-top: 4px;
        }

        .faq-a-text {
          font-size: 0.96rem;
          color: #475569;
          line-height: 1.6;
          padding-top: 12px;
        }
      `}</style>
    </section>
  );
};
