import React, { lazy, Suspense } from "react";
import Loader from "../../components/Loader";
import { Col, Row } from "antd";

const OrdersStatus = lazy(() => import("./OrdersStatus"));
const Category = lazy(() => import("./Category"));
const MenuItems = lazy(() => import("./MenuItems"));

const Home: React.FC = () => {
  return (
    <section style={{ minHeight: "100vh" }}>
      <Suspense fallback={<Loader />}>
        <Row style={{ gap: "1rem" }}>
          <Col
            xxl={15}
            xl={15}
            lg={15}
            md={24}
            sm={24}
            xs={24}
            style={{ padding: "1rem" }}
          >
            <OrdersStatus />
            <Category />
            <MenuItems />
          </Col>

          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <div>
              <h1>Cart Items</h1>
            </div>
          </Col>
        </Row>
      </Suspense>
    </section>
  );
};

export default Home;
