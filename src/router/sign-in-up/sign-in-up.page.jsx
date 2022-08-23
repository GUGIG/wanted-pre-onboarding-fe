import { Navigate } from "react-router-dom";

import SignInForm from "../../components/sign-in-form";
import SignUpForm from "../../components/sign-up-form";

import "./style.scss";

const SignInUpPage = () => {
  const localToken = localStorage.getItem("token");
  return (
    <>
      {localToken && <Navigate to="/todo" replace />}
      <div className="sign-in-up-page">
        <SignInForm />
        <SignUpForm />
      </div>
    </>
  );
};

export default SignInUpPage;
