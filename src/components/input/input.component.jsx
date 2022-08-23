import "./style.scss";

const Input = ({ className, ...restProps }) => {
  return <input className={`input-component ${className}`} {...restProps} />;
};

export default Input;
