import React from "react";
import { Input as AntInput } from "antd";
import type { InputProps } from "antd";
import clsx from "clsx";
import styles from "../styles/components/input.module.scss";

interface CustomInputProps extends InputProps {
  type?: "text" | "email" | "password";
  className?: string;
}

const Input: React.FC<CustomInputProps> = ({
  type = "text",
  className,
  ...rest
}) => {
  return (
    <div className={clsx(styles["ct--input-wrapper"])}>
      {type === "password" ? (
        <AntInput.Password
          {...rest}
          className={clsx(styles["ct--input-field"], className)}
        />
      ) : (
        <AntInput
          {...rest}
          type={type}
          className={clsx(styles["ct--input-field"], className)}
        />
      )}
    </div>
  );
};

export default Input;
