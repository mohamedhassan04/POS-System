import React from "react";
import { Card, Col, Row } from "antd";
import styles from "../../styles/screens/orders-status.module.scss";
import waiting from "../../assets/images/waiting.png";
import progress from "../../assets/images/progress.png";
import ready from "../../assets/images/completed.png";

const OrdersStatus: React.FC = () => {
  const data = [
    {
      id: "1",
      title: "Les commandes en attente",
      count: 5,
      image: waiting,
    },
    {
      id: "2",
      title: "Les commandes en cours",
      count: 12,
      image: progress,
    },
    {
      id: "3",
      title: "Les commandes en prête",
      count: 15,
      image: ready,
    },
  ];

  return (
    <section>
      <Row justify={"center"} className={styles["orders-status-wrapper"]}>
        {data &&
          data.map((item) => (
            <Col xxl={8} xl={6} lg={8} md={24} sm={24} xs={24}>
              <Card size="small" className={styles["orders-status-card"]}>
                <div className={styles["orders-status-title"]}>
                  <img src={item.image} alt="orders" width={20} />
                  <span>{item.title}</span>
                </div>
                <h1>{item.count}</h1>
              </Card>
            </Col>
          ))}
      </Row>
    </section>
  );
};

export default OrdersStatus;
