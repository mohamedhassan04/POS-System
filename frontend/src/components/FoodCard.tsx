import React, { useState } from "react";
import { Button, Card, InputNumber, Row } from "antd";
import styles from "../styles/screens/food-card.module.scss";
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";

interface FoodCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
}

const FoodCard: React.FC<FoodCardProps> = ({
  image,
  title,
  description,
  price,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

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
    </Card>
  );
};

export default FoodCard;
