import React from "react";
import { Card, Col, Row } from "antd";
import styles from "../../styles/screens/orders-status.module.scss";
import waiting from "../../assets/images/waiting.png";
import progress from "../../assets/images/progress.png";
import ready from "../../assets/images/completed.png";
import { useFindAllOrdersByStatusQuery } from "../../apis/actions/order.action";

const OrdersStatus: React.FC = () => {
  const { data: backendData = [] } = useFindAllOrdersByStatusQuery(null, {
    skip: false,
  });

  const localData = [
    {
      title: "Les commandes en attente",
      image: waiting,
      status: "pending",
    },
    {
      title: "Les commandes en cours",
      image: progress,
      status: "in progress",
    },
    { title: "Les commandes en prête", image: ready, status: "ready" },
  ];

  const mergedData = localData.map((item) => {
    const backendItem = backendData.find((b: any) => b.status === item.status);
    return {
      ...item,
      count: backendItem ? backendItem.count : 0,
    };
  });

  return (
    <section>
      <Row justify={"center"} className={styles["orders-status-wrapper"]}>
        {mergedData &&
          mergedData.map((item: any) => (
            <Col xxl={6} xl={6} lg={7} md={7} sm={24} xs={24}>
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
