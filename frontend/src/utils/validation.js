// Reusable validation utilities for consistent frontend behavior

export const nameRegex = /^[a-zA-Z\s]+$/;
export const phoneRegex = /^[0-9]{10}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateName = (name) => {
  if (!name || !name.trim()) return "Name is required.";
  if (!nameRegex.test(name.trim())) return "Name can only contain alphabets and spaces.";
  if (name.trim().length < 2) return "Name must be at least 2 characters.";
  return "";
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) return "Phone number is required.";
  if (!phoneRegex.test(phone.trim())) return "Enter a valid 10-digit phone number (numbers only).";
  return "";
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) return "Email is required.";
  if (!emailRegex.test(email.trim())) return "Please enter a valid email.";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  return "";
};

/**
 * Validates on key press to restrict input at the character level.
 * Example usage: <input onKeyPress={restrictNameInput} />
 */
export const restrictNameInput = (e) => {
  const char = String.fromCharCode(e.which || e.keyCode);
  if (!/^[a-zA-Z\s]$/.test(char)) {
    e.preventDefault();
  }
};

/**
 * Validates on key press to restrict input to numbers only.
 * Example usage: <input onKeyPress={restrictPhoneInput} />
 */
export const restrictPhoneInput = (e) => {
  const char = String.fromCharCode(e.which || e.keyCode);
  if (!/^[0-9]$/.test(char)) {
    e.preventDefault();
  }
};
