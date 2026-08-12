import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, PhoneCall, Clock, AlertCircle, MapPin, Minus, Plus, Map } from 'lucide-react';
import { validateName, validatePhone, formatPhoneInput } from '../utils/validation';
import { ALL_PRODUCTS, MAIN_SECTIONS } from '../data/catalogData';
import { GoogleMapPicker } from './GoogleMapPicker';
import { CustomMaterialPicker } from './CustomMaterialPicker';
import { sendTelegramOrderNotification } from '../utils/telegram';

export const OrderForm = ({ compact = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  });

  const [selectedProductId, setSelectedProductId] = useState('granitnyj');
  const [selectedFraction, setSelectedFraction] = useState('5-20 мм');
  const [tonnage, setTonnage] = useState(25);
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const TONNAGE_PRESETS = [
    { num: 10, label: "10 т (ЗІЛ)" },
    { num: 15, label: "15 т (КамАЗ)" },
    { num: 25, label: "25 т (3-вісний)" },
    { num: 40, label: "40 т (Тягач)" }
  ];

  const currentProductObj = ALL_PRODUCTS.find(p => p.id === selectedProductId) || ALL_PRODUCTS[1];

  const handleProductSelectChange = (e) => {
    const prodId = e.target.value;
    setSelectedProductId(prodId);
    const prodObj = ALL_PRODUCTS.find(p => p.id === prodId);
    if (prodObj && prodObj.fractions && prodObj.fractions.length > 0) {
      setSelectedFraction(prodObj.fractions[0]);
    } else {
      setSelectedFraction('');
    }
  };

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
    const fullProductName = selectedFraction 
      ? `${currentProductObj.name} (фр. ${selectedFraction})` 
      : currentProductObj.name;

    try {
      await sendTelegramOrderNotification({
        name: formData.name,
        phone: formData.phone,
        product: fullProductName,
        quantity: `${tonnage} тонн`,
        address: formData.address || 'м. Дніпро (уточнюється)',
        comment: formData.comment,
        page: window.location.hash || 'Форма розрахунку на сторінці',
        source: compact ? 'Форма на сторінці контактів' : 'Головна форма розрахунку вартості'
      });
    } catch (err) {
      console.error('Order send error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const fullProductNameDisplay = selectedFraction 
    ? `${currentProductObj.name} (фр. ${selectedFraction})` 
    : currentProductObj.name;

  const renderFormContent = () => (
    <div className="of-form-card">
      {isSuccess ? (
        <div className="order-success-clean-card inline-mode animate-fade">
          <div className="os-clean-header">
            <span className="os-status-tag">Заявку прийнято</span>
            <h3 className="os-title">Дякуємо за заявку!</h3>
            <p className="os-subtitle">
              Ми отримали ваш запит на <strong>{fullProductNameDisplay}</strong> ({tonnage} тонн). Менеджер зв'яжеться з вами за номером <strong>{formData.phone}</strong> протягом 5 хвилин.
            </p>
          </div>
          <div className="os-actions-row">
            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({ name: '', phone: '', address: '', comment: '' });
                setSelectedProductId('granitnyj');
                setSelectedFraction('5-20 мм');
                setTonnage(25);
              }}
              className="btn btn-outline"
            >
              Надіслати ще одну заявку
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="of-form">
          <h3 className="form-card-title">Форма швидкого замовлення</h3>

          {/* Row 1: Name & Phone */}
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

          {/* Step 1: Custom Material Picker */}
          <div className="form-group">
            <label>Оберіть матеріал</label>
            <CustomMaterialPicker
              selectedProductId={selectedProductId}
              onSelectProduct={(id) => handleProductSelectChange({ target: { value: id } })}
            />
          </div>

          {/* Step 2: Interactive Fraction Pill Chips */}
          {currentProductObj.fractions && currentProductObj.fractions.length > 0 && (
            <div className="form-group">
              <div className="field-label-row">
                <label>Розмір фракції</label>
                <span className="tonnage-badge">{selectedFraction}</span>
              </div>
              <div className="quick-chips-row mt-1">
                {currentProductObj.fractions.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`chip-btn ${selectedFraction === f ? 'active' : ''}`}
                    onClick={() => setSelectedFraction(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tonnage Stepper */}
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

          {/* Address Input with Embedded Google Map Button */}
          <div className="form-group">
            <label>Адреса об'єкта / Район доставки</label>

            <div className="address-input-bar-embedded">
              <MapPin size={18} className="addr-left-pin-icon" />
              <input
                type="text"
                name="address"
                placeholder="Введіть адресу або виберіть на карті..."
                value={formData.address}
                onChange={handleChange}
                className="form-input addr-input-with-button"
              />
              <button
                type="button"
                className="addr-embedded-map-btn"
                onClick={() => setShowMapPicker(true)}
                title="Відкрити Google Карту для вибору будинку"
              >
                <Map size={14} />
                <span>Карта</span>
              </button>
            </div>
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
  );

  return (
    <>
      {compact ? (
        <div className="compact-order-form-wrapper">
          {renderFormContent()}
        </div>
      ) : (
        <section id="order-form-section" className="section order-form-section">
          <div className="container">
            <div className="order-form-wrapper">
              <div className="of-grid">
                {/* Left Info Column */}
                <div className="of-info">
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
                {renderFormContent()}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Google Map Interactive Pin Modal */}
      {showMapPicker && (
        <GoogleMapPicker
          initialAddress={formData.address}
          onClose={() => setShowMapPicker(false)}
          onSelectAddress={(selectedAddr) => setFormData(prev => ({ ...prev, address: selectedAddr }))}
        />
      )}
    </>
  );
};
