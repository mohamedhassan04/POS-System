import React, { type ReactNode } from "react";
import { Button as AntButton } from "antd";
import styles from "../styles/components/button.module.scss";
import clsx from "clsx";

type Variant = "primary" | "outlined" | "secondary";

interface ButtonProps {
  children?: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  shape?: "circle" | "round";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  icon,
  iconPosition = "start",
  onClick,
  type = "button",
  className,
  loading,
  disabled,
  shape,
}) => {
  return (
    <AntButton
      type="default"
      shape={shape}
      onClick={onClick}
      htmlType={type}
      disabled={disabled}
      loading={loading}
      className={clsx(
        styles.button,
        styles[`ct--button-${variant}`],
        {
          [styles["button--with-icon-start"]]: icon && iconPosition === "start",
          [styles["button--with-icon-end"]]: icon && iconPosition === "end",
        },
        className
      )}
    >
      <span className={styles.button__content}>
        {icon && iconPosition === "start" && (
          <span className={styles.button__icon}>{icon}</span>
        )}
        <span className={styles.button__text}>{children}</span>
        {icon && iconPosition === "end" && (
          <span className={styles.button__icon}>{icon}</span>
        )}
      </span>
    </AntButton>
  );
};

export default Button;
