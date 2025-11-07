import React from "react";
import styles from "../../styles/screens/login.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Login: React.FC = () => {
  return (
    <section className={styles["pos--login-container"]}>
      <div className={styles["pos--login-form"]}>
        <h1>Se connecter</h1>
        <Input
          placeholder="Entrer votre nom d'utilisateur..."
          className={styles["pos--input-field"]}
        />
        <Input
          type="password"
          placeholder="Entrer votre mot de passe..."
          className={styles["pos--input-field"]}
        />
        <Button variant="secondary" className={styles["pos--login-button"]}>
          Se connecter
        </Button>
      </div>
    </section>
  );
};

export default Login;
