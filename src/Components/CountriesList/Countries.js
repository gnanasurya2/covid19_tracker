import React from "react";
import styles from "./Countries.module.css";
import { connect } from "react-redux";

import Country from "./Country/Country";
import { data } from "../../assests/data/index";
import * as actions from "../../store/actions/index";
const countryFlagCodes = require("../../assests/data/countryFlagcodes.json");

const Countries = (props) => {
  const countryData = data.locations.map((element) => {
    let code = "🇮🇳";
    if (countryFlagCodes[element.country_code]) {
      code = countryFlagCodes[element.country_code].emoji;
    }
    if (code === "🇮🇳") {
      console.log(element.country);
    }
    return (
      <Country
        countryName={element.country}
        activeCases={element.latest
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
        countryFlag={code}
      />
    );
  });
  return <div className={styles.wrapper}>{countryData}</div>;
};
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateData: (index) => actions.updateData(index),
  };
};
export default connect(null, mapDispatchToProps)(Countries);
