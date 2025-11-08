import { Button, Card } from "antd";
import React, { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "../../styles/screens/category.module.scss";

const Category: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
  const categories = [
    {
      id: "cat_pizza",
      title: "Pizza",
      slug: "pizza",
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect rx='20' width='128' height='128' fill='%23FFD6A5'/><text x='50%' y='54%' font-size='64' dominant-baseline='middle' text-anchor='middle'>🍕</text></svg>",
      shortcutKey: "1",
      order: 1,
      number_of_items: 10,
    },
    {
      id: "cat_drink",
      title: "Drinks",
      slug: "cold-drinks",
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect rx='20' width='128' height='128' fill='%23CDE7FF'/><text x='50%' y='54%' font-size='60' dominant-baseline='middle' text-anchor='middle'>🥤</text></svg>",
      shortcutKey: "2",
      order: 2,
      number_of_items: 15,
    },
    {
      id: "cat_water",
      title: "Water",
      slug: "water",
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect rx='20' width='128' height='128' fill='%23E0F7FF'/><text x='50%' y='54%' font-size='64' dominant-baseline='middle' text-anchor='middle'>💧</text></svg>",
      shortcutKey: "3",
      order: 3,
      number_of_items: 5,
    },
    {
      id: "cat_rice",
      title: "Rice (Riz)",
      slug: "rice",
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect rx='20' width='128' height='128' fill='%23FFF3B0'/><text x='50%' y='54%' font-size='54' dominant-baseline='middle' text-anchor='middle'>🍚</text></svg>",
      shortcutKey: "4",
      order: 4,
      number_of_items: 4,
    },
    {
      id: "cat_dessert",
      title: "Desserts",
      slug: "desserts",
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect rx='20' width='128' height='128' fill='%23FFE6F0'/><text x='50%' y='54%' font-size='56' dominant-baseline='middle' text-anchor='middle'>🍰</text></svg>",
      shortcutKey: "5",
      order: 5,
      number_of_items: 8,
    },
    {
      id: "cat_coffee",
      title: "Coffee",
      slug: "coffee",
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect rx='20' width='128' height='128' fill='%23F5E1C8'/><text x='50%' y='54%' font-size='60' dominant-baseline='middle' text-anchor='middle'>☕</text></svg>",
      shortcutKey: "6",
      order: 6,
      number_of_items: 8,
    },
    {
      id: "cat_beer",
      title: "Beer",
      slug: "beer",
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect rx='20' width='128' height='128' fill='%23FFF1D6'/><text x='50%' y='54%' font-size='60' dominant-baseline='middle' text-anchor='middle'>🍺</text></svg>",
      shortcutKey: "7",
      order: 7,
      number_of_items: 15,
    },
    {
      id: "cat_sandwich",
      title: "Sandwiches",
      slug: "sandwiches",
      icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'><rect rx='20' width='128' height='128' fill='%23D9FFD6'/><text x='50%' y='54%' font-size='56' dominant-baseline='middle' text-anchor='middle'>🥪</text></svg>",
      shortcutKey: "8",
      order: 8,
      number_of_items: 17,
    },
  ];

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
        {categories.map((cat) => (
          <div key={cat.id}>
            <Card
              onClick={() => setActiveCategory(cat.id)}
              className={`${styles["pos--category-card"]} ${
                activeCategory === cat.id ? styles["active"] : ""
              }`}
            >
              <img src={cat.icon} alt={cat.title} />
              <div>
                <span>{cat.title}</span>
                <p>{cat.number_of_items} articles</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
