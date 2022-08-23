import { useState, useEffect } from "react";

const defaultSignUpFormFields = {
  email: "",
  password: "",
  confirm: "",
};

const validateEmail = (email) => email.includes("@");
const validatePW = (pw) => pw.length >= 8;
const validateConfirm = (pw, confirm) => pw === confirm;

const checkValidity = ({ email, password, confirm }) => {
  return (
    validateEmail(email) &&
    validatePW(password) &&
    validateConfirm(password, confirm)
  );
};

const useFieldValidation = () => {
  const [formInputs, setFormInputs] = useState({ ...defaultSignUpFormFields });

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetInputFields = () => {
    setFormInputs({ ...defaultSignUpFormFields });
  };

  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    const { email, password, confirm } = formInputs;

    setIsValid(checkValidity({ email, password, confirm }));
  }, [formInputs]);

  return { formInputs, handleInputChange, isValid, resetInputFields };
};

export default useFieldValidation;
