import { Result } from "antd";
import React from "react";
import Button from "../../components/Button";

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="La page que vous cherchez n'existe pas."
      extra={<Button variant="primary">Retourner sur la page d'accueil</Button>}
    />
  );
};

export default NotFound;
