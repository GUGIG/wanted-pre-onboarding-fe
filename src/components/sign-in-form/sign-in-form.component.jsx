import { useNavigate } from "react-router-dom";

import useFieldValidation from "./useFieldValidation";

import { sign } from "../../utils/auth.utils";

import Button from "../button";
import Input from "../input";

import "./style.scss";

const SignInForm = () => {
  const { formInputs, handleInputChange, isValid } = useFieldValidation();
  const { email, password } = formInputs;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      alert("양식에 다시 맞춰주세요");
      return;
    }

    const [res, error] = await sign(email, password, "signin");

    if (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요");
      return;
    }

    const tokenObj = await res.json();
    localStorage.setItem("token", tokenObj.access_token);
    navigate("/todo");
  };

  return (
    <div className="sign-in-form">
      <h1>Sign In</h1>
      <form className="sign-in-form__form" onSubmit={handleSubmit}>
        <Input
          placeholder="email"
          type="email"
          name="email"
          onChange={handleInputChange}
          value={email}
        />
        <Input
          placeholder="password"
          type="password"
          name="password"
          onChange={handleInputChange}
          value={password}
        />
        <Button disabled={!isValid} type="submit">
          sign in
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
