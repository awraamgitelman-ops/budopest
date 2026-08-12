import React from 'react';
import { X, Briefcase, Phone, Mail, MapPin, CheckCircle2, UserCheck } from 'lucide-react';

export const CareerModal = ({ isOpen, onClose, onOpenOrderModal }) => {
  if (!isOpen) return null;

  const vacancies = [
    {
      id: 1,
      title: "Водій самоскида (10–40 тонн: MAN / Scania / КамАЗ)",
      salary: "35 000 — 55 000 грн",
      location: "м. Дніпро (Лівий / Правий берег)",
      type: "Повна зайнятість • Щоденно 09:00 — 20:00",
      requirements: [
        "Посвідчення водія категорії C / C1 (бажано CE)",
        "Досвід роботи на самоскидах від 1 року",
        "Знання доріг м. Дніпра та Дніпропетровської області",
        "Бережне ставлення до техніки та відповідальність"
      ],
      responsibilities: [
        "Доставка нерудних сипучих матеріалів (щебінь, пісок, ґрунти) з кар'єрів на об'єкти замовників",
        "Контроль завантаження та вивантаження за ТТН",
        "Дотримання графіку рейсів та правил дорожнього руху"
      ]
    },
    {
      id: 2,
      title: "Менеджер з оптового продажу нерудних матеріалів",
      salary: "25 000 — 60 000 грн (ставка + % від обсягу)",
      location: "м. Дніпро, вул. Журналістів, 9",
      type: "Повна зайнятість (Пн–Пт 09:00 — 18:00)",
      requirements: [
        "Досвід у сфері оптових продажів будівельних матеріалів (бажано)",
        "Грамотна українська мова, навички ведення переговорів",
        "Впевнений користувач ПК, 1С або CRM-систем",
        "Орієнтація на результат та розвиток клієнтської бази"
      ],
      responsibilities: [
        "Опрацювання вхідних гарячих заявок з сайту та телефону",
        "Робота з будівельними компаніями, дорожніми підрядниками та приватними забудовниками",
        "Підготовка комерційних пропозицій та виписка рахунків/договорів"
      ]
    },
    {
      id: 3,
      title: "Оператор автомобільних ваг / Обліковець на перевалку",
      salary: "20 000 — 28 000 грн",
      location: "м. Дніпро, перевалка «Лівий берег»",
      type: "Змінний графік 09:00 — 20:00",
      requirements: [
        "Уважність, порядність, дисциплінованість",
        "Базові навички роботи з ПК (програма зважування авто)",
        "Досвід роботи на ваговому контролі або складі буде перевагою"
      ],
      responsibilities: [
        "Зважування вантажних автомобілів на 80-тонних автовагах (брутто/тара/нетто)",
        "Виписка товарно-транспортних накладних (ТТН)",
        "Ведення первинного обліку залишків матеріалів на базі"
      ]
    }
  ];

  return (
    <div className="career-modal-overlay" onClick={onClose}>
      <div className="career-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="career-modal-header">
          <div className="career-header-title">
            <Briefcase size={24} className="career-icon" />
            <div>
              <h3>Кар'єра та відкриті вакансії</h3>
              <p>Робота в стабільній компанії ТОВ "БЕНГС" (м. Дніпро)</p>
            </div>
          </div>
          <button className="career-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="career-modal-body">
          <div className="career-banner">
            <div className="cb-item">
              <UserCheck size={20} className="cb-icon" />
              <span>Офіційне працевлаштування</span>
            </div>
            <div className="cb-item">
              <CheckCircle2 size={20} className="cb-icon" />
              <span>Своєчасна виплата 2 рази на місяць</span>
            </div>
            <div className="cb-item">
              <MapPin size={20} className="cb-icon" />
              <span>Власний автопарк та бази у Дніпрі</span>
            </div>
          </div>

          <h4 className="career-list-title">Актуальні вакансії у м. Дніпро:</h4>

          <div className="vacancies-grid">
            {vacancies.map((v) => (
              <div key={v.id} className="vac-card">
                <div className="vac-top">
                  <div>
                    <h5 className="vac-title">{v.title}</h5>
                    <span className="vac-location">{v.location} • {v.type}</span>
                  </div>
                  <div className="vac-salary">{v.salary}</div>
                </div>

                <div className="vac-section">
                  <strong>Вимоги:</strong>
                  <ul>
                    {v.requirements.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="vac-section">
                  <strong>Обов'язки:</strong>
                  <ul>
                    {v.responsibilities.map((res, i) => (
                      <li key={i}>{res}</li>
                    ))}
                  </ul>
                </div>

                <div className="vac-footer">
                  <a href="tel:+380676863186" className="btn btn-primary btn-sm vac-btn">
                    <Phone size={14} />
                    <span>Зателефонувати у відділ кадрів: +380 (67) 686-31-86</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="career-modal-footer">
          <div className="career-contacts-foot">
            <span>Відділ персоналу: <strong>bengs.zakaz@gmail.com</strong></span>
          </div>
          <button className="btn btn-secondary" onClick={onClose}>
            Закрити
          </button>
        </div>
      </div>

      <style>{`
        .career-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .career-modal-container {
          background: #ffffff;
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: modalFadeIn 0.2s ease-out;
        }

        .career-modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fafc;
        }

        .career-header-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .career-icon {
          color: var(--c-green);
        }

        .career-header-title h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .career-header-title p {
          font-size: 0.82rem;
          color: #64748b;
          font-weight: 600;
          margin: 2px 0 0;
        }

        .career-close-btn {
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          transition: all 0.15s;
        }

        .career-close-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .career-modal-body {
          padding: 24px;
          overflow-y: auto;
        }

        .career-banner {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 20px;
          background: var(--c-green-light);
          border: 1px solid rgba(133, 180, 42, 0.3);
          border-radius: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .cb-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--c-green-dark);
        }

        .cb-icon {
          color: var(--c-green-dark);
        }

        .career-list-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .vacancies-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .vac-card {
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          padding: 20px;
          background: #ffffff;
          transition: all 0.2s;
        }

        .vac-card:hover {
          border-color: var(--c-green);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
        }

        .vac-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 12px;
        }

        .vac-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 4px;
        }

        .vac-location {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 600;
        }

        .vac-salary {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--c-green-dark);
          white-space: nowrap;
          background: rgba(133, 180, 42, 0.15);
          padding: 4px 10px;
          border-radius: 6px;
        }

        .vac-section {
          font-size: 0.86rem;
          color: #334155;
          margin-bottom: 10px;
        }

        .vac-section strong {
          display: block;
          margin-bottom: 4px;
          color: #0f172a;
        }

        .vac-section ul {
          margin: 0;
          padding-left: 18px;
        }

        .vac-section li {
          margin-bottom: 3px;
        }

        .vac-footer {
          margin-top: 14px;
        }

        .vac-btn {
          font-size: 0.85rem;
          font-weight: 700;
          text-decoration: none;
        }

        .career-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8fafc;
        }

        .career-contacts-foot {
          font-size: 0.85rem;
          color: #475569;
        }

        @media (max-width: 640px) {
          .vac-top {
            flex-direction: column;
          }
          .career-banner {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};
