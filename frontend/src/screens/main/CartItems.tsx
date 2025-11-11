import React, { useState } from "react";
import type { AppDispatch, RootState } from "../../apis/store";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, List, Select } from "antd";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
} from "../../apis/slices/cartSlice";
import { useFindAllTablesQuery } from "../../apis/actions/table.action";
import { useCreateOrderMutation } from "../../apis/actions/order.action";

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
    <div style={{ padding: "1rem" }}>
      <h2>Mes commandes</h2>
      <Select
        placeholder="select votre table..."
        style={{ width: 120 }}
        onChange={setSelectTable}
        value={selectTable}
        allowClear
      >
        {data &&
          data.map((table: any) => (
            <Select.Option key={table.id} value={table.id}>
              {table.number}
            </Select.Option>
          ))}
      </Select>
      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                onClick={() => dispatch(decreaseQuantity(item.productId))}
              >
                -
              </Button>,
              <Button
                onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
              >
                +
              </Button>,
              <Button
                danger
                onClick={() => dispatch(removeFromCart(item.productId))}
              >
                Remove
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`${item.price} DT x ${item.quantity}`}
            />
            <div>Total: {item.price * item.quantity} DT</div>
          </List.Item>
        )}
      />
      <Divider />

      {items.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong>Total:</strong>
          <strong>
            {items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}{" "}
            DT
          </strong>
        </div>
      )}

      <Button
        type="primary"
        style={{ marginTop: "1rem" }}
        block
        loading={isLoading}
        disabled={isLoading || items.length === 0 || !selectTable}
        onClick={handleOrder}
      >
        Checkout
      </Button>
    </div>
  );
};

export default CartItems;
