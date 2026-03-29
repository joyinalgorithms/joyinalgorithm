/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ChangeEvent } from 'react';
import { getCardBrand, validateLuhn, formatCardNumber } from '../lib/cardUtils';
import { ValidationResult } from '../types';

export const useCreditCard = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [brand, setBrand] = useState('UNKNOWN');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);

  useEffect(() => {
    const cleanNumber = cardNumber.replace(/\D/g, '');
    setBrand(getCardBrand(cleanNumber));
  }, [cardNumber]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
    setResult(null);
  };

  const handleValidate = async () => {
    if (!cardNumber) return;
    
    setIsValidating(true);
    setResult(null);

    // Simulate network delay for UX
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const isValid = validateLuhn(cardNumber);
    const cleanNumber = cardNumber.replace(/\D/g, '');
    const detectedBrand = getCardBrand(cleanNumber);

    setResult({
      isValid,
      message: isValid 
        ? `Valid ${detectedBrand} card detected.` 
        : 'Invalid card number. Please check for typos.',
    });
    setIsValidating(false);
  };

  const handleReset = () => {
    setCardNumber('');
    setResult(null);
    setBrand('UNKNOWN');
    setIsFlipped(false);
  };

  return {
    cardNumber,
    brand,
    isFlipped,
    isValidating,
    result,
    setIsFlipped,
    handleInputChange,
    handleValidate,
    handleReset,
  };
};
