import React from "react";
interface ButtonProps {
  disabled?: boolean;
  variant: "text" | "outlined" | "contained";
  color: "primary" | "secondary" | "warning" | "error" | "success";
  disableElevation?: boolean;
  sizes?: "small" | "medium" | "large";
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}
function Button() {
  return <div>Button</div>;
}

export default Button;
