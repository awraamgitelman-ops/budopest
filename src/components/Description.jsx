import React, { useState } from 'react';
import { Layers, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export const Description = () => {
  const [activeTab, setActiveTab] = useState('specs');

  return (
    <section className="section description-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Виды и характеристики щебня</h2>
          <p className="section-subtitle">
            Наша компания имеет собственные производственные площадки и перевалочные пункты в Москве и МО. Это позволяет доставлять нерудные материалы в любых объемах от 10 м³ до тысяч тонн по фиксированным прозрачным ценам.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="desc-tabs">
          <button
            className={`desc-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Характеристики видов
          </button>
          <button
            className={`desc-tab-btn ${activeTab === 'fractions' ? 'active' : ''}`}
            onClick={() => setActiveTab('fractions')}
          >
            Фракции щебня
          </button>
          <button
            className={`desc-tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Сферы применения
          </button>
          <button
            className={`desc-tab-btn ${activeTab === 'gost' ? 'active' : ''}`}
            onClick={() => setActiveTab('gost')}
          >
            ГОСТ 8267-93
          </button>
        </div>

        {/* Tab Content */}
        <div className="desc-card">
          {activeTab === 'specs' && (
            <div className="desc-content animate-fade">
              <h3 className="desc-h3">Основные типы щебня и их свойства</h3>
              <p className="desc-text">
                В зависимости от происхождения горной породы и способа дробления выделяют несколько основных разновидностей строительного щебня:
              </p>

              <div className="types-list">
                <div className="type-item">
                  <h4 className="type-title">1. Гранитный щебень</h4>
                  <p className="type-desc">
                    Самый прочный и долговечный вид щебня (марка М1200–М1400, морозостойкость до F400). Обладает низкой лещадностью (до 10%, кубовидная форма) и минимальным водопоглощением. Применяется в производстве высокомарочных бетонов (М300–М600), строительстве мостов, эстакад, гидротехнических сооружений и скоростных магистралей.
                  </p>
                </div>

                <div className="type-item">
                  <h4 className="type-title">2. Гравийный щебень</h4>
                  <p className="type-desc">
                    Оптимальный баланс высокой прочности (М800–М1000) и доступной цены. Имеет низкий природный радиационный фон, поэтому широко используется в жилом строительстве, для возведения фундаментов, стяжек и дорожных оснований.
                  </p>
                </div>

                <div className="type-item">
                  <h4 className="type-title">3. Известняковый щебень</h4>
                  <p className="type-desc">
                    Получают дроблением плотных карбонатных осадочных пород (кальцита). Прочность М400–М800, морозостойкость F100–F150. Идеален для дорог с невысокой нагрузкой, подготовки подушек под фундамент, ландшафтного обустройства и производства силикатного кирпича.
                  </p>
                </div>

                <div className="type-item">
                  <h4 className="type-title">4. Вторичный щебень</h4>
                  <p className="type-desc">
                    Экономичный строительный материал, получаемый путем дробления бетонных конструкций и демонтированного асфальта. Отличное решение для отсыпки временных дорог, стоянок, съездов и укрепления слабых грунтов.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fractions' && (
            <div className="desc-content animate-fade">
              <h3 className="desc-h3">Классификация щебня по размеру зерен (фракциям)</h3>
              <div className="fractions-grid">
                <div className="frac-item">
                  <div className="frac-badge">0-5 мм (отсев)</div>
                  <p className="frac-text">
                    Самая мелкая фракция. Применяется для производства тротуарной плитки, декоративных посыпок, обустройства спортивных площадок и антигололедной обработки дорог.
                  </p>
                </div>
                <div className="frac-item">
                  <div className="frac-badge">5-20 мм</div>
                  <p className="frac-text">
                    Наиболее востребованная фракция в строительстве. Используется для фундаментных работ, заливки мостовых конструкций, асфальтобетонных смесей и дорожных покрытий.
                  </p>
                </div>
                <div className="frac-item">
                  <div className="frac-badge">20-40 мм</div>
                  <p className="frac-text">
                    Средняя фракция. Применяется для фундаментов высотных зданий, отсыпки железнодорожных путей, обустройства автодорог и прокладки инженерных сетей.
                  </p>
                </div>
                <div className="frac-item">
                  <div className="frac-badge">40-70 мм</div>
                  <p className="frac-text">
                    Крупная фракция. Незаменима для массивных бетонных конструкций, дренажных систем, фильтрационных подушек и укрепления грунтов.
                  </p>
                </div>
                <div className="frac-item">
                  <div className="frac-badge">70-150 мм (бут)</div>
                  <p className="frac-text">
                    Бутовый камень для заполнения габионов, отделки цоколей, возведения подпорных стен и гидротехнических сооружений.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="desc-content animate-fade">
              <h3 className="desc-h3">Области применения в строительстве</h3>
              <div className="app-grid">
                <div className="app-box">
                  <CheckCircle2 size={20} className="app-icon" />
                  <div>
                    <strong>Производство товарного бетона и ЖБИ:</strong> заполнитель повышенной прочности для мостовых балок, плит перекрытий и свай.
                  </div>
                </div>
                <div className="app-box">
                  <CheckCircle2 size={20} className="app-icon" />
                  <div>
                    <strong>Дорожное строительство:</strong> создание несущих подушек, дренирующих слоев, асфальтобетона и отсыпки обочин.
                  </div>
                </div>
                <div className="app-box">
                  <CheckCircle2 size={20} className="app-icon" />
                  <div>
                    <strong>Фундаментные и земляные работы:</strong> устройство уплотняющих подушек под ленточные, плитные и свайные фундаменты.
                  </div>
                </div>
                <div className="app-box">
                  <CheckCircle2 size={20} className="app-icon" />
                  <div>
                    <strong>Ландшафтный дизайн и благоустройство:</strong> оформление садовых дорожек, дренажей, клумб, отсыпка автостоянок.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gost' && (
            <div className="desc-content animate-fade">
              <h3 className="desc-h3">Параметры щебня по ГОСТ 8267-93</h3>
              <div className="table-responsive">
                <table className="gost-table">
                  <thead>
                    <tr>
                      <th>Параметр</th>
                      <th>Гранитный</th>
                      <th>Гравийный</th>
                      <th>Известняковый</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Марка по прочности (дробимости)</td>
                      <td><strong>М1200 — М1400</strong></td>
                      <td><strong>М800 — М1000</strong></td>
                      <td><strong>М400 — М800</strong></td>
                    </tr>
                    <tr>
                      <td>Морозостойкость (циклы)</td>
                      <td>F300 — F400</td>
                      <td>F150 — F200</td>
                      <td>F100 — F150</td>
                    </tr>
                    <tr>
                      <td>Содержание зерен пластинчатой формы (лещадность)</td>
                      <td>5–10% (1 группа)</td>
                      <td>10–15% (2 группа)</td>
                      <td>10–18% (2-3 группа)</td>
                    </tr>
                    <tr>
                      <td>Насыпная плотность</td>
                      <td>1.38 — 1.42 т/м³</td>
                      <td>1.35 — 1.38 т/м³</td>
                      <td>1.25 — 1.30 т/м³</td>
                    </tr>
                    <tr>
                      <td>Удельная эффективная активность (радионуклиды)</td>
                      <td>до 370 Бк/кг (1 класс)</td>
                      <td>до 370 Бк/кг (1 класс)</td>
                      <td>до 370 Бк/кг (1 класс)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .description-section {
          background-color: var(--c-gray-bg);
        }

        .desc-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .desc-tab-btn {
          padding: 10px 20px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          font-weight: 700;
          color: #475569;
          font-size: 0.95rem;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .desc-tab-btn:hover {
          border-color: var(--c-green);
          color: #0f172a;
        }

        .desc-tab-btn.active {
          background: var(--c-green);
          color: #ffffff;
          border-color: var(--c-green);
          box-shadow: 0 4px 10px rgba(133, 180, 42, 0.3);
        }

        .desc-card {
          background: #ffffff;
          border-radius: var(--radius-md);
          padding: 36px 40px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .desc-h3 {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 14px;
        }

        .desc-text {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .types-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .type-item {
          padding: 18px 20px;
          background: #f8fafc;
          border-left: 4px solid var(--c-green);
          border-radius: 0 8px 8px 0;
        }

        .type-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 6px;
        }

        .type-desc {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.6;
        }

        .fractions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .frac-item {
          padding: 18px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }

        .frac-badge {
          display: inline-block;
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
          background: var(--c-green);
          padding: 4px 12px;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .frac-text {
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.5;
        }

        .app-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .app-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 18px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 0.95rem;
          color: #334155;
          line-height: 1.5;
        }

        .app-icon {
          color: var(--c-green);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .gost-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .gost-table th, .gost-table td {
          padding: 14px 18px;
          border: 1px solid #e2e8f0;
          text-align: left;
        }

        .gost-table th {
          background: #f8fafc;
          font-weight: 700;
          color: #1e293b;
        }

        .gost-table td {
          color: #475569;
        }

        @media (max-width: 768px) {
          .desc-card {
            padding: 24px 20px;
          }
          .fractions-grid, .app-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
