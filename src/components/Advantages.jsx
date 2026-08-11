import React from 'react';
import { Truck, Scale, Award, Clock, CreditCard, Factory } from 'lucide-react';

export const Advantages = () => {
  const items = [
    {
      icon: <Truck size={32} className="adv-icon" />,
      title: "Власний автопарк самоскидів",
      desc: "Понад 30 одиниць техніки від 10 до 40 тонн (MAN, Scania, DAF, КАМАЗ, самоскидні напівпричепи). Швидка доставка без посередників."
    },
    {
      icon: <Scale size={32} className="adv-icon" />,
      title: "Точний ваговий контроль",
      desc: "Кожне завантаження проходить через повірені електронні автоваги до 80 тонн із фіксацією у ТТН."
    },
    {
      icon: <Award size={32} className="adv-icon" />,
      title: "ДСТУ та паспорти якості",
      desc: "Увесь щебінь відповідає ДСТУ Б В.2.7-75-98. Паспорт якості випробувальної лабораторії передається з кожною партією."
    },
    {
      icon: <Clock size={32} className="adv-icon" />,
      title: "Щоденна доставка 09:00 — 20:00",
      desc: "Відвантаження без вихідних (з урахуванням комендантської години). Бази обладнані генераторами для безперебійної роботи під час знеструмлень."
    },
    {
      icon: <CreditCard size={32} className="adv-icon" />,
      title: "Оплата з ПДВ 20%",
      desc: "Безготівковий розрахунок для юридичних осіб з ПДВ, оплата для ФОП, готівковий розрахунок або відстрочка платежу для постійних партнерів."
    },
    {
      icon: <Factory size={32} className="adv-icon" />,
      title: "Прямі поставки з кар'єрів",
      desc: "Мінімальні ціни від виробника без націнок посередників. Пряме відвантаження з Любимівського та Таромського кар'єрів."
    }
  ];

  return (
    <section id="advantages" className="section advantages-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge badge-green mb-2">Надійність та якість з 2018 року</div>
          <h2 className="section-title">Чому обирають компанію «БЕНГС» у Дніпрі</h2>
          <p className="section-subtitle mx-auto">
            ТОВ «БЕНГС» (ЄДРПОУ 41963896) забезпечує безперебійне постачання нерудних будівельних матеріалів для провідних забудовників, дорожніх служб та приватних об'єктів Дніпра та області з 2018 року.
          </p>
        </div>

        <div className="grid-3 advantages-grid">
          {items.map((item, idx) => (
            <div key={idx} className="advantage-card">
              <div className="adv-icon-box">
                {item.icon}
              </div>
              <h3 className="adv-title">{item.title}</h3>
              <p className="adv-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .advantages-section {
          background-color: #ffffff;
        }

        .advantages-grid {
          margin-top: 10px;
        }

        .advantage-card {
          padding: 32px 28px;
          border: 1px solid #eef0f2;
          border-radius: var(--radius-md);
          background: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .advantage-card:hover {
          transform: translateY(-4px);
          border-color: var(--c-green);
          box-shadow: 0 12px 28px rgba(133, 180, 42, 0.12);
        }

        .adv-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: var(--c-green-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: var(--c-green-dark);
          transition: all 0.2s;
        }

        .advantage-card:hover .adv-icon-box {
          background: var(--c-green);
          color: #ffffff;
        }

        .adv-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 10px;
        }

        .adv-desc {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
};
