import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { Building2, FileText, Truck, Shield, CheckCircle2, Download, ExternalLink, ArrowRight } from 'lucide-react';

export const LegalPage = ({ onOpenOrderModal }) => {
  const { routeParams, navigate } = useRouter();
  const initialTab = routeParams.tab || 'requisites';

  const [activeTab, setActiveTab] = useState(
    initialTab === 'offer' || initialTab === 'delivery' || initialTab === 'privacy'
      ? initialTab
      : 'requisites'
  );

  useEffect(() => {
    if (routeParams.tab) {
      const target = routeParams.tab === 'delivery-rules' ? 'delivery' : routeParams.tab;
      if (['requisites', 'offer', 'delivery', 'privacy'].includes(target)) {
        setActiveTab(target);
      }
    }
  }, [routeParams.tab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`#/legal/${tabId}`);
  };

  return (
    <div className="legal-page-wrapper">
      {/* Page Hero */}
      <div className="legal-page-hero">
        <div className="container">
          <div className="badge badge-green mb-2">Офіційний правовий портал «РУД МОНОЛІТ» (ТОВ «БЕНГС»)</div>
          <h1 className="legal-page-hero-title">Правова інформація, реквізити та договірна документація</h1>
          <p className="legal-page-hero-subtitle">
            Повний пакет документів підприємства ТОВ "БЕНГС" (ЄДРПОУ 41963896) та сайту rud-monolit.com. Прозорі умови поставки нерудних матеріалів у Дніпрі.
          </p>
        </div>
      </div>

      <div className="container py-10">
        {/* Navigation Tabs Bar */}
        <div className="legal-nav-tabs">
          <button
            className={`legal-nav-tab ${activeTab === 'requisites' ? 'active' : ''}`}
            onClick={() => handleTabChange('requisites')}
          >
            <Building2 size={18} />
            <span>Реквізити компанії</span>
          </button>

          <button
            className={`legal-nav-tab ${activeTab === 'offer' ? 'active' : ''}`}
            onClick={() => handleTabChange('offer')}
          >
            <FileText size={18} />
            <span>Публічна оферта (Договір)</span>
          </button>

          <button
            className={`legal-nav-tab ${activeTab === 'delivery' ? 'active' : ''}`}
            onClick={() => handleTabChange('delivery')}
          >
            <Truck size={18} />
            <span>Правила відвантаження та ТТН</span>
          </button>

          <button
            className={`legal-nav-tab ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => handleTabChange('privacy')}
          >
            <Shield size={18} />
            <span>Політика конфіденційності</span>
          </button>
        </div>

        {/* Dedicated Page Content Body */}
        <div className="legal-page-card animate-fade">
          {/* TAB 1: REQUISITES */}
          {activeTab === 'requisites' && (
            <div className="legal-section">
              <div className="legal-section-header">
                <h2>Офіційні реєстраційні дані та банківські реквізити ТОВ "БЕНГС"</h2>
                <p>Юридичні та банківські реквізити для укладання договорів поставки нерудних будівельних матеріалів.</p>
              </div>

              <div className="legal-grid-2col">
                <div className="legal-info-card">
                  <h3 className="card-subheading">Реєстраційні відомості</h3>
                  <div className="legal-data-list">
                    <div className="data-row">
                      <span className="data-label">Повне найменування:</span>
                      <strong className="data-val">ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ "БЕНГС"</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Скорочена назва:</span>
                      <strong className="data-val">ТОВ "БЕНГС" (BENGS LLC)</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Код ЄДРПОУ:</span>
                      <strong className="data-val highlight-green">41963896</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Дата державної реєстрації:</span>
                      <strong className="data-val">26.02.2018</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Керівник (Директор):</span>
                      <strong className="data-val">Морозова Галина Олександрівна</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Основний вид діяльності (КВЕД):</span>
                      <strong className="data-val">46.49, 46.73, 46.77, 46.90 Оптова торгівля нерудними та будівельними матеріалами</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Система оподаткування:</span>
                      <strong className="data-val">Загальна система оподаткування (ПДВ 20%)</strong>
                    </div>
                  </div>
                </div>

                <div className="legal-info-card">
                  <h3 className="card-subheading">Адреси та контакти</h3>
                  <div className="legal-data-list">
                    <div className="data-row">
                      <span className="data-label">Юридична адреса:</span>
                      <strong className="data-val">Україна, 49051, Дніпропетровська обл., м. Дніпро, вул. Калинова, буд. 1</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Фактична адреса перевалки:</span>
                      <strong className="data-val">Україна, 49051, м. Дніпро, вул. Журналістів, 3</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Контактний телефон:</span>
                      <strong className="data-val">+380 (98) 861-29-38</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Електронна пошта (Email):</span>
                      <strong className="data-val">rudmonolit@gmail.com</strong>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Режим роботи перевалки:</span>
                      <strong className="data-val">Пн–Нд: 09:00 — 20:00 (прийом заявок цілодобово)</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="legal-bank-box mt-6">
                <h3>Банківські реквізити для безначу з ПДВ</h3>
                <p>Розрахунковий рахунок в форматі IBAN для відвантажень з ПДВ надається менеджером після узгодження специфікації поставки.</p>
                <div className="bank-actions">
                  <button onClick={() => onOpenOrderModal({ name: 'Запит рахунку та реквізитів з ПДВ' })} className="btn btn-primary">
                    Запросити рахунок з ПДВ
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PUBLIC OFFER */}
          {activeTab === 'offer' && (
            <div className="legal-section">
              <div className="legal-section-header">
                <h2>Публічна оферта (Договір поставки нерудних матеріалів)</h2>
                <p>Цей договір є публічною офертою ТОВ "БЕНГС" про продаж та доставку сипучих будівельних матеріалів (щебінь, пісок, відсів, ЩПС, шлак, керамзит, ґрунти) у Дніпрі та Дніпропетровській області.</p>
              </div>

              <div className="legal-document-text">
                <h3>1. Загальні положення</h3>
                <p>1.1. Цей Договір є офіційною пропозицією (публічною офертою) Продавця — ТОВ "БЕНГС" (код ЄДРПОУ 41963896) укласти Договір купівлі-продажу та поставки нерудних матеріалів дистанційним способом або на перевалочній базі.</p>
                <p>1.2. Акцептом цієї Оферти є оформлення Замовлення на сайті, по телефону, у месенджерах або підписання Специфікації поставки.</p>

                <h3>2. Предмет Договору</h3>
                <p>2.1. Продавець зобов'язується передати у власність Покупця нерудні будівельні матеріали (щебінь гранітний/шлаковий, пісок митий/будівельний, відсів, ЩПС С5/С7, керамзит, чорнозем), а Покупець зобов'язується оплатити та прийняти Товар на умовах цього Договору.</p>

                <h3>3. Ціна Товару та порядок розрахунків</h3>
                <p>3.1. Ціна Товару за тонну/куб вказується у прайс-листі та підтверджується менеджером при оформленні заявки.</p>
                <p>3.2. Оплата здійснюється готівковим або безначу на розрахунковий рахунок ТОВ "БЕНГС" (з ПДВ або без ПДВ).</p>

                <h3>4. Доставка та приймання Товару</h3>
                <p>4.1. Доставка здійснюється самоскидами 10, 15, 25, 30, 40 тонн або самовивозом безпосередньо з видобувних та перевальних баз ТОВ "БЕНГС" (Любимівський кар'єр, вул. Набережна Заводська, м. Кам'янське).</p>
                <p>4.2. Маса Товару визначається за показниками вагового контролю (електронні ваги 80т) та фіксується у товарно-транспортній накладній (ТТН).</p>

                <h3>5. Відповідальність сторін</h3>
                <p>5.1. Продавець гарантує відповідність Товару державним будівельним нормам ДСТУ та надає паспорт якості на вимогу Покупця.</p>
              </div>
            </div>
          )}

          {/* TAB 3: DELIVERY RULES */}
          {activeTab === 'delivery' && (
            <div className="legal-section">
              <div className="legal-section-header">
                <h2>Правила відвантаження, вагового контролю та ТТН</h2>
                <p>Порядок зважування самоскидів, оформлення супровідних документів та під'їзду вантажного транспорту на об'єкти замовника.</p>
              </div>

              <div className="legal-rules-grid">
                <div className="rule-card">
                  <div className="rule-num">01</div>
                  <h3>Подвійне зважування на 80-тонних автовагах</h3>
                  <p>Усі самоскиди проходять обов'язковий подвійний контрольний зважувальний цикл: зважування порожнього авто (Тара) та завантаженого авто (Брутто). Чиста вага вантажу обчислюється автоматично програмним комплексом вагової.</p>
                </div>

                <div className="rule-card">
                  <div className="rule-num">02</div>
                  <h3>Товарно-транспортна накладна (ТТН)</h3>
                  <p>Разом із кожною партією водій видає оригінальний примірник ТТН з унікальним номером, датою, часом виїзду з перевалки, державним номером авто та точною вагою вантажу в тоннах.</p>
                </div>

                <div className="rule-card">
                  <div className="rule-num">03</div>
                  <h3>Вимоги до під'їзних шляхів клієнта</h3>
                  <p>Замовник зобов'язаний забезпечити безперешкодний та безпечний під'їзд великогабаритного самоскида (10–40 тонн) до місця розвантаження (відсутність низьковисячих дротів, гілок, обмежень по масі на мостах).</p>
                </div>

                <div className="rule-card">
                  <div className="rule-num">04</div>
                  <h3>Контроль якості при вивантаженні</h3>
                  <p>Покупець має право оглянути вантаж перед розвантаженням. У разі виявлення невідповідності фракції або наявності домішок розвантаження зупиняється до узгодження з диспетчером.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="legal-section">
              <div className="legal-section-header">
                <h2>Політика конфіденційності та захисту персональних даних</h2>
                <p>Правила збору, обробки та захисту персональних даних користувачів веб-сайту ТОВ "БЕНГС" відповідно до Закону України «Про захист персональних даних».</p>
              </div>

              <div className="legal-document-text">
                <h3>1. Збір та використання даних</h3>
                <p>ТОВ "БЕНГС" збирає лише ті персональні дані (ім'я, телефон, адреса доставки), які добровільно надаються користувачем при заповненні форми замовлення або калькулятора.</p>

                <h3>2. Мета обробки даних</h3>
                <p>Персональні дані використовуються виключно для виконання замовлення, зв'язку з клієнтом щодо часу виїзду самоскида та укладання договорів поставки.</p>

                <h3>3. Передача даних третім особам</h3>
                <p>ТОВ "БЕНГС" не передає персональні дані клієнтів третім особам, крім випадків, безпосередньо пов'язаних з виконанням доставки (водіям-перевізникам) або на вимогу законодавства України.</p>

                <h3>4. Безпека даних</h3>
                <p>Усі дані передаються через захищене протоколом SSL з'єднання і зберігаються на захищених серверах із обмеженим доступом.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
