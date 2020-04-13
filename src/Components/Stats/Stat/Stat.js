import React from "react";
import styles from "./Stat.module.css";

const Stat = (props) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{props.title}</h1>
      <p className={styles.number}>{props.number}</p>
    </div>
  );
};

export default Stat;
