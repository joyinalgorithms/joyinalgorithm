/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ValidationResult {
  isValid: boolean;
  brand: string;
  message: string;
}

export const getCardBrand = (number: string): string => {
  const cleanNumber = number.replace(/\D/g, '');
  if (!cleanNumber) return 'UNKNOWN';

  if (cleanNumber.startsWith('4')) return 'VISA';
  if (cleanNumber.startsWith('34') || cleanNumber.startsWith('37')) return 'AMEX';
  if (/^5[1-5]/.test(cleanNumber)) return 'MASTERCARD';
  if (cleanNumber.startsWith('6011') || cleanNumber.startsWith('65')) return 'DISCOVER';
  if (/^3(?:0[0-5]|[68])/.test(cleanNumber)) return 'DINERS';
  if (/^(?:2131|1800|35)/.test(cleanNumber)) return 'JCB';

  return 'UNKNOWN';
};

export const validateLuhn = (cardNumber: string): boolean => {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  if (!cleanNumber || cleanNumber.length < 13) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i));

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

export const formatCardNumber = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
};
