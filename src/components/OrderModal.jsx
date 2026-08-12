import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, MapPin, Navigation, Minus, Plus, Map } from 'lucide-react';
import { validateName, validatePhone, formatPhoneInput } from '../utils/validation';

export const OrderModal = ({ isOpen, onClose, initialData }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [product, setProduct] = useState('Гранітний щебінь 5-20 мм');
  const [tonnage, setTonnage] = useState(25);
  const [address, setAddress] = useState('');
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
    { id: 'left', name: 'Лівий берег (вул. Журналістів / АНД)', address: 'м. Дніпро, Лівий берег (вул. Журналістів)' },
    { id: 'right', name: 'Правий берег (Набережна Заводська / Перемога)', address: 'м. Дніпро, Правий берег (Набережна Заводська)' },
    { id: 'podgorod', name: 'м. Підгородне (Північний виїзд)', address: 'м. Підгородне, Дніпровський район' },
    { id: 'novool', name: 'смт Новоолександрівка (Запорізьке шосе)', address: 'смт Новоолександрівка' },
    { id: 'slobozhan', name: 'смт Слобожанське (Донецьке шосе)', address: 'смт Слобожанське' },
    { id: 'kamyanske', name: 'м. Кам\'янське (Західний термінал)', address: 'м. Кам\'янське, Дніпропетровська обл.' }
  ];

  useEffect(() => {
    if (initialData?.name) {
      let raw = initialData.name;
      // If title looks like discount/banner text, default to clean material
      if (raw.toLowerCase().includes('знижка') || raw.toLowerCase().includes('акція') || raw.toLowerCase().includes('машину')) {
        setProduct('Гранітний щебінь 5-20 мм');
      } else {
        setProduct(raw.replace(/^Замовлення:\s*/i, ''));
      }
    } else {
      setProduct('Гранітний щебінь 5-20 мм');
    }

    if (initialData?.phone) {
      setPhone(initialData.phone);
    }
    setErrors({});
    setIsSuccess(false);
    setShowMapPicker(false);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhone(formatted);
    if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) setErrors(prev => ({ ...prev, name: null }));
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Геолокація не підтримкається у вашому браузері. Оберіть район зі списку нижче.");
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
            setAddress(fullAddr || `м. Дніпро (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          } else {
            setAddress(`м. Дніпро (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
          }
        } catch (e) {
          setAddress(`м. Дніпро (Координати: ${latitude.toFixed(3)}, ${longitude.toFixed(3)})`);
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setAddress('м. Дніпро — Дніпропетровська обл.');
        setIsLocating(false);
      },
      { timeout: 6000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateName(name);
    const phoneErr = validatePhone(phone);

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
          name: name,
          phone: phone,
          product: product,
          quantity: `${tonnage} тонн`,
          address: address || 'м. Дніпро (уточнюється)',
          details: initialData?.details || initialData?.calcDetails || null,
          page: window.location.hash || 'Модальне вікно замовлення',
          source: initialData?.name ? `Швидке замовлення (${initialData.name})` : 'Швидке замовлення на сайті'
        })
      });
    } catch (err) {
      console.error('Modal order send error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <div className="modal-backdrop animate-fade" onClick={onClose}>
      <div className="modal-window animate-slide" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn" aria-label="Закрити">
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="modal-success">
            <div className="success-circle">
              <CheckCircle2 size={54} color="#16a34a" />
            </div>
            <h3 className="modal-title">Заявку прийнято!</h3>
            <p className="modal-subtitle">
              Ми зв'яжемося з вами за номером <strong>{phone}</strong> протягом 5 хвилин для підтвердження часу доставки ({tonnage} тонн {product}).
            </p>
            <button onClick={onClose} className="btn btn-primary btn-block">
              Зрозуміло, дякую
            </button>
          </div>
        ) : (
          <div>
            <div className="modal-header">
              <span className="modal-tag">Швидке замовлення</span>
              <h3 className="modal-title">Оформлення заявки</h3>
              <p className="modal-subtitle">
                {initialData?.calcDetails
                  ? `За розрахунком: ${initialData.calcDetails.grandTotal} (${initialData.calcDetails.volume})`
                  : 'Заповніть контакти або виберіть район доставки у 1 клік'}
              </p>
            </div>

            {initialData?.calcDetails && (
              <div className="calc-summary-preview">
                <div><strong>Матеріал:</strong> {initialData.calcDetails.product} ({initialData.calcDetails.fraction})</div>
                <div><strong>Об'єм:</strong> {initialData.calcDetails.volume}</div>
                <div><strong>Доставка:</strong> {initialData.calcDetails.zone}</div>
                <div><strong>Транспорт:</strong> {initialData.calcDetails.truck}</div>
                <div className="calc-preview-total">
                  <span>Разом до сплати:</span>
                  <strong>{initialData.calcDetails.grandTotal}</strong>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="modal-form">
              {/* Row 1: Name & Phone */}
              <div className="form-row-2">
                <div className="form-group">
                  <label>Ваше ім'я <span className="req">*</span></label>
                  <input
                    type="text"
                    placeholder="Олексій"
                    value={name}
                    onChange={handleNameChange}
                    className={`modal-input ${errors.name ? 'input-error' : ''}`}
                  />
                  {errors.name && (
                    <span className="field-error-text">
                      <AlertCircle size={13} /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Номер телефону <span className="req">*</span></label>
                  <input
                    type="tel"
                    placeholder="+380 (__) ___-__-__"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`modal-input ${errors.phone ? 'input-error' : ''}`}
                  />
                  {errors.phone && (
                    <span className="field-error-text">
                      <AlertCircle size={13} /> {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Material Dropdown / Custom input */}
              <div className="form-group">
                <label>Матеріал</label>
                <select
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="modal-input modal-select"
                >
                  {POPULAR_MATERIALS.map((mat, idx) => (
                    <option key={idx} value={mat}>{mat}</option>
                  ))}
                </select>
              </div>

              {/* Tonnage UI Selector (No typing needed) */}
              <div className="form-group">
                <div className="field-label-row">
                  <label>Об'єм (тоннаж)</label>
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
                    <span className="ton-unit">тонн</span>
                  </div>

                  <button
                    type="button"
                    className="ton-btn"
                    onClick={() => setTonnage(prev => Math.min(150, prev + 5))}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Tonnage Quick Presets */}
                <div className="quick-chips-row mt-2">
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

              {/* Address & Interactive Map Picker */}
              <div className="form-group">
                <div className="field-label-row">
                  <label>Пункт доставки / Адреса</label>
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
                    placeholder="Введіть або виберіть район у 1 клік"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="modal-input pl-10"
                  />
                </div>

                {/* Quick District Chips */}
                <div className="quick-chips-row mt-2">
                  {DISTRICT_PRESETS.map((dist, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`chip-btn ${address === dist.replace('📍 ', '') ? 'active' : ''}`}
                      onClick={() => setAddress(dist.replace('📍 ', ''))}
                    >
                      {dist}
                    </button>
                  ))}
                </div>

                {/* Interactive Map Picker Box */}
                {showMapPicker && (
                  <div className="interactive-map-box animate-fade">
                    <div className="imb-header">Оберіть найближчий термінал / район:</div>
                    <div className="imb-zones-grid">
                      {MAP_ZONES.map((z) => (
                        <button
                          key={z.id}
                          type="button"
                          className="imb-zone-card"
                          onClick={() => {
                            setAddress(z.address);
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg btn-block modal-submit-btn"
              >
                <span>{isSubmitting ? 'Відправка...' : 'Надіслати заявку'}</span>
              </button>

              <div className="modal-privacy">
                Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
