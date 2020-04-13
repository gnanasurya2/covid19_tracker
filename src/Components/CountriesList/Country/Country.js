import React from "react";

import logo from "../../../assests/images/logo.png";
import styles from "./Country.module.css";

const Country = (props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.image} role="img">
        {props.countryFlag}
      </span>
      <div className={styles.content}>
        <h2>{props.countryName}</h2>
        <p>Active cases: {props.activeCases}</p>
      </div>
    </div>
  );
};

export default Country;
