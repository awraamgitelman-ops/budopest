import React from 'react';
import { Truck, Scale, Award, Clock, CreditCard, Factory } from 'lucide-react';

export const Advantages = () => {
  const items = [
    {
      icon: <Truck size={32} className="adv-icon" />,
      title: "Собственный автопарк",
      desc: "Более 35 самосвалов и тонаров от 10 до 35 м³ (КАМАЗ, Scania, Volvo). Быстрая логистика без задержек."
    },
    {
      icon: <Scale size={32} className="adv-icon" />,
      title: "Точный весовой контроль",
      desc: "Каждая отгрузка проходит через поверенные электронные автовесы до 80 тонн с фиксацией в ТТН."
    },
    {
      icon: <Award size={32} className="adv-icon" />,
      title: "ГОСТ и паспорта качества",
      desc: "Весь щебень сертифицирован по ГОСТ 8267-93. Паспорт качества карьера передается с каждой партией."
    },
    {
      icon: <Clock size={32} className="adv-icon" />,
      title: "Доставка от 3-х часов 24/7",
      desc: "Круглосуточная отгрузка без выходных и праздников. Прием и обработка срочных ночных заявок."
    },
    {
      icon: <CreditCard size={32} className="adv-icon" />,
      title: "Оплата с НДС 20%",
      desc: "Безналичный расчет для юрлиц, оплата картой через терминал у водителя, наличные. Отсрочка платежа."
    },
    {
      icon: <Factory size={32} className="adv-icon" />,
      title: "Прямые поставки с карьеров",
      desc: "Минимальные оптовые цены от производителя без посреднических наценок. Гарантия стабильного объема."
    }
  ];

  return (
    <section id="advantages" className="section advantages-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge badge-green mb-2">Надежность и качество</div>
          <h2 className="section-title">Почему выбирают компанию «Белснаб»</h2>
          <p className="section-subtitle mx-auto">
            Обеспечиваем бесперебойное снабжение нерудными материалами крупнейших строительных объектов Москвы и Московской области с 2012 года.
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
