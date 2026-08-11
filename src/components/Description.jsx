import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export const Description = () => {
  const [activeTab, setActiveTab] = useState('specs');

  return (
    <section className="section description-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Види та характеристики щебеню</h2>
          <p className="section-subtitle">
            Наша компанія володіє власними перевалочними майданчиками та прямими кар'єрними договорами у Дніпрі та Дніпропетровській області. Це гарантує доставку нерудних матеріалів від 10 тонн до великих оптових обсягів за прозорими цінами.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="desc-tabs">
          <button
            className={`desc-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Характеристики видів
          </button>
          <button
            className={`desc-tab-btn ${activeTab === 'fractions' ? 'active' : ''}`}
            onClick={() => setActiveTab('fractions')}
          >
            Фракції щебеню
          </button>
          <button
            className={`desc-tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Сфери застосування
          </button>
          <button
            className={`desc-tab-btn ${activeTab === 'gost' ? 'active' : ''}`}
            onClick={() => setActiveTab('gost')}
          >
            ДСТУ Б В.2.7-75-98
          </button>
        </div>

        {/* Tab Content */}
        <div className="desc-card">
          {activeTab === 'specs' && (
            <div className="desc-content animate-fade">
              <h3 className="desc-h3">Основні види щебеню у Дніпрі та їхні властивості</h3>
              <p className="desc-text">
                Залежно від походження гірської породи та способу дроблення у нашому регіоні виділяють такі ключові види будівельного щебеню:
              </p>

              <div className="types-list">
                <div className="type-item">
                  <h4 className="type-title">1. Гранітний щебінь</h4>
                  <p className="type-desc">
                    Найпопулярніший і найміцніший матеріал регіону (марка М1200–М1400, морозостійкість до F400). Має низьку лещадність (до 10%, кубоподібна форма) та практично нульове водопоглинання. Застосовується для виробництва високомарочних бетонів (М300–М600), мостових балок, паль, аеродромних плит та автобанів.
                  </p>
                </div>

                <div className="type-item">
                  <h4 className="type-title">2. Шлаковий щебінь (металургійний)</h4>
                  <p className="type-desc">
                    Виготовляється з відвальних та доменних шлаків металургійних заводів Дніпра та Кам'янського. Прочність М800–М1000. Відрізняється шорсткою поверхнею та підвищеним зчепленням з бітумом та цементом. Оптимальний для влаштування дорожніх основ та підсипки промислових майданчиків.
                  </p>
                </div>

                <div className="type-item">
                  <h4 className="type-title">3. Гравійний щебінь</h4>
                  <p className="type-desc">
                    Природний колотий камінь міцністю М800–М1000. Володіє мінімальним природним радіаційним фоном (1 клас), що робить його ідеальним для житлового та котеджного будівництва, фундаментів і стяжок.
                  </p>
                </div>

                <div className="type-item">
                  <h4 className="type-title">4. Вторинний щебінь (дроблений бетон)</h4>
                  <p className="type-desc">
                    Отриманий шляхом механічного подрібнення демонтованих залізобетонних конструкцій та асфальту. Найдешевший будівельний матеріал для відсипання тимчасових доріг, будівельних під'їздів та засипання канав.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fractions' && (
            <div className="desc-content animate-fade">
              <h3 className="desc-h3">Класифікація щебеню за розміром зерен (фракціями)</h3>
              <div className="fractions-grid">
                <div className="frac-item">
                  <div className="frac-badge">0-5 мм (відсів)</div>
                  <p className="frac-text">
                    Найдрібніша фракція. Використовується для виготовлення тротуарної плитки, європарканів, укладання бруківки та посипки доріг під час ожеледиці.
                  </p>
                </div>
                <div className="frac-item">
                  <div className="frac-badge">5-20 мм</div>
                  <p className="frac-text">
                    Найбільш затребувана фракція у будівництві. Застосовується для товарного бетону, монолітного лиття, фундаментів та мостових конструкцій.
                  </p>
                </div>
                <div className="frac-item">
                  <div className="frac-badge">20-40 мм</div>
                  <p className="frac-text">
                    Середня фракція. Незамінна для фундаментів великих будівель, залізничного баласту, закладання доріг і підземних комунікацій.
                  </p>
                </div>
                <div className="frac-item">
                  <div className="frac-badge">40-70 мм</div>
                  <p className="frac-text">
                    Велика фракція. Використовується для масивних бетонних конструкцій, дренажних систем, септиків і дорожніх подушок під важкий транспорт.
                  </p>
                </div>
                <div className="frac-item">
                  <div className="frac-badge">70-150 мм (бут)</div>
                  <p className="frac-text">
                    Бутовий камінь для габіонів, підпірних стін, огорож, укріплення берегів водойм та ландшафтного дизайну.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="desc-content animate-fade">
              <h3 className="desc-h3">Сфери застосування у будівництві</h3>
              <div className="app-grid">
                <div className="app-box">
                  <CheckCircle2 size={20} className="app-icon" />
                  <div>
                    <strong>Виробництво бетону та ЗБВ:</strong> заповнювач для монолітного будівництва, плит перекриття, блоків ФБС та паль.
                  </div>
                </div>
                <div className="app-box">
                  <CheckCircle2 size={20} className="app-icon" />
                  <div>
                    <strong>Дорожні та інфраструктурні роботи:</strong> створення міцної несучої подушки, асфальтобетонного шару та відсипання узбіч.
                  </div>
                </div>
                <div className="app-box">
                  <CheckCircle2 size={20} className="app-icon" />
                  <div>
                    <strong>Фундаментні та земляні роботи:</strong> влаштування ущільнювальних подушок під стрічкові, плитні та пальові фундаменти.
                  </div>
                </div>
                <div className="app-box">
                  <CheckCircle2 size={20} className="app-icon" />
                  <div>
                    <strong>Благоустрій та ландшафт:</strong> оформлення паркових доріжок, дренажних подушок, стоянок та автопарковок.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gost' && (
            <div className="desc-content animate-fade">
              <h3 className="desc-h3">Параметри щебеню згідно з ДСТУ Б В.2.7-75-98</h3>
              <div className="table-responsive">
                <table className="gost-table">
                  <thead>
                    <tr>
                      <th>Параметр</th>
                      <th>Гранітний</th>
                      <th>Шлаковий</th>
                      <th>Гравійний</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Марка за міцністю (дробильністю)</td>
                      <td><strong>М1200 — М1400</strong></td>
                      <td><strong>М800 — М1000</strong></td>
                      <td><strong>М800 — М1000</strong></td>
                    </tr>
                    <tr>
                      <td>Морозостійкість (цикли)</td>
                      <td>F300 — F400</td>
                      <td>F100</td>
                      <td>F150 — F200</td>
                    </tr>
                    <tr>
                      <td>Вміст зерен пластинчастої форми (лещадність)</td>
                      <td>5–10% (1 група)</td>
                      <td>10–15% (2 група)</td>
                      <td>10–15% (2 група)</td>
                    </tr>
                    <tr>
                      <td>Насипна щільність</td>
                      <td>1.38 — 1.42 т/м³</td>
                      <td>1.35 — 1.38 т/м³</td>
                      <td>1.35 — 1.38 т/м³</td>
                    </tr>
                    <tr>
                      <td>Радіаційна безпека</td>
                      <td>1 клас (до 370 Бк/кг)</td>
                      <td>1 клас (до 370 Бк/кг)</td>
                      <td>1 клас (до 370 Бк/кг)</td>
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
