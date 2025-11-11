import React, { lazy, Suspense, useState } from "react";
import Loader from "../../components/Loader";
import { Col, FloatButton, Row } from "antd";
import CartItems from "./CartItems";
import { useLogoutMutation } from "../../apis/actions/auth.action";
import { LuLogOut } from "react-icons/lu";
import styles from "../../styles/screens/orders-status.module.scss";

const OrdersStatus = lazy(() => import("./OrdersStatus"));
const Category = lazy(() => import("./Category"));
const MenuItems = lazy(() => import("./MenuItems"));

const Home: React.FC = () => {
  const [logout] = useLogoutMutation();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleLogout = async () => {
    try {
      await logout({
        name: null,
        access_token: null,
      }).unwrap();
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section style={{ minHeight: "100vh" }}>
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
            <CartItems />
          </Col>
        </Row>

        <FloatButton
          icon={<LuLogOut />}
          tooltip="Se déconnecter"
          onClick={handleLogout}
          className={styles["pos--logout-button"]}
        />
      </Suspense>
    </section>
  );
};

export default Home;
