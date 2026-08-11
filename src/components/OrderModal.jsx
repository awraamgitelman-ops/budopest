import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Send, Phone, MapPin, Truck } from 'lucide-react';

export const OrderModal = ({ isOpen, onClose, initialData }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [product, setProduct] = useState('');
  const [volume, setVolume] = useState('20 тонн');
  const [address, setAddress] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData?.name) {
      setProduct(initialData.name);
    } else {
      setProduct('Щебень с доставкой');
    }
    if (initialData?.phone) {
      setPhone(initialData.phone);
    }
    setIsSuccess(false);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  return (
    <div className="modal-backdrop animate-fade" onClick={onClose}>
      <div className="modal-window animate-slide" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn" aria-label="Закрыть">
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="modal-success">
            <div className="success-circle">
              <CheckCircle2 size={54} color="#16a34a" />
            </div>
            <h3 className="modal-title">Заявка принята!</h3>
            <p className="modal-subtitle">
              Мы свяжемся с вами по номеру <strong>{phone}</strong> в течение 5 минут для подтверждения времени доставки и параметров щебня.
            </p>
            <button onClick={onClose} className="btn btn-primary btn-block">
              Отлично, понятно
            </button>
          </div>
        ) : (
          <div>
            <div className="modal-header">
              <span className="modal-tag">Быстрый заказ</span>
              <h3 className="modal-title">Оформление заявки</h3>
              <p className="modal-subtitle">
                {initialData?.calcDetails
                  ? `По расчету: ${initialData.calcDetails.grandTotal} (${initialData.calcDetails.volume})`
                  : 'Заполните контактные данные для расчета и согласования поставки'}
              </p>
            </div>

            {initialData?.calcDetails && (
              <div className="calc-summary-preview">
                <div><strong>Материал:</strong> {initialData.calcDetails.product} ({initialData.calcDetails.fraction})</div>
                <div><strong>Объем:</strong> {initialData.calcDetails.volume}</div>
                <div><strong>Доставка:</strong> {initialData.calcDetails.zone}</div>
                <div><strong>Транспорт:</strong> {initialData.calcDetails.truck}</div>
                <div className="calc-preview-total">
                  <span>Итого к оплате:</span>
                  <strong>{initialData.calcDetails.grandTotal}</strong>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Ваше имя</label>
                <input
                  type="text"
                  required
                  placeholder="Иван"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="modal-input"
                />
              </div>

              <div className="form-group">
                <label>Номер телефона <span className="req">*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="modal-input"
                />
              </div>

              <div className="form-row-modal">
                <div className="form-group">
                  <label>Материал</label>
                  <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="modal-input"
                  />
                </div>

                <div className="form-group">
                  <label>Объем</label>
                  <input
                    type="text"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="modal-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Адрес объекта / Пункт доставки</label>
                <input
                  type="text"
                  placeholder="г. Москва или район Московской области"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="modal-input"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg btn-block modal-submit-btn"
              >
                <Send size={18} />
                <span>{isSubmitting ? 'Отправка...' : 'Отправить заявку'}</span>
              </button>

              <div className="modal-privacy">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              </div>
            </form>
          </div>
        )}
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .modal-window {
          background: #ffffff;
          border-radius: var(--radius-lg);
          max-width: 520px;
          width: 100%;
          padding: 36px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f1f5f9;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .modal-close-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .modal-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--c-green-dark);
          background: var(--c-green-light);
          padding: 2px 8px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 8px;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 6px;
        }

        .modal-subtitle {
          font-size: 0.92rem;
          color: #64748b;
          margin-bottom: 20px;
          line-height: 1.4;
        }

        .calc-summary-preview {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 0.85rem;
          color: #334155;
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .calc-preview-total {
          display: flex;
          justify-content: space-between;
          border-top: 1px dashed #cbd5e1;
          padding-top: 6px;
          margin-top: 4px;
          font-size: 0.95rem;
        }

        .calc-preview-total strong {
          color: var(--c-green-dark);
          font-size: 1.1rem;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-row-modal {
          display: grid;
          grid-template-columns: 1.3fr 0.7fr;
          gap: 12px;
        }

        .modal-input {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid #cbd5e1;
          border-radius: 6px;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.15s;
        }

        .modal-input:focus {
          border-color: var(--c-green);
        }

        .modal-submit-btn {
          margin-top: 6px;
          padding: 14px;
        }

        .modal-privacy {
          font-size: 0.72rem;
          color: #94a3b8;
          text-align: center;
        }

        .modal-success {
          text-align: center;
          padding: 20px 0;
        }

        .success-circle {
          display: inline-flex;
          margin-bottom: 16px;
        }

        @media (max-width: 640px) {
          .modal-window {
            padding: 24px 20px;
          }
          .form-row-modal {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
