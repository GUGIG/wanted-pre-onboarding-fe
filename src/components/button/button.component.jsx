import { memo } from "react";

import "./style.scss";

const Button = ({ children, ...props }) => {
  return (
    <button className={"btn " + props.color} {...props}>
      {children}
    </button>
  );
};

export default memo(Button);
