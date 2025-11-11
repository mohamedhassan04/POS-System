import React, { useState } from "react";
import type { AppDispatch, RootState } from "../../apis/store";
import { useDispatch, useSelector } from "react-redux";
import { Col, Divider, Empty, List, Row, Select } from "antd";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
} from "../../apis/slices/cartSlice";
import { useFindAllTablesQuery } from "../../apis/actions/table.action";
import { useCreateOrderMutation } from "../../apis/actions/order.action";
import Button from "../../components/Button";
import styles from "../../styles/screens/cart-items.module.scss";

import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import image from "../../assets/images/no-order.svg";

const CartItems: React.FC = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { data } = useFindAllTablesQuery(null, { skip: false });

  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const [selectTable, setSelectTable] = useState<string | null>(null);

  const handleOrder = async () => {
    try {
      await createOrder({
        tableId: selectTable,
        items:
          items &&
          items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
      }).unwrap();
      setSelectTable(null);
      dispatch(clearCart());
      setInterval(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles["pos--cart-wrapper"]}>
      <h2>Mes commandes</h2>
      {items.length > 0 && (
        <div className={styles["pos--select-table-wrapper"]}>
          <Select
            placeholder="Sélectionnez votre table..."
            style={{ width: 300 }}
            onChange={setSelectTable}
            value={selectTable}
            allowClear
          >
            {data?.map((table: any) => (
              <Select.Option key={table.id} value={table.id}>
                {table.number}
              </Select.Option>
            ))}
          </Select>
        </div>
      )}
      <List
        dataSource={items}
        locale={{
          emptyText: (
            <Empty
              image={image}
              description={
                <span className={styles["pos--empty-text"]}>
                  Allez passer votre commande !
                </span>
              }
            />
          ),
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Row gutter={8}>
                <Col span={6}>
                  <Button
                    variant="secondary"
                    onClick={() => dispatch(decreaseQuantity(item.productId))}
                    className={styles["pos--quantity-button"]}
                  >
                    <FaRegMinusSquare size={18} />
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    variant="secondary"
                    className={styles["pos--quantity-button"]}
                    onClick={() =>
                      dispatch(addToCart({ ...item, quantity: 1 }))
                    }
                  >
                    <FaRegPlusSquare size={18} />
                  </Button>
                </Col>

                <Col span={6}>
                  <Button
                    className={styles["pos--quantity-button"]}
                    onClick={() => dispatch(removeFromCart(item.productId))}
                  >
                    <RiDeleteBin5Line size={18} />
                  </Button>
                </Col>
              </Row>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles["pos--cart-item-image"]}
                />
              }
              title={
                <span className={styles["pos--cart-item-name"]}>
                  {item.name}
                </span>
              }
              description={
                <>
                  <p className={styles["pos--cart-item-description"]}>
                    {item.price} DT x {item.quantity}
                  </p>
                  <p className={styles["pos--cart-item-description"]}>
                    Total: {item.price * item.quantity} DT
                  </p>
                </>
              }
            />
          </List.Item>
        )}
      />
      <Divider />

      {items.length > 0 && (
        <div className={styles["pos--total-wrapper"]}>
          <span>Total:</span>
          <span>
            {items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}{" "}
            DT
          </span>
        </div>
      )}

      <Button
        variant="secondary"
        loading={isLoading}
        disabled={isLoading || items.length === 0 || !selectTable}
        onClick={handleOrder}
      >
        Passez la commande
      </Button>
    </div>
  );
};

export default CartItems;
