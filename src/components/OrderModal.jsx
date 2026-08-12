import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, MapPin, Minus, Plus, Map } from 'lucide-react';
import { validateName, validatePhone, formatPhoneInput } from '../utils/validation';

export const OrderModal = ({ isOpen, onClose, initialData }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('Гранітний щебінь 5-20 мм');
  const [tonnage, setTonnage] = useState(25);
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const MAP_ZONES = [
    { id: 'left', name: 'Лівий берег (вул. Журналістів)', address: 'м. Дніпро, Лівий берег (вул. Журналістів)' },
    { id: 'right', name: 'Правий берег (Набережна Заводська)', address: 'м. Дніпро, Правий берег (Набережна Заводська)' },
    { id: 'podgorod', name: 'м. Підгородне', address: 'м. Підгородне, Дніпровський р-н' },
    { id: 'novool', name: 'смт Новоолександрівка', address: 'смт Новоолександрівка' },
    { id: 'slobozhan', name: 'смт Слобожанське', address: 'смт Слобожанське' },
    { id: 'kamyanske', name: 'м. Кам\'янське', address: 'м. Кам\'янське, Дніпропетровська обл.' }
  ];

  useEffect(() => {
    if (initialData?.name) {
      const raw = initialData.name;
      if (typeof raw === 'string' && (raw.toLowerCase().includes('знижка') || raw.toLowerCase().includes('акція') || raw.toLowerCase().includes('машину'))) {
        setProduct('Гранітний щебінь 5-20 мм');
      } else if (typeof raw === 'string') {
        setProduct(raw.replace(/^Замовлення:\s*/i, ''));
      } else {
        setProduct('Гранітний щебінь 5-20 мм');
      }
    } else if (initialData?.product && typeof initialData.product === 'string') {
      setProduct(initialData.product);
    } else {
      setProduct('Гранітний щебінь 5-20 мм');
    }

    if (initialData?.phone && typeof initialData.phone === 'string') {
      setPhone(initialData.phone);
    } else {
      setPhone('');
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
                  : 'Заповніть контактні дані для узгодження доставки'}
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
              <div className="form-group">
                <label>Ваше ім'я <span className="req">*</span></label>
                <input
                  type="text"
                  placeholder="Кирило"
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

              {/* Material Dropdown */}
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

              {/* Tonnage UI Selector */}
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

              {/* Address */}
              <div className="form-group">
                <div className="field-label-row">
                  <label>Адреса об'єкта / Пункт доставки</label>
                  <button
                    type="button"
                    className="addr-geo-btn alt"
                    onClick={() => setShowMapPicker(!showMapPicker)}
                  >
                    <Map size={13} />
                    <span>{showMapPicker ? 'Сховати карту' : 'Карта Дніпра'}</span>
                  </button>
                </div>

                <div className="input-with-icon">
                  <MapPin size={16} className="input-left-icon" />
                  <input
                    type="text"
                    placeholder="м. Дніпро або район області"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="modal-input pl-10"
                  />
                </div>

                {/* Map Picker Box */}
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
