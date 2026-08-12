/**
 * Validation utilities for forms across the application
 */

export const validateName = (name) => {
  if (!name || !name.trim()) {
    return "Будь ласка, вкажіть ваше ім'я";
  }
  if (name.trim().length < 2) {
    return "Ім'я має містити щонайменше 2 символи";
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return "Вкажіть номер телефону";
  }
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 9) {
    return "Вкажіть коректний номер телефону (наприклад: 067 123-45-67)";
  }
  if (digits.length > 13) {
    return "Номер телефону містить забагато цифр";
  }
  return null;
};

export const formatPhoneInput = (value) => {
  if (!value) return '';
  const digits = value.replace(/\D/g, '');
  
  if (digits.startsWith('380')) {
    const d = digits.substring(3);
    let res = '+380';
    if (d.length > 0) res += ` (${d.substring(0, 2)}`;
    if (d.length >= 2) res += `) ${d.substring(2, 5)}`;
    if (d.length >= 5) res += `-${d.substring(5, 7)}`;
    if (d.length >= 7) res += `-${d.substring(7, 9)}`;
    return res;
  }

  if (digits.startsWith('0')) {
    let res = '+380';
    const d = digits.substring(1);
    if (d.length > 0) res += ` (${d.substring(0, 2)}`;
    if (d.length >= 2) res += `) ${d.substring(2, 5)}`;
    if (d.length >= 5) res += `-${d.substring(5, 7)}`;
    if (d.length >= 7) res += `-${d.substring(7, 9)}`;
    return res;
  }

  return value;
};
