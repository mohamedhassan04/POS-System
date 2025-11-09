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
              image="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=876"
              title={item.name}
              description="Delicious beef lasagna with double chilli Delicious beef"
              price={item.price}
            />
          </Col>
        ))}
    </Row>
  );
};

export default MenuItems;
