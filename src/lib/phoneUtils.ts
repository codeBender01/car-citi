export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
}

const TURKMENISTAN_CODE = '+993';
const VALID_OPERATORS = ['61', '62', '63', '64', '65', '71'];
const PHONE_DIGITS_LENGTH = 8; // Digits after +993

/**
 * Formats phone number to: +993 XX XXXXXX
 * Always maintains +993 prefix
 */
export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters except leading +
  let cleaned = value.replace(/[^\d+]/g, '');

  // If empty or just "+", return base prefix
  if (!cleaned || cleaned === '+') {
    return `${TURKMENISTAN_CODE} `;
  }

  // Ensure it starts with +993
  if (!cleaned.startsWith(TURKMENISTAN_CODE)) {
    // Extract digits only
    const digitsOnly = cleaned.replace(/\D/g, '');

    // If starts with 993, prepend +
    if (digitsOnly.startsWith('993')) {
      cleaned = '+' + digitsOnly;
    } else {
      // Otherwise start fresh with +993
      cleaned = TURKMENISTAN_CODE + digitsOnly;
    }
  }

  // Extract the part after +993
  const afterCode = cleaned.substring(TURKMENISTAN_CODE.length);

  // Limit to 8 digits after country code
  const limitedDigits = afterCode.substring(0, PHONE_DIGITS_LENGTH);

  // Format: +993 XX XXXXXX
  if (limitedDigits.length === 0) {
    return `${TURKMENISTAN_CODE} `;
  } else if (limitedDigits.length <= 2) {
    // +993 XX
    return `${TURKMENISTAN_CODE} ${limitedDigits}`;
  } else {
    // +993 XX XXXXXX
    const operator = limitedDigits.substring(0, 2);
    const number = limitedDigits.substring(2);
    return `${TURKMENISTAN_CODE} ${operator} ${number}`;
  }
}

/**
 * Validates Turkmenistan phone number
 */
export function validatePhoneNumber(phone: string): PhoneValidationResult {
  // Remove spaces for validation
  const cleaned = phone.replace(/\s/g, '');

  // Check if empty (allow empty state)
  if (!cleaned || cleaned === '+' || cleaned === TURKMENISTAN_CODE) {
    return {
      isValid: false,
      error: 'Введите номер телефона'
    };
  }

  // Check prefix
  if (!cleaned.startsWith(TURKMENISTAN_CODE)) {
    return {
      isValid: false,
      error: `Номер должен начинаться с ${TURKMENISTAN_CODE}`
    };
  }

  // Check total length (+993 + 8 digits = 12)
  const expectedLength = TURKMENISTAN_CODE.length + PHONE_DIGITS_LENGTH;
  if (cleaned.length !== expectedLength) {
    return {
      isValid: false,
      error: 'Номер должен содержать 8 цифр после кода страны'
    };
  }

  // Check if all characters after +993 are digits
  const digitsAfterCode = cleaned.substring(TURKMENISTAN_CODE.length);
  if (!/^\d{8}$/.test(digitsAfterCode)) {
    return {
      isValid: false,
      error: 'Номер должен содержать только цифры'
    };
  }

  // Check operator code (positions 4-5, which is index 4-6)
  const operatorCode = cleaned.substring(TURKMENISTAN_CODE.length, TURKMENISTAN_CODE.length + 2);
  if (!VALID_OPERATORS.includes(operatorCode)) {
    return {
      isValid: false,
      error: 'Неверный код оператора. Используйте: 61, 62, 63, 64, 65, 71'
    };
  }

  return {
    isValid: true
  };
}

/**
 * Cleans phone number for API submission (removes spaces)
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\s/g, '');
}

/**
 * Checks if operator code is valid
 */
export function isValidOperator(operatorCode: string): boolean {
  return VALID_OPERATORS.includes(operatorCode);
}
