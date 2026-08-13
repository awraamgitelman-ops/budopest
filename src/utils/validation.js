/**
 * Validation utilities for forms across the application
 */

export const sanitizeNameInput = (value) => {
  if (!value) return '';
  // Limit to max 40 characters
  return value.slice(0, 40);
};

export const validateName = (name) => {
  if (!name || !name.trim()) {
    return "Будь ласка, вкажіть ваше ім'я";
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return "Ім'я має містити щонайменше 2 символи";
  }
  if (trimmed.length > 40) {
    return "Ім'я занадто довге (максимум 40 символів)";
  }
  if (/\d/.test(trimmed)) {
    return "Ім'я не повинно містити цифр";
  }
  // Allow Ukrainian/Cyrillic and Latin alphabets, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s\-''ʼ]+$/u;
  if (!nameRegex.test(trimmed)) {
    return "Ім'я містить неприпустимі символи";
  }
  return null;
};

export const formatPhoneInput = (value) => {
  if (!value) return '';
  
  // Extract all digits from input
  let digits = value.replace(/\D/g, '');

  // Handle leading zeros or 80 prefix
  if (digits.startsWith('80') && digits.length > 2) {
    digits = '3' + digits;
  } else if (digits.startsWith('0')) {
    digits = '380' + digits.substring(1);
  } else if (!digits.startsWith('380') && digits.length > 0 && !digits.startsWith('3')) {
    digits = '380' + digits;
  }

  // Cap at maximum 12 digits (380 + 9 national digits for Ukraine)
  digits = digits.slice(0, 12);

  if (digits.startsWith('380')) {
    const d = digits.substring(3);
    let res = '+380';
    if (d.length > 0) res += ` (${d.substring(0, 2)}`;
    if (d.length >= 2) res += `) ${d.substring(2, 5)}`;
    if (d.length >= 5) res += `-${d.substring(5, 7)}`;
    if (d.length >= 7) res += `-${d.substring(7, 9)}`;
    return res;
  }

  // Fallback for custom international numbers (max 19 characters with mask)
  return value.slice(0, 19);
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return "Вкажіть номер телефону";
  }
  const digits = phone.replace(/\D/g, '');
  
  if (digits.startsWith('380')) {
    if (digits.length < 12) {
      return "Введіть повний номер: +380 (XX) XXX-XX-XX (не вистачає цифр)";
    }
    if (digits.length > 12) {
      return "Номер телефону містить забагато цифр";
    }
    return null;
  }

  if (digits.length < 10) {
    return "Вкажіть коректний номер телефону (наприклад: 098 861-29-38)";
  }
  if (digits.length > 12) {
    return "Номер телефону містить забагато цифр";
  }
  return null;
};
