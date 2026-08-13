import React, { useState } from 'react';
import { X, FileText, Shield, Truck, CheckCircle2, ExternalLink } from 'lucide-react';

export const LegalModal = ({ isOpen, onClose, initialTab = 'requisites' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="legal-modal-overlay" onClick={onClose}>
      <div className="legal-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="legal-modal-header">
          <div className="legal-header-title">
            <FileText size={22} className="legal-icon" />
            <div>
              <h3>Правова інформація та реквізити</h3>
              <p>ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "БЕНГС"</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={`#/legal/${activeTab}`}
              onClick={onClose}
              className="modal-full-screen-link"
              title="Відкрити на окремій сторінці"
            >
              <ExternalLink size={13} />
              <span>На окремій сторінці</span>
            </a>
            <button className="legal-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="legal-tabs-bar">
          <button
            className={`legal-tab ${activeTab === 'requisites' ? 'active' : ''}`}
            onClick={() => setActiveTab('requisites')}
          >
            <FileText size={16} />
            <span>Реєстраційні дані</span>
          </button>

          <button
            className={`legal-tab ${activeTab === 'offer' ? 'active' : ''}`}
            onClick={() => setActiveTab('offer')}
          >
            <FileText size={16} />
            <span>Публічна оферта (Договір)</span>
          </button>

          <button
            className={`legal-tab ${activeTab === 'delivery' ? 'active' : ''}`}
            onClick={() => setActiveTab('delivery')}
          >
            <Truck size={16} />
            <span>Правила відвантаження та ТТН</span>
          </button>

          <button
            className={`legal-tab ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <Shield size={16} />
            <span>Політика конфіденційності</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="legal-content-body">
          {activeTab === 'requisites' && (
            <div className="legal-tab-pane">
              <h4>Реєстраційні дані ТОВ "БЕНГС"</h4>
              <div className="requisites-grid">
                <div className="req-item">
                  <span className="req-label">Повне найменування:</span>
                  <span className="req-val">ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "БЕНГС"</span>
                </div>
                <div className="req-item">
                  <span className="req-label">Скорочена назва:</span>
                  <span className="req-val">ТОВ "БЕНГС"</span>
                </div>
                <div className="req-item">
                  <span className="req-label">Код ЄДРПОУ:</span>
                  <span className="req-val req-highlight">41963896</span>
                </div>
                <div className="req-item">
                  <span className="req-label">Юридична адреса:</span>
                  <span className="req-val">Україна, 49051, Дніпропетровська обл., м. Дніпро, вул. Калинова, буд. 1</span>
                </div>
                <div className="req-item">
                  <span className="req-label">Фактична адреса:</span>
                  <span className="req-val">Україна, 49051, м. Дніпро, вул. Журналістів, 3</span>
                </div>
                <div className="req-item">
                  <span className="req-label">Контактний телефон:</span>
                  <span className="req-val">+380 (98) 861-29-38</span>
                </div>
                <div className="req-item">
                  <span className="req-lbl">Електронна пошта (Email):</span>
                  <span className="req-val">rudmonolit@gmail.com</span>
                </div>
                <div className="req-item">
                  <span className="req-label">Графік роботи:</span>
                  <span className="req-val">Щоденно 09:00 — 20:00 (з урахуванням комендантської години)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'offer' && (
            <div className="legal-tab-pane">
              <h4>Публічна оферта (Договір купівлі-продажу та поставки нерудних матеріалів)</h4>
              <p className="legal-intro">
                Цей документ є офіційною публічною пропозицією ТОВ "БЕНГС" (ЄДРПОУ 41963896) укласти договір поставки будівельних нерудних матеріалів (щебінь, пісок, ґрунти, відсів, ЩПС, керамзит) на нижчезазначених умовах.
              </p>

              <div className="legal-section-block">
                <h5>1. Предмет договору</h5>
                <p>1.1. Продавець зобов'язується передати у власність Покупця нерудні сипучі будівельні матеріали, а Покупець — прийняти товар та оплатити його відповідно до узгодженої ціни за тонну або кубічний метр.</p>
                <p>1.2. Якість матеріалів відповідає вимогам державних стандартів України (ДСТУ Б В.2.7-75-98 та суміжним галузевим нормативам).</p>
              </div>

              <div className="legal-section-block">
                <h5>2. Порядок оформлення замовлення та оплати</h5>
                <p>2.1. Замовлення оформлюється через електронні форми сайту, телефоном або на перевалочній базі компанії в м. Дніпро.</p>
                <p>2.2. Оплата здійснюється у національній валюті України (гривня) за безготівковим розрахунком на банківський рахунок ТОВ "БЕНГС" або готівкою/карткою при відвантаженні через автоваги.</p>
              </div>

              <div className="legal-section-block">
                <h5>3. Відвантаження та доставка</h5>
                <p>3.1. Доставка здійснюється самоскидами вантажопідйомністю від 10 до 40 тонн по м. Дніпро та Дніпропетровській області або на умовах самовивозу з перевалочних баз Продавця.</p>
                <p>3.2. Точна вага фіксується на сертифікованих електронних автовагах та оформлюється товарно-транспортною накладною (ТТН).</p>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="legal-tab-pane">
              <h4>Правила відвантаження, зважування та оформлення ТТН</h4>
              <div className="legal-bullet-box">
                <div className="l-bullet">
                  <CheckCircle2 size={18} className="b-icon" />
                  <div>
                    <strong>Точний ваговий контроль:</strong> Кожне авто проходить обов'язкове тарування (зважування пустого та завантаженого авто) на повірених 80-тонних автовагах.
                  </div>
                </div>

                <div className="l-bullet">
                  <CheckCircle2 size={18} className="b-icon" />
                  <div>
                    <strong>Товарно-транспортна документація:</strong> Водій передає клієнту оригінал ТТН з відміткою вагової, датою, часом та найменуванням фракції.
                  </div>
                </div>

                <div className="l-bullet">
                  <CheckCircle2 size={18} className="b-icon" />
                  <div>
                    <strong>Енергонезалежність відвантаження:</strong> На перевалках працюють резервні генератори, що забезпечує безперебійне навантаження та зважування навіть під час планових чи аварійних відключень електроенергії.
                  </div>
                </div>

                <div className="l-bullet">
                  <CheckCircle2 size={18} className="b-icon" />
                  <div>
                    <strong>Графік логістики:</strong> Відвантаження та рух автопарку здійснюється строго з 09:00 до 20:00 відповідно до вимог комендантської години.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="legal-tab-pane">
              <h4>Політика конфіденційності та захисту персональних даних</h4>
              <p>ТОВ "БЕНГС" неухильно дотримується Закону України «Про захист персональних даних» № 2297-VI.</p>
              <p>
                Персональні дані клієнтів (ім'я, контактний телефон, адреса доставки), що надаються через форми онлайн-замовлення та зворотного дзвінка, використовуються виключно для узгодження логістики, виписки ТТН і зв'язку з замовником.
              </p>
              <p>
                Ми не передаємо контактні дані третім особам, крім випадків, прямо передбачених чинним законодавством України.
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="legal-modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Зрозуміло / Закрити
          </button>
        </div>
      </div>

      <style>{`
        .legal-modal-overlay {
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

        .legal-modal-container {
          background: #ffffff;
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: modalFadeIn 0.2s ease-out;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .legal-modal-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fafc;
        }

        .legal-header-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .legal-icon {
          color: var(--c-green);
        }

        .legal-header-title h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .legal-header-title p {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 600;
          margin: 2px 0 0;
        }

        .legal-close-btn {
          background: transparent;
          border: none;
          color: #64748b;
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          transition: all 0.15s;
        }

        .legal-close-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .legal-tabs-bar {
          display: flex;
          background: #f1f5f9;
          border-bottom: 1px solid #e2e8f0;
          overflow-x: auto;
        }

        .legal-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          font-size: 0.86rem;
          font-weight: 700;
          color: #475569;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s;
        }

        .legal-tab:hover {
          color: #0f172a;
        }

        .legal-tab.active {
          color: var(--c-green-dark);
          background: #ffffff;
          border-bottom-color: var(--c-green);
        }

        .legal-content-body {
          padding: 24px;
          overflow-y: auto;
          font-size: 0.9rem;
          line-height: 1.6;
          color: #334155;
        }

        .legal-tab-pane h4 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 16px;
        }

        .requisites-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .req-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 14px;
          background: #f8fafc;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          font-size: 0.88rem;
        }

        .req-label {
          font-weight: 600;
          color: #64748b;
          min-width: 200px;
        }

        .req-val {
          font-weight: 700;
          color: #0f172a;
          text-align: right;
        }

        .req-highlight {
          color: var(--c-green-dark);
          font-size: 0.95rem;
        }

        .legal-section-block {
          margin-bottom: 18px;
        }

        .legal-section-block h5 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .legal-bullet-box {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .l-bullet {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }

        .b-icon {
          color: var(--c-green);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .legal-modal-footer {
          padding: 16px 24px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
          background: #f8fafc;
        }

        @media (max-width: 640px) {
          .req-item {
            flex-direction: column;
            gap: 4px;
          }
          .req-val {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};
