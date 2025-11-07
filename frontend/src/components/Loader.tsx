import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/images/icons/loader.json";
import styles from "../styles/components/loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.backgroundEffect}></div>
      <Lottie animationData={animationData} loop className={styles.lottie} />
    </div>
  );
};

export default Loader;
