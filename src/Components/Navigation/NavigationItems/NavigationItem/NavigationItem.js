import React from "react";
import styles from "./NavigationItem.module.css";

const NavigationItem = (props) => {
  return (
    <a href="/" className={styles.item}>
      {props.children}
    </a>
  );
};

export default NavigationItem;
