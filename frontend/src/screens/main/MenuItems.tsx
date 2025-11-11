import React from "react";
import FoodCard from "../../components/FoodCard";
import { Col, Row } from "antd";
import { useFindAllProductsByCategoryQuery } from "../../apis/actions/category.action";

interface MenuItemsProps {
  categoryId: string;
}

const MenuItems: React.FC<MenuItemsProps> = ({ categoryId }) => {
  const { data, isLoading } = useFindAllProductsByCategoryQuery(categoryId, {
    skip: !categoryId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No items found</p>;

  return (
    <Row gutter={[16, 16]} style={{ width: "100%" }}>
      {data &&
        data.map((item: any) => (
          <Col key={item.id} xxl={6} xl={6} lg={8} md={8} sm={24} xs={24}>
            <FoodCard
              productId={item.id}
              image={item.image}
              title={item.name}
              description="Delicious beef lasagna with double chilli Delicious beef"
              price={item.price}
              available={item.available}
            />
          </Col>
        ))}
    </Row>
  );
};

export default MenuItems;
