import React, { useState } from "react";
import { Button, Card, InputNumber, Row } from "antd";
import { useDispatch } from "react-redux";
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";
import styles from "../styles/screens/food-card.module.scss";
import { addToCart } from "../apis/slices/cartSlice";

interface FoodCardProps {
  productId: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

const FoodCard: React.FC<FoodCardProps> = ({
  productId,
  image,
  title,
  description,
  price,
}) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId,
        name: title,
        price,
        image,
        description,
        quantity,
      })
    );
  };

  return (
    <Card hoverable className={styles["pos--food-card-container"]}>
      <Row gutter={16}>
        <img
          src={image}
          alt={title}
          className={styles["pos--food-card-image"]}
        />
        <div className={styles["pos--food-card-content"]}>
          <h3>{title}</h3> <span>{price} DT</span>
          <p>{description}</p>
        </div>
      </Row>

      <div className={styles["pos--food-card-quantity"]}>
        <Button
          variant="outlined"
          onClick={handleDecrease}
          className={styles["pos--quantity-button"]}
        >
          <FaRegMinusSquare size={18} />
        </Button>

        <InputNumber
          min={1}
          value={quantity}
          readOnly
          className={styles["pos--quantity-input"]}
        />

        <Button
          variant="filled"
          onClick={handleIncrease}
          className={styles["pos--quantity-button"]}
        >
          <FaRegPlusSquare size={18} />
        </Button>
      </div>

      <Button
        type="primary"
        onClick={handleAddToCart}
        block
        style={{ marginTop: "10px" }}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default FoodCard;
