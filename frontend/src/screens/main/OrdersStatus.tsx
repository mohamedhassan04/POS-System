import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import styles from "../../styles/screens/orders-status.module.scss";
import waiting from "../../assets/images/waiting.png";
import progress from "../../assets/images/progress.png";
import ready from "../../assets/images/completed.png";
import {
  useFindAllOrdersByStatusQuery,
  useGetActiveOrdersWithDurationQuery,
} from "../../apis/actions/order.action";
import ModalComponent from "../../components/ModalComponent";

const OrdersStatus: React.FC = () => {
  const { data: backendData = [] } = useFindAllOrdersByStatusQuery(null, {
    skip: false,
  });
  const { data: activeOrders } = useGetActiveOrdersWithDurationQuery(null, {
    skip: false,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState<any>();

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

  const inProgressOrders =
    activeOrders &&
    activeOrders.filter((order: any) => order.status === "in progress");
  const waitingOrders =
    activeOrders &&
    activeOrders.filter((order: any) => order.status === "pending");

  const handleOpenModal = (item: string) => {
    setSelectedTitle(item);
    setOpen(true);
  };

  return (
    <section>
      <Row justify={"center"} className={styles["orders-status-wrapper"]}>
        {mergedData &&
          mergedData.map((item: any) => (
            <Col xxl={6} xl={6} lg={7} md={7} sm={24} xs={24}>
              <Card
                size="small"
                className={styles["orders-status-card"]}
                onClick={() => handleOpenModal(item)}
              >
                <div className={styles["orders-status-title"]}>
                  <img src={item.image} alt="orders" width={20} />
                  <span>{item.title}</span>
                </div>
                <h1>{item.count}</h1>
              </Card>
            </Col>
          ))}
      </Row>

      <ModalComponent
        title={selectedTitle?.title}
        width={800}
        open={open}
        onClose={() => setOpen(false)}
      >
        {selectedTitle?.status === "pending" ? (
          <ul>
            {waitingOrders?.map((order: any) => (
              <>
                <li>{order?.avrgWaitingTime}</li>
                <li>{order?.table.number}</li>
              </>
            ))}
          </ul>
        ) : selectedTitle?.status === "in progress" ? (
          <ul>
            {inProgressOrders?.map((order: any) => (
              <>
                <li>{order?.avrgWaitingTime}</li>
                <li>{order?.table.number}</li>
              </>
            ))}
          </ul>
        ) : null}
      </ModalComponent>
    </section>
  );
};

export default OrdersStatus;
