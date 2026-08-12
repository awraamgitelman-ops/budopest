import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, PhoneCall, Clock, AlertCircle, MapPin, Minus, Plus, Map, ShoppingBag, Truck, FileText } from 'lucide-react';
import { validateName, validatePhone, formatPhoneInput } from '../utils/validation';
import { ALL_PRODUCTS, MAIN_SECTIONS } from '../data/catalogData';
import { GoogleMapPicker } from '../components/GoogleMapPicker';
import { CustomMaterialPicker } from '../components/CustomMaterialPicker';

export const OrderPage = ({ onOpenLegalModal }) => {
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

  const handleProductSelectChange = (prodId) => {
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
      await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          product: fullProductName,
          quantity: `${tonnage} тонн`,
          address: formData.address || 'м. Дніпро (уточнюється)',
          comment: formData.comment,
          page: 'Окрема сторінка замовлення (#/order)',
          source: 'Окремий екран оформлення заявки'
        })
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

  const estimatedCost = (currentProductObj.price || 300) * tonnage;

  return (
    <div className="order-page-wrapper">
      {/* Page Hero */}
      <div className="order-page-hero">
        <div className="container">
          <div className="badge badge-green mb-2">Офіційне замовлення продукції</div>
          <h1 className="order-page-title">Оформлення заявки на доставку щебеню та матеріалів</h1>
          <p className="order-page-subtitle">
            Оберіть товар, тоннаж та вкажіть точну точку на Google Карті Дніпра. Розрахунок оптової знижки за 5 хвилин!
          </p>
        </div>
      </div>

      <div className="container py-12">
        {isSuccess ? (
          <div className="order-page-success-card animate-fade">
            <div className="success-icon-circle-lg">
              <CheckCircle2 size={64} color="#16a34a" />
            </div>
            <h2 className="op-success-title">Вашу заявку успішно прийнято!</h2>
            <p className="op-success-desc">
              Ми отримали ваше замовлення на <strong>{fullProductNameDisplay}</strong> в об'ємі <strong>{tonnage} тонн</strong>.
              <br />
              Черговий диспетчер логістики зателефонує вам за номером <strong>{formData.phone}</strong> протягом 5 хвилин для підтвердження часу виїзду самоскида.
            </p>

            <div className="op-success-info-box">
              <div><strong>Пункт доставки:</strong> {formData.address || 'м. Дніпро'}</div>
              <div><strong>Матеріал:</strong> {fullProductNameDisplay}</div>
              <div><strong>Об'єм:</strong> {tonnage} тонн</div>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({ name: '', phone: '', address: '', comment: '' });
                setTonnage(25);
              }}
              className="btn btn-primary btn-lg"
            >
              Нове замовлення
            </button>
          </div>
        ) : (
          <div className="order-page-grid">
            {/* Left Main Form Box */}
            <div className="op-form-main-card">
              <div className="op-card-header">
                <ShoppingBag size={24} className="icon-green" />
                <div>
                  <h3 className="op-card-title">Параметри замовлення</h3>
                  <p className="op-card-sub">Заповніть контакти та обраний матеріал</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="op-form-body">
                {/* Contact Fields Row */}
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
                    <label>Номер телефону <span className="req">*</span></label>
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
                    onSelectProduct={handleProductSelectChange}
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

                {/* Tonnage Selector */}
                <div className="form-group">
                  <div className="field-label-row">
                    <label>Потрібний об'єм (тоннаж)</label>
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

                {/* Address Bar with Embedded Google Map Button */}
                <div className="form-group">
                  <label>Адреса об'єкта / Пункт доставки</label>
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
                  <label>Коментар / Форма оплати (з ПДВ або без)</label>
                  <textarea
                    name="comment"
                    rows="3"
                    placeholder="Вкажіть особливості під'їзду, бажаний час доставки або розрахунок з ПДВ..."
                    value={formData.comment}
                    onChange={handleChange}
                    className="form-textarea"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg btn-block op-submit-btn"
                >
                  <span>{isSubmitting ? 'Відправка...' : 'Підтвердити замовлення'}</span>
                </button>
              </form>
            </div>

            {/* Right Summary Sidebar Card */}
            <div className="op-summary-sidebar">
              <div className="op-summary-card">
                <h4 className="op-summary-title">Розрахунок замовлення</h4>

                <div className="op-summary-row">
                  <span>Обраний товар:</span>
                  <strong>{currentProductObj.name}</strong>
                </div>

                <div className="op-summary-row">
                  <span>Фракція:</span>
                  <span className="badge badge-green">{selectedFraction || 'Стандарт'}</span>
                </div>

                <div className="op-summary-row">
                  <span>Тоннаж:</span>
                  <strong>{tonnage} тонн</strong>
                </div>

                <div className="op-summary-row">
                  <span>Базова ціна:</span>
                  <span>{currentProductObj.price} {currentProductObj.priceUnit || 'грн/т'}</span>
                </div>

                <div className="op-summary-divider"></div>

                <div className="op-summary-total-row">
                  <span>Орієнтовна вартість:</span>
                  <strong className="op-total-price">~ {estimatedCost.toLocaleString()} грн</strong>
                </div>
                <div className="op-total-sub">*Точна сума доставки узгоджується диспетчером</div>

                <div className="op-perks-mini mt-4">
                  <div className="op-perk-mini">
                    <Truck size={16} className="icon-green" />
                    <span>Власні самоскиди 10, 15, 25, 40 т</span>
                  </div>
                  <div className="op-perk-mini">
                    <ShieldCheck size={16} className="icon-green" />
                    <span>Точна вага на електронних вагах</span>
                  </div>
                  <div className="op-perk-mini">
                    <Clock size={16} className="icon-green" />
                    <span>Подача машин від 2 годин</span>
                  </div>
                </div>
              </div>

              <div className="op-contact-card">
                <PhoneCall size={20} className="icon-green" />
                <div>
                  <strong>Потрібна консультація диспетчера?</strong>
                  <p>Телефонуйте щоденно з 09:00 до 20:00:</p>
                  <a href="tel:+380676863186" className="op-phone-link">+380 (67) 686-31-86</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Google Map Interactive Pin Modal */}
      {showMapPicker && (
        <GoogleMapPicker
          initialAddress={formData.address}
          onClose={() => setShowMapPicker(false)}
          onSelectAddress={(selectedAddr) => setFormData(prev => ({ ...prev, address: selectedAddr }))}
        />
      )}
    </div>
  );
};
