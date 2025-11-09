import React, { lazy, Suspense, useState } from "react";
import Loader from "../../components/Loader";
import { Col, Row } from "antd";

const OrdersStatus = lazy(() => import("./OrdersStatus"));
const Category = lazy(() => import("./Category"));
const MenuItems = lazy(() => import("./MenuItems"));

const Home: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  return (
    <section style={{ backgroundColor: "#f1f1f1", minHeight: "100vh" }}>
      <Suspense fallback={<Loader />}>
        <Row>
          <Col
            xxl={16}
            xl={16}
            lg={16}
            md={24}
            sm={24}
            xs={24}
            style={{
              padding: "1rem",
              borderRight: "1px solid #adadadc0",
              height: "100vh",
            }}
          >
            <OrdersStatus />
            <Category onSelectCategory={setSelectedCategoryId} />
            {selectedCategoryId && (
              <MenuItems categoryId={selectedCategoryId} />
            )}
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
