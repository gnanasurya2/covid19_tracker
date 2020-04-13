import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";
const NavigationItems = (props) => {
  return (
    <ul className={styles.list}>
      <NavigationItem>Home</NavigationItem>
      <NavigationItem>Resources</NavigationItem>
      <NavigationItem>Links</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
