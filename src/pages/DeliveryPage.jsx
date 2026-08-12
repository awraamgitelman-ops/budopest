import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Truck, Scale, Clock, ShieldCheck, CheckCircle2, MapPin, Zap, Phone, FileText } from 'lucide-react';

export const DeliveryPage = ({ onOpenOrderModal }) => {
  const { navigate } = useRouter();

  const fleet = [
    {
      name: "Самоскиди 10–15 тонн (7–10 м³)",
      models: "КамАЗ / МАЗ / DAF 2-вісні",
      purpose: "Приватний сектор, дачі, вузькі вулички, обмежений радіус розвороту",
      minOrder: "від 10 тонн",
      time: "від 2 годин"
    },
    {
      name: "Самоскиди 25–30 тонн (16–20 м³)",
      models: "MAN / Scania / HOWO 3-вісні та 4-вісні",
      purpose: "Будівельні майданчики, монолітні фундаменти, котеджні містечка",
      minOrder: "від 25 тонн",
      time: "від 2–3 годин"
    },
    {
      name: "Самоскидні напівпричепи 35–40 тонн (26–32 м³)",
      models: "Тягачі MAN TGX / Scania з самоскидними напівпричепами Wielton",
      purpose: "Великі промислові об'єкти, дорожнє будівництво, оптові поставки",
      minOrder: "від 35 тонн",
      time: "за узгодженим графіком"
    }
  ];

  const zones = [
    { name: "Зона 1: Дніпро — Лівий берег", areas: "Індустріальний, АНД, Самарський, Слобожанське, вул. Журналістів, Калинова", time: "від 2 годин" },
    { name: "Зона 2: Дніпро — Правий берег", areas: "Центральний, Шевченківський, Соборний, Перемога, Тополя, Набережна Заводська", time: "від 2.5 годин" },
    { name: "Зона 3: Передмістя Дніпра", areas: "Підгородне, Обухівка, Новоолександрівка, Сурсько-Литовське, Любимівка", time: "від 3 годин" },
    { name: "Зона 4: Область", areas: "м. Кам'янське, м. Новомосковськ, Синельникове, Солоне, Царичанка", time: "за графіком" }
  ];

  return (
    <div className="delivery-page-wrapper">
      <div className="delivery-hero">
        <div className="container">
          <div className="badge badge-green mb-2">Власний автопарк 30+ машин</div>
          <h1 className="delivery-hero-title">Доставка щебеню, піску та ґрунтів по Дніпру та області</h1>
          <p className="delivery-hero-subtitle">
            Оперативне відвантаження самоскидами від 10 до 40 тонн з власних перевалок та кар'єрів. Точна вага на 80-тонних автовагах та гарантія обсягу.
          </p>

          <div className="delivery-quick-highlights">
            <div className="dq-item">
              <Clock size={18} className="icon-green" />
              <span>Подача авто від 2 годин</span>
            </div>
            <div className="dq-item">
              <Scale size={18} className="icon-green" />
              <span>100% точний контроль (ТТН)</span>
            </div>
            <div className="dq-item">
              <Zap size={18} className="icon-green" />
              <span>Генератори на всіх базах</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        {/* Fleet Section */}
        <h2 className="section-title mb-2">Автопарк самоскидів «РУД МОНОЛІТ»</h2>
        <p className="section-subtitle mb-8">
          Підбираємо оптимальний тоннаж машини під можливості заїзду на вашу ділянку:
        </p>

        <div className="fleet-grid">
          {fleet.map((item, idx) => (
            <div key={idx} className="fleet-card">
              <div className="fc-top">
                <Truck size={24} className="icon-green" />
                <span className="fc-min">{item.minOrder}</span>
              </div>
              <h3 className="fc-title">{item.name}</h3>
              <div className="fc-model">{item.models}</div>
              <p className="fc-purpose">{item.purpose}</p>

              <div className="fc-bottom">
                <span className="fc-time">Термін подачі: <strong>{item.time}</strong></span>
                <button
                  onClick={() => onOpenOrderModal({ name: `Замовлення машини: ${item.name}` })}
                  className="btn btn-primary btn-sm btn-block"
                >
                  Замовити доставку
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Steps Logistics Process */}
        <div className="process-card mt-16">
          <h2 className="section-title text-center mb-8">Як організовано процес доставки</h2>

          <div className="steps-grid">
            <div className="step-item">
              <div className="step-num">1</div>
              <h4 className="step-title">Заявка та розрахунок</h4>
              <p className="step-desc">Узгоджуємо фракцію матеріалу, точну адресу об'єкта та підбираємо оптимальний самоскид.</p>
            </div>

            <div className="step-item">
              <div className="step-num">2</div>
              <h4 className="step-title">Зважування та навантаження</h4>
              <p className="step-desc">Порожній автомобіль проходить тарування на вагах. Фронтальний навантажувач завантажує матеріал.</p>
            </div>

            <div className="step-item">
              <div className="step-num">3</div>
              <h4 className="step-title">GPS-доставка на об'єкт</h4>
              <p className="step-desc">Водій доставляє вантаж у зазначений час. Клієнт отримує сповіщення про виїзд машини з перевалки.</p>
            </div>

            <div className="step-item">
              <div className="step-num">4</div>
              <h4 className="step-title">Прийом за ТТН та розрахунок</h4>
              <p className="step-desc">Вивантаження на об'єкті, передача оригіналу ТТН з печаткою та паспорта якості партії.</p>
            </div>
          </div>
        </div>

        {/* Zones & Map Summary */}
        <div className="zones-card mt-16">
          <h2 className="section-title mb-2">Географія та зони доставки</h2>
          <p className="section-subtitle mb-8">
            Щоденна доставка з 09:00 до 20:00 без вихідних по всьому Дніпропетровському регіону:
          </p>

          <div className="zones-grid">
            {zones.map((zone, idx) => (
              <div key={idx} className="zone-item">
                <div className="zi-header">
                  <MapPin size={18} className="icon-green" />
                  <h4>{zone.name}</h4>
                </div>
                <p className="zi-areas">{zone.areas}</p>
                <span className="zi-time">Час доставки: <strong>{zone.time}</strong></span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="delivery-cta-banner mt-16">
          <div className="d-cta-content">
            <h3>Потрібен точний розрахунок вартості доставки на ваш об'єкт?</h3>
            <p>Зателефонуйте черговому диспетчеру або залиште заявку — ми розрахуємо точний тариф за 5 хвилин.</p>
          </div>
          <div className="d-cta-actions">
            <button
              onClick={() => onOpenOrderModal({ name: "Запит розрахунку доставки щебеню" })}
              className="btn btn-primary btn-lg"
            >
              Розрахувати доставку
            </button>
            <a href="tel:+380676863186" className="btn btn-outline btn-lg">
              <Phone size={16} />
              <span>+380 (67) 686-31-86</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .delivery-page-wrapper {
          background: #ffffff;
          padding-bottom: 60px;
        }

        .delivery-hero {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: #ffffff;
          padding: 50px 0 40px;
        }

        .delivery-hero-title {
          font-size: 2.3rem;
          font-weight: 900;
          color: #ffffff;
          margin: 6px 0 12px;
          line-height: 1.2;
        }

        .delivery-hero-subtitle {
          font-size: 1.05rem;
          color: #cbd5e1;
          max-width: 820px;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .delivery-quick-highlights {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .dq-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .fleet-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .fleet-card {
          border: 1.5px solid #e2e8f0;
          border-radius: var(--radius-lg);
          padding: 24px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          transition: all 0.2s;
        }

        .fleet-card:hover {
          border-color: var(--c-green);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .fc-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .fc-min {
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--c-green-dark);
          background: var(--c-green-light);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .fc-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px;
        }

        .fc-model {
          font-size: 0.8rem;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 12px;
        }

        .fc-purpose {
          font-size: 0.86rem;
          color: #334155;
          line-height: 1.4;
          margin-bottom: 20px;
          flex: 1;
        }

        .fc-bottom {
          border-top: 1px solid #f1f5f9;
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .fc-time {
          font-size: 0.82rem;
          color: #64748b;
        }

        .process-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-lg);
          padding: 36px 28px;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .step-num {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--c-green);
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          box-shadow: 0 4px 12px rgba(133, 180, 42, 0.3);
        }

        .step-title {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 6px;
        }

        .step-desc {
          font-size: 0.82rem;
          color: #64748b;
          line-height: 1.4;
          margin: 0;
        }

        .zones-card {
          border: 1px solid #e2e8f0;
          border-radius: var(--radius-lg);
          padding: 32px;
          background: #ffffff;
        }

        .zones-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .zone-item {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 18px;
        }

        .zi-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .zi-header h4 {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .zi-areas {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.4;
          margin-bottom: 10px;
        }

        .zi-time {
          font-size: 0.8rem;
          color: var(--c-green-dark);
        }

        .delivery-cta-banner {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-radius: var(--radius-lg);
          padding: 36px 32px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .d-cta-content h3 {
          font-size: 1.35rem;
          font-weight: 900;
          margin: 0 0 6px;
        }

        .d-cta-content p {
          font-size: 0.9rem;
          color: #cbd5e1;
          margin: 0;
        }

        .d-cta-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        @media (max-width: 900px) {
          .fleet-grid {
            grid-template-columns: 1fr;
          }
          .steps-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          .zones-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
