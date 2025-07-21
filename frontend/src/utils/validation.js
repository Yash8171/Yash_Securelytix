// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  // Check for at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  if (!hasLetter || !hasNumber) {
    return { isValid: false, message: 'Password must contain both letters and numbers' };
  }
  
  return { isValid: true, message: '' };
};

// Form validation
export const validateLoginForm = (formData) => {
  const errors = {};
  
  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }
  
  // Validate password
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Generic field validation
export const validateField = (fieldName, value, rules = {}) => {
  const errors = [];
  
  // Required validation
  if (rules.required && (!value || value.trim() === '')) {
    errors.push(`${fieldName} is required`);
  }
  
  // Min length validation
  if (rules.minLength && value && value.length < rules.minLength) {
    errors.push(`${fieldName} must be at least ${rules.minLength} characters long`);
  }
  
  // Max length validation
  if (rules.maxLength && value && value.length > rules.maxLength) {
    errors.push(`${fieldName} must be no more than ${rules.maxLength} characters long`);
  }
  
  // Pattern validation
  if (rules.pattern && value && !rules.pattern.test(value)) {
    errors.push(rules.patternMessage || `${fieldName} format is invalid`);
  }
  
  return {
    isValid: errors.length === 0,
    messages: errors
  };
};

// Utility functions
export const sanitizeInput = (input) => {
  return input.trim().replace(/[<>]/g, '');
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password) => {
  // At least 8 characters, one letter, one number
  const minLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return minLength && hasLetter && hasNumber;
};

// src/utils.js

// ✅ Format currency values (e.g., 123456 -> $123,456.00)
export const formatCurrency = (amount) => {
  if (!amount) return '$0.00';
  const numericAmount = parseFloat(String(amount).replace(/[^0-9.-]+/g, ''));
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numericAmount);
};

// ✅ Format date values (e.g., 2024-01-15T10:30:00Z -> January 15, 2024)
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
