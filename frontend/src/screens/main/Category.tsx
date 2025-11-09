import { Button, Card } from "antd";
import React, { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "../../styles/screens/category.module.scss";
import { useFindAllCategoryQuery } from "../../apis/actions/category.action";

interface CategoryProps {
  onSelectCategory: (categoryId: string) => void;
}

const Category: React.FC<CategoryProps> = ({ onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data } = useFindAllCategoryQuery(null, {
    skip: false,
  });

  const handleSelect = (id: string) => {
    setActiveCategory(id);
    onSelectCategory(id);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // scroll 80% of the screen
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles["pos--category-wrapper"]}>
      <Button
        type="default"
        shape="circle"
        icon={<IoIosArrowBack />}
        className={styles["pos--category-button-left"]}
        onClick={() => scroll("left")}
      />
      <Button
        type="default"
        shape="circle"
        icon={<IoIosArrowForward />}
        className={styles["pos--category-button-right"]}
        onClick={() => scroll("right")}
      />

      <div ref={scrollRef} className={styles["pos--category-container"]}>
        {data &&
          data?.data?.findAllCategories.map((cat: any, index: number) => (
            <div key={index}>
              <Card
                onClick={() => handleSelect(cat.id)}
                className={`${styles["pos--category-card"]} ${
                  activeCategory === cat.id ? styles["active"] : ""
                }`}
              >
                <img
                  src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect rx='20' width='128' height='128' fill='%23FFD6A5'/><text x='50%' y='54%' font-size='64' dominant-baseline='middle' text-anchor='middle'>🍕</text></svg>"
                  alt={cat.title}
                />
                <div>
                  <span>{cat?.name}</span>
                  <p>{cat?.products?.length} articles</p>
                </div>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
