import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ShieldCheck, Scale, Award, Truck, Users, CheckCircle2, Phone, FileText } from 'lucide-react';
import { Certificates } from '../components/Certificates';

export const AboutPage = ({ onOpenOrderModal, onOpenLegalModal }) => {
  const { navigate } = useRouter();

  const stats = [
    { num: "100%", label: "Контроль ваги та відповідність ДСТУ" },
    { num: "30+ авто", label: "Власний парк самоскидів 10–40 т" },
    { num: "4 бази", label: "Перевалки та кар'єри у Дніпрі та Кам'янському" },
    { num: "180 000+ т", label: "Щорічний обсяг відвантаження матеріалів" }
  ];

  return (
    <div className="about-page-wrapper">
      <div className="about-hero">
        <div className="container">
          <div className="badge badge-green mb-2">Офіційний постачальник матеріалів</div>
          <h1 className="about-hero-title">Про компанію «РУД МОНОЛІТ»</h1>
          <p className="about-hero-subtitle">
            «РУД МОНОЛІТ» (ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "БЕНГС", ЄДРПОУ 41963896) — прямий постачальник гранітного та шлакового щебеню, річкового піску, ґрунтів і сумішей для приватного, цивільного та інфраструктурного будівництва у Дніпрі та Дніпропетровській області. Офіційний сайт: rud-monolit.com.
          </p>

          <div className="about-stats-grid">
            {stats.map((s, idx) => (
              <div key={idx} className="about-stat-card">
                <div className="as-num">{s.num}</div>
                <div className="as-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Story Section */}
        <div className="about-story-grid">
          <div className="as-text">
            <h2 className="section-title">Виробничі потужності та логістика</h2>
            <p>
              Компанія «РУД МОНОЛІТ» (ТОВ «БЕНГС») забезпечує будівельні компанії, дорожніх підрядників, виробників бетону та приватних забудовників нерудними матеріалами гарантованої якості безпосередньо з кар'єрів та перевалочних терміналів.
            </p>
            <p>
              Ми володіємо видобувними та перевально-навантажувальними майданчиками у ключових вузлах регіону (Любимівський гранітний кар'єр, Набережна Заводська у Дніпрі, Кам'янський термінал), а також головним офісом за адресою вул. Журналістів, 3.
            </p>

            <div className="as-highlights-list">
              <div className="as-hl-item">
                <CheckCircle2 size={18} className="icon-green" />
                <div>
                  <strong>Повна енергонезалежність:</strong> Усі перевалки обладнані потужними дизель-генераторами, що гарантує безперебійне навантаження та зважування техніки під час блекаутів.
                </div>
              </div>
              <div className="as-hl-item">
                <CheckCircle2 size={18} className="icon-green" />
                <div>
                  <strong>Лабораторний контроль ДСТУ:</strong> Кожна партія щебеню проходить перевірку на міцність, лещадність, морозостійкість та радіаційну безпеку (1-й клас).
                </div>
              </div>
              <div className="as-hl-item">
                <CheckCircle2 size={18} className="icon-green" />
                <div>
                  <strong>Електронні автоваги до 80 тонн:</strong> Обов'язкове зважування брутто/тара та видача офіційної ТТН водієм.
                </div>
              </div>
            </div>

            <div className="as-actions mt-6">
              <button
                onClick={() => navigate('#/legal/requisites')}
                className="btn btn-outline"
              >
                <FileText size={16} />
                <span>Юридичні реквізити (ЄДРПОУ 41963896)</span>
              </button>
              <button
                onClick={() => navigate('#/warehouses')}
                className="btn btn-primary"
              >
                <span>Переглянути бази на карті</span>
              </button>
            </div>
          </div>

          <div className="as-img-col">
            <div className="as-img-wrap">
              <img
                src="/images/img_75f6f6ee6a.jpg"
                alt="Кар'єр Любимівка «РУД МОНОЛІТ»"
                className="as-img"
              />
              <div className="as-caption">Відвантаження гранітного щебеню Любимівського кар'єру</div>
            </div>
          </div>
        </div>

        {/* Certificates Embedded */}
        <div className="mt-16">
          <Certificates />
        </div>
      </div>

      <style>{`
        .about-page-wrapper {
          background: #ffffff;
          padding-bottom: 60px;
        }

        .about-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 50px 0 40px;
        }

        .about-hero-title {
          font-size: 2.3rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 12px;
          line-height: 1.2;
        }

        .about-hero-subtitle {
          font-size: 1.05rem;
          color: #cbd5e1;
          max-width: 860px;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .about-stat-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-md);
          padding: 20px;
        }

        .as-num {
          font-size: 1.9rem;
          font-weight: 900;
          color: var(--c-green);
          margin-bottom: 4px;
        }

        .as-label {
          font-size: 0.84rem;
          color: #cbd5e1;
          line-height: 1.4;
        }

        .about-story-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 40px;
          align-items: center;
        }

        .as-text p {
          font-size: 0.98rem;
          line-height: 1.65;
          color: #334155;
          margin-bottom: 16px;
        }

        .as-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 20px;
        }

        .as-hl-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 14px 18px;
          font-size: 0.88rem;
          line-height: 1.5;
          color: #334155;
        }

        .as-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .as-img-wrap {
          position: relative;
          height: 420px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12);
        }

        .as-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .as-caption {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          background: rgba(15, 23, 42, 0.85);
          color: #ffffff;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          text-align: center;
        }

        @media (max-width: 900px) {
          .about-stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          .about-story-grid {
            grid-template-columns: 1fr;
          }
          .as-img-wrap {
            height: 280px;
          }
        }
      `}</style>
    </div>
  );
};
