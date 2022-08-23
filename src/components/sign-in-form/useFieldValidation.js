import { useState, useEffect } from "react";

const defaultSignInFormFields = {
  email: "",
  password: "",
};

const validateEmail = (email) => email.includes("@");
const validatePW = (pw) => pw.length >= 8;

const checkValidity = ({ email, password }) => {
  return validateEmail(email) && validatePW(password);
};

const useFieldValidation = () => {
  const [formInputs, setFormInputs] = useState({ ...defaultSignInFormFields });

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    const { email, password } = formInputs;

    setIsValid(checkValidity({ email, password }));
  }, [formInputs]);

  return { formInputs, handleInputChange, isValid };
};

export default useFieldValidation;
