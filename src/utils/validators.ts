// frontend/src/utils/validators.ts
export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string) => {
  const re = /^09\d{8}$/;
  return re.test(phone);
};

export const validateCedula = (cedula: string) => {
  const re = /^\d{10}$/;
  return re.test(cedula);
};
