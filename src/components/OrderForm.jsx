import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, PhoneCall, Clock, AlertCircle, MapPin, Navigation, Minus, Plus, Map } from 'lucide-react';
import { validateName, validatePhone, formatPhoneInput } from '../utils/validation';

export const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: 'Гранітний щебінь 5-20 мм',
    address: '',
    comment: ''
  });

  const [tonnage, setTonnage] = useState(25);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const POPULAR_MATERIALS = [
    "Гранітний щебінь 5-20 мм",
    "Гранітний щебінь 20-40 мм",
    "Гранітний щебінь 40-70 мм",
    "Відсів 0-5 мм",
    "Річковий пісок (митий)",
    "Шлаковий щебінь 20-40 мм",
    "Бутовий камінь (бут)",
    "Дорожня суміш С5 / С7"
  ];

  const TONNAGE_PRESETS = [
    { num: 10, label: "10 т (ЗІЛ)" },
    { num: 15, label: "15 т (КамАЗ)" },
    { num: 25, label: "25 т (3-вісний)" },
    { num: 40, label: "40 т (Тягач)" }
  ];

  const DISTRICT_PRESETS = [
    "📍 Лівий берег",
    "📍 Правий берег",
    "📍 Підгородне",
    "📍 Новоолександрівка",
    "📍 Слобожанське",
    "📍 Кам'янське",
    "📍 Обухівка"
  ];

  const MAP_ZONES = [
    { id: 'left', name: 'Лівий берег (вул. Журналістів)', address: 'м. Дніпро, Лівий берег (вул. Журналістів)' },
    { id: 'right', name: 'Правий берег (Набережна Заводська)', address: 'м. Дніпро, Правий берег (Набережна Заводська)' },
    { id: 'podgorod', name: 'м. Підгородне (Північний виїзд)', address: 'м. Підгородне, Дніпровський район' },
    { id: 'novool', name: 'смт Новоолександрівка', address: 'смт Новоолександрівка' },
    { id: 'slobozhan', name: 'смт Слобожанське', address: 'смт Слобожанське' },
    { id: 'kamyanske', name: 'м. Кам\'янське', address: 'м. Кам\'янське, Дніпропетровська обл.' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedVal = value;
    if (name === 'phone') {
      formattedVal = formatPhoneInput(value);
    }
    setFormData(prev => ({ ...prev, [name]: formattedVal }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Геолокація не підтримується у вашому браузері. Оберіть район зі списку нижче.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`);
          const data = await resp.json();
          if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || 'Дніпро';
            const road = data.address.road || '';
            const house = data.address.house_number || '';
            const fullAddr = [city, road, house].filter(Boolean).join(', ');
            setFormData(prev => ({ ...prev, address: fullAddr || `м. Дніпро (${latitude.toFixed(4)}, ${longitude.toFixed(4)})` }));
          } else {
            setFormData(prev => ({ ...prev, address: `м. Дніпро (${latitude.toFixed(4)}, ${longitude.toFixed(4)})` }));
          }
        } catch (e) {
          setFormData(prev => ({ ...prev, address: `м. Дніпро (Координати: ${latitude.toFixed(3)}, ${longitude.toFixed(3)})` }));
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setFormData(prev => ({ ...prev, address: 'м. Дніпро — Дніпропетровська обл.' }));
        setIsLocating(false);
      },
      { timeout: 6000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);

    if (nameErr || phoneErr) {
      setErrors({
        name: nameErr,
        phone: phoneErr
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          product: formData.product,
          quantity: `${tonnage} тонн`,
          address: formData.address || 'м. Дніпро (уточнюється)',
          comment: formData.comment,
          page: window.location.hash || 'Форма розрахунку на сторінці',
          source: 'Головна форма розрахунку вартості'
        })
      });
    } catch (err) {
      console.error('Order send error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <section id="order-form-section" className="section order-form-section">
      <div className="container">
        <div className="order-form-wrapper">
          <div className="of-grid">
            {/* Left Info Column */}
            <div className="of-info">
              <div className="badge badge-green mb-2">Оперативний розрахунок</div>
              <h2 className="of-title">Замовте щебінь за вигідною ціною з доставкою по Дніпру</h2>
              <p className="of-desc">
                Заповніть форму — наш фахівець зателефонує вам протягом <strong>5 хвилин</strong>, уточнить деталі об'єкта та розрахує персональну оптову знижку.
              </p>

              <div className="of-perks">
                <div className="of-perk">
                  <div className="op-icon"><Clock size={20} /></div>
                  <div>
                    <strong>Розрахунок за 5 хвилин:</strong> оперативно підберемо найближчий кар'єр і потрібний тоннаж самоскида.
                  </div>
                </div>
                <div className="of-perk">
                  <div className="op-icon"><ShieldCheck size={20} /></div>
                  <div>
                    <strong>Фіксація ціни:</strong> гарантуємо незмінність вартості після підтвердження замовлення.
                  </div>
                </div>
                <div className="of-perk">
                  <div className="op-icon"><PhoneCall size={20} /></div>
                  <div>
                    <strong>Прямий зв'язок:</strong> або телефонуйте щоденно з 09:00 до 20:00 за номером <a href="tel:+380676863186">+380 (67) 686-31-86</a>.
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="of-form-card">
              {isSuccess ? (
                <div className="of-success-state animate-fade">
                  <div className="success-icon-circle">
                    <CheckCircle2 size={44} color="#16a34a" />
                  </div>
                  <h3 className="success-title">Дякуємо за заявку!</h3>
                  <p className="success-desc">
                    Ми отримали ваш запит на <strong>{formData.product}</strong> ({tonnage} тонн). Менеджер зв'яжеться з вами за номером <strong>{formData.phone}</strong> протягом 5 хвилин.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        phone: '',
                        product: 'Гранітний щебінь 5-20 мм',
                        address: '',
                        comment: ''
                      });
                      setTonnage(25);
                    }}
                    className="btn btn-outline"
                  >
                    Надіслати ще одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="of-form">
                  <h3 className="form-card-title">Форма швидкого замовлення</h3>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Ваше ім'я <span className="req">*</span></label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Олександр"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                      />
                      {errors.name && (
                        <span className="field-error-text">
                          <AlertCircle size={13} /> {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Телефон <span className="req">*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+380 (__) ___-__-__"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`form-input ${errors.phone ? 'input-error' : ''}`}
                      />
                      {errors.phone && (
                        <span className="field-error-text">
                          <AlertCircle size={13} /> {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Material & Tonnage Selectors */}
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Матеріал</label>
                      <select
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        className="form-input modal-select"
                      >
                        {POPULAR_MATERIALS.map((mat, idx) => (
                          <option key={idx} value={mat}>{mat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Tonnage Stepper */}
                    <div className="form-group">
                      <div className="field-label-row">
                        <label>Об'єм</label>
                        <span className="tonnage-badge">{tonnage} тонн</span>
                      </div>

                      <div className="tonnage-control-bar">
                        <button
                          type="button"
                          className="ton-btn"
                          onClick={() => setTonnage(prev => Math.max(5, prev - 5))}
                        >
                          <Minus size={16} />
                        </button>
                        <div className="ton-display">
                          <input
                            type="number"
                            min="5"
                            max="200"
                            value={tonnage}
                            onChange={(e) => setTonnage(Math.max(1, parseInt(e.target.value) || 0))}
                            className="ton-input"
                          />
                          <span className="ton-unit">т</span>
                        </div>
                        <button
                          type="button"
                          className="ton-btn"
                          onClick={() => setTonnage(prev => Math.min(150, prev + 5))}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tonnage Quick Presets Chips */}
                  <div className="form-group">
                    <div className="quick-chips-row">
                      {TONNAGE_PRESETS.map((p) => (
                        <button
                          key={p.num}
                          type="button"
                          className={`chip-btn ${tonnage === p.num ? 'active' : ''}`}
                          onClick={() => setTonnage(p.num)}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Address & Interactive Map */}
                  <div className="form-group">
                    <div className="field-label-row">
                      <label>Адреса об'єкта / Район доставки</label>
                      <div className="address-actions-row">
                        <button
                          type="button"
                          className="addr-geo-btn"
                          onClick={handleGetLocation}
                          disabled={isLocating}
                        >
                          <Navigation size={13} className={isLocating ? 'spin-icon' : ''} />
                          <span>{isLocating ? 'Визначаємо...' : 'Моє GPS'}</span>
                        </button>
                        <button
                          type="button"
                          className="addr-geo-btn alt"
                          onClick={() => setShowMapPicker(!showMapPicker)}
                        >
                          <Map size={13} />
                          <span>{showMapPicker ? 'Сховати карту' : 'Карта Дніпра'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="input-with-icon">
                      <MapPin size={16} className="input-left-icon" />
                      <input
                        type="text"
                        name="address"
                        placeholder="Оберіть район нижче або вкажіть адресу"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-input pl-10"
                      />
                    </div>

                    {/* District Presets */}
                    <div className="quick-chips-row mt-2">
                      {DISTRICT_PRESETS.map((dist, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`chip-btn ${formData.address === dist.replace('📍 ', '') ? 'active' : ''}`}
                          onClick={() => setFormData(prev => ({ ...prev, address: dist.replace('📍 ', '') }))}
                        >
                          {dist}
                        </button>
                      ))}
                    </div>

                    {/* Interactive Map Selector Box */}
                    {showMapPicker && (
                      <div className="interactive-map-box animate-fade">
                        <div className="imb-header">Оберіть район відвантаження на карті Дніпра:</div>
                        <div className="imb-zones-grid">
                          {MAP_ZONES.map((z) => (
                            <button
                              key={z.id}
                              type="button"
                              className="imb-zone-card"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, address: z.address }));
                                setShowMapPicker(false);
                              }}
                            >
                              <MapPin size={14} className="icon-green" />
                              <span>{z.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Коментар до замовлення (необов'язково)</label>
                    <textarea
                      name="comment"
                      rows="2"
                      placeholder="Вкажіть особливості під'їзду, форму оплати (з ПДВ/без) або бажаний час..."
                      value={formData.comment}
                      onChange={handleChange}
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg btn-block of-submit-btn"
                  >
                    <span>{isSubmitting ? 'Відправка...' : 'Розрахувати вартість зі знижкою'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
