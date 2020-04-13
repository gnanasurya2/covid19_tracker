import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./toolbar.module.css";
import logo from "../../../assests/images/logo.png";

const toolbar = (props) => {
  return (
    <div className={styles.toolbar}>
      <img src={logo} alt="corona virus" className={styles.logo} />
      <div className={styles.hide}>
        <NavigationItems />
      </div>
      <div className={styles.hamburger} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default toolbar;
