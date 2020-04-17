import React, { Component } from "react";
import styles from "./Countries.module.css";
import { connect } from "react-redux";

import Country from "./Country/Country";
import { data } from "../../assests/data/index";
import * as actions from "../../store/actions/index";
import Search from "../UI/Search/Search";
import Aux from "../../hoc/Aux";

const countryFlagCodes = require("../../assests/data/countryFlagcodes.json");

class Countries extends Component {
  state = {
    countryData: null,
    update: true,
  };
  countryUpdater = (countryData) => {
    this.setState({
      countryData: countryData.map((element, index) => {
        let code = "🇮🇳";
        if (countryFlagCodes[element.country_code]) {
          code = countryFlagCodes[element.country_code].emoji;
        }
        return (
          <Country
            key={index}
            countryName={element.country}
            province={element.province}
            activeCases={element.latest
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            countryFlag={code}
          />
        );
      }),
      update: false,
    });
  };
  textChange = (event) => {
    let countryData = this.props.data.locations.filter((element) => {
      return element.country
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase());
    });
    this.countryUpdater(countryData);
  };

  clickHandler = (event) => {
    let countryName = event.target.children[1].childNodes[0].innerHTML;
    let country = data.locations.find(
      (element) => element.country === countryName
    );
    this.props.onUpdateData(country.country_code);
  };
  render() {
    if (this.props.data && this.state.update) {
      this.countryUpdater(this.props.data.locations);
    }
    return (
      <Aux>
        <Search valueChanged={(event) => this.textChange(event)} />
        <div onClickCapture={this.clickHandler}>
          <div className={styles.wrapper}>{this.state.countryData}</div>
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.data.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateData: (index) => dispatch(actions.updateData(index)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Countries);
