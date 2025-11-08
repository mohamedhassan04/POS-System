import React from "react";
import styles from "../../styles/screens/login.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Form, message } from "antd";
import { useLoginMutation } from "../../apis/actions/auth.action";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../apis/store";
import { setUser } from "../../apis/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = async (values: any) => {
    try {
      const user = await login(values).unwrap();
      dispatch(setUser(user));
      messageApi.success("Connexion réussie !");
      navigate("/main");
    } catch (error: any) {
      messageApi.error(
        error?.data?.errors?.[0]?.message || "Identifiants invalides"
      );
    }
  };

  return (
    <>
      {contextHolder}
      <section className={styles["pos--login-container"]}>
        <div className={styles["pos--login-form"]}>
          <h1>Se connecter</h1>
          <p>Entrez vos informations de connexion ci-dessous</p>
          <Form
            form={form}
            onFinish={onFinish}
            className={styles["pos--login-form-inputs"]}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Merci de renseigner votre nom d'utilisateur",
                },
              ]}
            >
              <Input
                placeholder="Entrer votre nom d'utilisateur..."
                className={styles["pos--input-field"]}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Merci de renseigner votre mot de passe",
                },
              ]}
            >
              <Input
                type="password"
                placeholder="Entrer votre mot de passe..."
                className={styles["pos--input-field"]}
              />
            </Form.Item>
            <Button
              variant="secondary"
              type="submit"
              loading={isLoading}
              className={styles["pos--login-button"]}
            >
              Se connecter
            </Button>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Login;
