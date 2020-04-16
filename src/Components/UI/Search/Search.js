import React from "react";

import styles from "./Search.module.css";

const Search = (props) => (
  <div className={styles.wrapper}>
    <h2 className={styles.text}>Country Name : </h2>
    <input type="text" onChange={props.valueChanged} className={styles.input} />
  </div>
);

export default Search;
