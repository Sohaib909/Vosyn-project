export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Please enter a valid email address.",
  },
};

export const passwordValidation = {
  required: "Please enter a password",
  pattern: {
    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
    message:
      "Password must be at least 8 characters and contain at least 1 letter, 1 number, and, 1 symbol.",
  },
};
