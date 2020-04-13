import React from "react";
import styles from "./Stats.module.css";
import { connect } from "react-redux";

import Stat from "./Stat/Stat";

const Stats = (props) => {
  let count = [0, 0, 0];
  let country = "World";
  if (props.data) {
    count[0] = props.data.latest;
    count[1] = props.deathsData.latest;
    count[2] = props.recoveredData.latest;
  }
  if (props.index) {
    country = props.data.locations[props.index].country;
    console.log(country);
    count[0] = props.data.locations[props.index].latest;
    count[1] = props.deathsData.locations[props.index].latest;
    count[2] = props.recoveredData.locations[props.index].latest;
  }
  return (
    <div className={styles.wrapper}>
      <Stat title={country} number="stats" />
      <Stat title="active" number={count[0]} />
      <Stat title="recovered" number={count[1]} />
      <Stat title="deceased" number={count[2]} />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    data: state.data.data,
    deathsData: state.data.deathsData,
    recoveredData: state.data.recoveredData,
    index: state.data.index,
  };
};
export default connect(mapStateToProps)(Stats);
