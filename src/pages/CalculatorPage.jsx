import React from 'react';
import { Calculator } from '../components/Calculator';
import { ShieldCheck, Truck, Scale, FileText } from 'lucide-react';

export const CalculatorPage = ({ onOpenOrderModal }) => {
  return (
    <div className="calculator-page-wrapper">
      <div className="calc-hero">
        <div className="container">
          <div className="badge badge-green mb-2">Онлайн інструмент</div>
          <h1 className="calc-hero-title">Будівельний калькулятор щебеню та піску у Дніпрі</h1>
          <p className="calc-hero-subtitle">
            Точний інженерний розрахунок кубатури, маси в тоннах з урахуванням коефіцієнта ущільнення Kущ та автоматичним розрахунком вартості доставки самоскидами по районах Дніпра.
          </p>
        </div>
      </div>

      <div className="container py-8">
        <Calculator onOpenOrderModal={onOpenOrderModal} />

        {/* Engineering tables & advice */}
        <div className="calc-density-info-card mt-12">
          <h3 className="cdi-title">Таблиця насипної щільності та коефіцієнтів ущільнення</h3>
          <p className="cdi-desc">
            Дані лабораторних досліджень Любимівського кар'єру та металургійних заводів для точного проектування:
          </p>

          <div className="table-responsive mt-4">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Матеріал / Фракція</th>
                  <th>Насипна щільність (т/м³)</th>
                  <th>Коефіцієнт ущільнення (Kущ)</th>
                  <th>Основне призначення</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Гранітний щебінь 5-20 мм</strong></td>
                  <td>1.38 – 1.42</td>
                  <td>1.25 – 1.30</td>
                  <td>Бетон М200–М400, стрічкові фундаменти, армопояси</td>
                </tr>
                <tr>
                  <td><strong>Гранітний щебінь 20-40 мм</strong></td>
                  <td>1.37 – 1.40</td>
                  <td>1.25 – 1.30</td>
                  <td>Нижні шари фундаментів, дренажні системи, септики</td>
                </tr>
                <tr>
                  <td><strong>Гранітний щебінь 40-70 мм</strong></td>
                  <td>1.35 – 1.38</td>
                  <td>1.30 – 1.35</td>
                  <td>Масивні подушки, під'їзні дороги для важкої техніки</td>
                </tr>
                <tr>
                  <td><strong>Шлаковий щебінь 20-40 мм</strong></td>
                  <td>1.32 – 1.36</td>
                  <td>1.30 – 1.40</td>
                  <td>Дорожні основи, стоянки, промислові підлоги</td>
                </tr>
                <tr>
                  <td><strong>ЩПС С5 (0-70 мм) / С7 (0-40 мм)</strong></td>
                  <td>1.60 – 1.70</td>
                  <td>1.35 – 1.45</td>
                  <td>Монолітні основи під асфальт та тротуарну плитку</td>
                </tr>
                <tr>
                  <td><strong>Пісок річковий митий</strong></td>
                  <td>1.45 – 1.55</td>
                  <td>1.15 – 1.20</td>
                  <td>Бетонні розчини, стяжка підлоги, піщані подушки</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .calculator-page-wrapper {
          background: #ffffff;
          padding-bottom: 60px;
        }

        .calc-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 48px 0 36px;
        }

        .calc-hero-title {
          font-size: 2.3rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 12px;
          line-height: 1.2;
        }

        .calc-hero-subtitle {
          font-size: 1.05rem;
          color: #cbd5e1;
          max-width: 820px;
          line-height: 1.5;
        }

        .calc-density-info-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-lg);
          padding: 28px;
        }

        .cdi-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px;
        }

        .cdi-desc {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0;
        }

        .custom-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.88rem;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .custom-table th {
          background: #f1f5f9;
          padding: 12px 16px;
          font-size: 0.82rem;
          font-weight: 800;
          color: #475569;
          text-transform: uppercase;
        }

        .custom-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
        }

        .custom-table tr:hover td {
          background: #f8fafc;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 640px) {
          .calculator-page-wrapper {
            padding-bottom: 95px;
          }
          .calc-hero {
            padding: 28px 0 20px;
          }
          .calc-hero-title {
            font-size: 1.45rem;
          }
          .calc-hero-subtitle {
            font-size: 0.88rem;
          }
          .calc-density-info-card {
            padding: 16px 12px;
          }
        }
      `}</style>
    </div>
  );
};
