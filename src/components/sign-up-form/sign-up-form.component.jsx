import useFieldValidation from "./useFieldValidation";

import { sign } from "../../utils/auth.utils";

import Button from "../button";
import Input from "../input";

import "./style.scss";

const SignUpForm = () => {
  const { formInputs, handleInputChange, isValid, resetInputFields } =
    useFieldValidation();
  const { email, password, confirm } = formInputs;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      alert("양식에 맞춰 작성해주세요");
      return;
    }

    const [res, error] = await sign(email, password, "signup");

    if (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    const tokenObj = await res.json();
    if (tokenObj.access_token) {
      alert("회원가입에 성공했습니다. 로그인해주세요");
      resetInputFields();
    }
  };

  return (
    <div className="sign-up-form">
      <h1>Sign Up</h1>
      <form className="sign-up-form__form" onSubmit={handleSubmit}>
        <Input
          placeholder="email"
          type="email"
          name="email"
          onChange={handleInputChange}
          value={email}
        />
        <Input
          placeholder="password (8자리 이상)"
          type="password"
          name="password"
          onChange={handleInputChange}
          value={password}
        />
        <Input
          placeholder="confirm password"
          type="password"
          name="confirm"
          onChange={handleInputChange}
          value={confirm}
        />
        <Button disabled={!isValid} type="submit">
          sign up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
